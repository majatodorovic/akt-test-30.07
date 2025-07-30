"use client";
import React, { useEffect, useState, Suspense } from "react";
import {
  useGlobalRemoveFromWishlist,
  useGlobalAddToCart,
} from "@/app/api/globals";
import Link from "next/link";
import Image from "next/image";
import Wishlist from "@/assets/Icons/favorite.png";
import { currencyFormat } from "@/helpers/functions";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Cart from "../../assets/Icons/shopping-bag.png";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  useAddToCart,
  useAddToWishlist,
  useCountry,
  useIsInWishlist,
  useProductThumb,
  useRemoveFromWishlist,
} from "@/hooks/akt.hooks";

const Wishlistproducts = ({ items, product, refetch_wishlist = () => {} }) => {
  const removeFromWishList = useGlobalRemoveFromWishlist();
  const globalAddToCart = useGlobalAddToCart();

  const id_product = product?.basic_data?.id_product;
  const { data: wishlist_data, refetch } = useIsInWishlist({ id: id_product });
  const { mutate: addToWishlist, isSuccess: isAddedToWishlist } =
    useAddToWishlist();
  const { mutate: addToCart, isSuccess: isAddedToCart } = useAddToCart();
  const { mutate: removeFromWishlist, isSuccess: isRemovedFromWishlist } =
    useRemoveFromWishlist();
  const router = useRouter();
  const isInWishlist = wishlist_data?.exist;
  const wishlistId = wishlist_data?.wishlist_item_id;

  useEffect(() => {
    refetch();
    refetch_wishlist();
  }, [isAddedToWishlist, isAddedToCart, isRemovedFromWishlist]);

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
                    <div className="bg-croonus-3  self-start w-fit ">
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
                      className={`text-[0.875rem] self-start text-black font-semibold py-1 line-through`}
                    >
                      {currencyFormat(item?.price?.min?.price?.original)} -{" "}
                      {currencyFormat(item?.price?.max?.price?.original)}
                    </p>
                    <div className="bg-croonus-3  self-start w-fit ">
                      <p className="text-[1rem] self-start text-black font-normal py-2 px-2">
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

  return (
    <div
      key={product.id}
      className={` flex flex-col relative products-center keen-slider__slide`}
    >
      <div className="col-span-1">
        <Link href={`/${product?.slug}`}>
          <div className="relative w-full">
            {product?.image[0] ? (
              <>
                {product?.image[1] ? (
                  <div className="relative  w-full min-h-full max-md:w-[94%] mx-auto hoverThumbImage">
                    <Image
                      src={convertHttpToHttps(product?.image[0])}
                      alt={product?.basic_data?.name ?? "AKT"}
                      width={0}
                      height={0}
                      sizes={`100vw`}
                      style={{ objectFit: "cover" }}
                      className={`transition-all aspect-2/3 duration-200 opacity-100 object-cover w-full h-full firstImage`}
                      loading="lazy"
                    />
                    <Image
                      src={convertHttpToHttps(product?.image[1])}
                      alt={product?.basic_data?.name ?? "AKT"}
                      width={0}
                      height={0}
                      sizes={`100vw`}
                      style={{ objectFit: "cover" }}
                      className={`absolute top-0 transition-all aspect-2/3 duration-200 opacity-0 object-cover w-full h-full secondImage`}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="relative w-full min-h-full max-md:w-[94%] mx-auto">
                    <Image
                      src={convertHttpToHttps(product?.image[0])}
                      alt={product?.basic_data?.name}
                      width={0}
                      height={0}
                      sizes={`100vw`}
                      style={{ objectFit: "cover" }}
                      className={`aspect-2/3 opacity-100 object-cover w-full `}
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
                alt={`proizvod-${item?.basic_data?.name}`}
              />
            )}
          </div>
        </Link>
        <div className="text-start w-full pt-1">
          <div className=" py-[3px] w-[70%] flex justify-center items-center w-full border-b border-black">
            <div className="flex items-center justify-end w-full">
              <div
                onClick={() => {
                  removeFromWishlist({ id: wishlistId });
                }}
                className={`flex min-w-[25px] items-center justify-center transition-all cursor-pointer duration-300 hover:bg-[#f3f3f3] mr-[23%]`}
              >
                <p className="text-[20px]">X</p>
              </div>
            </div>

            <div className="w-[2px] h-[26px] bg-[#000]"></div>
            <div className="flex items-center justify-start w-full">
              <Image
                src={Cart}
                width={36}
                height={36}
                alt="cart"
                className="cursor-pointer hover:scale-110 transition-all duration-200 ml-[20%]"
                onClick={() => {
                  if (product?.product_type === "single") {
                    globalAddToCart(product?.basic_data?.id_product, 1, false);
                    if (process?.env?.GTM_ENABLED === "true") {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({
                        ecommerce: null,
                      });
                      window?.dataLayer?.push({
                        event: "add_to_cart",
                        ecommerce: {
                          currency: "RSD",
                          value: product?.price?.discount?.active
                            ? product?.price?.price?.discount
                            : product?.price?.price?.original,
                          items: [
                            {
                              item_name: product?.basic_data?.name,
                              item_id: product?.basic_data?.id_product,
                              price: product?.price?.price?.original,
                              item_brand: product?.basic_data?.brand,
                              item_category1: product?.categories[0]?.name,
                              item_variant: null,
                              quantity: 1,
                            },
                          ],
                        },
                      });
                    }
                  } else {
                    router.push(`/${product?.link?.link_path}`);
                  }
                }}
              />
            </div>
          </div>
          <p className="text-black self-start font-sm text-lg mt-2 uppercase">
            <Link
              className="font-normal text-sm clamp"
              href={`/${product?.link?.link_path}`}
            >
              {product?.basic_data?.name}
            </Link>
          </p>
          {product?.price?.price?.original == 0 ||
          product?.price?.price?.original == null ? (
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
    </div>
  );
};

export default Wishlistproducts;
