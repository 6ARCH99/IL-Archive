const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const hasFlag = (name) => args.includes(name);

const sessionId = getArg('--session');
if (!sessionId) {
  console.error('Missing required --session argument');
  process.exit(1);
}

const outdir = path.resolve(getArg('--outdir', '.dbg'));
const startPort = Number(getArg('--port', '7777'));
const idleSeconds = Number(getArg('--idle', '0'));
const clean = hasFlag('--clean');
const host = hasFlag('--remote') ? '0.0.0.0' : '127.0.0.1';

fs.mkdirSync(outdir, { recursive: true });

const logFile = path.join(outdir, `trae-debug-log-${sessionId}.ndjson`);
const envFile = path.join(outdir, `${sessionId}.env`);

if (clean && fs.existsSync(logFile)) {
  fs.unlinkSync(logFile);
}

let lastActivity = Date.now();
let boundPort = startPort;
let shuttingDown = false;

function corsHeaders(extra = {}) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...extra,
  };
}

function writeEnvFile() {
  const apiUrl = `http://127.0.0.1:${boundPort}/event`;
  fs.writeFileSync(envFile, `DEBUG_SERVER_URL=${apiUrl}\nDEBUG_SESSION_ID=${sessionId}\n`, 'utf8');
}

function appendEvent(payload) {
  const event = {
    ...payload,
    sessionId: payload.sessionId || sessionId,
    ts: payload.ts || Date.now(),
  };
  fs.appendFileSync(logFile, `${JSON.stringify(event)}\n`, 'utf8');
}

function readLogs(lastCount) {
  if (!fs.existsSync(logFile)) return [];
  const lines = fs.readFileSync(logFile, 'utf8').split(/\r?\n/).filter(Boolean);
  if (!lastCount) return lines;
  return lines.slice(-lastCount);
}

function createServer() {
  return http.createServer((req, res) => {
    lastActivity = Date.now();

    if (req.method === 'OPTIONS' && req.url === '/event') {
      res.writeHead(204, corsHeaders());
      res.end();
      return;
    }

    if (req.method === 'POST' && req.url === '/event') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const payload = body ? JSON.parse(body) : {};
          appendEvent(payload);
          res.writeHead(200, corsHeaders({ 'Content-Type': 'application/json' }));
          res.end(JSON.stringify({ ok: true }));
        } catch (error) {
          res.writeHead(400, corsHeaders({ 'Content-Type': 'application/json' }));
          res.end(JSON.stringify({ ok: false, error: error.message }));
        }
      });
      return;
    }

    if (req.method === 'GET' && req.url.startsWith('/health')) {
      const count = fs.existsSync(logFile)
        ? fs.readFileSync(logFile, 'utf8').split(/\r?\n/).filter(Boolean).length
        : 0;
      res.writeHead(200, corsHeaders({ 'Content-Type': 'application/json' }));
      res.end(JSON.stringify({ ok: true, sessionId, logCount: count, uptimeMs: process.uptime() * 1000 }));
      return;
    }

    if (req.method === 'GET' && req.url.startsWith('/logs')) {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const last = Number(url.searchParams.get('last') || '0');
      res.writeHead(200, corsHeaders({ 'Content-Type': 'application/json' }));
      res.end(JSON.stringify({ logs: readLogs(last) }));
      return;
    }

    if (req.method === 'DELETE' && req.url.startsWith('/logs')) {
      if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
      res.writeHead(200, corsHeaders({ 'Content-Type': 'application/json' }));
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    res.writeHead(404, corsHeaders({ 'Content-Type': 'application/json' }));
    res.end(JSON.stringify({ ok: false, error: 'Not found' }));
  });
}

function start(port, retries = 10) {
  const server = createServer();
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && retries > 0) {
      start(port + 1, retries - 1);
      return;
    }
    console.error(error);
    process.exit(1);
  });

  server.listen(port, host, () => {
    boundPort = port;
    writeEnvFile();
    console.log('@@DEBUG_SERVER_INFO');
    console.log(JSON.stringify({
      api_url: `http://127.0.0.1:${boundPort}/event`,
      session_id: sessionId,
      log_dir: outdir,
      log_file: logFile,
      env_file: envFile,
    }, null, 2));
    console.log('@@END_DEBUG_SERVER_INFO');
  });

  if (idleSeconds > 0) {
    setInterval(() => {
      if (!shuttingDown && Date.now() - lastActivity > idleSeconds * 1000) {
        shuttingDown = true;
        server.close(() => process.exit(0));
      }
    }, 5000).unref();
  }
}

start(startPort);
