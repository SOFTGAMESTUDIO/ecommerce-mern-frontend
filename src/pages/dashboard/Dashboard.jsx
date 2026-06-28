/**
 * ============================================================
 * DASHBOARD
 * ============================================================
 */

import { useEffect, useState } from "react";

import {
  getProfile,
} from "../../api/user.api";

import Card from "../../components/ui/Card";

import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

import WelcomeCard from "../../components/dashboard/WelcomeCard";

import StatsCard from "../../components/dashboard/StatsCard";

import QuickActions from "../../components/dashboard/QuickActions";

import RecentOrders from "../../components/dashboard/RecentOrders";

import AddressCard from "../../components/dashboard/AddressCard";

import NotificationCard from "../../components/dashboard/NotificationCard";

import ProfileCard from "../../components/dashboard/ProfileCard";

function Dashboard() {

  const [loading, setLoading] =
    useState(true);

  const [profile, setProfile] =
    useState(null);

  /**
   * ============================================================
   * LOAD DATA
   * ============================================================
   */

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const { data } =
        await getProfile();

      setProfile(data.data);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <DashboardSkeleton />;

  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white border rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Failed to Load Profile</h2>
        <p className="text-slate-500 max-w-sm">
          We couldn't retrieve your account details. Please try reloading the page or logging in again.
        </p>
        <button
          onClick={loadDashboard}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition"
        >
          Reload
        </button>
      </div>
    );
  }

  return (

    <div className="space-y-6">

      <WelcomeCard

        user={profile.auth}

      />

      <StatsCard
  statsData={{
    orders: profile.ordersCount,
    wishlist: profile.wishlistCount,
    cart: profile.cartCount,
    reviews: profile.reviewCount,
    coupons: profile.couponCount,
    spent: profile.totalSpent,
  }}
/>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2 space-y-6">

          <RecentOrders

  orders={profile.recentOrders || []}

/>

          <NotificationCard />

        </div>

        <div className="space-y-6">

          <ProfileCard

            profile={profile}

          />

          <AddressCard

  address={profile.defaultAddress}

/>

          <QuickActions />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;

