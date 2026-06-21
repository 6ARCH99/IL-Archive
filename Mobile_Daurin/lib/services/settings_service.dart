import 'package:daurin/core/api_client.dart';
import 'package:daurin/core/api_config.dart';

/// Settings Service
/// 
/// Handles account status, preferences, and password updates
class SettingsService {
  final ApiClient _apiClient;

  SettingsService(this._apiClient);

  /// Get account status
  Future<Map<String, dynamic>> getAccountStatus() async {
    final response = await _apiClient.get(
      '${ApiConfig.settingsPrefix}/account-status',
    );
    return response;
  }

  /// Get user preferences
  Future<Map<String, dynamic>> getPreferences() async {
    final response = await _apiClient.get(
      '${ApiConfig.settingsPrefix}/preferences',
    );
    return response;
  }

  /// Update user preferences
  Future<Map<String, dynamic>> updatePreferences({
    required Map<String, dynamic> data,
  }) async {
    final response = await _apiClient.patch(
      '${ApiConfig.settingsPrefix}/preferences',
      body: data,
    );
    return response;
  }

  /// Change password
  Future<Map<String, dynamic>> updatePassword({
    required String oldPassword,
    required String newPassword,
  }) async {
    final response = await _apiClient.patch(
      '${ApiConfig.settingsPrefix}/password',
      body: {
        'oldPassword': oldPassword,
        'newPassword': newPassword,
      },
    );
    return response;
  }
}
