import {
  ApiPlatformItemResponse,
  ApiPlatformResponse,
} from "./ApiPlatformResponseInterface";

export interface AddressInterface extends ApiPlatformItemResponse {
  country: string;
  postal_code: string;
  state?: string;
  city: string;
  line1: string;
  line2?: string;
}

export interface AddressUpdateInterface {
  country: string;
  postal_code: string;
  state?: string;
  city: string;
  line1: string;
  line2?: string;
}

export interface AddressCreateInterface {
  country: string;
  postal_code: string;
  state?: string;
  city: string;
  line1: string;
  line2?: string;
}
