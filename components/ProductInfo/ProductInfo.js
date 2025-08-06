"use client";
import React, { Suspense, useState } from "react";
import ProductDetailsSlider from "@/components/ProductDetailsSlider/ProductDetailsSlider";
import "react-toastify/dist/ReactToastify.css";
import { Badges } from "@/_components/badges";
import { BasicData } from "@/_components/basic-data";
import { Description } from "@/_components/desc";
import MobileImageSlider from "@/components/MobileImageSlider/MobileImageSlider";

const ProductInfo = ({ path, category_id, canonical, id, productGallery }) => {
  const [productVariant, setProductVariant] = useState(null);

  return (
    <div className="mt-5 sm:mt-10 w-[95%] lg:w-[85%] mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-10">
        <div className="col-span-2 lg:col-span-3 max-md:hidden">
          <Suspense
            fallback={
              <div
                className={`h-[40rem] bg-slate-300 w-full aspect-square animate-pulse`}
              />
            }
          >
            <ProductDetailsSlider
              id={id}
              productGallery={productGallery}
              variantKeyArray={productVariant?.variant_key_array}
            />
          </Suspense>
        </div>
        <div className="col-span-2 md:hidden">
          <Suspense
            fallback={
              <div
                className={`h-[20rem] bg-slate-300 w-full aspect-square animate-pulse`}
              />
            }
          >
            <MobileImageSlider
              slug={path}
              id={id}
              productGallery={productGallery}
              variantKeyArray={productVariant?.variant_key_array}
            />
          </Suspense>
        </div>
        <Suspense>
          <div className="col-span-2 max-md:mt-10 max-lg:mt-6 lg:col-span-3 text-croonus-1">
            <div className="flex flex-col gap-4">
              <Suspense
                fallback={
                  <div className={`h-5 w-full bg-slate-300 animate-pulse`} />
                }
              >
                <Badges slug={path} id={id} />
              </Suspense>
            </div>
            <Suspense
              fallback={
                <>
                  <div className={`h-5 w-full bg-slate-300 animate-pulse`} />
                  <div
                    className={`h-5 mt-2 w-full bg-slate-300 animate-pulse`}
                  />
                  <div
                    className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`}
                  />
                  <div
                    className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`}
                  />
                  <div
                    className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`}
                  />
                  <div
                    className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`}
                  />
                  <div
                    className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`}
                  />
                </>
              }
            >
              <BasicData
                productVariant={productVariant}
                setProductVariant={setProductVariant}
                slug={path}
                category_id={category_id}
                canonical={canonical}
                id={id}
                productGallery={productGallery}
              />
            </Suspense>
          </div>

          <Description slug={path} id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductInfo;
