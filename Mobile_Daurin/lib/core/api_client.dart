import 'package:http/http.dart' as http;
import 'dart:convert';
import 'api_config.dart';

/// HTTP Client for Suarabumi Backend
/// 
/// Handles:
/// - Request/Response serialization
/// - Authentication headers
/// - Error handling
/// - Token management
class ApiClient {
  final http.Client _httpClient;
  String? _accessToken;
  String? _refreshToken;

  ApiClient({http.Client? httpClient}) 
    : _httpClient = httpClient ?? http.Client();

  /// Set authentication tokens (usually after login)
  void setTokens(String accessToken, String? refreshToken) {
    _accessToken = accessToken;
    _refreshToken = refreshToken;
  }

  /// Clear authentication tokens (usually on logout)
  void clearTokens() {
    _accessToken = null;
    _refreshToken = null;
  }

  /// Build request headers with auth if available
  Map<String, String> _buildHeaders({Map<String, String>? additionalHeaders}) {
    final headers = Map<String, String>.from(ApiConfig.defaultHeaders);
    
    if (_accessToken != null) {
      headers['Authorization'] = 'Bearer $_accessToken';
    }
    
    if (additionalHeaders != null) {
      headers.addAll(additionalHeaders);
    }
    
    return headers;
  }

  /// GET request
  Future<dynamic> get(
    String endpoint, {
    Map<String, String>? headers,
    Map<String, String>? queryParams,
  }) async {
    try {
      final uri = Uri.parse('${ApiConfig.baseUrl}$endpoint')
          .replace(queryParameters: queryParams);
      
      final response = await _httpClient.get(
        uri,
        headers: _buildHeaders(additionalHeaders: headers),
      );

      return _handleResponse(response);
    } catch (e) {
      throw ApiException('GET request failed: $e');
    }
  }

  /// POST request
  Future<dynamic> post(
    String endpoint, {
    required dynamic body,
    Map<String, String>? headers,
  }) async {
    try {
      final uri = Uri.parse('${ApiConfig.baseUrl}$endpoint');
      
      final response = await _httpClient.post(
        uri,
        headers: _buildHeaders(additionalHeaders: headers),
        body: jsonEncode(body),
      );

      return _handleResponse(response);
    } catch (e) {
      throw ApiException('POST request failed: $e');
    }
  }

  /// PATCH request
  Future<dynamic> patch(
    String endpoint, {
    required dynamic body,
    Map<String, String>? headers,
  }) async {
    try {
      final uri = Uri.parse('${ApiConfig.baseUrl}$endpoint');
      
      final response = await _httpClient.patch(
        uri,
        headers: _buildHeaders(additionalHeaders: headers),
        body: jsonEncode(body),
      );

      return _handleResponse(response);
    } catch (e) {
      throw ApiException('PATCH request failed: $e');
    }
  }

  /// DELETE request
  Future<dynamic> delete(
    String endpoint, {
    Map<String, String>? headers,
  }) async {
    try {
      final uri = Uri.parse('${ApiConfig.baseUrl}$endpoint');
      
      final response = await _httpClient.delete(
        uri,
        headers: _buildHeaders(additionalHeaders: headers),
      );

      return _handleResponse(response);
    } catch (e) {
      throw ApiException('DELETE request failed: $e');
    }
  }

  /// Handle API response
  dynamic _handleResponse(http.Response response) {
    // Try to decode JSON
    dynamic jsonData;
    try {
      jsonData = jsonDecode(response.body);
    } catch (e) {
      // If not JSON, return raw body
      jsonData = response.body;
    }

    // Check status code
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return jsonData;
    } else if (response.statusCode == 401) {
      // Unauthorized - may need to refresh token
      clearTokens();
      throw UnauthorizedException('Unauthorized: ${jsonData['message'] ?? 'Invalid credentials'}');
    } else if (response.statusCode == 403) {
      throw ForbiddenException('Forbidden: ${jsonData['message'] ?? 'Access denied'}');
    } else if (response.statusCode == 404) {
      throw NotFoundException('Not found: ${jsonData['message'] ?? 'Resource not found'}');
    } else if (response.statusCode == 422) {
      throw ValidationException('Validation error: ${jsonData['message'] ?? 'Invalid data'}', jsonData);
    } else if (response.statusCode >= 500) {
      throw ServerException('Server error: ${jsonData['message'] ?? 'Internal server error'}');
    } else {
      throw ApiException('API error (${response.statusCode}): ${jsonData['message'] ?? jsonData}');
    }
  }

  /// Check backend health
  Future<bool> checkHealth() async {
    try {
      await get(ApiConfig.health);
      return true;
    } catch (e) {
      return false;
    }
  }
}

/// Custom exceptions
class ApiException implements Exception {
  final String message;
  ApiException(this.message);
  
  @override
  String toString() => message;
}

class UnauthorizedException extends ApiException {
  UnauthorizedException(String message) : super(message);
}

class ForbiddenException extends ApiException {
  ForbiddenException(String message) : super(message);
}

class NotFoundException extends ApiException {
  NotFoundException(String message) : super(message);
}

class ValidationException extends ApiException {
  final dynamic details;
  ValidationException(String message, this.details) : super(message);
}

class ServerException extends ApiException {
  ServerException(String message) : super(message);
}
