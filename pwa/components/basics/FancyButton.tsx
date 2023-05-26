import React from "react";

interface FancyButtonProps {
  primaryText: string;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  bgColor?: "lightGray" | "primary" | "secondary" | "transparent" | "error";
  sqaure?: boolean;
  flex1?: boolean;
  outlined?: boolean;
  /**
   * static value (if rendered dynamically value cant be changed client-side)
   */
  textColor?: `text-${string}`;
}

function FancyButton({
  primaryText,
  onClick,
  disabled,
  loading,
  bgColor = "secondary",
  endIcon,
  sqaure = false,
  flex1 = false,
  outlined = false,
  textColor,
}: FancyButtonProps) {
  return (
    <button
      className={`relative w-min ${
        flex1 && "flex-1"
      } flex h-9 items-center justify-center self-end
      px-6 before:absolute before:inset-0 ${
        sqaure ? "before:rounded-lg" : "before:rounded-full"
      } text-white ${
        disabled
          ? "cursor-not-allowed opacity-90 before:bg-gray-300"
          : `${bgColor === "lightGray" && "before:bg-lightGray"} ${
              bgColor === "primary" && "before:bg-primary"
            }
            ${bgColor === "secondary" && "before:bg-secondary"}
            ${bgColor === "transparent" && "before:bg-transparent"}
            ${bgColor === "error" && "before:bg-red-500"}
            ${
              outlined &&
              "before:border before:border-gray-300 before:bg-transparent dark:before:border-gray-700"
            }
            before:transition hover:before:scale-105`
      } before:duration-300
       active:duration-75
        active:before:scale-95 dark:before:bg-primaryLight`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg
          className="h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <span
        className={`relative flex flex-row items-center justify-between gap-x-2 text-sm font-bold ${
          disabled
            ? "text-gray-500"
            : ` ${
                textColor
                  ? textColor
                  : outlined
                  ? "text-primary"
                  : bgColor === "lightGray" || bgColor === "transparent"
                  ? "text-gray-600"
                  : "text-white"
              } `
        } whitespace-nowrap dark:text-primary`}
      >
        {!loading ? primaryText : ""}
        {!loading && endIcon}
      </span>
    </button>
  );
}

export default FancyButton;
