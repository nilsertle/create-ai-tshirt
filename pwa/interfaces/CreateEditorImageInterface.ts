import { ApiPlatformItemResponse } from "./ApiPlatformResponseInterface";
import { MediaObjectInterface } from "./MediaObjectInterface";

export interface CreateEditorImageInterface extends ApiPlatformItemResponse {
  position: "front" | "back" | "left" | "right";
  image: MediaObjectInterface;
  createEditorInstance: string;
}

export interface CreateEditorImageUpdateInterface {
  position: "front" | "back" | "left" | "right";
  image: string;
  createEditorInstance: string;
}

export interface CreateEditorImageCreateInterface {
  position: "front" | "back" | "left" | "right";
  image: string;
  createEditorInstance: string;
}
