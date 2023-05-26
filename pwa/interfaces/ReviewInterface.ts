import {
  ApiPlatformItemResponse,
  ApiPlatformResponse,
} from "./ApiPlatformResponseInterface";
import { ProductInterface } from "./ProductInterface";
import { AuthenticatedUserInterface } from "./UserInterface";

export interface ReviewInterface extends ApiPlatformItemResponse {
  stars: 0 | 1 | 2 | 3 | 4 | 5;
  comment?: string;
  product: string;
  author?: Pick<AuthenticatedUserInterface, "id" | "firstName" | "lastName">;
}

export interface ReviewCreateInterface {
  stars: 0 | 1 | 2 | 3 | 4 | 5;
  comment?: string;
  product: string;
  author?: string;
}
