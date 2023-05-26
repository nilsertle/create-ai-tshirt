import Link from "next/link";
import React from "react";

type Props = {};

function FeatureSection({}: Props) {
  return (
    <div className="py-16">
      <div className="m-auto space-y-12 px-6 xl:container md:px-12 lg:px-20">
        <div className="mb-16 flex flex-col sm:items-center sm:text-center">
          <Link href="/" className="mb-6 sm:mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
              <svg
                className="text-deep-purple-accent-400 h-10 w-10"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
          </Link>
          <div className="max-w-xl sm:text-center md:mx-auto lg:max-w-2xl">
            <h2 className="relative mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <div
                aria-hidden="true"
                className="w-46 rotate-130 absolute inset-0 my-auto h-12 bg-gradient-to-r from-tertiary to-red-600 opacity-40 blur-3xl dark:opacity-20"
              ></div>
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="text-blue-gray-100 absolute left-0 top-0 z-0 -ml-20 -mt-8 hidden w-32 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
                >
                  <defs>
                    <pattern
                      id="ec5d8ef5-b853-4714-b94f-df28ec98eeb7"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#ec5d8ef5-b853-4714-b94f-df28ec98eeb7)"
                    width="52"
                    height="24"
                  />
                </svg>
                <span className="relative">The</span>
              </span>{" "}
              quick, brown fox jumps over a lazy dog
            </h2>
          </div>
        </div>
        <div className="mt-16 grid gap-8 sm:mx-auto sm:w-2/3 md:-mx-8 md:w-full md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-100 bg-white bg-opacity-50 p-8 py-12 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none sm:p-12">
            <div className="space-y-12 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4341/4341069.png"
                className="mx-auto w-16"
                width="512"
                height="512"
                alt="burger illustration"
              />
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                  First feature
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Saepe nesciunt neque culpa hic illum ab qui error repellendus
                  asperiores unde ut ipsam perferendis nemo fuga cum, eum
                  consectetur, magnam doloremque!
                </p>
                <Link
                  href="#"
                  className="group relative mx-auto flex h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative h-5 w-5 text-gray-600 transition duration-300 group-hover:translate-x-1 dark:text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white bg-opacity-50 p-8 py-12 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none sm:p-12">
            <div className="space-y-12 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4341/4341152.png"
                className="mx-auto w-16"
                width="512"
                height="512"
                alt="burger illustration"
              />
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                  Second feature
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Saepe nesciunt neque culpa hic illum ab qui error repellendus
                  asperiores unde ut ipsam perferendis nemo fuga cum, eum
                  consectetur, magnam doloremque!
                </p>
                <Link
                  href="#"
                  className="group relative mx-auto flex h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative h-5 w-5 text-gray-600 transition duration-300 group-hover:translate-x-1 dark:text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white bg-opacity-50 p-8 py-12 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none sm:p-12">
            <div className="space-y-12 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4341/4341146.png"
                className="mx-auto w-16"
                width="512"
                height="512"
                alt="burger illustration"
              />
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                  Third feature
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Saepe nesciunt neque culpa hic illum ab qui error repellendus
                  asperiores unde ut ipsam perferendis nemo fuga cum, eum
                  consectetur, magnam doloremque!
                </p>
                <Link
                  href="#"
                  className="group relative mx-auto flex h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative h-5 w-5 text-gray-600 transition duration-300 group-hover:translate-x-1 dark:text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
