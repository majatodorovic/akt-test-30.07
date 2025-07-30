"use client";
import Image from "next/image";
import RenderPrice from "@/shared/RenderPrice/RenderPrice";
import RenderPriceDiscount from "@/shared/RenderPrice/RenderPriceDiscount";
import Link from "next/link";
import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
  useProductSticker,
} from "@/hooks/akt.hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/_lib/akt.config";

const ThumbSlider = ({
  variantOptions,
  name,
  price,
  images,
  inventory,
  id,
  slug_path,
  className,
}) => {
  const router = useRouter();

  const slug = slug_path;
  //fetchujemo podatke o stickeru
  const { data: sticker } = useProductSticker({ id });

  const {
    isPending: isWishlistPending,
    mutate: addToWishlist,
    isSuccess: isAdded,
  } = useAddToWishlist();
  const { data, refetch } = useIsInWishlist({ id });
  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();
  //
  const wishlist_data = {
    exist: data?.exist,
    wishlist_item_id: data?.wishlist_item_id,
  };
  const [isPriceAvailable, setIsPriceAvailable] = useState(true);

  const handleNavigate = (slug_path) => {
    router.push(`/kontakt?slug=${slug}`, { scroll: false });
  };

  const { base64_placeholder } = config;

  useEffect(() => {
    if (isAdded || isRemoved) {
      refetch();
    }
  }, [isAdded, isRemoved]);

  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAddToCart = (id) => {
    addToCart({ id, quantity: 1 });
  };

  return (
    <div key={id} className={`group relative`}>
      <div className={`imageHolder relative overflow-hidden`}>
        <Link href={`/${slug_path}`}>
          <Image
            src={images[0] ?? "/maximon.png"}
            width={500}
            height={500}
            alt={name ?? "AKT"}
            placeholder={`blur`}
            blurDataURL={base64_placeholder}
            className={`relative z-[1] aspect-2/3 max-h-[350px] transition-all duration-500 group-hover:scale-110`}
          />
        </Link>
        {sticker[0]?.name ? (
          <span className="absolute top-1 right-1 font-thin z-[40] bg-black text-white w-fit px-2 py-[3px] flex text-sm">
            {sticker[0]?.name}
          </span>
        ) : null}
        {wishlist_data?.exist && (
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
          className={`absolute bottom-2 left-0 right-0 z-[5] mx-auto hidden w-[90%] items-center justify-center gap-5 bg-white py-2 group-hover:absolute group-hover:flex max-sm:!flex max-sm:hover:!flex`}
        >
          {variantOptions?.length > 0 ? (
            <Link
              href={`/${slug_path}`}
              className={`cartButton cursor-pointer`}
            >
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
          ) : (
            <button
              onClick={() => {
                handleAddToCart(id);
              }}
              className={`cartButton cursor-pointer`}
            >
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
            </button>
          )}

          <button
            className={`cursor-pointer ${isWishlistPending && "opacity-50"}`}
            onClick={() => {
              if (wishlist_data?.exist) {
                removeFromWishlist({ id: wishlist_data?.wishlist_item_id });
              } else {
                addToWishlist({ id });
              }
            }}
            disabled={isWishlistPending}
          >
            {wishlist_data?.exist ? (
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

export default ThumbSlider;
