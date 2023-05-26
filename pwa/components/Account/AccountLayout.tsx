import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserContext";
import LoadingSpinner from "../Helper/LoadingButton";

const accountNavItems = [
  {
    name: "General",
    href: "/account/general",
  },
  {
    name: "Address",
    href: "/account/address",
  },
  {
    name: "Billing",
    href: "/account/billing",
  },
  {
    name: "Security",
    href: "/account/security",
  },
];

interface AccountLayoutProps {
  children: React.ReactNode;
}

function AccountLayout({ children }: AccountLayoutProps) {
  const router = useRouter();
  const { isAuthenticated } = useContext(UserContext);

  // if not authenticated, redirect to /login

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        <header className="text-center">
          <h1 className="text-xl font-bold text-primary sm:text-3xl">
            Your Account
          </h1>
        </header>
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div id="nav" className="hidden flex-col gap-2 md:flex">
            {accountNavItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <p
                  className={`whitespace-nowrap text-base text-primary ${
                    router.pathname === item.href && "font-extrabold"
                  }`}
                >
                  {item.name}
                </p>
              </Link>
            ))}
            <div className="my-2 h-px w-full bg-gray-200" />
            <Link href="delete-account">
              <p
                className={`whitespace-nowrap text-base text-red-500 ${
                  router.pathname === "delete-account" && "font-extrabold"
                }`}
              >
                Delete Account
              </p>
            </Link>
          </div>
          <div className="md:hidden ">
            {/* Select with headlessui (listbox) */}
            <Listbox value={router.pathname} onChange={() => {}}>
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only">
                    Select a tab
                  </Listbox.Label>
                  <div className="relative">
                    <span className="inline-block w-full rounded-md shadow-sm">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-primary bg-white py-2 pl-3 pr-10 text-left focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
                        <span className="block truncate">
                          {router.pathname === "/account/delete-account"
                            ? "Delete Account"
                            : accountNavItems.find(
                                (item) => item.href === router.pathname
                              )?.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 8a1 1 0 011.707 0L10 11.293l3.293-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 015 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </Listbox.Button>
                    </span>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        static
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        {accountNavItems.map((item) => (
                          <Listbox.Option
                            key={item.href}
                            className={({ active }) =>
                              `${
                                active
                                  ? "bg-primary text-white"
                                  : "text-gray-900"
                              }
                                  relative cursor-default select-none py-2 pl-3 pr-9`
                            }
                            value={item.href}
                          >
                            {({ selected, active }) => (
                              <Link href={item.href}>
                                <div className="flex items-center space-x-3">
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                  >
                                    {item.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={`${
                                      active ? "text-white" : "text-primary"
                                    }
                                          absolute inset-y-0 right-0 flex items-center pr-4`}
                                  >
                                    <CheckIcon className="h-5 w-5" />
                                  </span>
                                ) : null}
                              </Link>
                            )}
                          </Listbox.Option>
                        ))}
                        <Listbox.Option
                          className={({ active }) =>
                            `${
                              active ? "bg-primary text-white" : "text-gray-900"
                            }
                                  relative cursor-default select-none py-2 pl-3 pr-9`
                          }
                          value="delete-account"
                        >
                          {({ selected, active }) => (
                            <Link href={"delete-account"}>
                              <div className="flex items-center space-x-3">
                                <span
                                  className={`${
                                    router.pathname ===
                                    "/account/delete-account"
                                      ? "font-medium"
                                      : "font-normal"
                                  } block truncate`}
                                >
                                  Delete Account
                                </span>
                              </div>

                              {router.pathname === "/account/delete-account" ? (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-primary"
                                  }
                                        absolute inset-y-0 right-0 flex items-center pr-4`}
                                >
                                  <CheckIcon className="h-5 w-5" />
                                </span>
                              ) : null}
                            </Link>
                          )}
                        </Listbox.Option>
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
