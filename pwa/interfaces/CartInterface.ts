import {
  ApiPlatformItemResponse,
  ApiPlatformResponse,
} from "./ApiPlatformResponseInterface";
import { ProductInterface } from "./ProductInterface";
import { AuthenticatedUserInterface } from "./UserInterface";

export interface CartInterface extends ApiPlatformItemResponse {
  relatedUser?: AuthenticatedUserInterface;
  quantity: number;
  size: string;
  color: string;
  price: number;
  syncProductId: number;
  position: string;
}
export interface CartUpdateInterface {
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface CartCreateInterface {
  relatedUser: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  syncProductId: number;
  /**
   * {
      "area_width": number,
      "area_height": number,
      "width": number,
      "height": number,
      "top": number,
      "left": number
   * }
   */
  position: string;
}
