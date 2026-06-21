import 'package:daurin/core/api_client.dart';
import 'package:daurin/core/api_config.dart';

/// Dashboard Service
/// 
/// Handles dashboard and statistics
class DashboardService {
  final ApiClient _apiClient;

  DashboardService(this._apiClient);

  /// Get dashboard data
  Future<Map<String, dynamic>> getDashboard() async {
    final response = await _apiClient.get(
      '${ApiConfig.dashboardPrefix}/',
    );
    return response;
  }

  /// Get climate impact data
  Future<Map<String, dynamic>> getClimateImpact() async {
    final response = await _apiClient.get(
      '${ApiConfig.climateImpactPrefix}/',
    );
    return response;
  }

  /// Get leaderboard
  Future<Map<String, dynamic>> getLeaderboard({
    int limit = 10,
    int offset = 0,
  }) async {
    final response = await _apiClient.get(
      '${ApiConfig.leaderboardPrefix}/',
      queryParams: {
        'limit': limit.toString(),
        'offset': offset.toString(),
      },
    );
    return response;
  }

  /// Get badges
  Future<Map<String, dynamic>> getBadges() async {
    final response = await _apiClient.get(
      '${ApiConfig.badgesPrefix}/',
    );
    return response;
  }

  /// Get challenges
  Future<Map<String, dynamic>> getChallenges() async {
    final response = await _apiClient.get(
      '${ApiConfig.challengesPrefix}/overview',
    );
    return response;
  }
}
