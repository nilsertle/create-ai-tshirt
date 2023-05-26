import {
  CartCreateInterface,
  CartInterface,
  CartUpdateInterface,
} from "../interfaces/CartInterface";
import { PrintfulCatalogProductInterface } from "../interfaces/ProductInterface";

export async function fetchPrintfulCatalog() {
  const response = await fetch("/catalog");
  const jsonResponse = await response.json();
  return jsonResponse.result as PrintfulCatalogProductInterface[];
}
