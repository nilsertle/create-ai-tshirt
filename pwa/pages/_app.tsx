import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";
import { useUser } from "../helpers/UserLogic/useUser";
import { UserContext } from "../providers/UserContext";
import Toast from "../components/Toasts/Toast";
import ToastQueue, { ToastInterface } from "../components/Toasts/ToastQueue";
import { ToastContext } from "../providers/ToastContext";

import { Nunito } from "@next/font/google";
import Modal from "../components/Modal/Modal";
import { ModalContext, ModalInterface } from "../providers/ModalContext";

const nunito = Nunito({
  subsets: ["latin"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { user, isAuthenticated, isLoading, refetch, setUser } = useUser();
  const [toasts, setToasts] = useState<ToastInterface[]>([]);
  const [modal, setModal] =
    useState<Omit<ModalInterface, "onClose" | "open">>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: isAuthenticated ?? false,
        isLoading: isLoading ?? true,
        refetch,
        setUser,
      }}
    >
      <ToastContext.Provider
        value={{
          addToast: (toast) => {
            setToasts((prev) => [...prev, toast]);
            if (toast.duration !== "infinite") {
              setTimeout(() => {
                setToasts((prev) =>
                  prev.filter((t) => t.message !== toast.message)
                );
              }, toast.duration ?? 4000);
            }
          },
        }}
      >
        <ModalContext.Provider
          value={{
            createModal: (modal) => {
              setModal(modal);
              setIsModalOpen(true);
            },
          }}
        >
          <style jsx global>{`
            :root {
              --nunito-font: ${nunito.style.fontFamily};
            }
          `}</style>
          {getLayout(<Component {...pageProps} />)}
          <ToastQueue
            toasts={toasts}
            removeToast={(id) => {
              setToasts((prev) => prev.filter((t) => t.id !== id));
            }}
          />
          {modal && (
            <Modal
              message={modal.message}
              onConfirm={() => {
                modal.onConfirm && modal.onConfirm();
                setModal(undefined);
                setIsModalOpen(false);
              }}
              onClose={() => {
                setModal(undefined);
                setIsModalOpen(false);
              }}
              open={isModalOpen}
              type={modal.type}
            />
          )}
        </ModalContext.Provider>
      </ToastContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
