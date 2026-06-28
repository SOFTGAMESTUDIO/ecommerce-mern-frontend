/**
 * ============================================================
 * RECENT ORDERS
 * ============================================================
 */

import { useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import Button from "../ui/Button";

function RecentOrders({

  orders = []

}) {

  const navigate = useNavigate();

  return (

    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-5">

        <h2 className="text-lg font-semibold">

          Recent Orders

        </h2>

        <Button

          variant="ghost"

          onClick={() =>
            navigate("/orders")
          }

        >

          View All

        </Button>

      </div>

      {

        orders.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-14">

            <ShoppingBag

              size={60}

              className="text-slate-300"

            />

            <p className="mt-4 text-slate-500">

              No Orders Found

            </p>

          </div>

        ) : (

          <div className="divide-y">

            {

              orders.slice(0, 5).map(

                (order) => (

                  <div

                    key={order._id}

                    className="flex items-center justify-between p-5 hover:bg-slate-50"

                  >

                    <div className="flex items-center gap-4">

                      <img

                        src={

                          order.thumbnail ||

                          "/images/product.png"

                        }

                        alt={order.name}

                        className="h-16 w-16 rounded-lg border object-cover"

                      />

                      <div>

                        <h3 className="font-semibold">

                          {order.name}

                        </h3>

                        <p className="text-sm text-slate-500">

                          #{order.orderId}

                        </p>

                        <p className="text-xs text-slate-400">

                          {

                            new Date(

                              order.createdAt

                            ).toLocaleDateString()

                          }

                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="font-bold">

                        ₹

                        {order.total}

                      </p>

                      <span

                        className={`inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium

                        ${

                          order.status === "Delivered"

                            ? "bg-green-100 text-green-700"

                            : order.status === "Cancelled"

                            ? "bg-red-100 text-red-700"

                            : order.status === "Shipped"

                            ? "bg-blue-100 text-blue-700"

                            : "bg-yellow-100 text-yellow-700"

                        }`}

                      >

                        {order.status}

                      </span>

                    </div>

                  </div>

                )

              )

            }

          </div>

        )

      }

      {

        orders.length > 0 && (

          <div className="border-t p-4">

            <Button

              fullWidth

              variant="outline"

              onClick={() =>
                navigate("/orders")
              }

            >

              View Order History

              <ArrowRight

                size={18}

                className="ml-2"

              />

            </Button>

          </div>

        )

      }

    </div>

  );

}

export default RecentOrders;

