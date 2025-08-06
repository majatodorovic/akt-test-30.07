export const getCurrentGalleryByVariantKeys = ({
  variantKeyString,
  productGallery,
}) => {
  let currentGallery = productGallery?.gallery?.filter((productData) => {
    if (productData?.variants?.length === 0) {
      return true;
    } else
      return productData.variants.some(
        (variant) => variant.variant_key === variantKeyString
      );
  });
  return currentGallery;
};
