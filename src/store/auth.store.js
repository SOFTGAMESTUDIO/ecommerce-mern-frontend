/**
 * ============================================================
 * AUTH STORE
 * ============================================================
 *
 * Features
 * --------
 * ✓ User State
 * ✓ Access Token
 * ✓ Refresh Token
 * ✓ Login
 * ✓ Logout
 * ✓ Restore Session
 * ✓ Persist Login
 * ✓ Update User (for 2FA toggle, profile updates)
 *
 * ============================================================
 */

import { create } from "zustand";

const useAuthStore = create((set) => ({

  /**
   * User
   */

  user: null,

  /**
   * JWT Access Token
   */

  accessToken:
    localStorage.getItem("accessToken"),

  /**
   * Refresh Token
   */

  refreshToken:
    localStorage.getItem("refreshToken"),

  /**
   * Logged In
   */

  isAuthenticated:
    !!localStorage.getItem("accessToken"),

  /**
   * Login — saves both tokens and user
   */

  login: (user, accessToken, refreshToken) => {

    localStorage.setItem("accessToken", accessToken);

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    set({
      user,
      accessToken,
      refreshToken: refreshToken || localStorage.getItem("refreshToken"),
      isAuthenticated: true,
    });

  },

  /**
   * Logout
   */

  logout: () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });

  },

  /**
   * Restore User (on page load)
   */

  setUser: (user) =>
    set({ user }),

  /**
   * Update User — partial update for 2FA toggle, profile changes, etc.
   */

  updateUser: (updates) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...updates }
        : state.user,
    })),

}));

export default useAuthStore;