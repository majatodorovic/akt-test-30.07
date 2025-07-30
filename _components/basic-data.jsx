"use client";
import Variants from "@/components/Variants/Variants";
import PlusMinusInputOne from "@/components/PlusMinusInputOne";
import Image from "next/image";
import Cart from "@/assets/Icons/shopping-bag.png";
import { toast } from "react-toastify";
import wishlistactive from "@/assets/Icons/favorite-active.png";
import wishlist from "@/assets/Icons/favorite.png";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { deleteMethod, get, post } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/app/api/cartContext";
import { useGlobalAddToCart } from "@/app/api/globals";
import { currencyFormat } from "@/helpers/functions";
import * as process from "process";
import { generateProductSchema } from "@/_functions";
import Specifications from "@/_components/Specifications";

export const BasicData = ({ slug, categoryId, canonical, id }) => {
  const { data: products } = useSuspenseQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      return await get(
        `/product-details/basic-data/${id}?categoryId=${categoryId ?? "*"}`,
      ).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
  const { data: productsGallery } = useSuspenseQuery({
    queryKey: ["gallery_schema", slug],
    queryFn: async () => {
      return await get(`/product-details/gallery/${id}`).then(
        (res) => res?.payload,
      );
    },
    refetchOnWindowFocus: false,
  });

  const product_schema = generateProductSchema(
    products,
    productsGallery,
    canonical,
  );

  const router = useRouter();
  const [productVariant, setProductVariant] = useState(null);
  const [newURL, setNewURL] = useState(null);
  const [, , , mutateWishList] = useCartContext();
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  let inventoryInfo;
  let behaviours;
  let inventory;
  if (
    products?.data?.variant_items &&
    products?.data?.variant_items?.length > 0
  ) {
    if (Array.isArray(productVariant) && productVariant?.length > 0) {
      return;
    } else if (productVariant && !Array.isArray(productVariant)) {
      productVariant?.inventory?.status === "Dostupno"
        ? (inventoryInfo = "Da")
        : (inventoryInfo = "Ne");

      behaviours = productVariant?.behaviours?.cart;
      inventory = productVariant?.inventory;
    } else {
      behaviours = products?.data?.item?.behaviours?.cart;
      inventory = products?.data?.item?.inventory;
    }
  } else {
    products?.data?.item?.inventory?.status === "Dostupno"
      ? (inventoryInfo = "Da")
      : (inventoryInfo = "Ne");

    inventory = products?.data?.item?.inventory;
    behaviours = products?.data?.item?.behaviours?.cart;
  }

  const [quantity, setQuantity] = useState(behaviours?.default_loop_quantity);

  const globalAddToCart = useGlobalAddToCart();

  useEffect(() => {
    if (newURL && productVariant?.id) {
      window.history.replaceState(null, null, `/${newURL}`);
    }
  }, [newURL, productVariant]);

  const addToWishlist = async (id) => {
    if (isInWishlist) {
      await deleteMethod(`/wishlist/${wishlistId}`).then((res) => {
        if (res?.code === 200) {
          toast.success("Proizvod obrisan iz želja.", {
            position: "top-center",
            autoClose: 3000,
          });
          mutateWishList();
          setLoadingWishlist(false);
          setIsInWishlist(false);
        } else {
          toast.error("Došlo je do nepoznate greške!", {
            position: "top-center",
            autoClose: 3000,
          });
          setLoadingWishlist(false);
          setIsInWishlist(false);
        }
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        ecommerce: null,
      });
      window?.dataLayer?.push({
        event: "remove_from_wishlist",
        ecommerce: {
          currency: "RSD",
          value: products?.data?.item?.price?.discount?.active
            ? products?.data?.item?.price?.price?.discount
            : products?.data?.item?.price?.price?.original,
          items: [
            {
              item_name: products?.data?.item?.basic_data?.name,
              item_id: products?.data?.item?.basic_data?.id_product,
              price: products?.data?.item?.price?.price?.original,
              item_brand: products?.data?.item?.basic_data?.brand,
              item_category1: products?.data?.item?.categories[0]?.name,
              item_variant: null,
              quantity: 1,
            },
          ],
        },
      });
    } else {
      await post("/wishlist", {
        id: null,
        id_product: id,
        quantity: 1,
        id_product_parent: null,
        description: null,
        status: null,
      }).then((res) => {
        if (res?.code === 200) {
          toast.success("Proizvod je dodat u želje.", {
            position: "top-center",
            autoClose: 3000,
          });
          mutateWishList();
          setLoadingWishlist(false);
        } else {
          toast.error("Došlo je do nepoznate greške!", {
            position: "top-center",
            autoClose: 3000,
          });
          setLoadingWishlist(false);
        }
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        ecommerce: null,
      });
      window?.dataLayer?.push({
        event: "add_to_wishlist",
        ecommerce: {
          currency: "RSD",
          value: products?.data?.item?.price?.discount?.active
            ? products?.data?.item?.price?.price?.discount
            : products?.data?.item?.price?.price?.original,
          items: [
            {
              item_name: products?.data?.item?.basic_data?.name,
              item_id: products?.data?.item?.basic_data?.id_product,
              item_price: products?.data?.item?.price?.price?.original,
              item_brand: products?.data?.item?.basic_data?.brand,
              item_category1: products?.data?.item?.categories[0]?.name,
              item_variant: null,
              quantity: 1,
            },
          ],
        },
      });
    }
  };
  useEffect(() => {
    const checkWishlist = async () => {
      return await get(
        `/wishlist/product-in-wishlist/${products?.data?.item?.basic_data?.id_product}`,
      ).then((res) => {
        if (res?.payload?.exist) {
          setIsInWishlist(true);
          setWishlistId(res?.payload?.wishlist_item_id);
        }
      });
    };
    checkWishlist();
  }, [addToWishlist]);

  const updateProductVariant = (newProduct) => {
    setProductVariant(newProduct);
  };

  const handleURLChange = (newURL) => {
    setNewURL(newURL);
  };

  const addToCart = async (e) => {
    if (products.product_type === "single") {
      globalAddToCart(products.data.item.basic_data.id_product, quantity);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        ecommerce: null,
      });
      window?.dataLayer?.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "RSD",
          value: products?.data?.item?.price?.discount?.active
            ? products?.data?.item?.price?.price?.discount
            : products?.data?.item?.price?.price?.original,
          items: [
            {
              item_name: products?.data?.item?.basic_data?.name,
              item_id: products?.data?.item?.basic_data?.id_product,
              price: products?.data?.item?.price?.discount?.active
                ? products?.data?.item?.price?.price?.discount
                : products?.data?.item?.price?.price?.original,
              item_brand: products?.data?.item?.basic_data?.brand,
              item_category1: products?.data?.item?.categories[0]?.name,
              item_variant: productVariant?.basic_data?.name,
              quantity: quantity,
            },
          ],
        },
      });
    } else {
      if (!productVariant) {
        toast.warn("Morate izabrati varijantu proizvoda!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        globalAddToCart(productVariant?.basic_data?.id_product, quantity);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          ecommerce: null,
        });
        window?.dataLayer?.push({
          event: "add_to_cart",
          ecommerce: {
            currency: "RSD",
            value: productVariant?.price?.discount?.active
              ? productVariant?.price?.price?.discount
              : productVariant?.price?.price?.original,
            items: [
              {
                item_name: productVariant?.basic_data?.name,
                item_id: productVariant?.basic_data?.id_product,
                price: productVariant?.price?.discount?.active
                  ? productVariant?.price?.price?.discount
                  : productVariant?.price?.price?.original,
                item_brand: productVariant?.basic_data?.brand,
                item_category1: productVariant?.categories[0]?.name,
                item_variant: productVariant?.basic_data?.name,
                quantity: quantity,
              },
            ],
          },
        });
      }
    }
    setQuantity(behaviours?.default_loop_quantity);
  };

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
                      className={`text-[1rem] self-start text-black font-normal py-2 line-through`}
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
                      className={`text-[1rem] self-start text-black font-normal py-2 line-through`}
                    >
                      {currencyFormat(item?.price?.min?.price?.original)} -{" "}
                      {currencyFormat(item?.price?.max?.price?.original)}
                    </p>
                    <div className="bg-croonus-3  self-start w-fit ">
                      <p className="text-[1rem] self-start text-black font-normal py-2 px-2">
                        -
                        {(
                          (item?.price?.discount?.amount /
                            item?.price?.price?.original) *
                          100
                        ).toFixed(0)}
                        % {currencyFormat(item?.price?.min?.price?.discount)} -{" "}
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
                      className={`text-[1rem] self-start text-black font-normal py-1`}
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
                      className={`text-[1rem] self-start text-black font-normal py-1`}
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
                  className={`text-[1rem] self-start text-black font-normal py-2 line-through`}
                >
                  {currencyFormat(item?.price?.price?.original)}
                </p>
                <div className="bg-croonus-3  self-start w-fit ">
                  <p className="text-[1rem] self-start text-black font-normal py-2 px-2">
                    -
                    {(
                      (item?.price?.discount?.amount /
                        item?.price?.price?.original) *
                      100
                    ).toFixed(0)}
                    % {currencyFormat(item?.price?.price?.discount)}
                  </p>
                </div>
              </>
            );
            break;
          case false:
            return (
              <>
                <p
                  className={`text-[1rem] self-start text-black font-normal py-1`}
                >
                  {currencyFormat(item?.price?.price?.original)}
                </p>
              </>
            );
            break;
        }
    }
  };

  const renderFinalPrice = (item) => {
    switch (item?.price?.discount?.active) {
      case true:
        switch (products?.product_type) {
          case "single":
            return currencyFormat(item?.price?.price?.discount);
          case "variant":
            switch (true) {
              case Boolean(productVariant?.id) === true:
                return currencyFormat(item?.price?.price?.discount);
              case Boolean(productVariant?.id) === false:
                if (
                  item?.price?.min?.price?.discount ==
                  item?.price?.max?.price?.discount
                ) {
                  return `${currencyFormat(item?.price?.min?.price?.discount)}`;
                } else {
                  return `${currencyFormat(
                    item?.price?.min?.price?.discount,
                  )} - ${currencyFormat(item?.price?.max?.price?.discount)}`;
                }
            }
        }
        break;
      case false:
        switch (products?.product_type) {
          case "single":
            return item?.price?.price?.original
              ? currencyFormat(item?.price?.price?.original)
              : "Cena na upit";
          case "variant":
            switch (true) {
              case Boolean(productVariant?.id) === true:
                return productVariant?.price?.price?.original
                  ? currencyFormat(productVariant?.price?.price?.original)
                  : "Cena na upit";
              case Boolean(productVariant?.id) === false:
                if (
                  item?.price?.min?.price?.original ==
                  item?.price?.max?.price?.original
                ) {
                  return item?.price?.min?.price?.original
                    ? `${currencyFormat(item?.price?.min?.price?.original)}`
                    : "Cena na upit";
                } else {
                  return `${currencyFormat(
                    item?.price?.min?.price?.original,
                  )} - ${currencyFormat(item?.price?.max?.price?.original)}`;
                }
            }
        }
        break;
    }
  };

  useEffect(() => {
    const getValue = () => {
      switch (true) {
        case products?.data?.item?.price?.min?.price?.original ===
          products?.data?.item?.price?.max?.price?.original:
          switch (true) {
            case products?.data?.item?.price?.discount?.active:
              return products?.data?.item?.price?.price?.discount;
            case !products?.data?.item?.price?.discount?.active:
              return products?.data?.item?.price?.price?.original;
          }
          break;
        case products?.data?.item?.price?.min?.price?.original !==
          products?.data?.item?.price?.max?.price?.original:
          switch (true) {
            case products?.data?.item?.price?.discount?.active:
              return `${products?.data?.item?.price?.min?.price?.discount} - ${products?.data?.item?.price?.max?.price?.discount}`;
            case !products?.data?.item?.price?.discount?.active:
              return `${products?.data?.item?.price?.min?.price?.original} - ${products?.data?.item?.price?.max?.price?.original}`;
          }
          break;
      }
    };

    if (process.env.GTM_ENABLED === "true") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        ecommerce: null,
      });
      window?.dataLayer?.push({
        event: "view_item",
        ecommerce: {
          currency: "RSD",
          value: getValue(),
          items: [
            {
              item_name: products?.data?.item?.basic_data?.name,
              item_id: products?.data?.item?.basic_data?.id_product,
              price: getValue(),
              item_brand: products?.data?.item?.basic_data?.brand_name,
              item_category1: products?.data?.item?.categories[0]?.name,
              item_variant: productVariant?.basic_data?.attributes_text,
            },
          ],
        },
      });
    }
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product_schema) }}
      />
      <h1 className="uppercase max-md:text-[0.9rem] text-[1.35rem] text-croonus-1 font-bold max-md:max-w-full self-start hyphens">
        {products?.data?.item?.basic_data?.name}
      </h1>
      <div className="flex flex-row gap-10 max-md:mt-3">
        <p className="text-sm mt-0 font-bold">
          Šifra:{" "}
          <span className="font-normal">
            {productVariant && !Array.isArray(productVariant) ? (
              <>{productVariant?.basic_data?.sku}</>
            ) : (
              <> {products?.data?.item?.basic_data?.sku}</>
            )}{" "}
          </span>
        </p>

        <p className="font-bold mt-0 text-sm">
          {inventoryInfo && (
            <>
              Dostupno: <span className="font-medium">{inventoryInfo}</span>
            </>
          )}
        </p>
      </div>
      <div className="flex max-md:flex-col max-md:gap-1 flex-row items-center gap-10 mt-4 py-5">
        {products?.data?.item?.price?.price?.original !== 0 &&
        products?.data?.item?.price?.price?.original !== null ? (
          <>{renderPrices(products?.data?.item)}</>
        ) : null}
      </div>
      <div>
        <h1 className="font-bold max-sm:hidden">
          <p className="text-[1rem] font-normal">
            {products?.data?.item?.basic_data?.short_description}
          </p>
        </h1>
      </div>

      {products?.product_type === "single" ? null : (
        <div className="py-10 max-md:py-7">
          <Variants
            firstVariantOption={false}
            product={products}
            productSlug={slug}
            handleURLChange={handleURLChange}
            productVariant={productVariant}
            updateProductVariant={updateProductVariant}
            setQuantity={
              behaviours
                ? () => setQuantity(behaviours?.default_loop_quantity)
                : false
            }
          />
        </div>
      )}
      {products?.data?.item?.price?.price_defined ||
      products?.data?.item?.price?.min?.price_defined ||
      products?.data?.item?.price?.max?.price_defined ? (
        <h1 className="text-[1.5rem] font-bold max-lg:text-left">
          {renderFinalPrice(
            productVariant?.id ? productVariant : products?.data?.item,
          )}
        </h1>
      ) : (
        <h1 className="text-[1.5rem] font-bold max-lg:text-left max-md:hidden">
          Cena na upit
        </h1>
      )}

      <div className="flex items-center max-lg:justify-center max-md:mt-3 flex-row lg:flex-row gap-5 mt-6">
        <div className="col-span-1 max-lg:col-span-3">
          <PlusMinusInputOne
            behaviours={behaviours}
            quantity={quantity}
            setQuantity={setQuantity}
            max={inventory?.amount}
            quantityError={() => {
              if (
                products?.product_type === "variant" &&
                (!productVariant ||
                  (Array.isArray(productVariant) &&
                    productVariant?.length == 0))
              ) {
                return "Izaberite varijantu";
              }

              if (inventory?.inventory_defined == false) {
                return `${inventory?.status}`;
              }

              return false;
            }}
          />
        </div>

        <div className="col-span-4 max-md:h-full self-stretch flex items-center gap-2">
          {productVariant?.id ? (
            productVariant.inventory?.inventory_defined &&
            productVariant?.price?.price_defined ? (
              <button
                className="relative max-md:h-full hover:bg-opacity-80 flex items-center gap-2 max-[361px]:pr-5 min-[375px]:px-5 justify-center py-1 bg-croonus-1 text-white font-medium"
                onClick={() => addToCart()}
              >
                <Image
                  className="invert"
                  width={40}
                  height={40}
                  src={Cart}
                  alt="cart"
                />
                Dodaj u korpu
              </button>
            ) : (
              <button
                className="relative max-md:h-full hover:bg-opacity-80 flex items-center gap-2 max-[361px]:pr-5 min-[375px]:px-5 justify-center py-1 bg-croonus-1 text-white font-medium"
                onClick={() => {
                  productVariant
                    ? router?.push(`/kontakt?slug=${productVariant?.slug}`)
                    : router?.push(
                        `/kontakt?slug=${products?.data?.item?.slug}`,
                      );
                }}
              >
                <span className="py-2 px-4">Pošaljite upit</span>
              </button>
            )
          ) : products?.data?.item?.inventory?.inventory_defined &&
            products?.data?.item?.price?.price_defined ? (
            <button
              className="relative max-md:h-full hover:bg-opacity-80 flex items-center gap-2 max-[361px]:pr-5 min-[375px]:px-5 justify-center py-1 bg-croonus-1 text-white font-medium"
              onClick={() => addToCart()}
            >
              <Image
                className="invert"
                width={40}
                height={40}
                src={Cart}
                alt="cart"
              />
              Dodaj u korpu
            </button>
          ) : (
            <button
              className="relative max-md:h-full hover:bg-opacity-80 flex items-center gap-2 max-[361px]:pr-5 min-[375px]:px-5 justify-center py-1 bg-croonus-1 text-white font-medium"
              onClick={() => {
                productVariant
                  ? router?.push(`/kontakt?slug=${productVariant?.slug}`)
                  : router?.push(`/kontakt?slug=${products?.data?.item?.slug}`);
              }}
            >
              <span className="py-2 px-4">Pošaljite upit</span>
            </button>
          )}

          <div
            className={`self-stretch`}
            onClick={() => {
              setLoadingWishlist(true);
              addToWishlist(products?.data?.item?.basic_data?.id_product);
            }}
          >
            <button
              disabled={loadingWishlist}
              className={`w-full flex items-center justify-center p-1 `}
            >
              {loadingWishlist ? (
                <i
                  className={`fa fa-solid fa-spinner fa-spin text-white text-xl`}
                ></i>
              ) : isInWishlist ? (
                <Image
                  src={wishlistactive}
                  alt={`AKT`}
                  width={40}
                  height={40}
                  className={`cursor-pointer`}
                />
              ) : (
                <Image
                  src={wishlist}
                  alt={`AKT`}
                  width={40}
                  height={40}
                  className={``}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <Specifications id={id} />
    </>
  );
};
