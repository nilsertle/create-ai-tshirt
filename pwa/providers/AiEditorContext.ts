import { createContext } from "react";
import { MenuItemsEnum } from "../components/AiEditor/Sidebar";
import {
  CreateEditorInstanceInterface,
  CreateEditorInstanceUpdateInterface,
} from "../interfaces/CreateEditorInstanceInterface";
import { Variant } from "../pages/ai-editor/[productID]";

export interface AiEditorContextInterface {
  activeMenuItem: MenuItemsEnum;
  setActiveMenuItem: (activeMenuItem: MenuItemsEnum) => void;
  canBuyNow: boolean;
  setCanBuyNow: (canBuyNow: boolean) => void;
  aiImageUrlInGenerator: string;
  setAiImageUrlInGenerator: (aiImageUrlInGenerator: string) => void;
  positionsWithImages: {
    sorting: number;
    name: string;
    position: string;
    image: string | null;
    selected: boolean;
  }[];
  setPositionWithImage: (position: string, image: string | null) => void;
  printfulProductId: string;
  variants: Variant[];
  selectedVariant: Variant | null;
  setSelectedVariant: (variant: Variant) => void;
  printFiles: {
    product_id: number;
    available_placements: { [key: string]: string };
  };
  placementPreviews: {
    placement: string;
    variant_ids: number[];
    mockup_url: string;
  }[];
  setPlacementPreviews: (
    placementPreviews: {
      placement: string;
      variant_ids: number[];
      mockup_url: string;
    }[]
  ) => void;
  createEditorInstance: CreateEditorInstanceInterface;
  updateCreateEditorInstance: (
    updateEditorInstance?: CreateEditorInstanceUpdateInterface,
    chosenImages?: {
      position: "front" | "back" | "left" | "right";
      image: string;
    }[]
  ) => Promise<CreateEditorInstanceInterface | undefined>;
}

export const AiEditorContext = createContext<AiEditorContextInterface>(
  {} as AiEditorContextInterface
);
