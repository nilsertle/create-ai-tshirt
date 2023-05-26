import NextImage from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Variant } from "../../../pages/ai-editor/[productID]";
import { AiEditorContext } from "../../../providers/AiEditorContext";
import mockupTshirtImage from "../../../public/mockup-tshirt.svg";
import TshirtSVG from "./TshirtSVG";

interface PreviewProps {}

function Preview({}: PreviewProps) {
  const {
    placementPreviews,
    setPlacementPreviews,
    selectedVariant,
    positionsWithImages,
  } = useContext(AiEditorContext);

  const frontImage = positionsWithImages?.find(
    (p) => p.position === "front"
  )?.image;

  return (
    <div className="flex w-full items-center justify-center p-4 md:h-full md:p-12">
      <div id="mockup-container" className="relative max-w-full md:h-full">
        <div className="z-10 h-full w-full drop-shadow-md">
          <TshirtSVG color={selectedVariant?.color_code} />
        </div>
        {frontImage && (
          <NextImage
            alt="mockup-image"
            width={300}
            height={300}
            id="mockup-logo"
            src={frontImage ?? ""}
            className="absolute -top-[20%] bottom-0 left-0 right-0 z-auto mx-auto my-auto flex h-1/3 w-1/3 items-center justify-center object-contain"
          />
        )}
      </div>
    </div>
  );
}

export default Preview;
