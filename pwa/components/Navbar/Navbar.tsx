import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useUser } from "../../helpers/UserLogic/useUser";
import { Popover } from "@headlessui/react";
import { UserContext } from "../../providers/UserContext";
import { useRouter } from "next/router";
import Image from "next/image";
import UserMenu from "./UserMenu";
import { logOutUser } from "../../helpers/UserLogic/UserQueries";

interface NavbarProps {
  fixedNavbar?: boolean;
}

const navigationItems = [
  { name: "Products", href: "/products" },
  { name: "Ai-Editor", href: "/ai-editor/362" },
];

function Navbar(props: NavbarProps) {
  const router = useRouter();
  const [cartSize, setCartSize] = useState(0);

  const { user, isAuthenticated, refetch } = useContext(UserContext);

  const handleLogoutUser = async () => {
    await logOutUser();
    refetch();
  };

  return (
    <header>
      <input
        type="checkbox"
        name="hbr"
        id="hbr"
        className="hbr peer hidden"
        hidden
        aria-hidden="true"
      />
      <nav className="navbar peer-checked:navbar-active relative z-20 w-full bg-white/80 shadow-md shadow-gray-600/5 backdrop-blur peer-checked:fixed dark:bg-gray-900/80 dark:shadow-none md:relative md:bg-transparent">
        <div className="m-auto px-6 xl:container md:px-12">
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3">
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link href="/">
                <Image
                  alt="logo"
                  src={"/logo-light-with-name-centered.png"}
                  width={120}
                  height={120}
                  className="flex items-center space-x-2"
                />
              </Link>
              {/* <span className="text-base font-bold text-gray-600 dark:text-white">
                    UNBEATABLE
                  </span> */}

              <label
                htmlFor="hbr"
                className="peer-checked:hamburger relative z-20 -mr-6 block cursor-pointer px-6 py-6 lg:hidden"
              >
                <div
                  aria-hidden="true"
                  className="m-auto h-0.5 w-6 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
                ></div>
                <div
                  aria-hidden="true"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-gray-900 transition duration-300 dark:bg-gray-300"
                ></div>
              </label>
            </div>
            <div className="navmenu mb-16 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-300/20 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none md:flex-nowrap lg:m-0 lg:flex lg:w-7/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                <ul className="space-y-6 text-base font-medium tracking-wide lg:flex lg:space-y-0 lg:text-sm">
                  {navigationItems.map((navigationItem) => (
                    <li key={navigationItem.href}>
                      <Link
                        href={navigationItem.href}
                        className="block whitespace-nowrap text-primary transition hover:text-primaryLight dark:hover:text-primaryLight md:px-4"
                      >
                        <span> {navigationItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {user ? (
                <div className="-ml-1 flex w-full flex-col items-center space-y-2 border-primary/10 dark:border-gray-700 sm:flex-row md:w-max lg:gap-x-6 lg:space-y-0 lg:border-l lg:pl-6">
                  <button
                    className="relative inline-block"
                    onClick={() => router.push("/cart")}
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartSize > 0 && (
                      <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
                        {cartSize}
                      </span>
                    )}
                  </button>
                  <UserMenu />
                </div>
              ) : (
                <div className="-ml-1 flex w-full flex-col space-y-2 border-primary/10 dark:border-gray-700 sm:flex-row md:w-max lg:space-y-0 lg:border-l">
                  <Link
                    href={"/signup"}
                    className="relative ml-auto flex h-9 items-center justify-center before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 hover:before:scale-105 focus:before:bg-primary/10 active:duration-75 active:before:scale-95 dark:focus:before:bg-primaryLight/10 sm:px-6"
                  >
                    <span className="relative whitespace-nowrap text-sm font-semibold text-primary dark:text-primaryLight">
                      Sign Up{" "}
                    </span>
                  </Link>

                  <Link
                    className="relative ml-auto flex h-9 items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-secondary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:bg-primaryLight sm:px-6"
                    href={"/login"}
                  >
                    {" "}
                    <span className="relative whitespace-nowrap text-sm font-semibold text-white dark:text-gray-900">
                      Log In{" "}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
