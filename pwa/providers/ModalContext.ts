import { createContext } from "react";

export interface ModalInterface {
  message: string;
  onConfirm?: () => void;
  type?: "confirm" | "info" | "error" | "delete";
  onClose: () => void;
  open: boolean;
}

export interface ModalContextInterface {
  createModal: (modal: Omit<ModalInterface, "onClose" | "open">) => void;
}

export const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface
);
