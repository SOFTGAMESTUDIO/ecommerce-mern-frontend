/**
 * ============================================================
 * APP
 * ============================================================
 *
 * Root Application Component
 *
 * Responsibilities:
 * -----------------
 * ✓ Global Routes
 * ✓ Toast Notifications
 * ✓ Future Theme Provider
 * ✓ Future Auth Provider
 *
 * ============================================================
 */

import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes";

function App() {
  return (
    <>
      {/* ============================================
          Toast Notifications
      ============================================ */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
        }}
      />

      {/* ============================================
          Application Routes
      ============================================ */}
      <AppRoutes />
    </>
  );
}

export default App;