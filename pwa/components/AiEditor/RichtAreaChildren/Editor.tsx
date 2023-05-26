import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import ColorSelect from "../../basics/ColorSelect";
import FancyButton from "../../basics/FancyButton";
import SizesSelect from "../../basics/SizesSelect";
import {
  StarIcon as StarIconOutline,
  ChatBubbleBottomCenterTextIcon,
  ArrowLeftIcon,
  CurrencyEuroIcon,
  CubeTransparentIcon,
  TruckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { CartCreateInterface } from "../../../interfaces/CartInterface";
import { UserContext } from "../../../providers/UserContext";
import { useCart } from "../../../helpers/useCart";
import { AiEditorContext } from "../../../providers/AiEditorContext";
import FeedbackTab from "./FeedbackTab";
import { ReviewInterface } from "../../../interfaces/ReviewInterface";
import { createPrintfulSyncProduct } from "../../../helpers/DataQueries";
import { useReview } from "../../../helpers/useReview";
import ReviewStars from "../../Feedback/ReviewStars";
import { ToastContext } from "../../../providers/ToastContext";
import { Variant } from "../../../pages/ai-editor/[productID]";
import { CreateEditorImageInterface } from "../../../interfaces/CreateEditorImageInterface";
import { useRouter } from "next/router";

interface EditorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<Variant | null>>;
  chosenImages?: CreateEditorImageInterface[];
}

