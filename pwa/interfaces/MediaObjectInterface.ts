import {
  ApiPlatformItemResponse,
  ApiPlatformResponse,
} from "./ApiPlatformResponseInterface";
import { ProductInterface } from "./ProductInterface";
import { AuthenticatedUserInterface } from "./UserInterface";

export interface MediaObjectInterface extends ApiPlatformItemResponse {
  owner: AuthenticatedUserInterface;
  createdAt?: string;
  updatedAt?: string;
  type?: string;
  /**
   * Filename of uploaded file
   */
  originalFileName?: string;
  fileSize?: number;
  public?: boolean;
  /**
   * Filename stored on digital ocean space
   */
  fileName?: string;
  /**
   * Public url of uploaded file
   */
  objectUrl?: string;
}
export interface MediaObjectUpdateInterface {}

export interface MediaObjectCreateInterface {}
