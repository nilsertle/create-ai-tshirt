import Head from "next/head";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import { NextPageWithLayout } from "../_app";
import { PrintfulCatalogProductInterface } from "../../interfaces/ProductInterface";
import { fetchPrintfulCatalog } from "../../helpers/PrintfulQueries";

const Page: NextPageWithLayout = () => {
  const [Products, setProducts] = useState<
    PrintfulCatalogProductInterface[] | []
  >([]);
  const fetchProducts = async () => {
    const response = await fetchPrintfulCatalog();
    console.log("product index  response", response);
    setProducts(response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Product Collection
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Products.filter((x) => x.type_name === "T-Shirt")
              .slice(0, 8)
              .map((product, idx) => {
                return (
                  <Link key={idx} href={`/ai-editor/${product.id}`}>
                    <li key={idx}>
                      <div className="group block overflow-hidden">
                        <img
                          src={product.image}
                          alt=""
                          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                        />

                        <div className="relative bg-white pt-3">
                          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                            {product.title}
                          </h3>

                          <p className="mt-2">
                            <span className="sr-only"> Regular Price </span>

                            <span className="tracking-wider text-gray-900">
                              {" "}
                              £24.00 GBP{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
          </ul>
        </div>
      </section>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
