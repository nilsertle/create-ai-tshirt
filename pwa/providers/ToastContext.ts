import { createContext } from "react";
import { ToastInterface } from "../components/Toasts/ToastQueue";

export interface ToastContextInterface {
    addToast: (toast: ToastInterface) => void;
}

export const ToastContext = createContext<ToastContextInterface>({} as ToastContextInterface);
