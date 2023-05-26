import {
  CheckIcon,
  ClockIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import CustomMenu from "../../components/basics/CustomMenu";
import FancyButton from "../../components/basics/FancyButton";
import Layout from "../../components/common/Layout";
import ResponsiveHeading from "../../components/ResponsiveHeading/ResponsiveHeading";
import { fetchPrintfulOrdersFromServerSide } from "../../helpers/DataQueries";
import { PrintfulOrderInterface } from "../../interfaces/OrderInterface";
import { NextPageWithLayout } from "../_app";

enum OrderStatus {
  "draft" = "draft",
  "failed" = "failed",
  "pending" = "pending",
  "canceled" = "canceled",
  "onhold" = "onhold",
  "partial" = "partial",
  "fulfilled" = "fulfilled",
}

const Page = ({ orders }: { orders: PrintfulOrderInterface[] }) => {
  console.log("orders in page: ", orders);
  const router = useRouter();
  return (
    <ResponsiveHeading title="Order History">
      <div className="flex flex-col gap-12">
        {orders?.map((order, idx) => {
          return (
            <div
              key={order.id}
              className="flex flex-col divide-y divide-darkGray rounded-xl border border-darkGray [&>*]:p-7"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-12">
                  <div className="flex flex-col gap-1 [&>*]:text-sm">
                    <p className="font-semibold">Order number</p>
                    <p className="text-gray-400">{order.id}</p>
                  </div>
                  <div className="hidden flex-col gap-1 sm:flex [&>*]:text-sm">
                    <p className="font-semibold">Date ordered</p>
                    <p className="text-gray-400">
                      {new Date(order.created * 1000).toLocaleDateString(
                        "de-DE"
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 [&>*]:text-sm">
                    <p className="font-semibold">Total amount</p>
                    <p className="whitespace-nowrap font-semibold">
                      {order.costs.total} €
                    </p>
                  </div>
                </div>
                <div className="hidden flex-row items-center gap-4 md:flex ">
                  <FancyButton
                    primaryText="View Order"
                    outlined
                    sqaure
                    onClick={() => router.push("/order/" + order.id)}
                  />
                  <FancyButton primaryText="View Invoice" outlined sqaure />
                </div>
                <div className="block md:hidden">
                  <CustomMenu
                    menuButton={
                      <EllipsisVerticalIcon className="h-6 w-6 text-primary" />
                    }
                    menuItems={[
                      {
                        name: "View Order",
                        icon: <ShoppingCartIcon />,
                        onClick: () => {
                          router.push("/order/" + order.id);
                        },
                      },
                      {
                        name: "View Invoice",
                        icon: <DocumentTextIcon />,
                        onClick: () => {
                          console.log("View Invoice clicked");
                        },
                      },
                    ]}
                  />
                </div>
              </div>

              {order.items.map((item, idx) => {
                return (
                  <div
                    key={item.id}
                    id="item1"
                    className="flex flex-col gap-7 p-4 sm:gap-4"
                  >
                    <div className="flex flex-row gap-5">
                      <img
                        alt=""
                        src={
                          item.files.filter(
                            (file) => file.type === "preview"
                          )?.[0]?.preview_url
                        }
                        className="aspect-square h-20 rounded-lg object-cover shadow-md sm:h-40"
                      />
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex h-full w-full flex-col items-start justify-center sm:h-min sm:flex-row sm:items-start sm:justify-between">
                          <p className="font-semibold">{item.name}</p>
                          <div className="flex flex-col items-end ">
                            <p className="font-semibold">
                              {parseFloat(item.price) * item.quantity} €
                            </p>
                            <p className="text-sm text-gray-400">
                              {item.price} €
                            </p>
                          </div>
                        </div>
                        <p className="hidden text-sm text-gray-400 sm:block">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                      {OrderStatus.fulfilled === order.status && (
                        <div className="flex flex-row items-center gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          <p>
                            Delivered on{" "}
                            {order.shipments?.[0]?.shipped_at * 1000}
                          </p>
                        </div>
                      )}
                      {OrderStatus.draft === order.status && (
                        <div className="flex flex-row items-center gap-2">
                          <ClockIcon className="h-5 w-5 text-amber-500" />
                          <p>The order has to be confirmed.</p>
                        </div>
                      )}
                      {OrderStatus.failed === order.status && (
                        <div className="flex flex-row items-center gap-2">
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                          {/* <p>
                            Delivered on{" "}
                            {order.shipments?.[0]?.shipped_at * 1000}
                          </p> */}
                        </div>
                      )}
                      <div className="flex flex-row items-center justify-between gap-4">
                        <FancyButton
                          primaryText="View product"
                          bgColor="transparent"
                          textColor="text-[#ef9e99]"
                        />
                        <FancyButton
                          primaryText="Buy again"
                          bgColor="transparent"
                          textColor="text-[#ef9e99]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </ResponsiveHeading>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const accessToken = req.cookies["BEARER"];
  if (!accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const orders = await fetchPrintfulOrdersFromServerSide(accessToken);
  console.log("orders in serverSideProps: ", orders);

  return {
    props: {
      orders: orders ?? null,
    },
  };
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
