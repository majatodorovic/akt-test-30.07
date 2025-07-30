"use client";
import { config } from "@/_lib/akt.config";
import { currencyFormat } from "@/helpers/functions";

const RenderPrice = ({
  price = 0,
  inventory = {},
  className = "",
  setIsPriceAvailable = () => {},
}) => {
  const { price_render } = config;

  switch (price_render) {
    case 0:
      switch (true) {
        case price?.price_defined &&
          price?.min?.price?.original === price?.max?.price?.original &&
          inventory?.inventory_defined:
          switch (true) {
            case price?.discount?.active:
              return (
                <div className={`flex flex-col items-center`}>
                  <span className={`line-through ${className}`}>
                    {currencyFormat(price?.price?.original)}
                  </span>
                  <span className={`font-bold text-red-500 ${className}`}>
                    {currencyFormat(price?.price?.discount)}
                  </span>
                </div>
              );

            case !price?.discount?.active:
              return (
                <span className={`${className}`}>
                  {currencyFormat(price?.price?.original)}
                </span>
              );
          }
          break;
        case price?.price_defined &&
          price?.min?.price?.original === price?.max?.price?.original &&
          !inventory?.inventory_defined:
          switch (true) {
            case price?.discount?.active:
              return (
                <span className={`font-bold text-red-500 ${className}`}>
                  Nedostupno
                </span>
              );

            case !price?.discount?.active:
              return (
                <span className={`font-bold text-red-500 ${className}`}>
                  Nedostupno
                </span>
              );
          }
          break;
        case !price?.price_defined &&
          price?.min?.price?.original === price?.max?.price?.original &&
          inventory?.inventory_defined:
          setIsPriceAvailable(false);
          return (
            <span className={`font-bold text-red-500 ${className}`}>
              Cena na upit.
            </span>
          );
        case !price?.price_defined &&
          price?.min?.price?.original === price?.max?.price?.original &&
          !inventory?.inventory_defined:
          return (
            <span className={`font-bold text-red-500 ${className}`}>
              Nedostupno
            </span>
          );

        case price?.min?.price_defined &&
          price?.max?.price_defined &&
          price?.min?.price?.original !== price?.max?.price?.original &&
          inventory?.inventory_defined:
          switch (true) {
            case price?.min?.discount?.active:
              return (
                <div className={`flex flex-col items-center`}>
                  <span className={`line-through ${className}`}>
                    {currencyFormat(price?.min?.price?.original)} -
                    {currencyFormat(price?.max?.price?.original)}
                  </span>
                  <span className={`font-bold text-red-500 ${className}`}>
                    {currencyFormat(price?.min?.price?.discount)} -
                    {currencyFormat(price?.max?.price?.discount)}
                  </span>
                </div>
              );

            case !price?.min?.discount?.active:
              return (
                <span className={`${className}`}>
                  {currencyFormat(price?.min?.price?.original)} -
                  {currencyFormat(price?.max?.price?.original)}
                </span>
              );
          }
          break;
        case price?.min?.price_defined &&
          price?.max?.price_defined &&
          price?.min?.price?.original !== price?.max?.price?.original &&
          !inventory?.inventory_defined:
          return (
            <span className={`font-bold text-red-500 ${className}`}>
              Nedostupno
            </span>
          );
        case !price?.min?.price_defined &&
          !price?.max?.price_defined &&
          inventory?.inventory_defined:
          setIsPriceAvailable(false);

          return (
            <span className={`font-bold text-red-500 ${className}`}>
              Cena na upit.
            </span>
          );
        case !price?.min?.price_defined &&
          !price?.max?.price_defined &&
          !inventory?.inventory_defined:
          return (
            <span className={`font-bold text-red-500 ${className}`}>
              Nedostupno
            </span>
          );
      }
      break;
    default:
      break;
  }
};

export default RenderPrice;
