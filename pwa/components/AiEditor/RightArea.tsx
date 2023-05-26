import {
  LockClosedIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { Configuration, OpenAIApi } from "openai";
import React, { useContext, useState } from "react";
import { useCart } from "../../helpers/useCart";
import { CartCreateInterface } from "../../interfaces/CartInterface";
import { AiEditorContext } from "../../providers/AiEditorContext";
import { UserContext } from "../../providers/UserContext";
import ColorSelect from "../basics/ColorSelect";
import FancyButton from "../basics/FancyButton";
import SizesSelect from "../basics/SizesSelect";
import { MenuItemsEnum } from "./Sidebar";
import {
  StarIcon as StarIconOutline,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import ArtGenerator from "./RichtAreaChildren/ArtGenerator";
import Editor from "./RichtAreaChildren/Editor";

interface RightAreaProps {}

function RightArea({}: RightAreaProps) {
  const { activeMenuItem } = useContext(AiEditorContext);

  return (
    <div className="flex h-full w-full flex-col gap-y-3 px-6 lg:p-10 lg:px-20 xl:px-28">
      {/* {activeMenuItem === MenuItemsEnum.ArtGenerator && <ArtGenerator />}
      {activeMenuItem === MenuItemsEnum.Editor && <Editor />} */}
    </div>
  );
}

export default RightArea;
