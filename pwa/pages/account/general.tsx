import { ReactElement, useContext, useEffect, useState } from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import FancyButton from "../../components/basics/FancyButton";
import Layout from "../../components/common/Layout";
import { UserContext } from "../../providers/UserContext";
import { NextPageWithLayout } from "../_app";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthenticatedUserInterface } from "../../interfaces/UserInterface";
import { ToastContext } from "../../providers/ToastContext";
import { createMediaObject } from "../../helpers/DataQueries";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "../../providers/ModalContext";

const Page: NextPageWithLayout = () => {
  const { user, refetch } = useContext(UserContext);
  const { addToast } = useContext(ToastContext);
  const [hovered, setHovered] = useState(false);
  const { createModal } = useContext(ModalContext);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("You have to enter your first name"),
      lastName: Yup.string().required("You have to enter your last name"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit() {},
  });

  async function handleUpdateUser() {
    await formik.setTouched({
      firstName: true,
      lastName: true,
      email: true,
    });
    const errors = await formik.validateForm(formik.values);
    if (Object.keys(errors).length > 0) {
      console.log("errors", errors, formik.values);
      return;
    }

    const response = await fetch("/api/users/" + user?.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
      body: JSON.stringify({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        // email: formik.values.email, // -> right now we don't allow to change the email
      }),
    });
    const updatedUser = (await response.json()) as AuthenticatedUserInterface;
    console.log("updatedUser", updatedUser);
    refetch();
  }

  useEffect(() => {
    console.log("user", user);
    formik.setValues({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
  }, [user]);

  async function handleFileUpload(file: File) {
    if (file) {
      const uploadedImage = await createMediaObject(file);
      if (uploadedImage.objectUrl) {
        const response = await fetch("/api/users/" + user?.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/merge-patch+json",
          },
          body: JSON.stringify({
            profilePicture: uploadedImage.objectUrl,
          }),
        });
        const updatedUser =
          (await response.json()) as AuthenticatedUserInterface;
        refetch();
        const randomId = Math.random().toString(36).substring(2, 100);
        addToast({
          message: "Profile Picture uploaded",
          type: "success",
          id: randomId,
        });
      }
    }
  }

  async function handleDeleteProfilePicture() {
    const response = await fetch("/api/users/" + user?.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
      body: JSON.stringify({
        profilePicture: null,
      }),
    });
    const updatedUser = (await response.json()) as AuthenticatedUserInterface;
    refetch();
    const randomId = Math.random().toString(36).substring(2, 100);
    if (updatedUser?.profilePicture === null) {
      addToast({
        message: "Profile Picture deleted",
        type: "success",
        id: randomId,
      });
    }
  }

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  const initials = user?.lastName?.charAt(0);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <div className="flex flex-row items-center gap-6 md:col-span-4">
        {user?.profilePicture ? (
          <div
            className="relative h-20 w-20 overflow-hidden rounded-full"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <img
              className="h-full w-full rounded-full object-cover"
              src={user?.profilePicture}
              alt="Rounded avatar"
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
            <span className="text-2xl font-bold text-gray-600">{initials}</span>
          </div>
        )}
        <input
          className="file:-py-2 file:-px-4 relative flex-1 cursor-pointer rounded-lg border border-gray-300 px-4 py-2  pl-28 text-base file:absolute file:bottom-0 file:left-0 file:top-0 file:my-auto file:cursor-pointer file:border-none focus:outline-none"
          id="formFileLg"
          accept="image/*"
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileUpload(e.target.files?.[0]);
            }
          }}
        />
        <button
          className="text-gray-600 hover:text-red-500"
          onClick={() => {
            createModal({
              message: "Are you sure you want to delete your profile picture?",
              onConfirm: handleDeleteProfilePicture,
              type: "delete",
            });
          }}
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          Firstname
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
          type="text"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Firstname"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.firstName}
          </p>
        ) : null}
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          Lastname
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:outline-none"
          type="text"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Lastname"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.lastName}
          </p>
        ) : null}
      </div>
      <div className="space-y-2 md:col-span-4">
        <label className="text-sm font-medium tracking-wide text-gray-700">
          E-Mail
        </label>
        <input
          className="w-full cursor-not-allowed rounded-lg border border-gray-300 px-4 py-2 text-base opacity-40 focus:outline-none"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled
          placeholder="E-Mail"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-start text-sm font-bold text-red-500">
            {formik.errors.email}
          </p>
        ) : null}
      </div>
      <FancyButton
        primaryText="Update Profile"
        bgColor="primary"
        onClick={handleUpdateUser}
      />
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
