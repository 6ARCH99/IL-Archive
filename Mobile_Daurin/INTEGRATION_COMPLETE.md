# Backend Integration Complete ✅

## What's Been Set Up

### 1. **Backend Service** (Express.js)
- **Location**: `/backend`
- **Port**: 3001
- **Database**: MySQL (Docker or local)
- **Routes**: 15 feature modules (auth, profile, dashboard, challenges, rewards, etc.)

### 2. **Frontend API Integration** (React/Expo Web)
- **Location**: `/daurin-app`
- **API Client**: `services/api.ts` - Generic HTTP client with fetch
- **Auth Service**: `services/auth.ts` - Pre-configured auth methods
- **Config**: `config/api.ts` - Centralized API endpoints

### 3. **Environment Configuration**
- Backend: `/backend/.env` - Database, JWT, port settings
- Frontend: `/daurin-app/.env` - API URL configuration

---

## Quick Start

### Option 1: PowerShell (Windows)
```powershell
cd e:\Projects - Copy\Mobile_Daurin
.\setup.ps1
```

### Option 2: Bash (Mac/Linux)
```bash
cd "E:\Projects - Copy\Mobile_Daurin"
chmod +x setup.sh
./setup.sh
```

### Manual Setup
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run db:up      # Docker only
npm run db:setup
npm run dev

# Terminal 2 - Frontend
cd daurin-app
npm install
npm start
```

---

## API Integration Quick Reference

### Using the Auth Service
```typescript
import { authService, apiClient } from './services/auth';

// Login
const result = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Set token for subsequent requests
apiClient.setToken(result.accessToken);

// Get user settings
const prefs = await settingsService.getPreferences();
```

### Available Services

**Authentication**
- `authService.login()`
- `authService.register()`
- `authService.logout()`
- `authService.sendOTP()`
- `authService.verifyOTP()`
- `authService.googleOAuth()`
- `authService.facebookOAuth()`

**Settings**
- `settingsService.getAccountStatus()`
- `settingsService.getPreferences()`
- `settingsService.updatePreferences()`
- `settingsService.changePassword()`

**Additional Routes** (via direct API calls)
- `/api/profile` - User profile management
- `/api/dashboard` - Dashboard data
- `/api/challenges` - Challenges & quests
- `/api/leaderboard` - Leaderboard data
- `/api/badges` - Badge system
- `/api/deposits` - Deposit history
- `/api/pickups` - Pickup requests
- `/api/rewards` - Reward system
- `/api/dropPoints` - Drop point locations
- `/api/referral` - Referral program
- `/api/climate-impact` - Climate impact metrics

---

## File Structure

```
e:\Projects - Copy\Mobile_Daurin\
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── routes/            # 15 API route modules
│   │   ├── middleware/        # Auth, error handling
│   │   ├── lib/               # Utilities
│   │   └── utils/
│   ├── prisma/                # Database schema
│   ├── .env                   # Backend configuration
│   └── package.json
│
├── daurin-app/                # React/Expo Web App
│   ├── config/
│   │   └── api.ts            # API endpoints configuration
│   ├── services/
│   │   ├── api.ts            # HTTP client
│   │   └── auth.ts           # Auth service
│   ├── .env                  # Frontend configuration
│   └── package.json
│
├── setup.ps1                 # Windows setup script
└── setup.sh                  # Mac/Linux setup script
```

---

## Environment Variables

### Backend (backend/.env)
```env
DATABASE_URL="mysql://suarabumi:suarabumi_dev@127.0.0.1:3306/suarabumi"
JWT_SECRET="your-secret-key"
PORT=3001
UPLOAD_DIR="./uploads"
```

### Frontend (daurin-app/.env)
```env
REACT_APP_API_URL=http://127.0.0.1:3001
REACT_APP_ENV=development
```

---

## Troubleshooting

### Backend won't start
```bash
# Check MySQL is running
docker ps

# Restart containers
cd backend
npm run db:down
npm run db:up
npm run db:setup
```

### CORS errors
- Backend has CORS enabled
- Verify `REACT_APP_API_URL` matches backend port

### Port already in use
- Backend: Change `PORT` in `.env`
- Frontend: Expo will prompt for alternative port

---

## Next Steps

1. **Update Login/Register Pages** - Use `authService` methods
2. **Add Token Persistence** - Store tokens in localStorage/AsyncStorage
3. **Implement Protected Routes** - Check token before rendering protected pages
4. **Add Error Handling** - Wrap service calls in try/catch
5. **Create Loading States** - Show spinners during API calls
6. **Implement Token Refresh** - Auto-refresh expired tokens

---

## Documentation

- **Backend API Docs**: `/backend/API.md`
- **Backend README**: `/backend/README.md`
- **This Guide**: `/BACKEND_INTEGRATION.md`

For more details, see the respective documentation files.
