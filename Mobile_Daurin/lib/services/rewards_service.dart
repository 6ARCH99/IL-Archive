import 'package:daurin/core/api_client.dart';
import 'package:daurin/core/api_config.dart';

/// Rewards Service
/// 
/// Handles rewards, points, and redemptions
class RewardsService {
  final ApiClient _apiClient;

  RewardsService(this._apiClient);

  /// Get reward balance and progress
  Future<Map<String, dynamic>> getBalance() async {
    final response = await _apiClient.get(
      '${ApiConfig.rewardsPrefix}/balance',
    );
    return response;
  }

  /// Get reward history
  Future<Map<String, dynamic>> getHistory({
    int limit = 20,
    int offset = 0,
  }) async {
    final response = await _apiClient.get(
      '${ApiConfig.rewardsPrefix}/history',
      queryParams: {
        'limit': limit.toString(),
        'offset': offset.toString(),
      },
    );
    return response;
  }

  /// Get e-wallet info
  Future<Map<String, dynamic>> getEWallet() async {
    final response = await _apiClient.get(
      '${ApiConfig.rewardsPrefix}/ewallet',
    );
    return response;
  }

  /// Update e-wallet
  Future<Map<String, dynamic>> updateEWallet({
    required Map<String, dynamic> data,
  }) async {
    final response = await _apiClient.patch(
      '${ApiConfig.rewardsPrefix}/ewallet',
      body: data,
    );
    return response;
  }

  /// Redeem points
  Future<Map<String, dynamic>> redeem({
    required int points,
    required String rewardId,
    Map<String, dynamic>? metadata,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.rewardsPrefix}/redeem',
      body: {
        'points': points,
        'rewardId': rewardId,
        if (metadata != null) 'metadata': metadata,
      },
    );
    return response;
  }
}
