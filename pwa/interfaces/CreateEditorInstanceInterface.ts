import { ApiPlatformItemResponse } from "./ApiPlatformResponseInterface";
import { CreateEditorImageInterface } from "./CreateEditorImageInterface";
import { MediaObjectInterface } from "./MediaObjectInterface";

export interface CreateEditorInstanceInterface extends ApiPlatformItemResponse {
  relatedUser: string;
  printfulCatalogProductId: string;
  selectedPrintfulVariant: string;
  chosenImages: CreateEditorImageInterface[];
}

export interface CreateEditorInstanceUpdateInterface {
  printfulCatalogProductId: string;
  selectedPrintfulVariant: string;
}

export interface CreateEditorInstanceCreateInterface {
  printfulCatalogProductId: string;
  selectedPrintfulVariant: string;
  chosenImages: string[];
}
