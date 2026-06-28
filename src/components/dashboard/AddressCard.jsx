/**
 * ============================================================
 * ADDRESS CARD
 * ============================================================
 */

import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Home,
  Plus,
  Pencil,
} from "lucide-react";

import Button from "../ui/Button";

function AddressCard({

  address,

}) {

  const navigate =
    useNavigate();

  return (

    <div className="rounded-xl border bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-5">

        <h2 className="text-lg font-semibold">

          Default Address

        </h2>

        {

          address && (

            <Button

              variant="ghost"

              onClick={() =>
                navigate("/addresses")
              }

            >

              <Pencil size={18} />

            </Button>

          )

        }

      </div>

      {

        !address ? (

          <div className="flex flex-col items-center justify-center py-12">

            <MapPin

              size={60}

              className="text-slate-300"

            />

            <h3 className="mt-4 font-semibold">

              No Address Found

            </h3>

            <p className="mt-2 text-center text-sm text-slate-500">

              Add your default shipping address.

            </p>

            <Button

              className="mt-6"

              onClick={() =>
                navigate("/addresses/new")
              }

            >

              <Plus

                size={18}

                className="mr-2"

              />

              Add Address

            </Button>

          </div>

        ) : (

          <div className="p-6">

            <div className="flex items-start gap-4">

              <div className="rounded-lg bg-blue-100 p-3 text-blue-600">

                <Home size={22} />

              </div>

              <div className="flex-1">

                <h3 className="font-semibold">

                  {address.label || "Home"}

                </h3>

                <p className="mt-2 text-sm text-slate-600">

                  {address.fullName}

                </p>

                <p className="text-sm text-slate-600">

                  {address.phone}

                </p>

                <p className="mt-2 text-sm text-slate-500 leading-6">

                  {address.address}

                  <br />

                  {address.city},

                  {" "}

                  {address.state}

                  {" "}

                  -

                  {" "}

                  {address.postalCode}

                  <br />

                  {address.country}

                </p>

              </div>

            </div>

            <Button

              variant="outline"

              fullWidth

              className="mt-6"

              onClick={() =>
                navigate("/addresses")
              }

            >

              Manage Addresses

            </Button>

          </div>

        )

      }

    </div>

  );

}

export default AddressCard;
