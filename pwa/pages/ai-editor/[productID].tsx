import Head from "next/head";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import Layout from "../../components/common/Layout";
import { NextPageWithLayout } from "../_app";
import {
  createCreateEditorImage,
  fetchCatalogProduct,
  fetchCreateEditorInstance,
  fetchMockupPrintfiles,
  updateCreateEditorImage,
  updateCreateEditorInstance as updateCreateEditorInstanceApi,
} from "../../helpers/DataQueries";
import { useRouter } from "next/router";
import { MenuItemsEnum } from "../../components/AiEditor/Sidebar";
import { AiEditorContext } from "../../providers/AiEditorContext";
import AiEditorDashboardMainParent from "../../components/AiEditor/AiEditorDashboardMainParent";
import { CreateEditorInstanceInterface } from "../../interfaces/CreateEditorInstanceInterface";
import { GetServerSideProps } from "next";

export interface Variant {
  variant_id: number;
  size: string;
  color: string;
  color_code: string;
  in_stock: boolean;
}

const Page: NextPageWithLayout<any> = ({
  variants,
  printFiles,
  createEditorInstance,
}: {
  printFiles: any;
  variants: Variant[];
  createEditorInstance: CreateEditorInstanceInterface;
}) => {
  const router = useRouter();

  const [canFinish, setCanFinish] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(
    MenuItemsEnum.ArtGenerator
  );
  const [imageUrl, setImageUrl] = useState("");

  const _positionWithImage: {
    sorting: number;
    name: string;
    position: string;
    image: string | null;
    selected: boolean;
  }[] = Object.entries(printFiles.available_placements).map(
    ([_placement, _name], idx: number) => {
      return {
        sorting: idx,
        name: _name as string,
        position: _placement,
        image:
          createEditorInstance.chosenImages.filter(
            (c) => c.position === _placement
          )[0]?.image.objectUrl ?? null,
        selected: idx === 0,
      };
    }
  );

  const [positionsWithImage, setPositionsWithImage] = useState<
    {
      sorting: number;
      name: string;
      position: string;
      image: string | null;
      selected: boolean;
    }[]
  >(_positionWithImage ?? []);

  const [placementPreviews, setPlacementPreviews] = useState<
    {
      placement: string;
      variant_ids: number[];
      mockup_url: string;
    }[]
  >();

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  return (
    <>
      <Head>
        <title>Editor</title>
        <meta name="description" content="Generate your own pictures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AiEditorContext.Provider
        value={{
          createEditorInstance: createEditorInstance,
          updateCreateEditorInstance: async (
            updateEditorInstance,
            chosenImages
          ) => {
            let response = await fetchCreateEditorInstance(
              createEditorInstance.id
            );
            if (updateEditorInstance) {
              const _createEditorInstance = await updateCreateEditorInstanceApi(
                updateEditorInstance,
                createEditorInstance.id
              );
              response = _createEditorInstance;
            }
            if (chosenImages && chosenImages.length > 0) {
              const _c = response.chosenImages.filter(
                (c) => c.position === chosenImages[0].position
              )?.[0]?.["@id"];
              if (_c) {
                // update chosenImage
                const _updateChosenImage = await updateCreateEditorImage(
                  {
                    image: chosenImages[0].image,
                    position: chosenImages[0].position,
                    createEditorInstance: response["@id"],
                  },
                  _c.split("/").pop()!
                );
                response = _updateChosenImage;
              } else {
                // create new chosenImage
                const _createChosenImage = await createCreateEditorImage({
                  image: chosenImages[0].image,
                  createEditorInstance: response["@id"],
                  position: chosenImages[0].position,
                });
                response = _createChosenImage;
              }
            }
            return response;
          },
          activeMenuItem: activeMenuItem,
          setActiveMenuItem: (menuItem) => setActiveMenuItem(menuItem),
          canBuyNow: canFinish,
          setCanBuyNow: setCanFinish,
          aiImageUrlInGenerator: imageUrl,
          setAiImageUrlInGenerator: setImageUrl,
          positionsWithImages: positionsWithImage,
          setPositionWithImage: (position, src) =>
            // improve the four lines below
            setPositionsWithImage((prev) => {
              const newPositions = prev.filter((p) => p.position !== position);
              newPositions.push({
                ...prev.filter((p) => p.position === position)[0],
                image: src,
              });
              return newPositions;
            }),
          // TODO: actually check for productID (otherwise redirect to product selection)
          printfulProductId: router.query.productID as string,
          variants: variants,
          printFiles: printFiles,
          placementPreviews: placementPreviews ?? [],
          setPlacementPreviews: (previews) => {
            setPlacementPreviews(previews);
          },
          selectedVariant: selectedVariant,
          setSelectedVariant: (variant) => setSelectedVariant(variant),
        }}
      >
        <AiEditorDashboardMainParent />
      </AiEditorContext.Provider>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout withoutFooter>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productID, createEditorInstanceId } = context.query;
  const { req } = context;
  const accessToken = req.cookies["BEARER"];

  if (!productID) {
    return {
      redirect: {
        destination: "/products",
        permanent: false,
      },
    };
  }

  const data = await fetchCatalogProduct(productID as string);
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

  const printFiles = await fetchMockupPrintfiles(parseInt(productID as string));

  let createEditorInstance: CreateEditorInstanceInterface;
  if (createEditorInstanceId) {
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
    createEditorInstance = await response.json();
  } else {
    const response = await fetch("http://caddy/api/create_editor_instances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        printfulCatalogProductId: productID,
        selectedPrintfulVariant: variants[0].variant_id.toString(),
      }),
    });
    createEditorInstance =
      (await response.json()) as CreateEditorInstanceInterface;

    const url = `${context.resolvedUrl}?createEditorInstanceId=${createEditorInstance.id}`;
    return {
      redirect: {
        destination: url,
        permanent: true,
      },
    };
  }

  return {
    props: {
      variants,
      printFiles: printFiles.result,
      createEditorInstance: createEditorInstance,
    },
  };
};

export default Page;
