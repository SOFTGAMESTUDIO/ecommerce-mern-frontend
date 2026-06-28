/**
 * ============================================================
 * USER API
 * ============================================================
 */

import api from './axios';

/**
 * ============================================================
 * Get My Profile
 * ============================================================
 */

export const getProfile = () =>
  api.get('/users/me');

/**
 * ============================================================
 * Update Profile
 * ============================================================
 */

export const updateProfile = (data) =>
  api.put('/users/profile', data);

/**
 * ============================================================
 * Add Address
 * ============================================================
 */

export const addAddress = (data) =>
  api.post('/users/address', data);

/**
 * ============================================================
 * Update Address
 * ============================================================
 */

export const updateAddress = (
  addressId,
  data
) =>
  api.put(
    `/users/address/${addressId}`,
    data
  );

/**
 * ============================================================
 * Delete Address
 * ============================================================
 */

export const deleteAddress = (
  addressId
) =>
  api.delete(
    `/users/address/${addressId}`
  );

/**
 * ============================================================
 * Set Default Address
 * ============================================================
 */

export const setDefaultAddress = (
  addressId
) =>
  api.patch(
    `/users/address/${addressId}/default`
  );

/**
 * ============================================================
 * Update Preferences
 * ============================================================
 */

export const updatePreferences = (
  data
) =>
  api.put(
    '/users/preferences',
    data
  );


