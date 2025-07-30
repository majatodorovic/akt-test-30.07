"use client";

import {
  useAddToWishlist,
  useAddToCart,
  useIsInWishlist,
  useProductThumb,
  useRemoveFromWishlist,
} from "@/hooks/akt.hooks";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Cart from "@/assets/Icons/shopping-bag.png";
import { currencyFormat } from "@/helpers/functions";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { useRouter } from "next/navigation";
import Wishlist from "@/assets/Icons/favorite.png";
import wishlistactive from "@/assets/Icons/favorite-active.png";

const ThumbSuspense = ({ id, refreshWishlist = () => {}, categoryId }) => {
  const {
    isPending: isWishlistPending,
    mutate: addToWishlist,
    isSuccess: isAdded,
  } = useAddToWishlist();

  const { data, refetch } = useIsInWishlist({ id });
  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();
  const router = useRouter();

  const isInWishlist = data?.exist;
  const wishlist_id = data?.wishlist_item_id;

  const { data: product } = useProductThumb({
    id: id,
    slug: id,
    categoryId: categoryId ?? "*",
  });

  useEffect(() => {
    if (isAdded || isRemoved) {
      refetch();
      refreshWishlist();
    }
  }, [isAdded, isRemoved]);

  const { mutate: addToCart } = useAddToCart();

  const renderPrices = (item) => {
    switch (item?.product_type) {
      case "variant":
        switch (item?.price?.discount?.active) {
          case true:
            switch (
              item?.price?.min?.price?.original ===
              item?.price?.max?.price?.original
            ) {
              case true:
                return (
                  <>
                    <p
                      className={`text-[0.875rem] self-start text-black font-semibold py-1 line-through`}
                    >
                      {currencyFormat(item?.price?.price?.original)}
                    </p>
                    <div className="bg-croonus-3 w-fit py-0.5 rounded-lg px-4">
                      <p className="text-sm text-black font-normal">
                        {currencyFormat(item?.price?.price?.discount)}
                      </p>
                    </div>
                  </>
                );
                break;
              case false:
                return (
                  <>
                    <p
                      className={`text-[0.875rem] self-start text-black font-semibold py-1 line-through`}
                    >
                      {currencyFormat(item?.price?.min?.price?.original)} -{" "}
                      {currencyFormat(item?.price?.max?.price?.original)}
                    </p>
                    <div className="bg-croonus-3 w-fit py-0.5 rounded-lg px-4">
                      <p className="text-sm text-black font-normal">
                        {currencyFormat(item?.price?.min?.price?.discount)} -{" "}
                        {currencyFormat(item?.price?.max?.price?.discount)}
                      </p>
                    </div>
                  </>
                );
                break;
            }
          case false:
            switch (
              item?.price?.min?.price?.original ===
              item?.price?.max?.price?.original
            ) {
              case true:
                return (
                  <>
                    <p
                      className={`text-[0.875rem] self-start text-black font-semibold py-1`}
                    >
                      {currencyFormat(item?.price?.min?.price?.original)}
                    </p>
                  </>
                );
                break;
              case false:
                return (
                  <>
                    <p
                      className={`text-[0.875rem] self-start text-black font-semibold py-1`}
                    >
                      {currencyFormat(item?.price?.min?.price?.original)} -{" "}
                      {currencyFormat(item?.price?.max?.price?.original)}
                    </p>
                  </>
                );
                break;
            }
        }
        break;
      case "single":
        switch (item?.price?.discount?.active) {
          case true:
            return (
              <>
                <p
                  className={`text-[0.875rem] self-start text-black font-semibold py-1 line-through`}
                >
                  {currencyFormat(item?.price?.price?.original)}
                </p>
                <div className="bg-croonus-3 self-start w-fit ">
                  <p className="text-[1rem] self-start text-black font-normal py-2 px-2">
                    {currencyFormat(item?.price?.price?.discount)}
                  </p>
                </div>
              </>
            );
            break;
          case false:
            return (
              <>
                <p
                  className={`text-[0.875rem] self-start text-black font-semibold py-1`}
                >
                  {currencyFormat(item?.price?.price?.original)}
                </p>
              </>
            );
            break;
        }
    }
  };

  const renderDiscountPercentage = (item) => {
    switch (item?.product_type) {
      case "variant":
        switch (item?.price?.discount?.active) {
          case true:
            switch (
              item?.price?.min?.price?.original ===
              item?.price?.max?.price?.original
            ) {
              case true:
                return (
                  <>
                    <div
                      style={{
                        right: "4px",
                      }}
                      className=" absolute top-1  px-3 py-2 bg-croonus-3 w-fit text-croonus-1 text-[0.8rem] rounded-lg z-20"
                    >
                      <p className="text-black">
                        -
                        {(
                          ((item?.price?.max?.price?.original -
                            item?.price?.max?.price?.discount) /
                            item?.price?.max?.price?.original) *
                          100
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                  </>
                );
                break;
              case false:
                return (
                  <>
                    <div
                      style={{
                        right: "4px",
                      }}
                      className="absolute top-1  px-3 py-2 bg-croonus-3 w-fit text-croonus-1 text-[0.8rem] rounded-lg z-20"
                    >
                      <p className="text-black">
                        -
                        {(
                          ((item?.price?.max?.price?.original -
                            item?.price?.max?.price?.discount) /
                            item?.price?.max?.price?.original) *
                          100
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                  </>
                );
                break;
            }
          case false:
            return null;
            break;
        }
        break;
      case "single":
        switch (item?.price?.discount?.active) {
          case true:
            return (
              <>
                <div
                  style={{
                    right: "4px",
                  }}
                  className="absolute top-1  px-3 py-2 bg-croonus-3 w-fit text-croonus-1 text-[0.8rem] rounded-lg z-20"
                >
                  <p className="text-black">
                    -
                    {(
                      ((item?.price?.price?.original -
                        item?.price?.price?.discount) /
                        item?.price?.price?.original) *
                      100
                    ).toFixed(0)}
                    %
                  </p>
                </div>
              </>
            );
            break;
          case false:
            return null;
            break;
        }
    }
  };

  return (
    <div
      className="col-span-1 relative w-full"
      key={product?.basic_data?.id_product}
    >
      {renderDiscountPercentage(product)}
      <Link href={`/${product?.link?.link_path}`}>
        <div className="relative w-full">
          {product?.image?.[0] ? (
            <>
              {product?.image?.[1] ? (
                <div
                  className={`relative w-full min-h-full max-md:w-[94%] mx-auto hoverThumbImage`}
                >
                  <Image
                    src={convertHttpToHttps(product?.image?.[0] ?? "")}
                    alt={product?.basic_data?.name}
                    width={0}
                    height={0}
                    sizes={`60vw`}
                    className={`transition-all aspect-2/3 duration-200 opacity-100 w-full h-full object-cover firstImage`}
                    loading="lazy"
                  />

                  <Image
                    src={convertHttpToHttps(product?.image?.[1] ?? "")}
                    alt={product?.basic_data?.name}
                    width={0}
                    height={0}
                    sizes={`60vw`}
                    className={`absolute aspect-2/3 top-0 transition-all duration-200 opacity-0 w-full h-full object-cover secondImage`}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div
                  className={`relative w-full min-h-full max-md:w-[94%] mx-auto`}
                >
                  <Image
                    src={convertHttpToHttps(product?.image?.[0] ?? "")}
                    alt={product?.basic_data?.name}
                    width={0}
                    height={0}
                    sizes={`60vw`}
                    className={`opacity-100 aspect-2/3 h-full w-full  object-cover`}
                    loading="lazy"
                  />
                </div>
              )}
            </>
          ) : (
            <Image
              src="/placeholder.jpg"
              width={500}
              height={500}
              className="h-full object-cover"
              priority={true}
              alt={`proizvod-${product?.basic_data?.name}`}
            />
          )}
          {product?.stickers?.length > 0 && (
            <div
              className={`absolute top-1 left-1 w-fit z-[10] flex flex-col gap-2`}
            >
              {(product?.stickers ?? [])?.map(({ name }) => {
                if (name) {
                  return (
                    <div
                      key={name}
                      className={`px-3 py-2 bg-croonus-3 w-fit text-croonus-1 text-[0.8rem] rounded-lg`}
                    >
                      <p>{name}</p>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </Link>

      <div className="text-start w-full pt-1">
        <div className=" py-[3px] flex justify-center items-center gap-3 w-full border-b border-croonus-3">
          <div className="flex items-center justify-end">
            {isInWishlist ? (
              <div
                onClick={() => removeFromWishlist({ id: wishlist_id })}
                className={`flex min-w-[25px] items-center justify-center transition-all cursor-pointer duration-300 hover:bg-[#f3f3f3]`}
              >
                <Image
                  alt="wishlist"
                  src={wishlistactive}
                  height={28}
                  width={28}
                  className="cursor-pointer wishlistWidth !object-none hover:scale-110 transition-all duration-200 mr-[20%]"
                />
              </div>
            ) : (
              <div
                onClick={() => addToWishlist({ id })}
                className={`flex items-center justify-center transition-all cursor-pointer duration-300 hover:bg-[#f3f3f3]`}
              >
                <Image
                  src={Wishlist}
                  alt="wishlist"
                  height={28}
                  width={28}
                  className={`cursor-pointer wishlistWidth !object-none transition-all duration-500 hover:scale-110`}
                />
              </div>
            )}
          </div>
          <div className="w-[2px] h-[26px] bg-croonus-3"></div>
          <div className="flex items-center justify-start w-full">
            <Link
              href={`/${product?.link?.link_path}`}
              className="flex items-center gap-1"
            >
              <Image
                src={Cart}
                width={32}
                height={32}
                alt="cart"
                className="cursor-pointer cartWidth !object-none hover:scale-110 transition-all duration-200 autoWidth"
              />
              <div className="text-sm">Dodaj u korpu</div>
            </Link>
          </div>
        </div>
        <div className="text-black self-start font-sm text-lg mt-2">
          <Link
            className="font-normal text-sm clamp"
            href={`/${product?.link?.link_path}`}
          >
            <h2>{product?.basic_data?.name}</h2>
          </Link>
        </div>
        {(product?.price?.price?.original === 0 ||
          product?.price?.price?.original === null) &&
        (!product?.price?.max?.currency || !product?.price?.min?.currency) ? (
          <button
            className="relative hover:bg-opacity-80 h-fit flex py-1 px-3 bg-croonus-1 text-white font-medium mr-auto"
            onClick={() => {
              router?.push(`/kontakt?slug=${product?.slug}`);
            }}
          >
            <span className="text-[0.8rem]">Pošaljite upit</span>
          </button>
        ) : (
          <>{renderPrices(product)}</>
        )}
      </div>
    </div>
  );
};

export default ThumbSuspense;
