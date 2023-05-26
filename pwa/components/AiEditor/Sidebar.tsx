import {
  DocumentCheckIcon,
  PaintBrushIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import {
  DocumentCheckIcon as DocumentCheckIconSolid,
  PaintBrushIcon as PaintBrushIconSolid,
  PencilSquareIcon as PencilSquareIconSolid,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useContext } from "react";
import { AiEditorContext } from "../../providers/AiEditorContext";

export enum MenuItemsEnum {
  ArtGenerator = "art-generator",
  Editor = "editor",
  Checkout = "checkout",
}

const MenuItems = [
  {
    name: "Generator",
    icon: <PaintBrushIcon />,
    solidIcon: <PaintBrushIconSolid />,
    item: MenuItemsEnum.ArtGenerator,
  },
  {
    name: "Editor",
    icon: <PencilSquareIcon />,
    solidIcon: <PencilSquareIconSolid />,
    item: MenuItemsEnum.Editor,
  },
  {
    name: "Checkout",
    icon: <DocumentCheckIcon />,
    solidIcon: <DocumentCheckIconSolid />,
    item: MenuItemsEnum.Checkout,
  },
];

interface SidebarProps {}

function Sidebar({}: SidebarProps) {
  const { activeMenuItem, setActiveMenuItem } = useContext(AiEditorContext);
  return (
    <div className="fixed bottom-5 left-3 right-3 mx-auto rounded-full bg-black px-3 sm:left-0 sm:right-0 sm:w-min md:bottom-7">
      <div className="flex w-full flex-row items-center justify-evenly">
        {MenuItems.map((item) => (
          <button
            key={item.item}
            className={`rounded-lg px-4 py-3`}
            onClick={() => setActiveMenuItem(item.item)}
          >
            <div
              className={`h-6 w-6 rounded-full  ${
                activeMenuItem === item.item
                  ? "bg-slate-800 text-white"
                  : "text-gray-500"
              }`}
            >
              {activeMenuItem === item.item ? item.solidIcon : item.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
