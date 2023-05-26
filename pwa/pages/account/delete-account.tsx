import { ReactElement, useContext, useState } from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import FancyButton from "../../components/basics/FancyButton";
import Layout from "../../components/common/Layout";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import { deleteUser } from "../../helpers/DataQueries";
import { UserContext } from "../../providers/UserContext";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  async function handleDeleteAccount() {
    if (user) {
      // shall it actually delet the account or just set the user to inactive?
      // await deleteUser(user.id);
    }
  }
  return (
    <div className="grid grid-cols-1 gap-6">
      <h2 className="text-xl font-bold">Delete Account</h2>
      <p className="text-sm font-medium tracking-wide text-gray-700">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <FancyButton
        primaryText="Delete Account"
        bgColor="error"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <ConfirmDialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        onSuccess={() => {
          handleDeleteAccount();
        }}
        successText="Delete Account"
        confirmViaInput={{
          value: "delete me",
        }}
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
