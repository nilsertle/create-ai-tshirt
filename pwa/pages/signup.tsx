import { Formik, useFormik } from "formik";
import Link from "next/link";
import { ReactElement, useState } from "react";
import Layout from "../components/common/Layout";
import { NextPageWithLayout } from "./_app";
import * as Yup from "yup";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import FancyButton from "../components/basics/FancyButton";
import { useRouter } from "next/router";
import { createUser } from "../helpers/UserLogic/UserQueries";

const Page: NextPageWithLayout = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      plainPassword: "",
      repeatPassword: "",
      acceptsMarketingLicense: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("You have to enter a first name"),
      lastName: Yup.string().required("You have to enter a last name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("You have to enter an email address"),
      plainPassword: Yup.string().required("You have to enter a password"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("plainPassword"), null], "Passwords must match")
        .required("You have to repeat your password"),
      acceptsMarketingLicense: Yup.boolean().oneOf(
        [true],
        "You have to accept the marketing license"
      ),
    }),
    onSubmit() {},
  });

  async function handleCreateUser() {
    setLoading(true);
    setErrorMsg("");
    setSuccessMessage("");
    await formik.setTouched({
      firstName: true,
      lastName: true,
      email: true,
      plainPassword: true,
      repeatPassword: true,
      acceptsMarketingLicense: true,
    });
    const errors = await formik.validateForm(formik.values);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      console.log("errors", errors, formik.values);
      return;
    }

    const response = await createUser({
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      plainPassword: formik.values.plainPassword,
      acceptsMarketingLicense: formik.values.acceptsMarketingLicense,
    });
    console.log("response", response);
    if (response["hydra:description"]) {
      setErrorMsg(response["hydra:description"]);
    }
    if (response["@id"]) {
      setSuccessMessage(
        `User "${response.firstName + response.lastName}" created successfully`
      );
    }
    setLoading(false);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-[350px] space-y-3 rounded-xl p-4">
        <div>
          <h3 className="text-xl font-bold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Please Sign up to start purchasing products.
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Firstname
          </label>
          <input
            name="firstName"
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.firstName}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Lastname
          </label>
          <input
            name="lastName"
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.lastName}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Email
          </label>
          <input
            name="email"
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none "
            placeholder="ushibrickston@gmail.com"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.email}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Password
          </label>
          <input
            name="plainPassword"
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none "
            type="password"
            value={formik.values.plainPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.plainPassword && formik.errors.plainPassword ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.plainPassword}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Repeat Password
          </label>
          <input
            name="repeatPassword"
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
            type="password"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.repeatPassword}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex space-x-2">
            <input
              name="acceptsMarketingLicense"
              className="rounded-lg border border-gray-300"
              type="checkbox"
              checked={formik.values.acceptsMarketingLicense}
              onChange={formik.handleChange}
            />
            <label className="text-sm font-medium tracking-wide text-gray-700">
              Accept marketing
            </label>
          </div>
          {formik.touched.acceptsMarketingLicense &&
          formik.errors.acceptsMarketingLicense ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.acceptsMarketingLicense}
            </p>
          ) : null}
        </div>

        <div className="flex w-full items-center justify-end">
          <Link
            href="/login"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Already have an Account? Sign in.
          </Link>
        </div>
        <button
          onClick={handleCreateUser}
          className="flex w-full cursor-pointer items-center  justify-center rounded-lg bg-gray-900 p-3 font-semibold tracking-wide text-white  shadow-lg transition duration-500 ease-in hover:bg-gray-700"
          disabled={loading ? true : false}
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-5 w-5 animate-spin fill-white text-gray-200 dark:text-gray-600 "
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <p>Sign up</p>
          )}
        </button>
        {errorMsg && (
          <div className=" flex flex-row space-x-3 rounded-lg bg-red-500 p-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-white" />
            <p className="text-start  text-sm text-white">{errorMsg}</p>
          </div>
        )}
        {successMessage && (
          <div className=" flex flex-row space-x-3 rounded-lg bg-green-500 p-2">
            <CheckCircleIcon className="h-5 w-5 text-white" />
            <p className="text-start  text-sm text-white">{successMessage}</p>
            <FancyButton
              primaryText={"Login"}
              onClick={() => router.push("/login")}
              bgColor="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
