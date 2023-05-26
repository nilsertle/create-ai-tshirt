import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

interface ResponsiveHeadingProps {
  title: string;
  children: React.ReactNode;
  backRoute?: string;
}

function ResponsiveHeading({
  title,
  children,
  backRoute,
}: ResponsiveHeadingProps) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col">
        <header
          className={`mb-16  ${
            backRoute && "flex w-full items-center justify-between"
          } text-center`}
        >
          {backRoute && (
            <Link
              type="button"
              href={backRoute}
              className="inline-flex items-center justify-center self-start rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <ArrowLeftIcon className="h-6 w-6" />
              <span className="sr-only">Back</span>
            </Link>
          )}

          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>
          {backRoute && <div></div>}
        </header>
        {children}
      </div>
    </div>
  );
}

export default ResponsiveHeading;
