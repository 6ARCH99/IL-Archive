import 'package:go_router/go_router.dart';

import '../screens/auth_screens.dart';
import '../screens/challenge_screen.dart';
import '../screens/deposit_screens.dart';
import '../screens/extra_screens.dart';
import '../screens/home_screen.dart';
import '../screens/profile_screen.dart';
import '../screens/rewards_screen.dart';

final appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(path: '/', builder: (_, __) => const SplashScreen()),
    GoRoute(path: '/welcome', builder: (_, __) => const WelcomeScreen()),
    GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
    GoRoute(path: '/register', builder: (_, __) => const RegisterScreen()),
    GoRoute(path: '/otp', builder: (_, __) => const OtpScreen()),
    GoRoute(path: '/profile-setup', builder: (_, __) => const ProfileSetupScreen()),
    GoRoute(path: '/onboarding', builder: (_, __) => const OnboardingScreen()),
    GoRoute(path: '/home', builder: (_, __) => const HomeScreen()),
    GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen()),
    GoRoute(
      path: '/deposit',
      builder: (_, state) => DepositScreen(
        initialMode: state.uri.queryParameters['mode'] == 'jemput' ? 0 : 1,
      ),
    ),
    GoRoute(path: '/challenge', builder: (_, __) => const ChallengeScreen()),
    GoRoute(path: '/rewards', builder: (_, __) => const RewardsScreen()),
    GoRoute(path: '/scan-result', builder: (_, __) => const ScanResultScreen()),
    GoRoute(path: '/deposit-drop', redirect: (_, __) => '/deposit?mode=drop'),
    GoRoute(path: '/jemput-slots', redirect: (_, __) => '/deposit?mode=jemput'),
    GoRoute(path: '/jemput-active', builder: (_, __) => const JemputActiveScreen()),
    GoRoute(path: '/jemput-new', builder: (_, __) => const JemputNewScreen()),
    GoRoute(path: '/navigation', builder: (_, __) => const NavigationScreen()),
    GoRoute(path: '/faq', builder: (_, __) => const FaqScreen()),
    GoRoute(path: '/badges', builder: (_, __) => const BadgesScreen()),
    GoRoute(path: '/leaderboard', builder: (_, __) => const LeaderboardScreen()),
  ],
);
