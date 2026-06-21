import 'package:daurin/core/api_client.dart';
import 'package:daurin/core/api_config.dart';

/// Deposits Service
/// 
/// Handles waste deposits and verification
class DepositsService {
  final ApiClient _apiClient;

  DepositsService(this._apiClient);

  /// Create new deposit
  Future<Map<String, dynamic>> createDeposit({
    required String materialType,
    required double weight,
    String? notes,
    String? dropPointId,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.depositsPrefix}/',
      body: {
        'materialType': materialType,
        'weight': weight,
        if (notes != null) 'notes': notes,
        if (dropPointId != null) 'dropPointId': dropPointId,
      },
    );
    return response;
  }

  /// Get deposit history
  Future<Map<String, dynamic>> getHistory({
    int limit = 20,
    int offset = 0,
  }) async {
    final response = await _apiClient.get(
      '${ApiConfig.depositsPrefix}/history',
      queryParams: {
        'limit': limit.toString(),
        'offset': offset.toString(),
      },
    );
    return response;
  }

  /// Verify deposit by token
  Future<Map<String, dynamic>> verify({
    required String token,
  }) async {
    final response = await _apiClient.get(
      '${ApiConfig.depositsPrefix}/verify/$token',
    );
    return response;
  }

  /// Verify deposit by operator
  Future<Map<String, dynamic>> verifyByOperator({
    required String depositId,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.depositsPrefix}/$depositId/verify',
      body: {},
    );
    return response;
  }

  /// Get list of drop points
  Future<Map<String, dynamic>> getDropPoints({
    String? material,
    String? query,
    double? lat,
    double? lng,
  }) async {
    final queryParams = <String, String>{};
    if (material != null) queryParams['material'] = material;
    if (query != null) queryParams['q'] = query;
    if (lat != null) queryParams['lat'] = lat.toString();
    if (lng != null) queryParams['lng'] = lng.toString();

    final response = await _apiClient.get(
      '${ApiConfig.dropPointsPrefix}/',
      queryParams: queryParams.isNotEmpty ? queryParams : null,
    );
    return response;
  }

  /// Get drop point details
  Future<Map<String, dynamic>> getDropPointDetail({
    required String dropPointId,
  }) async {
    final response = await _apiClient.get(
      '${ApiConfig.dropPointsPrefix}/$dropPointId',
    );
    return response;
  }

  /// Get drop point status
  Future<Map<String, dynamic>> getDropPointStatus({
    required String dropPointId,
  }) async {
    final response = await _apiClient.get(
      '${ApiConfig.dropPointsPrefix}/$dropPointId/status',
    );
    return response;
  }
}

/// Pickups Service
/// 
/// Handles waste pickup scheduling
class PickupsService {
  final ApiClient _apiClient;

  PickupsService(this._apiClient);

  /// Get active pickups
  Future<Map<String, dynamic>> getActive() async {
    final response = await _apiClient.get(
      '${ApiConfig.pickupsPrefix}/',
    );
    return response;
  }

  /// Schedule new pickup
  Future<Map<String, dynamic>> schedule({
    required String address,
    required DateTime scheduledAt,
    String? notes,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.pickupsPrefix}/',
      body: {
        'address': address,
        'scheduledAt': scheduledAt.toIso8601String(),
        if (notes != null) 'notes': notes,
      },
    );
    return response;
  }

  /// Update pickup schedule
  Future<Map<String, dynamic>> update({
    required String pickupId,
    required Map<String, dynamic> data,
  }) async {
    final response = await _apiClient.patch(
      '${ApiConfig.pickupsPrefix}/$pickupId',
      body: data,
    );
    return response;
  }

  /// Cancel pickup
  Future<Map<String, dynamic>> cancel({
    required String pickupId,
  }) async {
    final response = await _apiClient.delete(
      '${ApiConfig.pickupsPrefix}/$pickupId',
    );
    return response;
  }

  /// Update courier status
  Future<Map<String, dynamic>> updateCourierStatus({
    required String pickupId,
    required String status,
  }) async {
    final response = await _apiClient.patch(
      '${ApiConfig.pickupsPrefix}/$pickupId/courier-status',
      body: {'status': status},
    );
    return response;
  }

  /// Complete pickup
  Future<Map<String, dynamic>> completePickup({
    required String pickupId,
  }) async {
    final response = await _apiClient.post(
      '${ApiConfig.pickupsPrefix}/$pickupId/complete',
      body: {},
    );
    return response;
  }
}
