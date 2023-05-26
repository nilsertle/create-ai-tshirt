import { CreditCardIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import FancyButton from "../../components/basics/FancyButton";
import Layout from "../../components/common/Layout";
import ResponsiveHeading from "../../components/ResponsiveHeading/ResponsiveHeading";
import ShippingProgress from "../../components/Shipping/ShippingProgress";
import {
  fetchPrintfulOrderFromServerSide,
  fetchStripePaymentMethod,
  fetchStripePaymentMethodFromServerSideProps,
} from "../../helpers/DataQueries";
import { ApiPlatformResponse } from "../../interfaces/ApiPlatformResponseInterface";
import {
  OrderInterface,
  PrintfulOrderInterface,
} from "../../interfaces/OrderInterface";
import { UserContext } from "../../providers/UserContext";
import { NextPageWithLayout } from "../_app";

// const order = {
//   code: 200,
//   result: {
//     id: 13,
//     external_id: "4235234213",
//     store: 10,
//     status: "draft",
//     shipping: "STANDARD",
//     shipping_service_name: "Flat Rate (3-4 business days after fulfillment)",
//     created: 1602607640,
//     updated: 1602607640,
//     recipient: {
//       name: "John Smith",
//       company: "John Smith Inc",
//       address1: "19749 Dearborn St",
//       address2: "string",
//       city: "Chatsworth",
//       state_code: "CA",
//       state_name: "California",
//       country_code: "US",
//       country_name: "United States",
//       zip: 91311,
//       phone: "string",
//       email: "string",
//       tax_number: "123.456.789-10",
//     },
//     items: [
//       {
//         id: 1,
//         external_id: "item-1",
//         variant_id: 1,
//         sync_variant_id: 1,
//         external_variant_id: "variant-1",
//         warehouse_product_variant_id: 1,
//         product_template_id: 1,
//         quantity: 1,
//         price: "13.00",
//         retail_price: "13.00",
//         name: "Enhanced Matte Paper Poster 18×24",
//         product: {
//           variant_id: 3001,
//           product_id: 301,
//           image:
//             "https://files.cdn.printful.com/products/71/5309_1581412541.jpg",
//           name: "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)",
//         },
//         files: [
//           {
//             type: "default",
//             id: 10,
//             url: "string",
//             options: [
//               {
//                 id: "template_type",
//                 value: "native",
//               },
//             ],
//             hash: "ea44330b887dfec278dbc4626a759547",
//             filename: "shirt1.png",
//             mime_type: "image/png",
//             size: 45582633,
//             width: 1000,
//             height: 1000,
//             dpi: 300,
//             status: "ok",
//             created: 1590051937,
//             thumbnail_url:
//               "https://files.cdn.printful.com/files/ea4/ea44330b887dfec278dbc4626a759547_thumb.png",
//             preview_url:
//               "https://files.cdn.printful.com/files/ea4/ea44330b887dfec278dbc4626a759547_thumb.png",
//             visible: true,
//             is_temporary: false,
//           },
//         ],
//         options: [
//           {
//             id: "OptionKey",
//             value: "OptionValue",
//           },
//         ],
//         sku: null,
//         discontinued: true,
//         out_of_stock: true,
//       },
//       {
//         id: 2,
//         external_id: "item-1",
//         variant_id: 1,
//         sync_variant_id: 1,
//         external_variant_id: "variant-1",
//         warehouse_product_variant_id: 1,
//         product_template_id: 1,
//         quantity: 1,
//         price: "13.00",
//         retail_price: "13.00",
//         name: "Enhanced Matte Paper Poster 18×24",
//         product: {
//           variant_id: 3001,
//           product_id: 301,
//           image:
//             "https://files.cdn.printful.com/products/71/5309_1581412541.jpg",
//           name: "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)",
//         },
//         files: [
//           {
//             type: "default",
//             id: 10,
//             url: "string",
//             options: [
//               {
//                 id: "template_type",
//                 value: "native",
//               },
//             ],
//             hash: "ea44330b887dfec278dbc4626a759547",
//             filename: "shirt1.png",
//             mime_type: "image/png",
//             size: 45582633,
//             width: 1000,
//             height: 1000,
//             dpi: 300,
//             status: "ok",
//             created: 1590051937,
//             thumbnail_url:
//               "https://files.cdn.printful.com/files/ea4/ea44330b887dfec278dbc4626a759547_thumb.png",
//             preview_url:
//               "https://files.cdn.printful.com/files/ea4/ea44330b887dfec278dbc4626a759547_thumb.png",
//             visible: true,
//             is_temporary: false,
//           },
//         ],
//         options: [
//           {
//             id: "OptionKey",
//             value: "OptionValue",
//           },
//         ],
//         sku: null,
//         discontinued: true,
//         out_of_stock: true,
//       },
//     ],
//     branding_items: [
//       {
//         id: 1,
//         external_id: "item-1",
//         variant_id: 1,
//         sync_variant_id: 1,
//         external_variant_id: "variant-1",
//         warehouse_product_variant_id: 1,
//         product_template_id: 1,
//         quantity: 1,
//         price: "13.00",
//         retail_price: "13.00",
//         name: "Enhanced Matte Paper Poster 18×24",
//         product: {
//           variant_id: 3001,
//           product_id: 301,
//           image:
//             "https://files.cdn.printful.com/products/71/5309_1581412541.jpg",
//           name: "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)",
//         },
//         files: [
//           {
//             type: "default",
//             id: 10,
//             url: "string",
//             options: [
//               {
//                 id: "template_type",
//                 value: "native",
//               },
//             ],
//             hash: "ea44330b887dfec278dbc4626a759547",
//             filename: "shirt1.png",
//             mime_type: "image/png",
//             size: 45582633,
//             width: 1000,
//             height: 1000,
//             dpi: 300,
//             status: "ok",
//             created: 1590051937,
//             thumbnail_url:
//               "https://files.cdn.printful.com/files/ea4/ea44330b887dfec278dbc4626a759547_thumb.png",
//             preview_url:
//               "https://files.cdn.printful.com/files/ea4/ea44330b887dfec278dbc4626a759547_thumb.png",
//             visible: true,
//             is_temporary: false,
//           },
//         ],
//         options: [
//           {
//             id: "OptionKey",
//             value: "OptionValue",
//           },
//         ],
//         sku: null,
//         discontinued: true,
//         out_of_stock: true,
//       },
//     ],
//     incomplete_items: [
//       {
//         name: "Red T-Shirt",
//         quantity: 1,
//         sync_variant_id: 70,
//         external_variant_id: "external-id",
//         external_line_item_id: "external-line-item-id",
//       },
//     ],
//     costs: {
//       currency: "USD",
//       subtotal: "10.00",
//       discount: "0.00",
//       shipping: "5.00",
//       digitization: "0.00",
//       additional_fee: "0.00",
//       fulfillment_fee: "0.00",
//       retail_delivery_fee: "0.00",
//       tax: "0.00",
//       vat: "0.00",
//       total: "15.00",
//     },
//     retail_costs: {
//       currency: "USD",
//       subtotal: "10.00",
//       discount: "0.00",
//       shipping: "5.00",
//       tax: "0.00",
//       vat: "0.00",
//       total: "15.00",
//     },
//     pricing_breakdown: [
//       {
//         customer_pays: "3.75",
//         printful_price: "6",
//         profit: "-2.25",
//         currency_symbol: "USD",
//       },
//     ],
//     shipments: [
//       {
//         id: 10,
//         carrier: "FEDEX",
//         service: "FedEx SmartPost",
//         tracking_number: 0,
//         tracking_url:
//           "https://www.fedex.com/fedextrack/?tracknumbers=0000000000",
//         created: 1588716060,
//         ship_date: "2020-05-05",
//         shipped_at: 1588716060,
//         reshipment: false,
//         items: [
//           {
//             item_id: 1,
//             quantity: 1,
//             picked: 1,
//             printed: 1,
//           },
//         ],
//       },
//     ],
//     gift: {
//       subject: "To John",
//       message: "Have a nice day",
//     },
//     packing_slip: {},
//   },
// };

const Page = ({ order }: { order: PrintfulOrderInterface }) => {
  const { user } = useContext(UserContext);

  const [paymentMethod, setPaymentMethod] = useState<any>(null);

  async function handleFetchPaymentMethod() {
    const response = await fetch("/api/orders?printfulOrderId=" + order.id);
    const orders =
      (await response.json()) as ApiPlatformResponse<OrderInterface>;
    const stripePaymentMethod = await fetchStripePaymentMethod(
      orders["hydra:member"]?.[0].payment_method_id
    );
    setPaymentMethod(stripePaymentMethod);
  }

  useEffect(() => {
    if (user) {
      handleFetchPaymentMethod();
    }
  }, [user]);
  // const { id } = useRouter().query;
  if (!order) return <div>loading</div>;
  return (
    <ResponsiveHeading backRoute="/order/history" title={`Order #${order.id}`}>
      <div className="flex flex-col gap-10">
        <div className="-mb-4 flex w-full items-center justify-between self-start">
          <FancyButton primaryText="View Invoice" outlined sqaure />
          <div className=" flex flex-row gap-2 self-end [&>*]:text-sm">
            <p className="text-gray-400">Order placed</p>
            <p>{new Date(order.created * 1000).toLocaleDateString("de-DE")}</p>
          </div>
        </div>

        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex w-full flex-col divide-y divide-gray-200 rounded-lg border border-gray-200 [&>*]:p-8"
          >
            <div className="flex flex-col gap-10 lg:flex-row">
              <img
                alt=""
                src={item.product.image}
                className="aspect-square rounded-lg object-cover shadow-md sm:h-80 lg:h-40 "
              />
              <div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-base font-semibold">{item.price} €</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="whitespace-nowrap text-base font-semibold">
                    Shipping Address
                  </p>
                  <div className="flex flex-col [&>*]:whitespace-nowrap [&>*]:text-gray-400">
                    <span>{order?.recipient?.address1}</span>
                    <span>
                      {order?.recipient?.zip + " " + order?.recipient?.city}
                    </span>
                    <span>{order?.recipient?.country_name}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="whitespace-nowrap text-base font-semibold">
                    Get Shipping Updates
                  </p>
                  <div className="flex flex-col [&>*]:whitespace-nowrap [&>*]:text-gray-400">
                    <span>{order.recipient.email ?? user?.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <ShippingProgress defaultShippingState={2} />
          </div>
        ))}
        <div className="mt-8 flex flex-row flex-wrap items-start justify-between gap-8 rounded-lg bg-lightGray p-8">
          <div className="flex flex-col gap-2">
            <p className="whitespace-nowrap text-base font-semibold">
              Billing Address
            </p>
            <div className="flex flex-col [&>*]:whitespace-nowrap [&>*]:text-gray-400">
              <span>{order?.recipient?.address1}</span>
              <span>
                {order?.recipient?.zip + " " + order?.recipient?.city}
              </span>
              <span>{order?.recipient?.country_name}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="whitespace-nowrap text-base font-semibold">
              Payment Information
            </p>
            <div className="flex flex-row gap-3">
              {paymentMethod?.card?.brand === "visa" ? (
                <Image
                  className="h-8 w-8 object-contain"
                  src={"/visa-card-logo.png"}
                  width={60}
                  height={60}
                  alt="visa card logo"
                />
              ) : paymentMethod?.card?.brand === "mastercard" ? (
                <Image
                  className="h-8 w-8 object-contain"
                  src={"/mastercard-card-logo.png"}
                  width={60}
                  height={60}
                  alt="mastercard logo"
                />
              ) : paymentMethod?.card?.brand === "amex" ? (
                <Image
                  className="h-8 w-8 object-contain"
                  src={"/american-express.png"}
                  width={60}
                  height={60}
                  alt="mastercard logo"
                />
              ) : (
                <CreditCardIcon className="h-8 w-8 text-primary" />
              )}
              <div>
                <p>Ending with {paymentMethod?.card?.last4}</p>
                <p className="text-sm text-gray-400">
                  Expires{" "}
                  {paymentMethod?.card?.exp_month +
                    " / " +
                    paymentMethod?.card?.exp_year}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-2/5">
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-400">Subtotal</p>
              <p className="font-semibold">{order.costs.subtotal + " €"}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-400">Shipping</p>
              <p className="font-semibold">{order.costs.shipping + " €"}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-400">Tax</p>
              <p className="font-semibold">{order.costs.tax + " €"}</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold text-secondary">
                {order.costs.total + " €"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveHeading>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  if (!id) return { notFound: true };
  const order = await fetchPrintfulOrderFromServerSide(id as string);

  return {
    props: {
      order,
    },
  };
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