function Editor({
  variants,
  selectedVariant,
  setSelectedVariant,
  chosenImages,
}: EditorProps) {
  const { user } = useContext(UserContext);
  const { cartItems, addItemToCart } = useCart();
  const { loading: reviewsLoading, rating, reviews } = useReview();

  const [isFeedbackTab, setIsFeedbackTab] = useState(false);

  const [selectedColorSizes, setSelectedColorSizes] = useState<
    { name: string; value: string; inStock: boolean }[]
  >([]);
  const [selectedSizeColors, setSelectedSizeColors] = useState<
    { name: string; hex: string; inStock: boolean }[]
  >([]);

  const { addToast } = useContext(ToastContext);

  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const router = useRouter();

  // TODO: add to aieditor context so Buy now button can use it
  const [createCartItem, setCreateCartItem] = useState<
    Omit<CartCreateInterface, "syncProductId" | "position">
  >({
    relatedUser: user?.["@id"] ?? "",
    // TODO: exchange 1 by the actual product
    quantity: 1,
    price: 6500,
    color: "red",
    size: "M",
  });

  const colorSizes: Record<
    string,
    { name: string; value: string; inStock: boolean }[]
  > = {};
  const sizeColors: Record<
    string,
    { name: string; hex: string; inStock: boolean }[]
  > = {};

  variants.forEach((variant) => {
    const { color, size, color_code, in_stock } = variant;

    // add size to colorSizes
    if (color in colorSizes) {
      colorSizes[color].push({
        name: size,
        value: size,
        inStock: in_stock,
      });
    } else {
      colorSizes[color] = [
        {
          name: size,
          value: size,
          inStock: in_stock,
        },
      ];
    }

    // add color and color_code to sizeColors
    if (size in sizeColors) {
      sizeColors[size].push({
        name: color,
        hex: color_code,
        inStock: in_stock,
      });
    } else {
      sizeColors[size] = [{ name: color, hex: color_code, inStock: in_stock }];
    }
  });

  async function handleAddItemToCart() {
    if (!user || !user["@id"]) return;

    setAddToCartLoading(true);

    // const variant_idObject = variants.filter(
    //   (variant) =>
    //     variant.color === createCartItem.color &&
    //     variant.size === createCartItem.size
    // );
    // if (!variant_idObject || variant_idObject?.length <= 0) {
    //   // TODO: add error toast
    //   setAddToCartLoading(false);
    //   return;
    // }
    // const variant_id = variant_idObject[0].variant_id;
    // if (!variant_id) {
    //   // TODO: add error toast
    //   setAddToCartLoading(false);
    //   return;
    // }

    if (!selectedVariant || !selectedVariant.variant_id) {
      return;
    }

    if (
      !chosenImages?.filter((image) => image.position === "front")?.[0].image
        .objectUrl
    ) {
      // TODO: add error toast
      addToast({
        id: "image-not-uploaded",
        message: "The image is not uploaded yet.",
        type: "error",
      });
      setAddToCartLoading(false);
      return;
    }

    const res = await createPrintfulSyncProduct({
      sync_product: {
        name: "T-shirt product",
        thumbnail: chosenImages.filter((image) => image.position === "front")[0]
          .image.objectUrl!,
      },
      sync_variants: [
        {
          retail_price: "21.00",
          variant_id: selectedVariant.variant_id,
          files: [
            {
              url: chosenImages?.filter(
                (image) => image.position === "front"
              )?.[0].image.objectUrl!,
            },
            // {
            //   type: "back",
            //   url: "https://example.com/image.jpg",
            // },
          ],
        },
      ],
    });

    if (res.code !== 200) {
      addToast({
        id: "error",
        message: "Something went wrong. Make sure that you uploaded an image",
        type: "error",
      });
      setAddToCartLoading(false);
      return;
    }

    if (res.result) {
      if (
        createCartItem.quantity &&
        createCartItem.price &&
        createCartItem.color &&
        createCartItem.size &&
        chosenImages?.filter((image) => image.position === "front")?.[0].image
          .objectUrl
      ) {
        const img = new Image();
        img.src = chosenImages.filter(
          (image) => image.position === "front"
        )[0].image.objectUrl!;
        console.log("img here: ", img.naturalHeight, img.naturalWidth, img);
        console.log("createCartItem just before add: ", createCartItem);
        console.log("user: ", user);
        addItemToCart({
          ...createCartItem,
          relatedUser: user["@id"],
          syncProductId: res.result.id,
          position: JSON.stringify({
            area_width: 1800,
            area_height: 2400,
            width: img.naturalWidth,
            height: img.naturalHeight,
            top: (2400 - img.naturalHeight) / 2,
            left: (1800 - img.naturalWidth) / 2,
          }),
        });
      }
    }
    setAddToCartLoading(false);
  }

  useEffect(() => {
    const initialColor = Object.keys(colorSizes)?.[0];
    const sizesForInitial = colorSizes[initialColor]; // ["S", "M", "L", "XL"]

    const colorsForInitial = sizeColors[sizesForInitial[0].value]; // ["red", "blue", "green"]

    setSelectedColorSizes(sizesForInitial);
    setSelectedSizeColors(colorsForInitial);
  }, []);

  // useeffect to set the selected variant
  useEffect(() => {
    const variant_idObject = variants.filter(
      (variant) =>
        variant.color === createCartItem.color &&
        variant.size === createCartItem.size
    );
    setSelectedVariant(variant_idObject[0]);
  }, [selectedColorSizes, selectedSizeColors]);

  return (
    <div className="flex h-full flex-1 bg-lightGray px-6 py-8 md:items-center lg:px-16 lg:py-10 xl:px-24">
      {isFeedbackTab && (
        <FeedbackTab
          onBack={() => {
            setIsFeedbackTab(false);
          }}
        />
      )}
      {!isFeedbackTab && (
        <div className="flex w-full flex-col justify-between gap-y-3 md:gap-y-6">
          <h2 className="text-xl font-bold text-primary">
            Customize your product
          </h2>
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-row items-center gap-2">
              {!reviewsLoading && rating && <ReviewStars rating={rating} />}

              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {reviewsLoading ? "loading" : rating?.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-primary" />
              <button
                onClick={() => {
                  setIsFeedbackTab(true);
                }}
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                {!reviewsLoading && reviews && reviews.length} Reviews
              </button>
            </div>
          </div>

          <h4 className="text-sm text-primary">
            Select Size <span className="pl-3 font-thin">Size Guide </span>
          </h4>
          {selectedColorSizes && selectedColorSizes.length > 0 && (
            <SizesSelect
              onSelect={(size) => {
                setCreateCartItem((prev) => ({ ...prev, size }));
                setSelectedSizeColors(sizeColors[size]);
              }}
              sizes={selectedColorSizes}
            />
          )}

          <h4 className="text-sm text-primary">Colours Available</h4>
          {selectedSizeColors && selectedSizeColors.length > 0 && (
            <ColorSelect
              onSelect={(color) => {
                setCreateCartItem((prev) => ({ ...prev, color }));
                setSelectedColorSizes(colorSizes[color]);
              }}
              colors={selectedSizeColors}
            />
          )}

          <div className="flex flex-row items-center justify-center gap-3 pt-4">
            <FancyButton
              primaryText={"Add to Cart"}
              bgColor={"secondary"}
              loading={addToCartLoading}
              disabled={!selectedVariant}
              onClick={handleAddItemToCart}
              endIcon={<ShoppingCartIcon className="h-4 w-4" />}
              flex1
            />
            <div className="flex h-9 flex-1 items-center justify-center rounded-full border border-darkGray">
              <p className="text-sm font-extrabold text-primary lg:text-base">
                199.99 €
              </p>
            </div>
          </div>
          <div className="my-3 hidden w-full border-b border-darkGray md:block" />
          <div className="hidden grid-flow-row grid-cols-1 gap-x-3 gap-y-5 md:grid lg:grid-cols-2">
            {[
              {
                icon: <CurrencyEuroIcon className="h-5 w-5" />,
                primaryText: "Secure Payment",
                secondaryText: "100% secure payment",
              },
              {
                icon: <TruckIcon className="h-5 w-5" />,
                primaryText: "Fast Shipping",
                secondaryText: "Super fast orders accross the world",
              },
              {
                icon: <LockClosedIcon className="h-5 w-5" />,
                primaryText: "Privacy",
                secondaryText: "We do not share your data with third parties",
              },
            ].map((item) => (
              <div key={item.primaryText} className="flex flex-row gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-darkGray">
                  {item.icon}
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-semibold text-primary">
                    {item.primaryText}
                  </p>
                  <p className="text-xs text-gray-500">{item.secondaryText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Editor;
