import Link from "next/link";
import Image from "next/image";
import { deleteMethod, get, list, post } from "@/app/api/api";
import Wishlist from "../../../assets/Icons/favorite.png";
import wishlistactive from "../../../assets/Icons/favorite-active.png";
import { useGlobalAddToWishList } from "../../../app/api/globals";
import { currencyFormat } from "../../../helpers/functions";
import { useCartContext } from "@/app/api/cartContext";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Cart from "../../../assets/Icons/shopping-bag.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const Products = ({
  products = [],
  elementRef = {},
  indexOfElementRef = 0,
  wishlistId,
  setWishlistId = () => {},
  isInWishlist = false,
}) => {
  const addToWishlist = useGlobalAddToWishList();
  const [loadingWishlist, setLoadingWishlist] = useState();
  const [wishlistImages, setWishlistImages] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const [, , , mutateWishList] = useCartContext();
  const { data: wishlist, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      return await list(`/wishlist`).then((res) => res?.payload?.items);
    },
    refetchOnWindowFocus: false,
  });

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
                    <div className="absolute top-2 right-5 px-3 bg-croonus-3 w-fit text-[1rem] z-[10] rounded-lg z-100">
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
                    <div className="absolute top-2 right-3 px-3 bg-croonus-3 w-fit text-[1rem] z-[10] rounded-lg z-100">
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
                <div className="absolute top-2 right-5 px-3 bg-croonus-3 w-fit text-[1rem] z-[10] rounded-lg z-100">
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

  let items = null;
  if (products?.length) {
    items = products?.map((item, index) => {
      const isProductInWishlist = wishlist?.find(
        (product) => product?.product?.id === item?.basic_data?.id_product,
      );
      return (
        <div
          ref={index === indexOfElementRef ? elementRef : null}
          key={item.id}
          className={`col-span-1 group`}
        >
          <div className="w-full relative flex justify-center">
            <Link className={`w-full`} href={`/${item?.link?.link_path}`}>
              <div className="relative w-full">
                <div className="relative w-full">
                  {item?.image[0] ? (
                    <>
                      {item?.image[1] ? (
                        <div className="relative  w-full min-h-full max-md:w-[94%] mx-auto hoverThumbImage">
                          <Image
                            src={convertHttpToHttps(item?.image[0])}
                            alt={item?.basic_data?.name ?? "AKT"}
                            width={0}
                            height={0}
                            sizes={`100vw`}
                            style={{ objectFit: "cover" }}
                            className={`transition-all aspect-2/3 duration-200 opacity-100 object-cover w-full h-full firstImage`}
                            loading="lazy"
                          />
                          <Image
                            src={convertHttpToHttps(item?.image[1])}
                            alt={item?.basic_data?.name ?? "AKT"}
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
                            src={convertHttpToHttps(item?.image[0])}
                            alt={item?.basic_data?.name ?? "AKT"}
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
                      alt={`proizvod-${item?.basic_data?.name}` ?? "AKT"}
                    />
                  )}
                </div>
                {item?.stickers[0]?.name ? (
                  <div className="px-3 py-2 absolute top-1 left-1 bg-yellow-200 w-fit text-croonus-1 text-[0.8rem] z-[10] rounded-lg z-100">
                    <p>{item?.stickers[0]?.name}</p>
                  </div>
                ) : null}
                {item?.price?.discount?.active && (
                  <div
                    className={`absolute top-2 right-5 px-3 bg-croonus-3 w-fit text-[0.8rem] z-[10] rounded-lg z-100`}
                  >
                    <p className={`text-black`}>
                      {renderDiscountPercentage(item)}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </div>
          <div className="text-start w-full pt-1">
            <div className=" py-[3px] w-[70%] flex justify-center items-center w-full border-b border-black">
              <div className="flex items-center justify-end w-full">
                <div
                  onMouseEnter={() => {
                    setWishlistId(item?.basic_data?.id_product);
                  }}
                  onClick={async () => {
                    if (!isInWishlist) {
                      await post("/wishlist", {
                        id: null,
                        id_product: item?.basic_data?.id_product,
                        quantity: 1,
                        id_product_parent: null,
                        description: null,
                        status: null,
                      }).then((res) => {
                        if (res?.code === 200) {
                          toast.success("Uspešno dodato u želje.", {
                            autoClose: 2000,
                            position: "top-center",
                          });
                          mutateWishList();
                        } else {
                          toast.warn("Proizvod je već u željama.", {
                            autoClose: 2000,
                            position: "top-center",
                          });
                        }
                      });
                      refetch();
                    } else {
                      setTimeout(async () => {
                        await deleteMethod(`/wishlist/${wishlistId}`).then(
                          (res) => {
                            if (res?.code === 200) {
                              toast.success("Uspešno uklonjeno iz želja.", {
                                autoClose: 2000,
                                position: "top-center",
                              });
                              mutateWishList();
                            } else {
                              toast.error("Došlo je do greške.", {
                                autoClose: 2000,
                                position: "top-center",
                              });
                            }
                          },
                        );
                      }, 500);
                    }
                  }}
                  className={`flex min-w-[25px] mr-[20%] items-center justify-center ${
                    pathname !== "/zelje" && "hover:bg-[#f3f3f3]"
                  } transition-all duration-300`}
                >
                  {isInWishlist ? (
                    <i
                      className={`fa fa-solid fa-times cursor-pointer text-xl hover:text-red-500`}
                    ></i>
                  ) : isProductInWishlist ? (
                    <Image
                      alt="wishlist"
                      src={wishlistactive}
                      height={28}
                      width={28}
                      className="cursor-pointer hover:scale-110 transition-all duration-200 mr-[20%]"
                    />
                  ) : (
                    <Image
                      src={Wishlist}
                      alt="wishlist"
                      height={28}
                      width={28}
                      className={`cursor-pointer transition-all duration-500 hover:scale-110 ${
                        isProductInWishlist && "hidden"
                      }`}
                    />
                  )}
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
                    if (item?.product_type === "single") {
                      globalAddToCart(item?.basic_data?.id_product, 1, false);
                      toast.success("Proizvod je dodat u korpu!", {
                        position: "top-center",
                      });
                      if (process?.env?.GTM_ENABLED === "true") {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          ecommerce: null,
                        });
                        window?.dataLayer?.push({
                          event: "add_to_cart",
                          ecommerce: {
                            currency: "RSD",
                            value: item?.price?.discount?.active
                              ? item?.price?.price?.discount
                              : item?.price?.price?.original,
                            items: [
                              {
                                item_name: item?.basic_data?.name,
                                item_id: item?.basic_data?.id_product,
                                price: item?.price?.discount?.active
                                  ? item?.price?.price?.discount
                                  : item?.price?.price?.original,
                                item_brand: item?.basic_data?.brand,
                                item_category1: item?.categories[0]?.name,
                                item_variant: null,
                                quantity: 1,
                              },
                            ],
                          },
                        });
                      }
                    } else {
                      router.push(`/${item?.link?.link_path}`);
                    }
                  }}
                />
              </div>
            </div>
            <p className="text-black self-start font-sm text-lg mt-2 uppercase">
              <Link
                className="font-normal text-sm clamp"
                href={`/${item?.link?.link_path}`}
              >
                {item?.basic_data?.name}
              </Link>
            </p>
            {item?.price?.price?.original == 0 ||
            item?.price?.price?.original == null ? (
              <button
                className="relative hover:bg-opacity-80 h-fit flex py-1 px-3 bg-croonus-1 text-white font-medium mr-auto"
                onClick={() => {
                  router?.push(`/kontakt?slug=${item?.slug}`);
                }}
              >
                <span className="text-[0.8rem]">Pošaljite upit</span>
              </button>
            ) : (
              <>{renderPrices(item)}</>
            )}
          </div>
        </div>
      );
    });
  } else {
    if (products?.length === 0) {
      <div>Nema proizvoda za prikaz.</div>;
    } else {
      items = (
        <>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="col-span-1 flex flex-col gap-2">
              <div className="h-[470px] w-[375px] animate-pulse bg-croonus-2"></div>
              <div className="h-[15px] w-[375px] animate-pulse bg-croonus-2"></div>
            </div>
          ))}
        </>
      );
    }
  }
  return <>{items}</>;
};

export default Products;
