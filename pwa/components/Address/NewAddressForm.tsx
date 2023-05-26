import React, { useContext, useState } from "react";
import AddressForm from "./AddressForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from "../../providers/UserContext";
import { createAddress } from "../../helpers/DataQueries";
import FancyButton from "../basics/FancyButton";
import { ToastContext } from "../../providers/ToastContext";

interface NewAddressFormProps {}

function NewAddressForm({}: NewAddressFormProps) {
  const [loading, setLoading] = useState(false);
  const { user, refetch } = useContext(UserContext);
  const { addToast } = useContext(ToastContext);

  const formik = useFormik({
    initialValues: {
      city: "",
      country: "",
      line1: "",
      line2: "",
      postal_code: "",
      state: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("You have to enter a city"),
      country: Yup.string().required("You have to enter a country"),
      line1: Yup.string().required(
        "You have to enter the Address line 1 (e.g., street, PO Box, or company name)"
      ),
      line2: Yup.string(),
      postal_code: Yup.string().required("You have to enter a state"),
      state: Yup.string(),
    }),
    onSubmit: () => {},
  });

  async function handleCreateAddress() {
    if (!user || !user.stripeCustomerId) {
      return;
    }
    setLoading(true);
    await formik.setTouched({
      city: true,
      country: true,
      line1: true,
      postal_code: true,
      state: true,
    });

    const errors = await formik.validateForm(formik.values);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }
    let addressResponse;
    if (user?.stripeCustomerId) {
      addressResponse = await createAddress(
        {
          city: formik.values.city,
          country: formik.values.country,
          line1: formik.values.line1,
          line2: formik.values.line2,
          state: formik.values.state,
          postal_code: formik.values.postal_code,
        },
        user?.stripeCustomerId
      );
    }

    formik.resetForm();
    refetch();
    setLoading(false);
    if (addressResponse?.["@id"]) {
      addToast({
        message: "Address created successfully",
        type: "success",
        id: "address-created" + addressResponse["@id"],
      });
    }
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <AddressForm formik={formik} />
      <FancyButton
        primaryText="Create Address"
        onClick={handleCreateAddress}
        bgColor="primary"
        loading={loading}
        disabled={user?.shippingAddresses && user.shippingAddresses.length >= 3}
      />
    </div>
  );
}

export default NewAddressForm;
