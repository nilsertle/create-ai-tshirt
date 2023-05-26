import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserContext";
import AddressForm from "./AddressForm";
import * as Yup from "yup";
import { deleteAddress, updateAddress } from "../../helpers/DataQueries";
import FancyButton from "../basics/FancyButton";
import { AddressInterface } from "../../interfaces/AddressInterface";

interface UpdateAddressFormProps {
  address?: AddressInterface;
}

function UpdateAddressForm({ address }: UpdateAddressFormProps) {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user, refetch } = useContext(UserContext);

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

  async function handleUpdateAddress() {
    setLoading(true);
    await formik.setTouched({
      city: true,
      state: true,
      postal_code: true,
      country: true,
      line1: true,
      line2: true,
    });
    const errors = await formik.validateForm(formik.values);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }
    if (
      address?.city &&
      address?.postal_code &&
      address?.country &&
      address?.line1
    ) {
      const updateResponse = await updateAddress(address.id, {
        city: formik.values.city,
        state: formik.values.state,
        postal_code: formik.values.postal_code,
        country: formik.values.country,
        line1: formik.values.line1,
        line2: formik.values.line2,
      });
    }
    refetch();
    setLoading(false);
  }

  async function handleDeleteAddress() {
    if (!address?.id) return;
    setDeleteLoading(true);
    await deleteAddress(address.id);
    refetch();
    setDeleteLoading(false);
  }

  useEffect(() => {
    if (address) {
      formik.setValues({
        city: address?.city ?? "",
        state: address?.state ?? "",
        postal_code: address?.postal_code ?? "",
        country: address?.country ?? "",
        line1: address?.line1 ?? "",
        line2: address?.line2 ?? "",
      });
    }
  }, [address, user?.shippingAddresses]);

  return (
    <div className="flex flex-col gap-6">
      <AddressForm formik={formik} />
      <div className="flex flex-row items-center gap-2 self-end">
        <FancyButton
          primaryText="Delete Address"
          bgColor="transparent"
          onClick={handleDeleteAddress}
          loading={deleteLoading}
        />
        <FancyButton
          primaryText="Update Address"
          bgColor="primary"
          onClick={handleUpdateAddress}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default UpdateAddressForm;
