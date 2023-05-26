import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Configuration, OpenAIApi } from "openai";
import React, { useContext, useEffect, useState } from "react";
import { createMediaObject } from "../../../helpers/DataQueries";
import { AiEditorContext } from "../../../providers/AiEditorContext";
import { ToastContext } from "../../../providers/ToastContext";
import FancyButton from "../../basics/FancyButton";
import FileUpload from "../../basics/FileUpload";
import TabGroup from "../../Tabs/TabGroup";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface ArtGeneratorProps {}

function ArtGenerator({}: ArtGeneratorProps) {
  const {
    printfulProductId,
    positionsWithImages,
    setPositionWithImage,
    createEditorInstance,
    updateCreateEditorInstance,
  } = useContext(AiEditorContext);

  const { addToast } = useContext(ToastContext);

  const [isPromptLoading, setisPromptLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isFileUploadLoading, setIsFileUploadLoading] = useState(false);
  const router = useRouter();

  async function submitForm() {
    console.log("submit", prompt);
    setisPromptLoading(true);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    if (response.status === 200 && response.data.data[0].url) {
      setisPromptLoading(false);
      console.log("response", response);
      setPositionWithImage("front", response.data.data[0].url);
      // upload image to media_objects
      const uploadedImage = await createMediaObject(
        undefined,
        response.data.data[0].url
      );
      if (uploadedImage["@id"]) {
        // create createEditorImages
        const createEditorImages = await updateCreateEditorInstance(undefined, [
          {
            position: "front",
            image: uploadedImage["@id"],
          },
        ]);
      } else {
        const randomId = Math.random().toString(36).substring(2, 100);
        addToast({
          message:
            "Something went wrong with the image upload to 'create editor instance'",
          type: "error",
          id: randomId,
        });
      }
    }
  }

  async function handleFileUpload(file: File) {
    if (file) {
      setIsFileUploadLoading(true);
      const uploadedImage = await createMediaObject(file);
      if (uploadedImage.objectUrl) {
        console.log("uploadedImage", uploadedImage);
        setPositionWithImage("front", uploadedImage.objectUrl);
        await updateCreateEditorInstance(undefined, [
          {
            position: "front",
            image: uploadedImage["@id"],
          },
        ]);
        const randomId = Math.random().toString(36).substring(2, 100);
        addToast({
          message: "Image uploaded",
          type: "success",
          id: randomId,
        });
      } else {
        const randomId = Math.random().toString(36).substring(2, 100);
        addToast({
          message: "Something went wrong",
          type: "error",
          id: randomId,
        });
      }
      setIsFileUploadLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col justify-between gap-y-8">
      <div className="flex flex-col gap-5">
        <TabGroup tabs={["Generate Image", "Upload Image"]}>
          {[
            <div key={1} className="flex flex-col gap-5">
              <h2 className="text-xl font-bold text-primary">
                Generate your own Image
              </h2>
              <div className="flex flex-col gap-3">
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
              </div>
            </div>,
            <div key={2} className="flex flex-col gap-5">
              <h2 className="text-xl font-bold text-primary">
                Upload you personal design
              </h2>
              <FileUpload
                loading={isFileUploadLoading}
                onFileUpload={(src, file) => {
                  // setSrc(src);
                  handleFileUpload(file);
                }}
              />
            </div>,
          ]}
        </TabGroup>
      </div>
      <div className="hidden self-end md:block">
        <FancyButton
          endIcon={<ArrowRightIcon className="h-5 w-5 text-white" />}
          primaryText="Next"
          onClick={() => {
            router.push(
              "/product-preview/" +
                router.query.productID +
                "?createEditorInstanceId=" +
                router.query.createEditorInstanceId
            );
          }}
        />
      </div>
    </div>
  );
}

export default ArtGenerator;
