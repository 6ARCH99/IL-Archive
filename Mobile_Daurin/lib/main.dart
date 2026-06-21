import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import 'core/app_theme.dart';
import 'providers/app_providers.dart';
import 'router/app_router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Load environment variables
  try {
    await dotenv.load(fileName: ".env");
  } catch (e) {
    print('⚠️  Warning: .env file not found or could not be loaded');
  }

  // Check backend health
  try {
    final isHealthy = await ServiceLocator.apiClient.checkHealth();
    if (!isHealthy) {
      print('⚠️  Warning: Backend is not responding');
    } else {
      print('✅ Backend is running');
    }
  } catch (e) {
    print('⚠️  Error checking backend health: $e');
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
        ChangeNotifierProvider(
          create: (_) => SettingsProvider(ServiceLocator.settingsService),
        ),
        ChangeNotifierProvider(
          create: (_) => HelpProvider(ServiceLocator.helpService),
        ),
        ChangeNotifierProvider(
          create: (_) => ReferralProvider(ServiceLocator.referralService),
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
