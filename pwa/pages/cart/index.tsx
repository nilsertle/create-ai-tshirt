import Head from "next/head";
import { ReactElement, useContext, useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import { NextPageWithLayout } from "../_app";
import mockupTshirtImage from "../../public/mockup-tshirt.svg";
import { useRouter } from "next/router";
import { fetchPrintfulSyncProducts } from "../../helpers/DataQueries";
import { UserContext } from "../../providers/UserContext";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../helpers/useCart";
import AddressForm from "../../components/Address/AddressForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import ChooseAddressRadioGroup from "../../components/ChooseAddressRadioGroup/ChooseAddressRadioGroup";
import Image from "next/image";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

const Page: NextPageWithLayout = ({ syncProducts }: any) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useContext(UserContext);
  const { cartItems, updateCartItemQuantity, removeItemFromCart } = useCart();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: 0,
      streetNumber: 0,
    },
    validationSchema: Yup.object({
      street: Yup.string().required("You have to enter a street"),
      city: Yup.string().required("You have to enter a city"),
      state: Yup.string().required("You have to enter a state"),
      country: Yup.string().required("You have to enter a country"),
      zip: Yup.number().required("You have to enter a zip"),
      streetNumber: Yup.number().required("You have to enter a street number"),
    }),
    onSubmit() {},
  });

  async function handleCheckout() {
    setLoading(true);
    if (true) {
      await formik.setTouched({
        street: true,
        city: true,
        state: true,
        country: true,
        zip: true,
        streetNumber: true,
      });
      // const errors = await formik.validateForm(formik.values);
      // if (Object.keys(errors).length > 0) {
      //   setLoading(false);
      //   return;
      // }
    }

    // create checkout session if all address fields are valid
    fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // redirect to stripe chechkout in new tab
        window.open(data.sessionUrl, "_blank");
      });

    setLoading(false);
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const subTotalPrice = cartItems?.reduce(
    (acc, item) => acc + (item.quantity * item.price) / 100,
    0
  );

  const totalPrice = subTotalPrice;

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Shipping Address
            </h2>
            {user?.shippingAddresses && user?.shippingAddresses?.length > 0 ? (
              <ChooseAddressRadioGroup
                onSelect={(selectedAddress) => {
                  console.log("selectedAddress", selectedAddress);
                }}
              />
            ) : (
              <AddressForm formik={formik} />
            )}

            {cartItems && cartItems?.length > 0 ? (
              <div className="mt-8">
                <ul className="space-y-4">
                  {cartItems &&
                    cartItems.map((cart, idx) => {
                      return (
                        <li
                          key={idx + cart["@id"]}
                          className="flex items-center gap-4"
                        >
                          <div className="relative h-16 w-16 rounded">
                            <Image
                              fill
                              alt=""
                              id="mockup-tshirt"
                              src={mockupTshirtImage}
                              className="z-10 h-full w-full"
                            />
                            <img
                              id="mockup-logo"
                              src={
                                syncProducts.result.find(
                                  (product: any) =>
                                    product.id === cart.syncProductId
                                ).thumbnail_url
                              }
                              className=" absolute -top-5 bottom-0 left-0 right-0 z-20 mx-auto my-auto flex h-[30%] max-h-[30%] w-[30%] max-w-[30%] items-center justify-center object-contain"
                            />
                          </div>
                          {/* <img
                            src={
                              syncProducts.result.find(
                                (product: any) =>
                                  product.id === cart.syncProductId
                              ).thumbnail_url
                            }
                            alt=""
                            className="h-16 w-16 rounded object-cover"
                          /> */}

                          <div>
                            <h3 className="text-sm text-gray-900">
                              Basic Tee 6-Pack
                            </h3>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">Size: </dt>
                                <dd className="inline">{cart.size}</dd>
                              </div>

                              <div>
                                <dt className="inline">Color: </dt>
                                <dd className="inline">{cart.color}</dd>
                              </div>
                              <div>
                                <dt className="inline">Price: </dt>
                                <dd className="inline">
                                  {(cart.quantity * cart.price) / 100}
                                </dd>
                              </div>
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <form>
                              <label htmlFor="Line1Qty" className="sr-only">
                                Quantity
                              </label>
                              <div className="flex flex-row items-center gap-2 rounded-md border-black bg-gray-100 p-2">
                                <button
                                  onClick={() => {
                                    // updateCart(cart.id, cart.quantity + 1);
                                    updateCartItemQuantity(
                                      cart.id,
                                      cart.quantity - 1
                                    );
                                  }}
                                  className=""
                                >
                                  <MinusIcon className="h-4 w-4" />
                                </button>
                                <p className="text-xs">{cart.quantity}</p>
                                <button
                                  onClick={() => {
                                    // updateCart(cart.id, cart.quantity - 1);
                                    updateCartItemQuantity(
                                      cart.id,
                                      cart.quantity + 1
                                    );
                                  }}
                                >
                                  <PlusIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </form>

                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => {
                                removeItemFromCart(cart.id);
                              }}
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>{subTotalPrice}€</dd>
                      </div>

                      {/* <div className="flex justify-between">
                        <dt>Mwst.</dt>
                        <dd>15€</dd>
                      </div> */}

                      <div className="flex justify-between">
                        <dt>Discount</dt>
                        <dd>-0€</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>{totalPrice}€</dd>
                      </div>
                    </dl>

                    {"accounts" && false && (
                      <div className="flex justify-end">
                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ml-1 mr-1.5 h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                            />
                          </svg>

                          <p className="whitespace-nowrap text-xs">
                            {"2 Accounts Applied"}
                          </p>
                        </span>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <p className="text-sm text-gray-900">Your cart is empty</p>
                {/* shop now button */}
                <div className="mt-8 flex justify-end">
                  <a
                    href="#"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const syncProducts = await fetchPrintfulSyncProducts();

  return {
    props: {
      syncProducts,
    },
  };
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
