import {
  CheckIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface ToastProps {
  type: "success" | "error";
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  removeToast: () => void;
}

function Toast({ message, type, action, removeToast }: ToastProps) {
  return (
    <div
      id="toast-bottom-right"
      className="space-x flex w-full max-w-xs items-center space-x-4 rounded-lg bg-white p-4 text-gray-500 shadow-lg dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      {type === "success" && (
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <CheckIcon className="h-5 w-5" />
          <span className="sr-only">Check icon</span>
        </div>
      )}
      {type === "error" && (
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <span className="sr-only">Close icon</span>
        </div>
      )}

      <div className="ml-3 w-full text-sm font-normal">{message}</div>
      {action && (
        <button
          className="rounded-lg p-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-700"
          onClick={() => {
            action.onClick();
            removeToast();
          }}
        >
          {action.label}
        </button>
      )}
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-primary focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={removeToast}
      >
        <span className="sr-only">Close</span>

        <XMarkIcon className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}

export default Toast;
