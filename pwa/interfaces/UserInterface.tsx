import { AddressInterface } from "./AddressInterface";
import {
  ApiPlatformErrorResponse,
  ApiPlatformItemResponse,
} from "./ApiPlatformResponseInterface";

export interface LoginUserInterface {
  email: string;
  password: string;
}

export interface CreateUserInterface
  extends Omit<LoginUserInterface, "password"> {
  firstName: string;
  lastName: string;
  plainPassword: string;
  acceptsMarketingLicense: boolean;
}

export interface AuthenticatedUserInterface
  extends Omit<CreateUserInterface, "plainPassword">,
    Partial<ApiPlatformErrorResponse> {
  "@id"?: string;
  id: string;
  cart?: string;
  // are they really nullable?
  billingAddresses?: AddressInterface[];
  shippingAddresses?: AddressInterface[];
  checkoutSessionId?: string;
  stripeCustomerId?: string;
  profilePicture?: string;
}
