import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
interface AddressFormProps {
  formik: any;
}

function AddressForm({ formik }: AddressFormProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div id="address" className="grid grid-cols-1 gap-6 md:grid-cols-4 ">
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          Country
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
          type="text"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Country"
        />
        {formik.touched.country && formik.errors.country ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.country}
          </p>
        ) : null}
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          State
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
          type="text"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="State / Provice / Region"
        />
        {formik.touched.state && formik.errors.state ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.state}
          </p>
        ) : null}
      </div>
      <div className="space-y-2 md:col-span-4">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          Address Line 1
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
          type="text"
          name="line1"
          value={formik.values.line1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Address line 1 (e.g., street, PO Box, or company name)"
        />
        {formik.touched.line1 && formik.errors.line1 ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.line1}
          </p>
        ) : null}
      </div>
      <div className="space-y-2 md:col-span-4">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          Address Line 2
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
          type="text"
          name="line2"
          value={formik.values.line2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Address line 2 (e.g., apartment, suite, unit, or building)"
        />
        {formik.touched.line2 && formik.errors.line2 ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.line2}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          Postal Code
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
          type="text"
          name="postal_code"
          value={formik.values.postal_code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your postal_code"
        />
        {formik.touched.postal_code && formik.errors.postal_code ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.postal_code}
          </p>
        ) : null}
      </div>
      <div className="space-y-2 md:col-span-3">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          City
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
          type="text"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your City"
        />
        {formik.touched.city && formik.errors.city ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.city}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default AddressForm;
