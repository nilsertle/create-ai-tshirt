import { Disclosure, Listbox } from "@headlessui/react";
import {
  ArrowDownIcon,
  BanknotesIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  ChangeEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import Layout from "../../components/common/Layout";
import {
  createStripePaymentMethod,
  deleteStripePaymentMethod,
  fetchStripeCustomer,
  fetchStripePaymentMethods,
  updateStripeCustomersDefaultPaymentMethod,
} from "../../helpers/DataQueries";
import { UserContext } from "../../providers/UserContext";
import { NextPageWithLayout } from "../_app";
import visaCardIcon from "../../public/visa-card-logo.svg";
import CreateNewPaymentMethod from "../../components/Billing/CreateNewPaymentMethod";
import { ModalContext } from "../../providers/ModalContext";
import CustomMenu from "../../components/basics/CustomMenu";

interface PaymentMethod {
  id: string;
  object: string;
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
    email: string | null;
    name: string | null;
    phone: string | null;
  };
  card?: {
    brand: string;
    checks: {
      address_line1_check: string | null;
      address_postal_code_check: string | null;
      cvc_check: string | null;
    };
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string | null;
    last4: string;
    networks: {
      available: string[];
      preferred: string | null;
    };
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: string | null;
  };
  created: number;
  customer: string | null;
  livemode: boolean;
  metadata: Record<string, unknown>;
  type: string;
}

interface PaymentMethodList {
  object: string;
  url: string;
  has_more: boolean;
  data: PaymentMethod[];
}

const Page: NextPageWithLayout = () => {
  const { user, isAuthenticated } = useContext(UserContext);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[] | []>(
    []
  );
  const [stripeCustomer, setStripeCustomer] = useState<any | null>(null);
  const { createModal } = useContext(ModalContext);

  async function handleBilling() {
    const _paymentMethods = await fetchStripePaymentMethods();
    console.log("paymentMethods", _paymentMethods);
    setPaymentMethods(_paymentMethods?.data);
  }

  async function handleDeletePaymentMethod(paymentMethodId: string) {
    const res = await deleteStripePaymentMethod(paymentMethodId);
    console.log("res", res);
    if (res) {
      handleBilling();
    }
  }

  useEffect(() => {
    console.log("working");
    if (isAuthenticated && user) {
      handleBilling();
    }
  }, [isAuthenticated, user]);

  async function handleFetchCustomer() {
    if (!user?.stripeCustomerId) return;
    const _stripeCustomer = await fetchStripeCustomer(user?.stripeCustomerId);
    setStripeCustomer(_stripeCustomer);
    console.log("stripeCustomer", _stripeCustomer);
  }

  async function handleUpdateStripeCustomersDefaultPaymentMethod(
    paymentMethodId: string
  ) {
    const res = await updateStripeCustomersDefaultPaymentMethod(
      paymentMethodId
    );
    console.log("res", res);
    if (res) {
      handleFetchCustomer();
    }
  }

  useEffect(() => {
    handleFetchCustomer();
  }, [user, user?.stripeCustomerId]);

  return (
    // show all payment methods
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-500">Payment Methods</h2>
      <CreateNewPaymentMethod />
      {paymentMethods?.map((paymentMethod) => {
        return (
          <div
            key={paymentMethod.id}
            className="flex flex-col gap-2 rounded-lg bg-lightGray p-4"
          >
            <div className="flex flex-row items-center justify-between">
              <p className="whitespace-nowrap text-base font-semibold">
                {paymentMethod.card?.brand}{" "}
                {stripeCustomer.invoice_settings.default_payment_method ===
                  paymentMethod.id && (
                  <span className="ml-2 rounded-md bg-green-500 px-2 py-0.5 text-sm text-primary">
                    Default
                  </span>
                )}
              </p>
              <div className="flex flex-row gap-1 rounded-lg bg-white p-0.5 shadow-sm">
                <button
                  onClick={() =>
                    createModal({
                      message:
                        "This will soon be implemented. Until then, you can delete this payment method and add a new one.",
                      type: "info",
                    })
                  }
                  className="p-1.5 hover:rounded-lg hover:bg-darkGray focus:rounded-lg focus:ring-2 focus:ring-darkGray active:ring-2 active:ring-darkGray"
                >
                  <PencilIcon className="h-4 w-4  text-primary" />
                </button>
                <button
                  onClick={() =>
                    createModal({
                      message:
                        "Are you sure you want to delete this payment method?",
                      onConfirm: () => {
                        handleDeletePaymentMethod(paymentMethod.id);
                      },
                      type: "delete",
                    })
                  }
                  className="p-1.5 hover:rounded-lg hover:bg-darkGray focus:rounded-lg focus:ring-2 focus:ring-darkGray active:ring-2 active:ring-darkGray"
                >
                  <TrashIcon className="h-4 w-4  text-primary" />
                </button>
                {stripeCustomer.invoice_settings.default_payment_method !==
                  paymentMethod.id && (
                  <button
                    onClick={() =>
                      createModal({
                        message:
                          "Are you sure you want to set this payment method as your default?",
                        type: "confirm",
                        onConfirm: () => {
                          handleUpdateStripeCustomersDefaultPaymentMethod(
                            paymentMethod.id
                          );
                        },
                      })
                    }
                    className={`p-1.5 hover:rounded-lg hover:bg-darkGray focus:rounded-lg focus:ring-2 focus:ring-darkGray active:ring-2 active:ring-darkGray`}
                  >
                    <BanknotesIcon className="h-4 w-4  text-primary" />
                  </button>
                )}
              </div>
            </div>

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
                <p>Ending with {paymentMethod.card?.last4}</p>
                <p className="text-sm text-gray-400">
                  Expires {paymentMethod.card?.exp_month}/
                  {paymentMethod.card?.exp_year}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  );
};

export default Page;
