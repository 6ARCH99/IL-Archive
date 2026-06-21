/// API Configuration for Suarabumi Backend
/// 
/// Base URL can be configured via environment variables (.env file)
/// or can be overridden programmatically
class ApiConfig {
  static const String _defaultBaseUrl = 'http://127.0.0.1:3001';
  static String? _baseUrlOverride;

  /// Get the API base URL
  /// 
  /// Priority order:
  /// 1. Runtime override (_baseUrlOverride)
  /// 2. Environment variable (API_BASE_URL from .env)
  /// 3. Default localhost URL
  static String get baseUrl {
    if (_baseUrlOverride != null) return _baseUrlOverride!;
    // TODO: Read from dotenv after flutter_dotenv initialization
    return _defaultBaseUrl;
  }

  /// Override the base URL at runtime
  /// Useful for switching between dev/production
  static void setBaseUrl(String url) {
    _baseUrlOverride = url;
  }

  // API Endpoints
  static const String authPrefix = '/api/auth';
  static const String profilePrefix = '/api/profile';
  static const String dashboardPrefix = '/api/dashboard';
  static const String depositsPrefix = '/api/deposits';
  static const String dropPointsPrefix = '/api/drop-points';
  static const String pickupsPrefix = '/api/pickups';
  static const String rewardsPrefix = '/api/rewards';
  static const String referralPrefix = '/api/referral';
  static const String settingsPrefix = '/api/settings';
  static const String badgesPrefix = '/api/badges';
  static const String challengesPrefix = '/api/challenges';
  static const String leaderboardPrefix = '/api/leaderboard';
  static const String climateImpactPrefix = '/api/climate-impact';
  static const String helpPrefix = '/api/help';

  // Common endpoints
  static const String health = '/health';

  // Headers
  static const Map<String, String> defaultHeaders = {
    'Content-Type': 'application/json',
  };
}
