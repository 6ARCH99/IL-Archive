import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:daurin/core/api_client.dart';
import 'package:daurin/services/auth_service.dart';
import 'package:daurin/services/dashboard_service.dart';
import 'package:daurin/services/profile_service.dart';
import 'package:daurin/services/rewards_service.dart';
import 'package:daurin/services/deposits_service.dart';
import 'package:daurin/services/settings_service.dart';
import 'package:daurin/services/help_service.dart';
import 'package:daurin/services/referral_service.dart';

/// Auth Provider
/// 
/// Manages authentication state and operations
class AuthProvider extends ChangeNotifier {
  final AuthService authService;
  
  bool isLoggedIn = false;
  bool isLoading = false;
  String? error;
  Map<String, dynamic>? user;
  String? accessToken;

  AuthProvider(this.authService);

  /// Attempt login
  Future<bool> login({
    required String email,
    required String password,
  }) async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      final response = await authService.login(
        email: email,
        password: password,
      );

      accessToken = response.accessToken;
      user = response.user;
      isLoggedIn = true;
      
      notifyListeners();
      return true;
    } catch (e) {
      error = e.toString();
      isLoggedIn = false;
      notifyListeners();
      return false;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  /// Register new account
  Future<bool> register({
    required String email,
    required String password,
    required String fullName,
    String? referralCode,
  }) async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      await authService.register(
        email: email,
        password: password,
        fullName: fullName,
        referralCode: referralCode,
      );

      notifyListeners();
      return true;
    } catch (e) {
      error = e.toString();
      notifyListeners();
      return false;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  /// Logout
  Future<void> logout() async {
    try {
      await authService.logout();
    } catch (e) {
      error = e.toString();
    } finally {
      isLoggedIn = false;
      user = null;
      accessToken = null;
      notifyListeners();
    }
  }
}

/// Dashboard Provider
/// 
/// Manages dashboard data
class DashboardProvider extends ChangeNotifier {
  final DashboardService dashboardService;

  Map<String, dynamic>? dashboard;
  bool isLoading = false;
  String? error;

  DashboardProvider(this.dashboardService);

  /// Load dashboard data
  Future<void> loadDashboard() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      dashboard = await dashboardService.getDashboard();
      notifyListeners();
    } catch (e) {
      error = e.toString();
      notifyListeners();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  /// Refresh dashboard data
  Future<void> refresh() async {
    await loadDashboard();
  }
}

/// Profile Provider
/// 
/// Manages user profile data
class ProfileProvider extends ChangeNotifier {
  final ProfileService profileService;

  Map<String, dynamic>? profile;
  bool isLoading = false;
  String? error;

  ProfileProvider(this.profileService);

  /// Load user profile
  Future<void> loadProfile() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      profile = await profileService.getProfile();
      notifyListeners();
    } catch (e) {
      error = e.toString();
      notifyListeners();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  /// Update profile
  Future<bool> updateProfile(Map<String, dynamic> data) async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      final updated = await profileService.updateProfile(data: data);
      profile = updated;
      notifyListeners();
      return true;
    } catch (e) {
      error = e.toString();
      notifyListeners();
      return false;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}

/// Rewards Provider
/// 
/// Manages rewards and points
class RewardsProvider extends ChangeNotifier {
  final RewardsService rewardsService;

  Map<String, dynamic>? balance;
  List<dynamic>? history;
  bool isLoading = false;
  String? error;

  RewardsProvider(this.rewardsService);

  /// Load reward balance
  Future<void> loadBalance() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      balance = await rewardsService.getBalance();
      notifyListeners();
    } catch (e) {
      error = e.toString();
      notifyListeners();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  /// Load reward history
  Future<void> loadHistory() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      final response = await rewardsService.getHistory();
      history = response['data'] ?? [];
      notifyListeners();
    } catch (e) {
      error = e.toString();
      notifyListeners();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  /// Redeem points
  Future<bool> redeem({
    required int points,
    required String rewardId,
  }) async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      await rewardsService.redeem(
        points: points,
        rewardId: rewardId,
      );

      // Refresh balance after redeeming
      await loadBalance();
      await loadHistory();

      notifyListeners();
      return true;
    } catch (e) {
      error = e.toString();
      notifyListeners();
      return false;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}

/// Settings Provider
class SettingsProvider extends ChangeNotifier {
  final SettingsService settingsService;

  Map<String, dynamic>? accountStatus;
  Map<String, dynamic>? preferences;
  bool isLoading = false;
  String? error;

  SettingsProvider(this.settingsService);

  Future<void> loadPreferences() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      preferences = await settingsService.getPreferences();
      notifyListeners();
    } catch (e) {
      error = e.toString();
      notifyListeners();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadAccountStatus() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      accountStatus = await settingsService.getAccountStatus();
      notifyListeners();
    } catch (e) {
      error = e.toString();
      notifyListeners();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}

/// Help Provider
class HelpProvider extends ChangeNotifier {
  final HelpService helpService;

  Map<String, dynamic>? faqData;
  bool isLoading = false;
  String? error;

  HelpProvider(this.helpService);

  Future<void> loadFaq() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      faqData = await helpService.getFaq();
      notifyListeners();
    } catch (e) {
      error = e.toString();
      notifyListeners();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}

/// Referral Provider
class ReferralProvider extends ChangeNotifier {
  final ReferralService referralService;

  Map<String, dynamic>? referralCodeData;
  Map<String, dynamic>? referralStatsData;
  bool isLoading = false;
  String? error;

  ReferralProvider(this.referralService);

  Future<void> loadReferralData() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      referralCodeData = await referralService.getReferralCode();
      referralStatsData = await referralService.getReferralStats();
      notifyListeners();
    } catch (e) {
      error = e.toString();
      notifyListeners();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}

/// Service Locator
/// 
/// Creates and provides all services
class ServiceLocator {
  static final ApiClient _apiClient = ApiClient();

  static ApiClient get apiClient => _apiClient;

  static AuthService get authService => AuthService(_apiClient);
  static DashboardService get dashboardService => DashboardService(_apiClient);
  static ProfileService get profileService => ProfileService(_apiClient);
  static RewardsService get rewardsService => RewardsService(_apiClient);
  static DepositsService get depositsService => DepositsService(_apiClient);
  static PickupsService get pickupsService => PickupsService(_apiClient);
  static SettingsService get settingsService => SettingsService(_apiClient);
  static HelpService get helpService => HelpService(_apiClient);
  static ReferralService get referralService => ReferralService(_apiClient);
}

/// Provider setup for your app
/// 
/// Add this to your main() function:
/// 
/// ```dart
/// MultiProvider(
///   providers: [
///     ChangeNotifierProvider(create: (_) => AuthProvider(ServiceLocator.authService)),
///     ChangeNotifierProvider(create: (_) => DashboardProvider(ServiceLocator.dashboardService)),
///     ChangeNotifierProvider(create: (_) => ProfileProvider(ServiceLocator.profileService)),
///     ChangeNotifierProvider(create: (_) => RewardsProvider(ServiceLocator.rewardsService)),
///   ],
///   child: const DaurinApp(),
/// )
/// ```
