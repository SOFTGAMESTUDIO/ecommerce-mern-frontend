/**
 * ============================================================
 * DASHBOARD LAYOUT
 * ============================================================
 */

import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import Sidebar from "../components/layout/Sidebar";

function DashboardLayout() {

  return (

    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div className="lg:ml-72">

        <Navbar />

        <main className="p-6">

          <Outlet />

        </main>

      </div>

    </div>

  );

}

export default DashboardLayout;