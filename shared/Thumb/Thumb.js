"use client";

import ThumbDefault from "@/shared/Thumb/ThumbDefault";
import ThumbSlider from "@/shared/Thumb/ThumbSlider";
import ThumbSuspense from "@/shared/Thumb/ThumbSuspense";

const Thumb = ({
  price = 0,
  inventory = {},
  name = "",
  images = [],
  slider = false,
  variantOptions,
  id = 1,
  slug_path = "",
  className = "",
  wishlist_id = null,
  refreshWishlist,
  render = true,
  thumbKey,
}) => {
  switch (slider) {
    case true:
      return (
        <ThumbSlider
          price={price}
          inventory={inventory}
          name={name}
          images={images}
          variantOptions={variantOptions}
          id={id}
          slug_path={slug_path}
          className={className}
        />
      );
    case false:
      switch (render) {
        case true:
          return (
            <ThumbDefault
              price={price}
              inventory={inventory}
              name={name}
              images={images}
              variantOptions={variantOptions}
              id={id}
              slug_path={slug_path}
              className={className}
              wishlist_id={wishlist_id}
              refreshWishlist={refreshWishlist}
            />
          );
        case false:
          return (
            <ThumbSuspense
              className={className}
              id={id}
              thumbKey={id}
              wishlist_id={wishlist_id}
              refreshWishlist={refreshWishlist}
            />
          );
      }
      break;
    default:
      break;
  }
};

export default Thumb;
