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
import { useRouter } from "next/router";
import React, { Fragment, useContext } from "react";
import { UserContext } from "../../providers/UserContext";

interface CustomMenuProps {
  /**
   * the element that will be used as the menu button
   */
  menuButton: React.ReactNode;
  menuItems: {
    name: string;
    icon?: React.ReactNode;
    link?: string;
    onClick?: () => void;
  }[];
}

function CustomMenu({ menuButton, menuItems }: CustomMenuProps) {
  const router = useRouter();
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex justify-items-center">
          <Menu.Button className={"flex items-center"}>
            {menuButton}
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
              {menuItems.map((menuItem, idx) => (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        if (menuItem.onClick) {
                          menuItem.onClick();
                        }
                        if (menuItem.link) {
                          router.push(menuItem.link);
                        }
                      }}
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <div className="mr-2 h-5 w-5" aria-hidden="true">
                          {menuItem.icon}
                        </div>
                      ) : (
                        <div className="mr-2 h-5 w-5" aria-hidden="true">
                          {menuItem.icon}
                        </div>
                      )}
                      {menuItem.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default CustomMenu;
