import {
  ArrowLeftIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useCart } from "../../helpers/useCart";
import { AiEditorContext } from "../../providers/AiEditorContext";
import { UserContext } from "../../providers/UserContext";
import FancyButton from "../basics/FancyButton";
import Steps from "../basics/Steps";
import Toggle from "../basics/Toggle";

interface HeaderProps {}

function Header({}: HeaderProps) {
  // const { canBuyNow, setCanBuyNow } = useContext(AiEditorContext);
  // const { cartItems, addItemToCart } = useCart();
  // const { user } = useContext(UserContext);

  // const router = useRouter();

  // async function handleAddItemToCart() {
  //   if (!user || !user["@id"]) return;
  //   addItemToCart(
  //     {
  //       relatedUser: user?.["@id"],
  //       color: "red",
  //       price: 100,
  //       size: "M",
  //       quantity: 1,
  //     },
  //     true
  //   );
  // }

  return (
    <div className="flex h-full w-full flex-row items-center justify-between gap-x-6 px-8">
      {/* <button className="flex flex-row items-center gap-x-2">
        <ArrowLeftIcon className="h-4 w-4" />
        <div className="text-sm font-bold">Back</div>
      </button>
      <div className="flex flex-row items-center gap-x-6">
        <Toggle onChange={(checked) => setCanBuyNow(checked)} />
        <FancyButton primaryText="Next" bgColor="primary" />
        <FancyButton
          onClick={handleAddItemToCart}
          primaryText={canBuyNow ? "Buy Now" : "Buy Now"}
          disabled={!canBuyNow}
          endIcon={
            canBuyNow ? (
              <ShoppingBagIcon className="h-4 w-4" />
            ) : (
              <LockClosedIcon className="h-4 w-4" />
            )
          }
        />
      </div> */}
    </div>
  );
}

export default Header;
