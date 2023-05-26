import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AiEditorContext } from "../../../providers/AiEditorContext";
import { ToastContext } from "../../../providers/ToastContext";
import InsertImageDialog from "./InsertImageDialog";

interface PositionBoxProps {
  positionWithImage: {
    name: string;
    position: string;
    image: string | null;
  };
}

function PositionBox({ positionWithImage }: PositionBoxProps) {
  const {} = useContext(AiEditorContext);
  const { addToast } = useContext(ToastContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-y-3"
      key={positionWithImage.name}
    >
      <button
        className="realtive aspect-square h-full transform rounded-lg bg-darkGray shadow-md transition-all duration-200 ease-in-out hover:scale-110 hover:shadow-lg active:scale-100
    "
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {positionWithImage.image ? (
          <img
            src={positionWithImage.image}
            alt={positionWithImage.name}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <PlusIcon className="h-full w-full p-4" />
        )}
      </button>
      <div className="text-xs font-bold text-primary">
        {positionWithImage.name}
      </div>
      <InsertImageDialog
        isOpen={isOpen}
        setIsOpen={(open) => setIsOpen(open)}
        position={positionWithImage.position}
      />
    </div>
  );
}

export default PositionBox;
