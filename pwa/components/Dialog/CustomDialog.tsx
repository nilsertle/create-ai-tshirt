import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import FancyButton from "../basics/FancyButton";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
}

function CustomDialog({ onClose, open }: CustomDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto flex min-w-[400px] max-w-sm flex-col gap-5 rounded-lg bg-white p-10 md:min-w-[1000px]">
          <Dialog.Title>
            <p className="text-2xl font-bold text-primary">title</p>
            <p className="text-sm text-gray-500">
              Upload your own image or generate a unique one with our AI Art
              Generator
            </p>
          </Dialog.Title>
          <div>desc and buttons</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default CustomDialog;
