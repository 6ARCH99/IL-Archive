import 'package:daurin/core/api_client.dart';
import 'package:daurin/core/api_config.dart';

/// Authentication Service
/// 
/// Handles login, registration, OTP verification, etc.
class AuthService {
  final ApiClient _apiClient;

  AuthService(this._apiClient);

  /// Register a new user
  Future<Map<String, dynamic>> register({
    required String email,
    required String password,
    required String fullName,
    String? referralCode,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/register',
      body: {
        'email': email,
        'password': password,
        'fullName': fullName,
        if (referralCode != null) 'referralCode': referralCode,
      },
    );
    return response;
  }

  /// Login with email and password
  Future<LoginResponse> login({
    required String email,
    required String password,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/login',
      body: {
        'email': email,
        'password': password,
      },
    );

    final loginResponse = LoginResponse.fromJson(response);
    
    // Store tokens in client
    _apiClient.setTokens(
      loginResponse.accessToken,
      loginResponse.refreshToken,
    );

    return loginResponse;
  }

  /// Send OTP for verification
  Future<Map<String, dynamic>> sendOtp({
    required String email,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/otp/send',
      body: {'email': email},
    );
    return response;
  }

  /// Verify OTP
  Future<Map<String, dynamic>> verifyOtp({
    required String email,
    required String code,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/otp/verify',
      body: {
        'email': email,
        'code': code,
      },
    );
    return response;
  }

  /// Resend OTP
  Future<Map<String, dynamic>> resendOtp({
    required String email,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/otp/resend',
      body: {'email': email},
    );
    return response;
  }

  /// OAuth Login
  Future<LoginResponse> oauthLogin({
    required String provider,
    required String token,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/oauth/$provider',
      body: {'token': token},
    );

    final loginResponse = LoginResponse.fromJson(response);
    
    // Store tokens in client
    _apiClient.setTokens(
      loginResponse.accessToken,
      loginResponse.refreshToken,
    );

    return loginResponse;
  }

  /// Refresh access token
  Future<LoginResponse> refreshToken(String refreshToken) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/refresh',
      body: {'refreshToken': refreshToken},
    );

    final loginResponse = LoginResponse.fromJson(response);
    
    // Update tokens in client
    _apiClient.setTokens(
      loginResponse.accessToken,
      loginResponse.refreshToken,
    );

    return loginResponse;
  }

  /// Logout
  Future<void> logout() async {
    try {
      await _apiClient.post(
        '${ApiConfig.authPrefix}/logout',
        body: {},
      );
    } finally {
      _apiClient.clearTokens();
    }
  }

  /// Reset password
  Future<Map<String, dynamic>> resetPassword({
    required String email,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/forgot-password',
      body: {'email': email},
    );
    return response;
  }

  /// Confirm password reset
  Future<Map<String, dynamic>> confirmPasswordReset({
    required String token,
    required String newPassword,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.authPrefix}/reset-password',
      body: {
        'token': token,
        'newPassword': newPassword,
      },
    );
    return response;
  }
}

/// Login Response Model
class LoginResponse {
  final String accessToken;
  final String? refreshToken;
  final Map<String, dynamic> user;

  LoginResponse({
    required this.accessToken,
    this.refreshToken,
    required this.user,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      accessToken: json['accessToken'] ?? '',
      refreshToken: json['refreshToken'],
      user: json['user'] ?? {},
    );
  }
}
