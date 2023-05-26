import { ApiPlatformItemResponse } from "./ApiPlatformResponseInterface";

export interface PrintfulOrderInterface {
  id: number;
  external_id: null | any;
  store: number;
  status: string;
  error: null | any;
  shipping: string;
  created: number;
  updated: number;
  recipient: {
    name: string;
    company: null | any;
    address1: string;
    address2: null | any;
    city: string;
    state_code: string;
    state_name: string;
    country_code: string;
    country_name: string;
    zip: string;
    phone: null | any;
    email: null | any;
  };
  notes: null | any;
  items: {
    id: number;
    external_id: null | any;
    variant_id: number;
    sync_variant_id: number;
    external_variant_id: string;
    quantity: number;
    price: string;
    retail_price: null | any;
    name: string;
    product: {
      variant_id: number;
      product_id: number;
      image: string;
      name: string;
    };
    files: {
      id: number;
      type: string;
      hash: string;
      url: null | any;
      filename: string;
      mime_type: string;
      size: number;
      width: number;
      height: number;
      dpi: number;
      status: string;
      created: number;
      thumbnail_url: string;
      preview_url: string;
      visible: boolean;
    }[];
    options: {
      id: string;
      value: any;
    }[];
    sku: null | any;
    discontinued: boolean;
    out_of_stock: boolean;
  }[];
  is_sample: boolean;
  needs_approval: boolean;
  not_synced: boolean;
  has_discontinued_items: boolean;
  can_change_hold: boolean;
  costs: {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    digitization: string;
    additional_fee: string;
    fulfillment_fee: string;
    tax: string;
    vat: string;
    total: string;
  };
  retail_costs: {
    currency: string;
    subtotal: null | any;
    discount: null | any;
    shipping: null | any;
    tax: null | any;
    vat: null | any;
    total: null | any;
  };
  shipments: any[];
  gift: null | any;
  packing_slip: null | any;
  dashboard_url: string;
}

export interface PrintfulOrdersResponse {
  code: number;
  paging: {
    total: number;
    offset: number;
    limit: number;
  };
  result: PrintfulOrderInterface[];
}

export interface PrintfulOrderCreateInterface {
  recipient: {
    name: string;
    address1: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
  };
  items: {
    sync_variant_id: number;
    quantity: number;
  }[];
}

export interface OrderInterface extends ApiPlatformItemResponse {
  id: string;
  relatedUser: string;
  payment_method_id: string;
  printfulOrderId: string;
}

export interface OrderCreateInterface {
  relatedUser: string;
  payment_method_id: string;
  printfulOrderId: string;
}
