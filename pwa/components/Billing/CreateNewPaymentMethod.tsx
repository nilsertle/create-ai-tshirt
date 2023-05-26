import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  CircleStackIcon,
  CreditCardIcon,
  CurrencyEuroIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { ChangeEvent, useContext, useState } from "react";
import { createStripePaymentMethod } from "../../helpers/DataQueries";
import * as Yup from "yup";
import { ErrorMessage, useFormik } from "formik";
import { ToastContext } from "../../providers/ToastContext";

interface CreateNewPaymentMethodProps {}

function CreateNewPaymentMethod({}: CreateNewPaymentMethodProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { addToast } = useContext(ToastContext);

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      date: "",
      cvc: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required("Card number is required")
        .matches(
          /^(\d{4} ?){4}$/,
          "Card number must be 16 digits and separated by spaces"
        ),
      date: Yup.string()
        .required("Expiration date is required")
        .matches(/^((0[1-9])|(1[0-2]))\/?([0-9]{4}|[0-9]{2})$/, "Invalid date"),
      cvc: Yup.string()
        .required("CVC is required")
        .matches(/^\d{3}$/, "CVC must be 3 digits"),
    }),
    onSubmit: () => {},
  });

  async function handleCreateNewPaymentMethod() {
    setIsLoading(true);
    await formik.setTouched({
      cardNumber: true,
      date: true,
      cvc: true,
    });
    const errors = await formik.validateForm(formik.values);
    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      return;
    }
    const res = await createStripePaymentMethod({
      type: "card",
      card: {
        number: formik.values.cardNumber.replace(/\s/g, ""),
        exp_month: parseInt(formik.values.date.split("/")[0]),
        exp_year: parseInt(formik.values.date.split("/")[1]),
        cvc: formik.values.cvc,
      },
    });
    if (res.error) {
      setErrorMessage(res.error);
      setIsLoading(false);
      return;
    }
    formik.resetForm();
    setErrorMessage("");
    setIsLoading(false);
    if (!res.error) {
      addToast({
        message: "Payment method created successfully",
        type: "success",
        id: "payment-created" + res.id,
      });
    }
  }

  const handleExpirationDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const formattedInput = input
      .replace(/\D/g, "") // Remove non-digits
      .replace(/^(\d{2})(\d{0,4})/, "$1/$2") // Format as MM/YYYY
      .slice(0, 7); // Limit to 7 characters

    formik.setFieldValue("date", formattedInput);
  };

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const formattedInput = input
      .replace(/\D/g, "") // Remove non-digits
      .slice(0, 16) // Limit to 16 digits
      .replace(/(\d{4})/g, "$1 "); // Add space after every 4 digits

    formik.setFieldValue("cardNumber", formattedInput);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Backspace" && formik.values.cardNumber.endsWith(" ")) {
      event.preventDefault();
      formik.setFieldValue("cardNumber", formik.values.cardNumber.slice(0, -1));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const formattedInput = input.replace(/\D/g, "").slice(0, 3);
    formik.setFieldValue("cvc", formattedInput);
  };

  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex flex-col gap-2 rounded-lg bg-lightGray p-4">
          <Disclosure.Button className={"flex items-start justify-between"}>
            <div>
              <p className="whitespace-nowrap text-base font-semibold">
                Add a new payment method
              </p>
              <div className="flex flex-row gap-3">
                <Image
                  className="h-8 w-8 object-contain"
                  src={"/visa-card-logo.png"}
                  width={60}
                  height={60}
                  alt="visa card logo"
                />
                <Image
                  className="h-8 w-8 object-contain"
                  src={"/mastercard-card-logo.png"}
                  width={60}
                  height={60}
                  alt="mastercard card logo"
                />
                <Image
                  className="h-8 w-8 object-contain"
                  src={"/american-express.png"}
                  width={60}
                  height={60}
                  alt="mastercard logo"
                />
              </div>
            </div>
            <ChevronDownIcon
              className={`h-5 w-5 text-primary dark:text-white ${
                open ? "rotate-180 transform" : ""
              }`}
            />
          </Disclosure.Button>

          <Disclosure.Panel>
            <div
              id="new-card-form"
              className="grid grid-cols-1 gap-6 py-4 md:grid-cols-4"
            >
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium tracking-wide text-gray-700">
                  Card Number
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <CreditCardIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 pl-10 text-base focus:outline-none"
                    type="text"
                    name="cardNumber"
                    value={formik.values.cardNumber}
                    onChange={handleCardNumberChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Card Number"
                  />
                </div>
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <p className="text-start text-sm font-bold text-red-500">
                    {formik.errors.cardNumber}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium tracking-wide text-gray-700">
                  Expiration Date
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none"
                    type="text"
                    name="date"
                    value={formik.values.date}
                    onChange={handleExpirationDateChange}
                    placeholder="MM/YYYY"
                  />
                </div>
                {formik.touched.date && formik.errors.date ? (
                  <p className="text-start text-sm font-bold text-red-500">
                    {formik.errors.date}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium tracking-wide text-gray-700">
                  CVC
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none"
                    type="text"
                    name="cvc"
                    value={formik.values.cvc}
                    onChange={handleChange}
                    placeholder="CVC"
                  />
                </div>
                {formik.touched.cvc && formik.errors.cvc ? (
                  <p className="text-start text-sm font-bold text-red-500">
                    {formik.errors.cvc}
                  </p>
                ) : null}
              </div>
            </div>
            {/* errormessage */}
            {errorMessage && (
              <p className="mb-4 text-start text-sm font-bold text-red-500">
                {errorMessage}
              </p>
            )}

            <button
              className={
                "flex h-10 w-full flex-row items-center justify-center gap-2 rounded-lg bg-primary text-white"
              }
              onClick={handleCreateNewPaymentMethod}
            >
              {isLoading ? (
                // loading spinner with tailwindcss and heroicons instead of svg
                <CurrencyEuroIcon className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <PlusIcon className="h-5 w-5" />
                  <p className="text-sm font-semibold">
                    Add a new payment method
                  </p>
                </>
              )}
            </button>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

export default CreateNewPaymentMethod;
