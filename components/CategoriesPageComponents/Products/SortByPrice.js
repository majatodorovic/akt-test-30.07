export const sortProductsByPriceAsc = (products = []) => {
  return products.sort(
    (a, b) => a.price.price.original - b.price.price.original,
  );
};

export const sortProductsByPriceDesc = (products = []) => {
  return products.sort(
    (a, b) => b.price.price.original - a.price.price.original,
  );
};
