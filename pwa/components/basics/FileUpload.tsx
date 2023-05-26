import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import React from "react";
import LoadingSpinner from "../Helper/LoadingButton";

interface FileUploadProps {
  onFileUpload: (src: string, file: File) => void;
  loading?: boolean;
}

function FileUpload({ onFileUpload, loading }: FileUploadProps) {
  return (
    <div className="flex w-full items-start">
      <label
        htmlFor="dropzone-file"
        className="dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <DocumentArrowUpIcon className="mb-2 h-14 w-14 text-gray-600" />

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
          </div>
        )}

        <input
          id="dropzone-file"
          type="file"
          disabled={loading}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            console.log("e", e.target.files?.[0]);
            if (e.target.files?.[0]) {
              onFileUpload(
                URL.createObjectURL(e.target.files?.[0]),
                e.target.files?.[0]
              );
            }
          }}
        />
      </label>
    </div>
  );
}

export default FileUpload;
