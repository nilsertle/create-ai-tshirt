import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";
import Layout from "../components/common/Layout";
import { useUser } from "../helpers/UserLogic/useUser";
import { NextPageWithLayout } from "./_app";
import * as Yup from "yup";
import { UserContext } from "../providers/UserContext";
import { logInUser } from "../helpers/UserLogic/UserQueries";

const Page: NextPageWithLayout = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user, isLoading, isAuthenticated, refetch } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("You have to enter an email address"),
      password: Yup.string().required("You have to enter a password"),
    }),
    onSubmit() {},
  });

  async function handleLogIn() {
    setLoading(true);
    await formik.setTouched({ email: true, password: true });
    const errors = await formik.validateForm(formik.values);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    const userResponse = await logInUser({
      email: formik.values.email,
      password: formik.values.password,
    });
    if (userResponse.ok) {
      // toast of success
      refetch();
      router.push("/");
    } else {
      const data = await userResponse.json();
      setErrorMsg(data.message);
    }
    setLoading(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    router.push("/");
    return <>You are already Logged In</>;
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-[350px] space-y-5 rounded-xl p-4">
        <div>
          <h3 className="text-xl font-bold">Log in</h3>
          <p className="text-sm text-gray-500">
            Please Sign in to your account.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
            placeholder="ushibrickston@gmail.com"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-start text-sm font-bold text-orange-600">
              {formik.errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide text-gray-700">
            Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-start text-sm font-bold text-red-500">
              {formik.errors.password}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/signup"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Sign up
          </Link>
          <Link
            href="/signup"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot your password?
          </Link>
        </div>

        <button
          onClick={handleLogIn}
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
            <p>Log in</p>
          )}
        </button>
        {errorMsg && (
          <div className=" flex flex-row space-x-3 rounded-lg bg-red-500 p-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-white" />
            <p className="text-start  text-sm text-white">{errorMsg}</p>
          </div>
        )}

        {/* {success && (
          <div className=" flex flex-row space-x-3 bg-green-600 rounded-lg p-2">
            <CheckCircleIcon className="w-5 h-5 text-white" />
            <p className="text-white  text-start text-sm">
              You successfully signed in.
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
