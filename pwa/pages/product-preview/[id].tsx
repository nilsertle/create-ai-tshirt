import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import Preview from "../../components/AiEditor/ChildComponents/Preview";
import TshirtSVG from "../../components/AiEditor/ChildComponents/TshirtSVG";
import Editor from "../../components/AiEditor/RichtAreaChildren/Editor";
import Layout from "../../components/common/Layout";
import ResponsiveHeading from "../../components/ResponsiveHeading/ResponsiveHeading";
import { fetchCatalogProduct } from "../../helpers/DataQueries";
import { CreateEditorInstanceInterface } from "../../interfaces/CreateEditorInstanceInterface";
import { Variant } from "../ai-editor/[productID]";
import { NextPageWithLayout } from "../_app";

const Page = ({
  variants,
  createEditorInstance,
}: {
  variants: Variant[];
  createEditorInstance: CreateEditorInstanceInterface;
}) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants.filter(
      (variant) =>
        variant.variant_id.toString() ===
        createEditorInstance.selectedPrintfulVariant
    )[0]
  );
  const router = useRouter();

  return (
    <div className="flex h-full flex-col justify-between overflow-scroll md:flex-row">
      <div className="relative z-10 h-full w-full flex-1 p-6 drop-shadow-md lg:px-16 lg:py-10 xl:px-24">
        <TshirtSVG color={selectedVariant?.color_code} />
        <Image
          src={createEditorInstance.chosenImages[0].image.objectUrl ?? ""}
          alt=""
          height={200}
          width={200}
          className="absolute inset-0 m-auto h-40 w-40"
        />
      </div>
      <Editor
        selectedVariant={selectedVariant}
        variants={variants}
        setSelectedVariant={(variant) => setSelectedVariant(variant)}
        chosenImages={createEditorInstance.chosenImages}
      />
      {/* <div className="left-10 top-40 hidden md:absolute">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center justify-center self-start rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </button>
      </div> */}
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout withoutFooter>{page}</Layout>;
};

// getServerSideProps with typescript
export async function getServerSideProps(context: any) {
  const { id, createEditorInstanceId } = context.query;
  const data = await fetchCatalogProduct(id);
  const variants = [];
  for (const variant of data.result.variants) {
    variants.push({
      variant_id: variant.id,
      size: variant.size,
      color: variant.color,
      color_code: variant.color_code,
      in_stock: variant.in_stock,
    });
  }

  const { req } = context;
  const accessToken = req.cookies["BEARER"];

  const response = await fetch(
    `http://caddy/api/create_editor_instances/${createEditorInstanceId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    }
  );
  const createEditorInstance = await response.json();

  return {
    props: {
      variants,
      createEditorInstance,
    },
  };
}

export default Page;
