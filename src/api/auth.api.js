/**
 * ============================================================
 * AUTH API
 * ============================================================
 */

import api from './axios';

/**
 * ============================================================
 * Register
 * ============================================================
 */

export const registerUser = (data) =>
  api.post('/auth/register', data);

/**
 * ============================================================
 * Login
 * ============================================================
 */

export const loginUser = (data) =>
  api.post('/auth/login', data);

/**
 * ============================================================
 * Google Login
 * ============================================================
 */

export const googleLogin = (data) =>
  api.post('/auth/google', data);

/**
 * ============================================================
 * Verify Login (Email 2FA)
 * ============================================================
 */

export const verifyLogin = (data) =>
  api.post('/auth/verify-login', data);

/**
 * ============================================================
 * Verify Email
 * ============================================================
 */

export const verifyEmail = (token) =>
  api.get(`/auth/verify-email/${token}`);

/**
 * ============================================================
 * Resend Verification Email
 * ============================================================
 */

export const resendVerification = (data) =>
  api.post('/auth/resend-verification', data);

/**
 * ============================================================
 * Forgot Password
 * ============================================================
 */

export const forgotPassword = (data) =>
  api.post('/auth/forgot-password', data);

/**
 * ============================================================
 * Reset Password
 * ============================================================
 */

export const resetPassword = (data) =>
  api.post('/auth/reset-password', data);

/**
 * ============================================================
 * Change Password
 * ============================================================
 */

export const changePassword = (data) =>
  api.put('/auth/change-password', data);

/**
 * ============================================================
 * Change Email
 * ============================================================
 */

export const changeEmail = (data) =>
  api.put('/auth/change-email', data);

/**
 * ============================================================
 * Complete Profile
 * ============================================================
 */

export const completeProfile = (data) =>
  api.put('/auth/complete-profile', data);

/**
 * ============================================================
 * Recovery Request
 * ============================================================
 */

export const recoveryRequest = (data) =>
  api.post('/auth/recovery-request', data);

/**
 * ============================================================
 * Refresh Token
 * ============================================================
 */

export const refreshToken = (data) =>
  api.post('/auth/refresh-token', data);

/**
 * ============================================================
 * Logout
 * ============================================================
 */

export const logout = (data = {}) =>
  api.post('/auth/logout', data);

/**
 * ============================================================
 * Logout All Devices
 * ============================================================
 */

export const logoutAllDevices = (data = {}) =>
  api.post('/auth/logout-all', data);

/**
 * ============================================================
 * Toggle Two Factor Auth
 * ============================================================
 */

export const toggleTwoFactor = (data) =>
  api.patch('/auth/toggle-2fa', data);


