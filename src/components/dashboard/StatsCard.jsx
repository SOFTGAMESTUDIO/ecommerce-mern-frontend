/**
 * ============================================================
 * STATS CARD
 * ============================================================
 */

import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  Star,
  TicketPercent,
  Wallet,
} from "lucide-react";

const stats = [
  {
    title: "Orders",
    key: "orders",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Wishlist",
    key: "wishlist",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Cart",
    key: "cart",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Reviews",
    key: "reviews",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Coupons",
    key: "coupons",
    icon: TicketPercent,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Total Spent",
    key: "spent",
    icon: Wallet,
    color: "bg-orange-100 text-orange-600",
    prefix: "₹",
  },
];

function StatsCard({ statsData = {} }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

      {stats.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.key}
            className="rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">

                  {item.title}

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                  {item.prefix || ""}

                  {statsData[item.key] ?? 0}

                </h2>

              </div>

              <div
                className={`rounded-full p-3 ${item.color}`}
              >

                <Icon size={24} />

              </div>

            </div>

          </div>

        );

      })}

    </div>
  );
}

export default StatsCard;

