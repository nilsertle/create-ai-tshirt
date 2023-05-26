import { useFormik } from "formik";
import { ReactElement, useContext, useEffect, useState } from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import AddressForm from "../../components/Address/AddressForm";
import FancyButton from "../../components/basics/FancyButton";
import Layout from "../../components/common/Layout";
import { UserContext } from "../../providers/UserContext";
import { NextPageWithLayout } from "../_app";
import * as Yup from "yup";
import {
  createAddress,
  retrieveStripeCustomer,
  updateAddress,
  updateUser,
} from "../../helpers/DataQueries";
import TabGroup from "../../components/Tabs/TabGroup";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import NewAddressForm from "../../components/Address/NewAddressForm";
import UpdateAddressForm from "../../components/Address/UpdateAddressForm";
import Toggle from "../../components/basics/Toggle";
import { AddressInterface } from "../../interfaces/AddressInterface";

const Page: NextPageWithLayout = () => {
  const { user, refetch } = useContext(UserContext);
  const [shippingAddress, setshippingAddress] = useState<AddressInterface>();
  const [isDifferentBillingAddress, setIsDifferentBillingAddress] =
    useState(false);
  console.log("user for address: ", user);

  useEffect(() => {
    if (user?.billingAddresses && user.billingAddresses?.length > 0) {
      setIsDifferentBillingAddress(true);
    }
  }, [user]);

  async function fetchStripeCustomer() {
    if (!user?.stripeCustomerId) {
      return;
    }
    const stripeCustomer = await retrieveStripeCustomer(user.stripeCustomerId);
    if (stripeCustomer) {
      console.log("stripeCustomer: ", stripeCustomer.customer.shipping.address);
      setshippingAddress(stripeCustomer.customer.shipping.address);
    }
  }

  useEffect(() => {
    fetchStripeCustomer();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6">
      <h2 className="text-xl font-semibold text-gray-500">Shipping Address</h2>
      <div className="flex flex-col gap-3">
        <TabGroup
          tabs={[
            <div>{shippingAddress?.line1 + " " + shippingAddress?.city}</div>,
            <div
              onClick={(e) => {
                console.log("add item");
              }}
              key={"addItem"}
            >
              <PlusCircleIcon className="h-5 w-5" />
            </div>,
          ]}
        >
          {[
            shippingAddress && (
              <div>
                <UpdateAddressForm address={shippingAddress} />
              </div>
            ),
            <div key={3}>
              <NewAddressForm />
            </div>,
          ]}
        </TabGroup>
      </div>
      <h2 className="text-xl font-semibold text-gray-500">Billing Address</h2>
      <div className="flex flex-row items-center gap-4">
        <Toggle
          onChange={() => {
            setIsDifferentBillingAddress(!isDifferentBillingAddress);
          }}
          defaultToggled={isDifferentBillingAddress}
        />
        <p>Do you have a different Billing Address?</p>
      </div>
      {isDifferentBillingAddress && (
        <div>
          <UpdateAddressForm />
        </div>
      )}

      {/* <AddressForm formik={formik} /> */}
      {/* <FancyButton
        primaryText="Update Address"
        bgColor="primary"
        onClick={() => {
          handleCreateAddress(addressFormik1, firstShippingAddress?.id);
          handleCreateAddress(addressFormik2, secondShippingAddress?.id);
          handleCreateAddress(addressFormik3, thirdShippingAddress?.id);
        }}
        loading={createAddressLoading}
      /> */}
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
