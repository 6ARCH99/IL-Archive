import 'package:daurin/core/api_client.dart';
import 'package:daurin/core/api_config.dart';

/// Help Service
/// 
/// Handles FAQs, live chat, and support tickets
class HelpService {
  final ApiClient _apiClient;

  HelpService(this._apiClient);

  /// Get FAQs
  Future<Map<String, dynamic>> getFaq() async {
    final response = await _apiClient.get(
      '${ApiConfig.helpPrefix}/faq',
    );
    return response;
  }

  /// Search FAQs
  Future<Map<String, dynamic>> searchFaq({
    required String query,
  }) async {
    final response = await _apiClient.get(
      '${ApiConfig.helpPrefix}/faq/search',
      queryParams: {'q': query},
    );
    return response;
  }

  /// Create a live chat session
  Future<Map<String, dynamic>> createLiveChatSession() async {
    final response = await _apiClient.post(
      '${ApiConfig.helpPrefix}/live-chat/session',
      body: {},
    );
    return response;
  }

  /// Submit a support ticket
  Future<Map<String, dynamic>> submitSupportTicket({
    required Map<String, dynamic> data,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.helpPrefix}/support/ticket',
      body: data,
    );
    return response;
  }
}
