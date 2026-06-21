# Backend Integration Guide

This document explains how to connect the Mobile Daurin app to the Suarabumi Backend.

## Prerequisites

- Suarabumi backend running on your machine or accessible via network
- Flutter SDK installed
- The following packages are already added to `pubspec.yaml`:
  - `http` - HTTP client
  - `provider` - State management
  - `flutter_dotenv` - Environment variables

## Setup Steps

### 1. Install Dependencies

```bash
cd E:\Projects\Mobile Daurin
flutter pub get
```

### 2. Configure Backend URL

#### Option A: Local Development (Backend on Same Machine)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. The default configuration should work if backend is running on `http://127.0.0.1:3001`

#### Option B: Network Access (Backend on Different Machine)

1. Copy `.env.example` to `.env`

2. Find the IP address of the machine running the backend:
   ```bash
   ipconfig
   # Look for "IPv4 Address" under your network adapter
   # Example: 192.168.1.100
   ```

3. Update `.env`:
   ```env
   API_BASE_URL=http://YOUR_BACKEND_IP:3001
   # Example: API_BASE_URL=http://192.168.1.100:3001
   ```

### 3. Initialize API Client in main.dart

Update `lib/main.dart` to initialize the API client:

```dart
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'core/api_client.dart';
import 'services/auth_service.dart';
import 'services/dashboard_service.dart';
import 'services/profile_service.dart';
import 'services/rewards_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Load environment variables
  await dotenv.load(fileName: ".env");
  
  // Initialize API client
  final apiClient = ApiClient();
  
  // Check backend health
  final isHealthy = await apiClient.checkHealth();
  if (!isHealthy) {
    print('Warning: Backend is not responding at ${ApiConfig.baseUrl}');
  }
  
  // Initialize services
  final authService = AuthService(apiClient);
  final dashboardService = DashboardService(apiClient);
  final profileService = ProfileService(apiClient);
  final rewardsService = RewardsService(apiClient);
  
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
    ),
  );
  runApp(const DaurinApp());
}
```

### 4. Using the Services in Your Screens

#### Login Example

```dart
import 'package:daurin/services/auth_service.dart';

// In your login screen
try {
  final loginResponse = await authService.login(
    email: 'putra.wijaya@email.com',
    password: 'password123',
  );
  
  print('Login successful!');
  print('User: ${loginResponse.user['name']}');
  
  // Navigate to home screen
  if (context.mounted) {
    context.go('/home');
  }
} catch (e) {
  print('Login failed: $e');
  // Show error message to user
}
```

#### Get Dashboard Data

```dart
import 'package:daurin/services/dashboard_service.dart';

try {
  final dashboard = await dashboardService.getDashboard();
  
  // Update UI with data
  setState(() {
    points = dashboard['points'];
    co2Saved = dashboard['co2Saved'];
  });
} catch (e) {
  print('Failed to load dashboard: $e');
}
```

#### Get User Profile

```dart
import 'package:daurin/services/profile_service.dart';

try {
  final profile = await profileService.getProfile();
  
  setState(() {
    userName = profile['fullName'];
    email = profile['email'];
  });
} catch (e) {
  print('Failed to load profile: $e');
}
```

#### Get Rewards

```dart
import 'package:daurin/services/rewards_service.dart';

try {
  final balance = await rewardsService.getBalance();
  final history = await rewardsService.getHistory();
  
  setState(() {
    totalPoints = balance['totalPoints'];
    rewardHistory = history['data'];
  });
} catch (e) {
  print('Failed to load rewards: $e');
}
```

## API Endpoints

The backend provides the following main endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/otp/send` - Send OTP
- `POST /api/auth/otp/verify` - Verify OTP
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

### User
- `GET /api/profile/` - Get user profile
- `PATCH /api/profile/` - Update profile
- `GET /api/dashboard/` - Get dashboard data
- `GET /api/settings/preferences` - Get preferences
- `PATCH /api/settings/preferences` - Update preferences

### Content
- `GET /api/climate-impact/` - Climate impact stats
- `GET /api/leaderboard/` - Leaderboard
- `GET /api/badges/` - User badges
- `GET /api/challenges/overview` - Active challenges

### Rewards & Points
- `GET /api/rewards/balance` - Current points balance
- `GET /api/rewards/history` - Points history
- `GET /api/rewards/ewallet` - E-wallet info
- `PATCH /api/rewards/ewallet` - Update e-wallet
- `POST /api/rewards/redeem` - Redeem points

### Deposits & Pickups
- `POST /api/deposits/` - Create new deposit
- `GET /api/deposits/history` - Deposit history
- `GET /api/drop-points/` - List drop points
- `GET /api/pickups/` - Active pickups
- `POST /api/pickups/` - Schedule pickup

### Other
- `GET /api/referral/code` - Get referral code
- `GET /api/referral/stats` - Referral stats
- `GET /api/help/faq` - FAQ list
- `POST /api/help/support/ticket` - Submit support ticket

For detailed API documentation, see `backend/API.md`

## Error Handling

The API client provides custom exceptions for different error scenarios:

```dart
import 'package:daurin/core/api_client.dart';

try {
  // API call
} on UnauthorizedException catch (e) {
  // Handle 401 - Invalid credentials or expired token
  print('Unauthorized: $e');
} on ForbiddenException catch (e) {
  // Handle 403 - Access denied
  print('Forbidden: $e');
} on NotFoundException catch (e) {
  // Handle 404 - Resource not found
  print('Not found: $e');
} on ValidationException catch (e) {
  // Handle 422 - Validation error
  print('Validation error: $e');
  print('Details: ${e.details}');
} on ServerException catch (e) {
  // Handle 500+ - Server error
  print('Server error: $e');
} on ApiException catch (e) {
  // Handle other API errors
  print('API error: $e');
}
```

## Testing Backend Connection

To verify the connection is working:

```dart
import 'package:daurin/core/api_client.dart';

final apiClient = ApiClient();
final isHealthy = await apiClient.checkHealth();

if (isHealthy) {
  print('✅ Backend is running and responding');
} else {
  print('❌ Backend is not responding. Check:');
  print('   1. Backend is running on port 3001');
  print('   2. API_BASE_URL in .env is correct');
  print('   3. Network connectivity to backend');
}
```

## Troubleshooting

### "Connection refused"
- Make sure Suarabumi backend is running: `npm run dev` in the backend directory
- Check port 3001 is accessible

### "Backend is not responding"
- Verify the IP address in `.env` is correct
- Check firewall settings allow access to port 3001
- Ensure backend and mobile app are on the same network

### Unauthorized errors
- Make sure you have a valid access token after login
- Token may have expired - use refresh token to get new one

### CORS errors
- Backend already has CORS enabled for all origins
- If still having issues, check browser/app security settings

## Example Demo Login

Use these credentials for testing:

```
Email: putra.wijaya@email.com
Password: password123
```

These credentials are seeded in the backend database when you run `npm run db:seed`.

## Next Steps

1. Implement state management (Provider) for authentication
2. Create screens that consume the API services
3. Add token refresh logic
4. Implement proper error handling and user feedback
5. Add loading states and caching
