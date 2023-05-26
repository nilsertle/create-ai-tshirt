import { ApiPlatformResponse } from "../interfaces/ApiPlatformResponseInterface";
import {
  CartCreateInterface,
  CartInterface,
  CartUpdateInterface,
} from "../interfaces/CartInterface";
import { ReviewInterface } from "../interfaces/ReviewInterface";

export async function createCart(cart: CartCreateInterface) {
  const response = await fetch("/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  return (await response.json()) as CartInterface;
}

export async function updateCartItem(
  cartId: string,
  cartItem: CartUpdateInterface
) {
  const response = await fetch(`/api/carts/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItem),
  });
  return await response.json();
}

export async function deleteCartItem(cartId: string) {
  await fetch(`/api/carts/${cartId}`, {
    method: "DELETE",
  });
}

export async function fetchReviews() {
  const response = await fetch("/api/reviews");
  const jsonResponse =
    (await response.json()) as ApiPlatformResponse<ReviewInterface>;
  return jsonResponse["hydra:member"];
}
