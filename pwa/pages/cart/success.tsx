import { ArrowRightIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import FancyButton from "../../components/basics/FancyButton";
import Layout from "../../components/common/Layout";
import LoadingSpinner from "../../components/Helper/LoadingButton";
import { createPrintfulOrder } from "../../helpers/DataQueries";
import { useOrder } from "../../helpers/useOrder";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const { order, isOrderLoading, paymentMethod } = useOrder();
  const router = useRouter();

  console.log("paymentMethod", paymentMethod);

  if (isOrderLoading)
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex w-full flex-col p-0 md:p-16 xl:flex-row">
      {/* <img
        src="https://i.pinimg.com/736x/11/cf/4f/11cf4f53f604d4271c342678060fb035.jpg"
        alt=""
        className="hidden w-1/2 rounded-l-xl xl:block"
      /> */}
      {/* gradient background */}
      <div className="hidden w-1/2 rounded-l-xl bg-gradient-to-b from-secondaryLight to-secondary xl:block"></div>
      <Image
        src="/success-graphic-mobile.png"
        alt="success graphic mobile"
        className="w-full self-center object-scale-down py-6 sm:max-w-lg md:rounded-t-xl xl:hidden"
        width={400}
        height={400}
      />

      <div className="flex w-full flex-col gap-2 border-gray-200 p-6 md:rounded-xl md:border-b md:border-l md:border-r md:border-t md:p-24 xl:w-1/2 xl:border-l-0">
        <p className="font-semibold text-secondary">Payment Successful</p>
        <h1 className="text-xl font-bold text-gray-900 sm:text-5xl">
          Thanks for ordering
        </h1>
        <p className="text-gray-400">
          We appreciate your order, we are currently processing it. So hang
          tight and we will send you confirmation soon.
        </p>
        <div className="flex flex-col divide-y divide-gray-200 [&>*]:py-8">
          <div className="mt-8 flex flex-col gap-1">
            <p>Tracking number</p>
            <p className="text-gray-400">{order?.id}</p>
          </div>
          <div className="flex w-full flex-col gap-8 ">
            {order?.items.map((item) => (
              <div key={item.id} className="flex w-full flex-row gap-6">
                <img
                  src={
                    item.files.filter((file) => file.type === "preview")?.[0]
                      ?.preview_url
                  }
                  alt=""
                  className="aspect-square h-24 w-24 rounded-lg object-cover shadow-md"
                />
                <div className="flex w-full flex-row justify-between gap-2">
                  <div className="flex flex-col gap-1 [&>*]:text-sm">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-400">Quantity: {item.quantity}</p>
                    {/* <p className="text-gray-400">L</p>
                    <p className="text-gray-400">red</p> */}
                  </div>
                  <div className="flex flex-col">
                    <p className="whitespace-nowrap text-sm font-semibold">
                      {item.price + " €"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-400">Subtotal</p>
              <p className="text-sm font-semibold">
                {order?.costs?.subtotal + " €"}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-400">Shipping</p>
              <p className="text-sm font-semibold">
                {order?.costs?.shipping + " €"}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-400">Tax</p>
              <p className="text-sm font-semibold">
                {order?.costs?.tax + " €"}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-semibold text-secondary">
              {order?.costs?.total + " €"}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-row justify-between border-b border-gray-200 pb-16">
          <div className="flex w-1/2 flex-col gap-2">
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

          <div className="flex w-1/2 flex-col gap-2">
            <p className="whitespace-nowrap text-base font-semibold">
              Payment Information
            </p>
            <div className="flex flex-row gap-3">
              {paymentMethod.card?.brand === "visa" ? (
                <Image
                  className="h-8 w-8 object-contain"
                  src={"/visa-card-logo.png"}
                  width={60}
                  height={60}
                  alt="visa card logo"
                />
              ) : paymentMethod.card?.brand === "mastercard" ? (
                <Image
                  className="h-8 w-8 object-contain"
                  src={"/mastercard-card-logo.png"}
                  width={60}
                  height={60}
                  alt="mastercard logo"
                />
              ) : paymentMethod.card?.brand === "amex" ? (
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
        </div>
        <div className="self-end py-4">
          <FancyButton
            onClick={() => router.push("/products")}
            endIcon={<ArrowRightIcon className="h-5 w-5 text-primary" />}
            primaryText="Continue Shopping"
            bgColor="transparent"
          />
        </div>
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
