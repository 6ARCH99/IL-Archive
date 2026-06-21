# Backend Integration Setup Checklist

This checklist helps you complete the backend integration for Mobile Daurin.

## ✅ Files Created

- [x] `lib/core/api_config.dart` - API configuration and endpoints
- [x] `lib/core/api_client.dart` - HTTP client for making API requests
- [x] `lib/services/auth_service.dart` - Authentication service
- [x] `lib/services/profile_service.dart` - User profile service
- [x] `lib/services/dashboard_service.dart` - Dashboard and stats service
- [x] `lib/services/rewards_service.dart` - Rewards and points service
- [x] `lib/services/deposits_service.dart` - Deposits and pickups service
- [x] `lib/providers/app_providers.dart` - State management with Provider
- [x] `.env.example` - Environment configuration template
- [x] `BACKEND_INTEGRATION.md` - Integration guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
flutter pub get
```

### 2. Configure Backend URL
```bash
cp .env.example .env
# Edit .env and set API_BASE_URL if using different IP
```

### 3. Update main.dart

Replace your current main.dart with this setup:

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import 'core/api_client.dart';
import 'core/app_theme.dart';
import 'providers/app_providers.dart';
import 'router/app_router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Load environment variables
  await dotenv.load(fileName: ".env");
  
  // Check backend health
  final isHealthy = await ServiceLocator.apiClient.checkHealth();
  if (!isHealthy) {
    print('⚠️  Warning: Backend is not responding');
  } else {
    print('✅ Backend is running');
  }
  
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
    ),
  );
  
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => AuthProvider(ServiceLocator.authService),
        ),
        ChangeNotifierProvider(
          create: (_) => DashboardProvider(ServiceLocator.dashboardService),
        ),
        ChangeNotifierProvider(
          create: (_) => ProfileProvider(ServiceLocator.profileService),
        ),
        ChangeNotifierProvider(
          create: (_) => RewardsProvider(ServiceLocator.rewardsService),
        ),
      ],
      child: const DaurinApp(),
    ),
  );
}

class DaurinApp extends StatelessWidget {
  const DaurinApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'DAURIN',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      routerConfig: appRouter,
    );
  }
}
```

### 4. Add .gitignore Entry

Add `.env` to your `.gitignore` to prevent committing sensitive configuration:

```
.env
```

## 📱 Example Usage in Screens

### Login Screen
```dart
class LoginScreen extends StatefulWidget {
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, auth, child) {
        return Scaffold(
          body: SingleChildScrollView(
            child: Column(
              children: [
                TextField(
                  controller: emailController,
                  decoration: InputDecoration(labelText: 'Email'),
                ),
                TextField(
                  controller: passwordController,
                  decoration: InputDecoration(labelText: 'Password'),
                  obscureText: true,
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: auth.isLoading
                      ? null
                      : () async {
                          final success = await auth.login(
                            email: emailController.text,
                            password: passwordController.text,
                          );

                          if (success && context.mounted) {
                            context.go('/home');
                          } else if (!success && context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text(auth.error ?? 'Login failed')),
                            );
                          }
                        },
                  child: auth.isLoading ? CircularProgressIndicator() : Text('Login'),
                ),
                if (auth.error != null)
                  Padding(
                    padding: EdgeInsets.only(top: 16),
                    child: Text(
                      auth.error!,
                      style: TextStyle(color: Colors.red),
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}
```

### Home Screen with Real Data
```dart
class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    // Load data when screen initializes
    Future.microtask(() {
      context.read<DashboardProvider>().loadDashboard();
      context.read<RewardsProvider>().loadBalance();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer2<DashboardProvider, RewardsProvider>(
      builder: (context, dashboard, rewards, _) {
        if (dashboard.isLoading || rewards.isLoading) {
          return Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        final points = rewards.balance?['totalPoints'] ?? 0;
        final co2Saved = dashboard.dashboard?['co2Saved'] ?? 0;

        return Scaffold(
          body: Column(
            children: [
              // Your UI with real data
              Text('Points: $points'),
              Text('CO2 Saved: $co2Saved kg'),
            ],
          ),
        );
      },
    );
  }
}
```

## 🧪 Testing

### Test Backend Connection
```dart
final apiClient = ServiceLocator.apiClient;
final isHealthy = await apiClient.checkHealth();
print(isHealthy ? 'Backend OK' : 'Backend Error');
```

### Test Login (demo credentials)
```
Email: putra.wijaya@email.com
Password: password123
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Ensure backend is running on port 3001 |
| Backend not responding | Check API_BASE_URL in .env |
| Unauthorized errors | Make sure you're logged in first |
| CORS errors | Backend already has CORS enabled |
| Network errors | Check firewall and network connectivity |

## 📚 Resources

- [Full Backend Integration Guide](./BACKEND_INTEGRATION.md)
- [Backend API Reference](../backend/API.md)
- [Flutter Provider Documentation](https://pub.dev/packages/provider)
- [Dart HTTP Package](https://pub.dev/packages/http)

## Next Steps

1. ✅ Update main.dart with Provider setup
2. ✅ Copy .env.example to .env
3. ✅ Update login/register screens to use AuthProvider
4. ✅ Replace hardcoded data with real API calls
5. ✅ Add proper error handling and loading states
6. ✅ Test all API endpoints
7. ✅ Implement token refresh logic
8. ✅ Add offline support (optional)

---

**Notes:**
- Keep `.env` out of version control
- Always handle loading and error states in UI
- Test on actual device or emulator with real backend
- Consider implementing caching for better performance
