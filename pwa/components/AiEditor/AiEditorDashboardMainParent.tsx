import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import { RefHandles } from "react-spring-bottom-sheet/dist/types";
import { AiEditorContext } from "../../providers/AiEditorContext";
import CenterArea from "./CenterArea";
import CenterBottom from "./CenterBottom";
import Preview from "./ChildComponents/Preview";
import Header from "./Header";
import ArtGenerator from "./RichtAreaChildren/ArtGenerator";
import RightArea from "./RightArea";
import Sidebar from "./Sidebar";
import "react-spring-bottom-sheet/dist/style.css";
import FancyButton from "../basics/FancyButton";
import { useRouter } from "next/router";

interface AiEditorDashboardMainParentProps {}

function AiEditorDashboardMainParent({}: AiEditorDashboardMainParentProps) {
  const { updateCreateEditorInstance, createEditorInstance } =
    useContext(AiEditorContext);
  const sheetRef = useRef<BottomSheetRef>();
  const router = useRouter();
  return (
    <div className="flex h-full grid-cols-1 flex-col items-center justify-between md:grid md:grid-cols-2">
      <div id="center" className="col-span-1 h-[50vh] w-full md:h-full lg:p-10">
        <Preview />
      </div>
      <div className="col-span-1 hidden h-full w-full bg-lightGray px-6 py-6 md:block lg:px-16 lg:py-10 xl:px-24">
        <ArtGenerator />
      </div>

      <BottomSheet
        className="md:hidden"
        open
        blocking={false}
        snapPoints={({ maxHeight }) => [maxHeight * 0.8, maxHeight * 0.55]}
        ref={sheetRef as any}
        onDismiss={() =>
          sheetRef?.current?.snapTo(({ snapPoints }) => Math.min(...snapPoints))
        }
        footer={
          <div className="flex flex-row items-center justify-end p-4 px-8">
            <FancyButton
              primaryText="Next"
              onClick={() =>
                router.push(
                  "/product-preview/" +
                    router.query.productID +
                    "?createEditorInstanceId=" +
                    router.query.createEditorInstanceId
                )
              }
            />
          </div>
        }
        expandOnContentDrag={true}
        defaultSnap={({ maxHeight }) => maxHeight * 0.55}
      >
        <div className="h-full overflow-hidden bg-lightGray px-6 py-6">
          <ArtGenerator />
        </div>
      </BottomSheet>
    </div>
  );
}

export default AiEditorDashboardMainParent;
