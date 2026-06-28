/**
 * ============================================================
 * DASHBOARD NAVIGATION
 * ============================================================
 */

import {
  LayoutDashboard,
  User,
  Package,
  ShoppingCart,
  Heart,
  Bell,
  CreditCard,
  Settings,
  Shield,
  Users,
  BarChart3,
  FileText,
  HelpCircle
} from "lucide-react";

const navigation = [

  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },

  {
    title: "Profile",
    path: "/profile",
    icon: User
  },

  {
    title: "Products",
    path: "/products",
    icon: Package
  },

  {
    title: "Orders",
    path: "/orders",
    icon: ShoppingCart
  },

  {
    title: "Wishlist",
    path: "/wishlist",
    icon: Heart
  },

  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell
  },

  {
    title: "Payments",
    path: "/payments",
    icon: CreditCard
  },

  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3
  },

  {
    title: "Users",
    path: "/users",
    icon: Users,
    roles: ["admin", "super_admin"]
  },

  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
    roles: ["manager", "admin", "super_admin"]
  },

  {
    title: "Roles",
    path: "/roles",
    icon: Shield,
    roles: ["super_admin"]
  },

  {
    title: "Settings",
    path: "/settings",
    icon: Settings
  },

  {
    title: "Help",
    path: "/help",
    icon: HelpCircle
  }

];

export default navigation;