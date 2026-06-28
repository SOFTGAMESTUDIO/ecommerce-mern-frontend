/**
 * ============================================================
 * NOTIFICATION CARD
 * ============================================================
 */

import { useNavigate } from "react-router-dom";

import {
  Bell,
  ArrowRight,
} from "lucide-react";

import Button from "../ui/Button";

function NotificationCard({

  notifications = [],

}) {

  const navigate =
    useNavigate();

  return (

    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-5">

        <h2 className="text-lg font-semibold">

          Notifications

        </h2>

        <Button

          variant="ghost"

          onClick={() =>
            navigate("/notifications")
          }

        >

          View All

        </Button>

      </div>

      {

        notifications.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-14">

            <Bell

              size={60}

              className="text-slate-300"

            />

            <h3 className="mt-4 font-semibold">

              No Notifications

            </h3>

            <p className="mt-2 text-sm text-slate-500">

              You're all caught up.

            </p>

          </div>

        ) : (

          <div className="divide-y">

            {

              notifications
                .slice(0, 5)
                .map((item) => (

                  <div

                    key={item._id}

                    className="flex items-start gap-4 p-5 hover:bg-slate-50"

                  >

                    <div className="mt-1 rounded-full bg-blue-100 p-2 text-blue-600">

                      <Bell size={18} />

                    </div>

                    <div className="flex-1">

                      <h3 className="font-medium">

                        {item.title}

                      </h3>

                      <p className="mt-1 text-sm text-slate-500">

                        {item.message}

                      </p>

                      <p className="mt-2 text-xs text-slate-400">

                        {

                          new Date(

                            item.createdAt

                          ).toLocaleString()

                        }

                      </p>

                    </div>

                  </div>

                ))

            }

          </div>

        )

      }

      {

        notifications.length > 0 && (

          <div className="border-t p-4">

            <Button

              variant="outline"

              fullWidth

              onClick={() =>
                navigate("/notifications")
              }

            >

              View All Notifications

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

export default NotificationCard;

