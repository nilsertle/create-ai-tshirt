import { Dialog } from "@headlessui/react";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { type } from "os";
import React, { useState } from "react";
import { ModalInterface } from "../../providers/ModalContext";
import FancyButton from "../basics/FancyButton";

function Modal({ message, onConfirm, type, onClose, open }: ModalInterface) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <Dialog.Panel>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                      type === "error"
                        ? "bg-red-100"
                        : type === "info"
                        ? "bg-blue-100"
                        : type === "confirm"
                        ? "bg-blue-100"
                        : type === "delete"
                        ? "bg-red-100"
                        : ""
                    } sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    {type === "error" && (
                      <XMarkIcon className="h-6 w-6 text-red-600" />
                    )}
                    {type === "info" && (
                      <InformationCircleIcon className="h-6 w-6 text-blue-600" />
                    )}
                    {type === "confirm" && (
                      <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" />
                    )}
                    {type === "delete" && (
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-headline"
                    >
                      {type === "error" && "Error"}
                      {type === "info" && "Info"}
                      {type === "confirm" && "Confirm"}
                      {type === "delete" && "Delete"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 ${
                    type === "delete"
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                      : type === "confirm"
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                      : type === "info"
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                      : type === "error"
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                      : ""
                  } focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                  onClick={
                    type === "info" || type === "error" ? onClose : onConfirm
                  }
                >
                  {type === "info" || type === "error" ? "Got It" : "Confirm"}
                </button>

                {(type === "confirm" || type === "delete") && (
                  <button
                    type="button"
                    className={`mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto`}
                    onClick={onClose}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default Modal;
