import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import FancyButton from "../basics/FancyButton";
import CustomDialog from "./CustomDialog";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  onSuccess?: () => void;
  successText?: string;
  confirmViaInput?: {
    label?: string;
    value: string;
  };
}

function ConfirmDialog({
  onClose,
  open,
  onSuccess,
  description,
  successText,
  title,
  confirmViaInput,
}: ConfirmDialogProps) {
  const [confirmViaInputString, setConfirmViaInputString] = useState("");
  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setConfirmViaInputString("");
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative mx-auto flex min-w-[400px] max-w-sm flex-col gap-5 rounded-lg bg-white p-8 md:min-w-[600px]">
          <Dialog.Title>
            <p className="text-2xl font-bold text-primary">{title}</p>
          </Dialog.Title>
          <Dialog.Description className="flex flex-col gap-4 text-base text-gray-400">
            {description}
            {confirmViaInput && (
              <div className="space-y-2 md:col-span-2">
                <label className="text-base font-semibold text-primary">
                  {confirmViaInput.label ?? (
                    <>
                      To confirm, type &quot;
                      <span className="font-bold italic tracking-wide">
                        {confirmViaInput.value}
                      </span>
                      &quot; in the box below
                    </>
                  )}
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2  text-base text-primary focus:outline-none"
                  type="text"
                  name="confirm"
                  value={confirmViaInputString}
                  onChange={(e) => setConfirmViaInputString(e.target.value)}
                />
              </div>
            )}
          </Dialog.Description>
          <div className="flex flex-row gap-3 self-end">
            <FancyButton
              primaryText="Cancel"
              onClick={() => {
                onClose();
                setConfirmViaInputString("");
              }}
              outlined
            />
            <FancyButton
              primaryText={successText ?? "Confirm"}
              bgColor="error"
              onClick={() => {
                if (onSuccess) onSuccess();
                onClose();
                setConfirmViaInputString("");
              }}
              disabled={
                confirmViaInput &&
                confirmViaInputString !== confirmViaInput.value
              }
            />
          </div>
          <button
            className="absolute top-6 right-6"
            onClick={() => {
              onClose();
              setConfirmViaInputString("");
            }}
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;
