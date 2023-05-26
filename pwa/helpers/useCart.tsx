import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  CartCreateInterface,
  CartInterface,
} from "../interfaces/CartInterface";
import { ModalContext } from "../providers/ModalContext";
import { ToastContext } from "../providers/ToastContext";
import { UserContext } from "../providers/UserContext";
import {
  createCart,
  deleteCartItem,
  updateCartItem,
} from "./ApiPlatformQueries";
import { useUser } from "./UserLogic/useUser";

export function useCart() {
  const { user } = useContext(UserContext);
  const { addToast } = useContext(ToastContext);
  const [cartItems, setCartItems] = useState<CartInterface[] | null>(null);
  const [refetchCartItems, setRefetchCartItems] = useState<boolean>(false);
  const router = useRouter();
  const { createModal } = useContext(ModalContext);

  /*
   * adds new cart item or updates quantity if item already exists
   */
  async function addItemToCart(
    newCartItem: CartCreateInterface,
    /**
     * error toast is always enabled
     */
    buyNow: boolean = false
  ) {
    if (!user || !user["@id"]) {
      return;
    }
    const cartItemExists = cartItems?.find(
      (cartItem) =>
        cartItem.color === newCartItem.color &&
        cartItem.size === newCartItem.size &&
        cartItem.position === newCartItem.position &&
        cartItem.syncProductId === newCartItem.syncProductId
    );
    if (!cartItemExists) {
      // TODO: toast ids should be random and unique (right now all the same)
      const cart = await createCart(newCartItem);
      if (cart["@id"]) {
        setCartItems([...(cartItems ?? []), cart]);
        if (buyNow) {
          router.push("/cart");
        } else {
          addToast({
            id:
              cart["@id"] +
              window.crypto.getRandomValues(new Uint32Array(1))[0],
            message: "Item added to cart",
            type: "success",
            action: {
              label: "Checkout",
              onClick: () => {
                router.push("/cart");
              },
            },
            duration: "infinite",
          });
        }
      } else {
        addToast({
          id:
            cart["@id"] + window.crypto.getRandomValues(new Uint32Array(1))[0],
          message: "Something went wrong",
          type: "error",
        });
      }
    }
  }

  /*
   * removes whole cart item (no matter what quantity)
   */
  async function removeItemFromCart(cartId: string) {
    await deleteCartItem(cartId);
    setCartItems(
      (prev) => prev?.filter((cartItem) => cartItem.id !== cartId) ?? null
    );
  }

  async function updateCartItemQuantity(cartId: string, quantity: number) {
    const cartItemExists = cartItems?.find(
      (cartItem) => cartItem.id === cartId
    );
    if (!cartItemExists) {
      return;
    }
    const cart = await updateCartItem(cartId, {
      ...cartItemExists,
      quantity: quantity,
    });
    setCartItems([
      ...(cartItems?.filter((cI) => cI.id !== cartItemExists.id) ?? []),
      cart,
    ]);
  }

  useEffect(() => {
    async function setUpCart() {
      if (!user || !user["@id"]) {
        return;
      }
      const res = await fetch("/api/carts");
      const fetchedCartItems = await res.json();
      setCartItems(fetchedCartItems["hydra:member"] as CartInterface[]);
    }
    setUpCart();
  }, [user, refetchCartItems]);

  return {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
  };
}
