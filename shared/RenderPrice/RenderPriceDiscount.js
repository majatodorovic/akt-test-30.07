const RenderPriceDiscount = ({ price, inventory }) => {
  switch (true) {
    case price?.min?.price_defined &&
      price?.max?.price_defined &&
      inventory?.inventory_defined &&
      price?.min?.price?.original !== price?.max?.price?.original &&
      price?.min?.discount?.active:
      return (
        <div
          className={`absolute right-2 top-2 z-[2] rounded-md bg-[#333333] px-3 py-1`}
        >
          <span className={`text-white`}>
            -{" "}
            {(
              ((price?.max?.price?.original - price?.max?.price?.discount) /
                price?.max?.price?.original) *
              100
            ).toFixed(0)}{" "}
            %
          </span>
        </div>
      );
    case price?.price_defined &&
      inventory?.inventory_defined &&
      price?.min?.price?.original === price?.max?.price?.original &&
      price?.discount?.active:
      return (
        <div
          className={`absolute right-2 top-2 z-[2] rounded-md bg-[#333333] px-3 py-1`}
        >
          <span className={`text-white`}>
            -{" "}
            {(
              ((price?.price?.original - price?.price?.discount) /
                price?.price?.original) *
              100
            ).toFixed(0)}{" "}
            %
          </span>
        </div>
      );
  }
};

export default RenderPriceDiscount;
