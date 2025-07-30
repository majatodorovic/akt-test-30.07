"use client";
import React, { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Badges } from "@/_components/badges";
import { BasicData } from "@/_components/basic-data";

const ProductInfo = ({ slug, categoryId, canonical, id }) => {
  return (
    <div className="col-span-2 max-md:mt-10 max-lg:mt-6 lg:col-span-3 text-croonus-1">
      <div className="flex flex-col gap-4">
        <Suspense
          fallback={<div className={`h-5 w-full bg-slate-300 animate-pulse`} />}
        >
          <Badges slug={slug} id={id} />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <>
            <div className={`h-5 w-full bg-slate-300 animate-pulse`} />
            <div className={`h-5 mt-2 w-full bg-slate-300 animate-pulse`} />
            <div className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`} />
            <div className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`} />
            <div className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`} />
            <div className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`} />
            <div className={`h-5 mt-10 w-full bg-slate-300 animate-pulse`} />
          </>
        }
      >
        <BasicData
          slug={slug}
          categoryId={categoryId}
          canonical={canonical}
          id={id}
        />
      </Suspense>
    </div>
  );
};

export default ProductInfo;
