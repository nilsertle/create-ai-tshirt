import Image from "next/image";
import React, { useContext } from "react";
import { AiEditorContext } from "../../providers/AiEditorContext";
import Checkout from "./ChildComponents/Checkout";
import Preview from "./ChildComponents/Preview";
import { MenuItemsEnum } from "./Sidebar";

interface CenterAreaProps {}

function CenterArea({}: CenterAreaProps) {
  const { aiImageUrlInGenerator, activeMenuItem } = useContext(AiEditorContext);
  return (
    <div className="flex w-full items-center justify-center [writing-mode:tb] md:h-full md:[writing-mode:inherit]">
      {/* {activeMenuItem === MenuItemsEnum.Checkout && <Checkout />} */}
      <Preview />
      {/* {activeMenuItem === MenuItemsEnum.ArtGenerator &&
        (aiImageUrlInGenerator ? (
          <img
            alt="Generated image"
            src={aiImageUrlInGenerator}
            className="rounded-lg object-contain"
          />
        ) : (
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ))} */}
    </div>
  );
}

export default CenterArea;
