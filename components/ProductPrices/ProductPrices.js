"use client";
import { usePathname } from "next/navigation";
import { currencyFormat } from "@/helpers/functions";

const ProductPrices = ({
  price,
  inventory,
  className,
  handlePrice = () => {},
}) => {
  const pathname = usePathname();
  switch (true) {
    case price?.price_defined && inventory?.amount !== null:
      handlePrice ? handlePrice(price?.price?.original) : null;
      return (
        <>
          {price?.price?.discount !== null ? (
            <>
              <h1 className={className}>
                {currencyFormat(price?.price?.discount)}
              </h1>
            </>
          ) : (
            <>{currencyFormat(price?.price?.original)}</>
          )}
        </>
      );

    case price?.price_defined && inventory?.amount === null:
      handlePrice ? handlePrice(price?.price?.original) : null;
      return (
        <>
          {price?.price?.discount !== null ? (
            <>
              <h1 className={className}>
                {currencyFormat(price?.price?.discount)}
              </h1>
            </>
          ) : (
            <>
              {" "}
              <>{currencyFormat(price?.price?.original)}</>
            </>
          )}
        </>
      );

    case !price?.price_defined && inventory?.amount !== null:
      handlePrice ? handlePrice("Cena na upit") : null;
      return <h1 className={className}>Cena na upit</h1>;

    case !price?.price_defined && inventory?.amount === null:
      handlePrice ? handlePrice("Cena na upit") : null;

      return <h1 className={className}>Cena na upit</h1>;

    default:
      return null;
  }
};

export default ProductPrices;
