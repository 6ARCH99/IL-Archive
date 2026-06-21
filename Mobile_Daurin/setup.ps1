#!/usr/bin/env pwsh

# Daurin Backend + Frontend Setup Script

$RootDir = Get-Location

Write-Host "🚀 Daurin Backend Integration Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
  exit 1
}

Write-Host "✅ Node.js is installed" -ForegroundColor Green
Write-Host "   Version: $(node --version)`n"

# Backend Setup
Write-Host "📦 Setting up Backend..." -ForegroundColor Yellow
$BackendDir = Join-Path $RootDir "backend"
Push-Location $BackendDir

if (-not (Test-Path node_modules)) {
  Write-Host "   Installing dependencies..."
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend npm install failed" -ForegroundColor Red
    Pop-Location
    exit 1
  }
}

# Check if .env exists
if (-not (Test-Path .env)) {
  Write-Host "   Creating .env from .env.example..."
  if (Test-Path .env.example) {
    Copy-Item .env.example .env
  }
}

Write-Host "✅ Backend ready`n" -ForegroundColor Green
Pop-Location

# Frontend Setup
Write-Host "📱 Setting up Frontend (daurin-app)..." -ForegroundColor Yellow
$FrontendDir = Join-Path $RootDir "daurin-app"
Push-Location $FrontendDir

if (-not (Test-Path node_modules)) {
  Write-Host "   Installing dependencies..."
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend npm install failed" -ForegroundColor Red
    Pop-Location
    exit 1
  }
}

# Check if .env exists
if (-not (Test-Path .env)) {
  Write-Host "   Creating .env..."
  @"
REACT_APP_API_URL=http://127.0.0.1:3001
REACT_APP_ENV=development
"@ | Out-File -Encoding UTF8 .env
}

Write-Host "✅ Frontend ready`n" -ForegroundColor Green
Pop-Location

Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host "`nNext steps:`n"
Write-Host "  1. Start the Backend:" -ForegroundColor Cyan
Write-Host "     cd backend && npm run dev`n"
Write-Host "  2. Start the Frontend (new terminal):" -ForegroundColor Cyan
Write-Host "     cd daurin-app && npm start`n"
Write-Host "  3. Access the app:" -ForegroundColor Cyan
Write-Host "     Frontend: http://127.0.0.1:19006 (expo web)" -ForegroundColor Gray
Write-Host "     Backend:  http://127.0.0.1:3001 (API)" -ForegroundColor Gray
