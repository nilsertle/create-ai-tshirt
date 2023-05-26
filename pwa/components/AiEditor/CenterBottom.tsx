import { placements } from "@popperjs/core";
import React, { useContext, useEffect, useState } from "react";
import {
  createCustomMockup,
  createPrintfulMockUpTask,
  fetchMediaObject,
} from "../../helpers/DataQueries";
import { AiEditorContext } from "../../providers/AiEditorContext";
import PositionBox from "./ChildComponents/PositionBox";
import { MenuItemsEnum } from "./Sidebar";

interface CenterBottomProps {}

function CenterBottom({}: CenterBottomProps) {
  const {
    positionsWithImages,
    activeMenuItem,
    variants,
    printFiles,
    printfulProductId,
    aiImageUrlInGenerator,
    setAiImageUrlInGenerator,
    setPositionWithImage,
    setPlacementPreviews,
    placementPreviews,
  } = useContext(AiEditorContext);

  // async function createMockupTask(image?: string) {
  //   const _files = positionsWithImages.map((positionWithImage) => {
  //     return {
  //       placement: positionWithImage.position,
  //       // image_url: positionWithImage.image,
  //       image_url:
  //         "https://www.freepnglogos.com/uploads/panda-png/hungry-panda-eats-spam-google-panda-16.png",
  //       position: {
  //         area_width: 1800,
  //         area_height: 2400,
  //         width: 1800,
  //         height: 1800,
  //         top: 300,
  //         left: 0,
  //       },
  //     };
  //   });

  //   const _productId = printfulProductId;
  //   if (_productId) {
  //     const response = await createPrintfulMockUpTask(
  //       parseInt(_productId as string),
  //       {
  //         variant_ids: variants.map((variant) => variant.variant_id),
  //         format: "png",
  //         width: 1000,
  //         files: _files,
  //       }
  //     );
  //     console.log("mockup response: ", response);

  //     // wait for 2000 milliseconds before trying to fetch shirtPreview
  //     let shirtPreviewResponse: any;
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     // try to fetch shirtPreview up to 3 times with gaps of 1s
  //     for (let i = 0; i < 10; i++) {
  //       try {
  //         const _shirtPreview = await shirtPreview(response.result.task_key);
  //         if (_shirtPreview.result.status === "completed") {
  //           shirtPreviewResponse = _shirtPreview;
  //           break;
  //         } else {
  //           await new Promise((resolve) => setTimeout(resolve, 1000));
  //         }
  //         console.log("shirtPreview: ", _shirtPreview);
  //       } catch (err) {
  //         console.log("Error fetching shirtPreview: ", err);
  //         await new Promise((resolve) => setTimeout(resolve, 1000));
  //       }
  //     }

  //     console.log("done: ", shirtPreviewResponse.result.mockups);
  //     if (!shirtPreviewResponse) {
  //       return;
  //     }

  //     console.log("placementPreview: ", placementPreviews);

  //     setPlacementPreviews([
  //       ...shirtPreviewResponse.result.mockups.map((mockup: any) => {
  //         return {
  //           placement: mockup.placement,
  //           preview_url: mockup.mockup_url,
  //           variant_ids: mockup.variant_ids,
  //         };
  //       }),
  //     ]);
  //   }
  // }

  // useEffect(() => {
  //   console.log("calling createMockupTask", positionsWithImages);
  //   if (
  //     positionsWithImages.length > 0 &&
  //     positionsWithImages.find((a) => a.image)
  //   ) {
  //     console.log("actually executing");
  //     createMockupTask();
  //   }
  // }, [positionsWithImages]);

  // async function handleCreateCustomMockup() {
  //   // Read the binary data of the image

  //   const _files: {
  //     placement: string;
  //     image_url: string;
  //   }[] =
  //     (positionsWithImages
  //       .map((posWithImg) => {
  //         if (posWithImg.image)
  //           return {
  //             placement: posWithImg.position,
  //             image_url: posWithImg.image ?? "",
  //           };
  //       })
  //       .filter((_file) => _file != undefined) as {
  //       placement: string;
  //       image_url: string;
  //     }[]) ?? [];

  //   if (_files.find((file) => !file || !file.image_url)) {
  //     return;
  //   }
  //   if (_files && _files.length > 0) {
  //     const res: {
  //       placement: string;
  //       mockup_url: string;
  //       variant_ids: number[];
  //     }[] = await createCustomMockup(
  //       {
  //         variant_ids: variants.map((variant) => variant.variant_id),
  //         files: _files,
  //       },
  //       printfulProductId
  //     );
  //     console.log("res in handle mockup: ", res);
  //     if (res) {
  //       setPlacementPreviews(res);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   handleCreateCustomMockup();
  // }, [positionsWithImages]);
  return (
    <div className="h-full w-full">
      {activeMenuItem === MenuItemsEnum.Editor && (
        <div className="flex h-full w-full flex-row items-center justify-center gap-x-10 pb-8 pt-2">
          {positionsWithImages
            .sort((a, b) => (a.sorting < b.sorting ? -1 : 1))
            .slice(0, 1)
            .map((positionWithImage) => {
              return (
                <PositionBox
                  key={positionWithImage.position}
                  positionWithImage={positionWithImage}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default CenterBottom;
