import 'package:daurin/core/api_client.dart';
import 'package:daurin/core/api_config.dart';

/// Referral Service
/// 
/// Handles referral codes, validation, and stats
class ReferralService {
  final ApiClient _apiClient;

  ReferralService(this._apiClient);

  /// Get user referral code
  Future<Map<String, dynamic>> getReferralCode() async {
    final response = await _apiClient.get(
      '${ApiConfig.referralPrefix}/code',
    );
    return response;
  }

  /// Get referral statistics
  Future<Map<String, dynamic>> getReferralStats() async {
    final response = await _apiClient.get(
      '${ApiConfig.referralPrefix}/stats',
    );
    return response;
  }

  /// Validate a referral code
  Future<Map<String, dynamic>> validateReferralCode({
    required String code,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.referralPrefix}/validate',
      body: {'code': code},
    );
    return response;
  }
}
