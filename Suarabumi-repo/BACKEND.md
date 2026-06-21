# Suarabumi — Express.js Backend

The team repo now includes an **Express.js** API in the `backend/` folder, wired to the React (Vite) frontend.

## Run everything (recommended)

```powershell
cd E:\Projects\Suarabumi-repo
npm install
npm run setup:backend
npm run dev:all
```

| Service | URL |
|---------|-----|
| Frontend (Vite) | http://localhost:5173 |
| Express API | http://localhost:3001 |

Vite proxies `/api`, `/uploads`, and `/health` to the backend automatically.

## Run separately

**Terminal 1 — API:**
```powershell
cd E:\Projects\Suarabumi-repo\backend
npm install
npm run db:setup
npm run dev
```

**Terminal 2 — Frontend:**
```powershell
cd E:\Projects\Suarabumi-repo
npm install
npm run dev
```

## Demo login

- Email: `putra.wijaya@email.com`
- Password: `password123`

## API modules (from sprint board)

- **Profil User** — `/api/profile`
- **Dashboard / Home** — `/api/dashboard`
- **Climate Impact** — `/api/climate-impact`
- **Auth** — `/api/auth/login`, `/api/auth/register`

Frontend pages connected: Login, Home, Profile, Impact.
