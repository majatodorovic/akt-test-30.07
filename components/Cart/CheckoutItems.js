"use client";

import Image from "next/image";
import { useRemoveFromCart, useUpdateCartQuantity } from "@/hooks/akt.hooks";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import PlusMinusInput from "@/components/PlusMinusInputOne";
import Link from "next/link";

const CheckoutItems = ({
  id,
  name,
  sku,
  price,
  image,
  slug_path,
  inventory,
  className,
  refreshCart,
  quantity,
  refreshSummary,
  isClosed,
  cart_item_id,
  behaviours,
}) => {
  const { mutate: removeFromCart, isSuccess: isRemoved } = useRemoveFromCart();
  const { mutate: updateCart, isSuccess: isUpdated } = useUpdateCartQuantity();

  const [productQuantity, setProductQuantity] = useState(Number(quantity));

  useEffect(() => {
    if (Number(quantity) !== productQuantity) {
      updateCart({
        id: cart_item_id,
        quantity: productQuantity,
      });
    }
  }, [productQuantity]);

  useEffect(() => {
    setProductQuantity(Number(quantity));
  }, [quantity]);

  useEffect(() => {
    if (isUpdated || isRemoved) {
      refreshCart();
      refreshSummary();
    }
  }, [isUpdated, isRemoved]);

  const [sureCheck, setSureCheck] = useState(false);

  return (
    <>
      <div className={`relative grid grid-cols-4 gap-5`}>
        <i
          className={`fas fa-times absolute right-2 top-2 cursor-pointer ${
            isClosed && !inventory?.inventory_defined && "text-white"
          } text-lg hover:text-red-500`}
          onClick={() => {
            setSureCheck(true);
          }}
        ></i>

        <Link href={`/${slug_path}`} className={`col-span-1 relative`}>
          {price?.per_item?.discount?.active && (
            <div className=" absolute top-[2px] right-[2px] px-[3px] py-[3px] bg-croonus-3 w-fit text-croonus-1 rounded-lg z-20">
              <p className="text-black text-[12px]">
                -{" "}
                {(
                  (price?.cost?.discount_amount / price?.cost?.with_vat) *
                  100
                ).toFixed(0)}
                %
              </p>
            </div>
          )}

          <Image
            src={image?.[0] ?? "/comr.png"}
            alt={`Comr`}
            width={0}
            height={0}
            sizes={`90vw`}
            className={`aspect-2/3 h-full max-h-[250px] w-full`}
          />
        </Link>
        <div
          className={`col-span-3 mb-auto ml-[0rem] flex flex-col items-start gap-2`}
        >
          <h4
            className={`${className} mt-2 break-words text-left text-[1.1rem] font-normal max-w-[200px] md:max-w-[250px] lg:max-w-[270px] 2xl:max-w-[350px]`}
          >
            {name}
          </h4>

          <div className={`flex items-center`}>
            <span className={`${className} text-[0.9rem]`}>Količina:</span>{" "}
            &nbsp;
            <PlusMinusInput
              behaviours={behaviours}
              max={+inventory?.amount}
              quantity={productQuantity}
              setQuantity={setProductQuantity}
              updateCart={updateCart}
              quantityError={() => {
                return false;
              }}
            />
          </div>
          <p className={`text-center ${className} text-[0.9rem] font-normal`}>
            Šifra:&nbsp;{sku}
          </p>
          <p className={`text-center ${className} text-[0.9rem] font-normal`}>
            Cena:&nbsp;{currencyFormat(price?.cost?.total)}
          </p>

          {price?.per_item?.discount?.active && (
            <p
              className={`text-center ${className} text-[0.9rem] font-normal text-[#b59d3d]`}
            >
              Ušteda:&nbsp;{currencyFormat(price?.cost?.discount_amount)}
            </p>
          )}
        </div>
        {isClosed && !inventory?.inventory_defined && (
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/40`}
          ></div>
        )}
      </div>
      {sureCheck && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSureCheck(false)}
        >
          <div className="rounded-lg bg-white p-5">
            <span className="text-[15px] font-bold">
              Da li ste sigurni da želite da uklonite proizvod iz korpe?
            </span>
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                className="rounded-lg bg-[#E5E5E5] px-5 py-2 hover:bg-red-500 hover:text-white max-md:text-[15px]"
                onClick={() => setSureCheck(false)}
              >
                Ne
              </button>
              <button
                className="rounded-lg bg-[#E5E5E5] px-5 py-2 hover:bg-green-500 hover:text-white max-md:text-[15px]"
                onClick={() => {
                  removeFromCart({ id: id });
                }}
              >
                Da
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutItems;
