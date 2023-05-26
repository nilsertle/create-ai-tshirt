import { ApiPlatformItemResponse } from "./ApiPlatformResponseInterface";

export interface AiImageInterface extends ApiPlatformItemResponse {
  originalImageBase64: string;
  originalImageDisplayable?: string;
  backgroundRemovedImageBase64?: string;
  backgroundRemovedImageDisplayable?: string;
  propmt: string;
}

export interface AiImageCreateInterface {
  originalUrl: string;
  backgroundRemovedUrl?: string;
  size?: number;
  users: string[];
  prompt: string;
}
