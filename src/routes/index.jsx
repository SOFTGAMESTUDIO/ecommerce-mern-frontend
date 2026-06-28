/**
 * ============================================================
 * APPLICATION ROUTES
 * ============================================================
 */

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/**
 * Layouts
 */

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

/**
 * Route Guards
 */

import PrivateRoute from "./PrivateRoute";

/**
 * Authentication Pages
 */

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import VerifyLogin from "../pages/auth/VerifyLogin";
import CompleteProfile from "../pages/auth/CompleteProfile";
import RecoveryRequest from "../pages/auth/RecoveryRequest";

/**
 * Dashboard
 */

import Dashboard from "../pages/dashboard/Dashboard";
import Account from "../pages/dashboard/Account";

/**
 * Common Pages
 */

const Home = () => <h1>Home Page</h1>;

const NotFound = () => (
  <h1>404 - Page Not Found</h1>
);

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* =====================================================
            AUTH ROUTES
        ====================================================== */}

        <Route element={<AuthLayout />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />

          <Route
            path="/verify-email"
            element={<VerifyEmail />}
          />

          <Route
            path="/verify-email/:token"
            element={<VerifyEmail />}
          />

          <Route
            path="/verify-login"
            element={<VerifyLogin />}
          />

          <Route
            path="/complete-profile"
            element={<CompleteProfile />}
          />

          <Route
            path="/recovery-request"
            element={<RecoveryRequest />}
          />

        </Route>

        {/* =====================================================
            PRIVATE ROUTES
        ====================================================== */}

        <Route element={<PrivateRoute />}>

          <Route element={<DashboardLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/account"
              element={<Account />}
            />

          </Route>

        </Route>

        {/* =====================================================
            PUBLIC
        ====================================================== */}

        <Route
          path="/home"
          element={<Home />}
        />

        {/* =====================================================
            404
        ====================================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
