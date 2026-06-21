import 'package:daurin/core/api_client.dart';
import 'package:daurin/core/api_config.dart';

/// Profile Service
/// 
/// Handles user profile operations
class ProfileService {
  final ApiClient _apiClient;

  ProfileService(this._apiClient);

  /// Get user profile
  Future<Map<String, dynamic>> getProfile() async {
    final response = await _apiClient.get(
      '${ApiConfig.profilePrefix}/',
    );
    return response;
  }

  /// Update user profile
  Future<Map<String, dynamic>> updateProfile({
    required Map<String, dynamic> data,
  }) async {
    final response = await _apiClient.patch(
      '${ApiConfig.profilePrefix}/',
      body: data,
    );
    return response;
  }

  /// Upload profile picture
  Future<Map<String, dynamic>> uploadProfilePicture(List<int> imageBytes) async {
    // Note: This is a simplified example. For file uploads, you may need
    // to use multipart requests which requires additional setup
    final response = await _apiClient.post(
      '${ApiConfig.profilePrefix}/picture',
      body: {'image': imageBytes},
    );
    return response;
  }
}
