"use client";
import { list } from "@/app/api/api";
import WishlistItems from "../WishlistItems/WishlistItems";
import { useEffect, useState, Suspense } from "react";
import { useCartContext } from "@/app/api/cartContext";
import Link from "next/link";
import Loader from "@/components/Loader";
import Thumb from "@/shared/Thumb/Thumb";
import { useWishlist } from "@/hooks/akt.hooks";
import ThumbSuspense from "@/shared/Thumb/ThumbSuspense";

const Wishlist = () => {
  const {
    data,
    isLoading,
    refetch: refreshWishlist,
  } = useWishlist({ render: false });

  return (
    <div className="mx-auto 4xl:container">
      <div className="w-[95%] lg:w-[85%] mx-auto">
        {data?.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-x-5 max-md:gap-y-2 md:gap-y-[2rem] lg:grid-cols-4">
            {data?.map((item, index) => {
              return (
                <Suspense
                  key={index}
                  fallback={
                    <div
                      className={`col-span-1 aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                    />
                  }
                >
                  <ThumbSuspense
                    id={item?.id_product}
                    refreshWishlist={refreshWishlist}
                  />
                </Suspense>
              );
            })}
          </div>
        ) : isLoading ? (
          <div
            className={`mt-[4.625rem] grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
          >
            {[...Array(data?.length ?? 10)].map((_, i) => (
              <div
                key={i}
                className={`col-span-1 aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center  py-5 text-center h-[60vh] flex flex-col justify-center">
            <div className=" border p-10">
              <h1 className="text-lg font-medium">
                Vaša lista želja je prazna!
              </h1>{" "}
              <p>Kada dodate artikle u listu želja, oni će se pojaviti ovde.</p>
              <button className="rounded-[5rem] mt-10 bg-croonus-1 px-4 py-2 text-white hover:bg-opacity-80">
                <Link href="/">Vrati se na početnu stranu.</Link>
              </button>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
