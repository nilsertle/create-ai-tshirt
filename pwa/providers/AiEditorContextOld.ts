import { createContext } from "react";
import { useUser } from "../helpers/UserLogic/useUser";
import { AiImageInterface } from "../interfaces/AiImageInterface";
import { AuthenticatedUserInterface } from "../interfaces/UserInterface";
import { ProductInterface } from "../interfaces/ProductInterface";

export enum AiEditorStatePage {
  AiImageEditor = "aiimageeditor",
  TShirtEditor = "tshirteditor",
  AiImageHistory = "aiimagehistory",
}

export interface AiEditorOldContextInterface {
  //TODO: replate string with actual AiImageInterface (also change getController in php for that)
  image: AiImageInterface | null;
  setImage: (image: AiImageInterface | null) => void;

  imageFile: File | null;
  setImageFile: (imageFile: File | null) => void;

  isImageLoading: boolean;
  setIsImageLoading: (isImageLoading: boolean) => void;

  currentStatePage: AiEditorStatePage;
  setCurrentStatePage: (currentStatePage: AiEditorStatePage) => void;

  backgroundRemoved: boolean;
  setBackgroundRemoved: (backgroundRemoved: boolean) => void;

  imagePlacedOnObject: string | null;
  setImagePlacedOnObject: (imagePlacedOnObject: string | null) => void;

  historyImages: AiImageInterface[];
  setHistoryImages: (historyImages: AiImageInterface[]) => void;

  shirtColorVariantId: number;
  setShirtColorVariantId: (shirtColorVariantId: number) => void;

  quantity: number;
  setQuantity: (quantity: number) => void;

  color: string;
  setColor: (color: string) => void;

  size: string;
  setSize: (size: string) => void;

  products: ProductInterface[];
  setProducts: (products: ProductInterface[]) => void;

  productId: number;
}

export const AiEditorOldContext = createContext<AiEditorOldContextInterface>({
  image: null,
  setImage: (image: AiImageInterface | null) => {},

  imageFile: null,
  setImageFile: (imageFile: File | null) => {},

  isImageLoading: false,
  setIsImageLoading: (isImageLoading: boolean) => {},

  currentStatePage: AiEditorStatePage.AiImageEditor,
  setCurrentStatePage: (currentStatePage: AiEditorStatePage) => {},

  backgroundRemoved: false,
  setBackgroundRemoved: (backgroundRemoved: boolean) => {},

  imagePlacedOnObject: null,
  setImagePlacedOnObject: (imagePlacedOnObject: string | null) => {},

  historyImages: [],
  setHistoryImages: (historyImages: AiImageInterface[]) => {},

  shirtColorVariantId: 4018,
  setShirtColorVariantId: (shirtColorVariantId: number) => {},

  quantity: 1,
  setQuantity: (quantity: number) => {},

  color: "white",
  setColor: (color: string) => {},

  size: "S",
  setSize: (size: string) => {},

  products: [],
  setProducts: (products: ProductInterface[]) => {},

  productId: 0,
});
