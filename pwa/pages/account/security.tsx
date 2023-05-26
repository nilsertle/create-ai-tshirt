import { useFormik } from "formik";
import { ReactElement, useContext, useState } from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import FancyButton from "../../components/basics/FancyButton";
import Layout from "../../components/common/Layout";
import { NextPageWithLayout } from "../_app";
import * as Yup from "yup";
import { UserContext } from "../../providers/UserContext";
import { ToastContext } from "../../providers/ToastContext";
import { useRouter } from "next/router";
import { logOutUser } from "../../helpers/UserLogic/UserQueries";

const Page: NextPageWithLayout = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { addToast } = useContext(ToastContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      plainPassword: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("You have to enter your old password"),
      plainPassword: Yup.string().required("You have to enter a new password"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("plainPassword"), null], "Passwords must match")
        .required("You have to repeat your password"),
    }),
    onSubmit() {},
  });

  async function handleUpdateUserPassword() {
    setErrorMsg("");
    setSuccessMessage("");
    setLoading(true);
    await formik.setTouched({
      oldPassword: true,
      plainPassword: true,
      repeatPassword: true,
    });
    const errors = await formik.validateForm(formik.values);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      console.log("errors", errors, formik.values);
      return;
    }

    // reset old password with new password
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user?.email,
        oldPassword: formik.values.oldPassword,
        plainPassword: formik.values.plainPassword,
      }),
    });
    setLoading(false);

    if (response.ok) {
      // add Toast message
      addToast({
        id: "password-updated",
        message: "Your password has been updated.",
        type: "success",
        action: {
          label: "Test it out",
          onClick: async () => {
            await logOutUser();
            router.push("/login");
          },
        },
      });
      setSuccessMessage("Your password has been updated");
    } else if (response.status === 400) {
      setErrorMsg("Old password is incorrect");
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-500">Reset Password</h2>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4 space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Old Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
            type="password"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Old Password"
          />
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.oldPassword}
            </p>
          ) : null}
        </div>
        <div className="col-span-4 space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            New Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
            type="password"
            name="plainPassword"
            value={formik.values.plainPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="New Password"
          />
          {formik.touched.plainPassword && formik.errors.plainPassword ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.plainPassword}
            </p>
          ) : null}
        </div>
        <div className="col-span-4 space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Repeat New Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
            type="password"
            name="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Repeat New Password"
          />
          {formik.touched.plainPassword && formik.errors.plainPassword ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.plainPassword}
            </p>
          ) : null}
        </div>
        {/* error message as info panel */}
        {errorMsg && (
          <div className="col-span-4">
            <div
              className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <span className="block sm:inline">{errorMsg}</span>
            </div>
          </div>
        )}
        {/* success message as info panel */}
        {successMessage && (
          <div className="col-span-4">
            <div
              className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          </div>
        )}

        <FancyButton
          primaryText="Change Password"
          bgColor="primary"
          onClick={handleUpdateUserPassword}
          loading={loading}
          disabled={
            !formik.values.oldPassword ||
            !formik.values.plainPassword ||
            !formik.values.repeatPassword ||
            loading
          }
        />
      </div>
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
