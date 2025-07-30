"use client";

import {
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
  useProductSticker,
} from "@/hooks/akt.hooks";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RenderPriceDiscount from "@/shared/RenderPrice/RenderPriceDiscount";
import RenderPrice from "@/shared/RenderPrice/RenderPrice";

const ThumbDefault = ({
  name,
  className,
  id,
  variantOptions,
  price,
  images,
  slug_path,
  inventory,
  wishlist_id,
  refreshWishlist,
}) => {
  const { isPending: isWishlistPending, mutate: addToWishlist } =
    useAddToWishlist();
  const { data, refetch } = useIsInWishlist({ id });
  const slug = slug_path;
  //fetchujemo podatke o stickeru
  const { data: sticker } = useProductSticker({ id });

  const isInWishlist = data?.exist;
  const [isPriceAvailable, setIsPriceAvailable] = useState(true);
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();

  return (
    <div key={id} className={`group relative`}>
      <div className={`imageHolder relative overflow-hidden`}>
        <Link href={`/${slug_path}`}>
          <Image
            src={images[0] ?? "/maximon.png"}
            width={0}
            height={0}
            sizes={`100vw`}
            alt={name ?? "Maximon"}
            onLoad={(e) => {
              e.target.classList.remove("blur-lg");
              e.target.classList.remove("filter");
            }}
            className={`relative z-[1] aspect-2/3 max-h-[350px] w-full blur-lg filter transition-all duration-500 hover:scale-110 xl:min-h-[28.125rem]`}
          />
        </Link>
        {sticker[0]?.name ? (
          <span className="absolute top-1 right-1 font-thin z-[40] bg-black text-white w-fit px-2 py-[3px] flex text-sm">
            {sticker[0]?.name}
          </span>
        ) : null}
        {isInWishlist && (
          <div className={`absolute left-2 top-2 z-[5] hidden`}>
            <Image
              src={`/icons/heart-active.png`}
              alt={`AKT`}
              width={18}
              height={18}
            />
          </div>
        )}
        <RenderPriceDiscount price={price} inventory={inventory} />
        <div
          className={`bottom-2 left-0 right-0 z-[5] mx-auto md:hidden w-[90%] items-center justify-center gap-5 bg-white py-2 group-hover:absolute group-hover:flex max-sm:flex max-sm:hover:!flex`}
        >
          <Link href={`/${slug_path}`} className={`cartButton cursor-pointer`}>
            <Image
              src={`/icons/cart.png`}
              alt={`AKT`}
              width={25}
              height={25}
              className={`inactive`}
            />
            <Image
              src={`/icons/cart-active.png`}
              alt={`AKT`}
              width={25}
              height={25}
              className={`active hidden`}
            />
          </Link>
          {wishlist_id ? (
            <button
              className={`cursor-pointer`}
              onClick={() => {
                removeFromWishlist({ id: wishlist_id });
                setTimeout(() => {
                  refreshWishlist();
                }, 500);
              }}
            >
              <i
                className={`fa fa-solid fa-times text-lg text-black hover:text-[#e74c3c]`}
              ></i>
            </button>
          ) : (
            <button
              className={`cursor-pointer ${isWishlistPending && "opacity-50"}`}
              onClick={() => {
                addToWishlist({ id });
                setTimeout(() => {
                  refetch();
                }, 500);
              }}
              disabled={isWishlistPending}
            >
              {isInWishlist ? (
                <Image
                  src={`/icons/heart-active.png`}
                  alt={`AKT`}
                  width={25}
                  height={25}
                />
              ) : (
                <div className={`wishlistHover`}>
                  <Image
                    src={`/icons/heart.png`}
                    alt={`AKT`}
                    width={25}
                    height={25}
                    className={`inactive`}
                  />
                  <Image
                    src={`/icons/heart-active.png`}
                    alt={`AKT`}
                    width={25}
                    height={25}
                    className={`active hidden`}
                  />
                </div>
              )}
            </button>
          )}
        </div>
      </div>
      <div
        className={`mt-3 flex flex-col items-center justify-center text-center`}
      >
        <Link
          href={`/${slug_path}`}
          className={`text-base !font-light uppercase ${className} line-clamp-1 group-hover:underline`}
        >
          {name}
        </Link>

        <RenderPrice
          price={price}
          inventory={inventory}
          className={`${className} mt-1 !font-normal`}
          setIsPriceAvailable={setIsPriceAvailable}
        />
      </div>
    </div>
  );
};

export default ThumbDefault;
