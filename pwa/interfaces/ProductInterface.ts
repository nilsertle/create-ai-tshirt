import { BoltSlashIcon } from "@heroicons/react/24/solid";
import { ApiPlatformItemResponse } from "./ApiPlatformResponseInterface";

export interface ProductInterface extends ApiPlatformItemResponse {
    name: string;
    description: string;
    price: number;
    cart?: string;
    image: string;
    type: string;
    color: string;
    productVariantId: number;
} 

export interface PrintfulCatalogProductInterface {
    id: number;
    main_category_id: number,
    type: string,
    description: string,
    type_name: string,
    title: string,
    brand: string,
    model: string,
    image: string,
    variant_count: number,
    currency: string,
    options: Array<PrintfulCatalogProductOptionInterface>,
    dimensions: null | any,
    is_discontinued: boolean,
    avg_fullfillment_time: null | string,
    techniques: Array<PrintfulCatalogProductTechniqueInterface>,
    files: Array<PrintfulCatalogProductFileInterface>,


}

export interface PrintfulCatalogProductTechniqueInterface {
    key :  string,
    display_name: string,
    is_default: boolean,
}

export interface PrintfulCatalogProductOptionInterface {
    id: number,
    title: string,
    type: string,
    values: null | Array<PrintfulCatalogProductOptionValueInterface>,
    additional_price: null | number,
    additional_price_breakdown: [] | Array<PrintfulCatalogProductAdditionalPriceBreakdownInterface>,
}

export interface PrintfulCatalogProductFileInterface {
    id: number,
    type: string,
    title: string,
    additional_price: null | string,
    options: [] | Array<any>,
}

export interface PrintfulCatalogProductAdditionalPriceBreakdownInterface {
    flat: string,
    "3d": string,
    both: string,
}

export interface PrintfulCatalogProductOptionValueInterface {
  "#FFFFFF": string;
  "#000000": string;
  "#96A1A8": string;
  "#A67843": string;
  "#FFCC00": string;
  "#E25C27": string;
  "#CC3366": string;
  "#CC3333": string;
  "#660000": string;
  "#333366": string;
  "#005397": string;
  "#3399FF": string;
  "#6B5294": string;
  "#01784E": string;
  "#7BA35A": string;
}