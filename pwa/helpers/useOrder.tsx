import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ApiPlatformResponse } from "../interfaces/ApiPlatformResponseInterface";
import {
  OrderInterface,
  PrintfulOrderCreateInterface,
  PrintfulOrderInterface,
  PrintfulOrdersResponse,
} from "../interfaces/OrderInterface";
import { UserContext } from "../providers/UserContext";
import {
  createPrintfulOrder,
  fetchPrintfulOrder,
  fetchPrintfulOrders,
  fetchPrintfulSyncProduct,
  fetchStripePaymentMethod,
} from "./DataQueries";
import { useCart } from "./useCart";

export function useOrder() {
  const [order, setOrder] = useState<PrintfulOrderInterface>();
  const [paymentMethod, setPaymentMethod] = useState<any>();
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);

  const router = useRouter();

  async function createOrder(sessionId: string) {
    setIsOrderLoading(true);
    const newOrder = await createPrintfulOrder(sessionId);
    // fetch api platform order with get request where printfulOrderId = newOrder.id
    const response = await fetch(
      "/api/orders?printfulOrderId=" +
        newOrder.id +
        "&relatedUser=" +
        user?.["@id"]
    );
    const orders =
      (await response.json()) as ApiPlatformResponse<OrderInterface>;
    console.log("api platform orders: ", orders);
    setOrder(newOrder);
    const stripePaymentMethod = await fetchStripePaymentMethod(
      orders["hydra:member"][0].payment_method_id
    );
    setPaymentMethod(stripePaymentMethod);
    setIsOrderLoading(false);
  }

  async function prepareForCreateOrder() {
    if (!order && router.query.session_id && user) {
      await createOrder(router.query.session_id as string);
    }
  }

  useEffect(() => {
    prepareForCreateOrder();
  }, [router.query.session_id, user]);

  return {
    order,
    paymentMethod,
    isOrderLoading,
  };
}
