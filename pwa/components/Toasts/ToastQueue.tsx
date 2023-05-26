import React from "react";
import Toast from "./Toast";

export interface ToastInterface {
  id: string;
  type: "success" | "error";
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number | "infinite";
}

interface ToastQueueProps {
  toasts: ToastInterface[];
  removeToast: (id: string) => void;
}

function ToastQueue({ toasts, removeToast }: ToastQueueProps) {
  return (
    <div className="fixed right-7 bottom-7 flex flex-col gap-y-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          action={toast.action}
          removeToast={() => {
            removeToast(toast.id);
          }}
        />
      ))}
    </div>
  );
}

export default ToastQueue;
