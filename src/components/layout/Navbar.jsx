/**
 * ============================================================
 * NAVBAR
 * ============================================================
 */

import { Menu } from "lucide-react";

import { useState } from "react";

import UserMenu from "./UserMenu";

import MobileSidebar from "./MobileSidebar";

function Navbar() {

  const [open, setOpen] =
    useState(false);

  return (

    <>

      <header

        className="h-16 bg-white border-b px-6 flex items-center justify-between"

      >

        <div

          className="flex items-center gap-4"

        >

          <button

            onClick={() =>
              setOpen(true)
            }

            className="lg:hidden"

          >

            <Menu />

          </button>

          <h1

            className="font-bold text-xl"

          >

            Soft Game Studio

          </h1>

        </div>

        <UserMenu />

      </header>

      <MobileSidebar

        open={open}

        onClose={() =>
          setOpen(false)
        }

      />

    </>

  );

}

export default Navbar;