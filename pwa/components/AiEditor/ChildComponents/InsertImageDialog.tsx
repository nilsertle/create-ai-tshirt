import { Dialog } from "@headlessui/react";
import {
  CameraIcon,
  DocumentArrowUpIcon,
  LockClosedIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Configuration, OpenAIApi } from "openai";
import React, { useContext, useEffect, useState } from "react";
import {
  createMediaObject,
  fetchMediaObject,
  uploadImage,
} from "../../../helpers/DataQueries";
import { AiEditorContext } from "../../../providers/AiEditorContext";
import { ToastContext } from "../../../providers/ToastContext";
import FancyButton from "../../basics/FancyButton";
import FileUpload from "../../basics/FileUpload";
import TabGroup from "../../Tabs/TabGroup";

const configuration = new Configuration({
  organization: "org-PV2gf25vfHPO3eLAOE392ubp",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface InsertImageDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position: string;
}

function InsertImageDialog({
  isOpen,
  setIsOpen,
  position,
}: InsertImageDialogProps) {
  const { setPositionWithImage, setAiImageUrlInGenerator } =
    useContext(AiEditorContext);
  const { addToast } = useContext(ToastContext);
  const [src, setSrc] = useState<null | string>(null);
  const [file, setFile] = useState<File | null>(null);
  const [idOfNewlyCreatedImage, setIdOfNewlyCreatedImage] = useState(null);

  const [isPromptLoading, setisPromptLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  async function submitForm() {
    setisPromptLoading(true);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    if (response.status === 200 && response.data.data[0].url) {
      setisPromptLoading(false);
      // setAiImageUrlInGenerator(response.data.data[0].url);
      setSrc(response.data.data[0].url);
    }
  }

  async function handleFileUpload() {
    if (file) {
      const uploadedImage = await createMediaObject(file);
      if (uploadedImage.objectUrl) {
        setPositionWithImage(position, uploadedImage.objectUrl);
        const randomId = Math.random().toString(36).substring(2, 100);
        addToast({
          message: "Image uploaded",
          type: "success",
          id: randomId,
        });
      }
      setIsOpen(false);
    }
  }

  async function handleGetFile() {
    if (idOfNewlyCreatedImage) {
      const newlyCreatedImage = await fetchMediaObject(idOfNewlyCreatedImage);
      console.log("newlyCreatedImage: ", newlyCreatedImage);
    }
  }

  useEffect(() => {
    handleGetFile();
  }, [idOfNewlyCreatedImage]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto flex min-w-[400px] max-w-sm flex-col gap-5 rounded-lg bg-white p-10 md:min-w-[1000px]">
          <Dialog.Title>
            <p className="text-2xl font-bold text-primary">
              Insert Image ({position})
            </p>
            <p className="text-sm text-gray-500">
              Upload your own image or generate a unique one with our AI Art
              Generator
            </p>
          </Dialog.Title>
          <div className="grid grid-cols-2 gap-8">
            {src ? (
              <div className="flex flex-col items-center gap-y-2">
                <img
                  className=" aspect-square w-full rounded-lg object-cover"
                  src={src}
                  alt="Generated Image"
                />
                <div className="">
                  <FancyButton
                    primaryText={"Remove"}
                    bgColor={"primary"}
                    endIcon={<XMarkIcon className="h-5 w-5" />}
                    sqaure
                    onClick={() => {
                      setSrc(null);
                      setPositionWithImage(position, null);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-veryLightGray">
                <PhotoIcon className="h-10 w-10 text-gray-500" />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <TabGroup tabs={["Generate Image", "Upload Image"]}>
                {[
                  <div key={1} className="flex flex-col items-end gap-3">
                    <textarea
                      rows={2}
                      className="w-full resize-none rounded-lg border-darkGray bg-veryLightGray px-5 py-5 text-black"
                      placeholder="Prompt for DALL-E"
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <FancyButton
                      primaryText={"Generate"}
                      onClick={() => submitForm()}
                      loading={isPromptLoading}
                      disabled={prompt.length === 0 || !prompt}
                    />
                  </div>,
                  <div key={2}>
                    <FileUpload
                      onFileUpload={(src, file) => {
                        setSrc(src);
                        setFile(file);
                      }}
                    />
                  </div>,
                ]}
              </TabGroup>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end gap-x-4">
            <FancyButton
              primaryText={"Cancel"}
              bgColor={"lightGray"}
              onClick={() => setIsOpen(false)}
            />
            <FancyButton
              primaryText={"Insert"}
              disabled={!file}
              onClick={() => {
                if (file) {
                  // add the image to the position with setPositionsWithImages
                  handleFileUpload();
                }
              }}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default InsertImageDialog;
