import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowDownIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { logOutUser } from "../../helpers/UserLogic/UserQueries";
import { UserContext } from "../../providers/UserContext";

interface UserMenuProps {}

function UserMenu({}: UserMenuProps) {
  const { refetch, user } = useContext(UserContext);

  const handleLogoutUser = async () => {
    await logOutUser();
    refetch();
  };

  return (
    <div className="flex">
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex justify-items-center">
          <Menu.Button className={"flex items-center"}>
            {user?.profilePicture ? (
              <img
                className={`aspect-square h-12 w-12 rounded-full object-cover p-1 md:visible`}
                src={user?.profilePicture}
                alt="User Profile Picture"
              />
            ) : (
              <UserIcon className="h-8 w-8" aria-hidden="true" />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/account/general"
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Account Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/order/history`}
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ClockIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ClockIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Order History
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleLogoutUser}
                  >
                    {active ? (
                      <ArrowLeftOnRectangleIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowLeftOnRectangleIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Log out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default UserMenu;
