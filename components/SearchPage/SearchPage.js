"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Filters from "../Filters/Filters";
import { useRouter } from "next/router";
import Breadcrumbs from "@/helpers/GenerateBreadCrumbs";
import { list } from "@/app/api/api";
import Products from "../CategoriesPageComponents/Products/Products";
import GenerateBreadCrumbsServer from "@/helpers/generateBreadCrumbsServer";
const SearchPagee = ({
  products,
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  setChangeFilters,
  changeFilters,
  showSearch,
  setShowSearch,
  searchProducts,
  filtersMap,
  onPageChange,
  onLimitChange,
  onSortChange,
  sort,
  sortKeys,
  limit,
  pagination,
  categoryData,
  newProducts,
}) => {
  const [newProductsArray, setNewProductsArray] = useState(products);
  const [open, setOpen] = useState(false);
  const { push: navigate, asPath } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const updateFilterState = (newState) => {
    setFiltersOpen(newState);
  };

  useEffect(() => {
    setNewProductsArray(products);
  }, [products]);

  const router = useRouter();
  const { search } = router.query;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (process?.env?.GTM_ENABLED === "true") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        ecommerce: null,
      });
      window?.dataLayer?.push({
        currencyCode: "RSD",
        impressions: [
          products.map((product) => ({
            name: product?.basic_data?.name,
            id: product?.basic_data?.id_product,
            price: product?.price?.price?.original,
            brand: product?.brand,
            category: product?.categories[0]?.name,
            list: "Pretraga",
          })),
        ],
      });
    } else {
      null;
    }
  }, [newProductsArray]);
  return (
    <>
      <div className="w-full bg-croonus-5">
        <div className="w-[85%] mx-auto mt-4 pb-1 pt-1">
          <GenerateBreadCrumbsServer />
        </div>
      </div>
      <div className="mx-auto w-[95%] lg:w-[84%]">
        <div className="flex flex-col gap-8 py-5 font-medium  max-lg:gap-8">
          <h1 className="text-4xl font-semibold max-lg:text-center">
            {categoryData?.basic_data?.name}
          </h1>
          {router.asPath.includes("search") ? (
            <h1 className="text-xl font-light ">
              Pretražili ste: <span className="font-medium">{search}</span>
            </h1>
          ) : (
            <>
              <p className="clamp1 text-base font-normal leading-[20pt] max-lg:text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </p>
              <span className="text-center text-sm font-semibold underline lg:hidden">
                Pročitajte više
              </span>
            </>
          )}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:mt-12 xl:grid-cols-3 3xl:grid-cols-4">
          {loading ? (
            <div className="col-span-1">
              <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
            </div>
          ) : (
            <Products products={products} />
          )}
        </div>

        <div
          className={
            filtersOpen
              ? `fixed top-0 left-0 z-[82] h-screen w-[25vw] translate-x-0 bg-white shadow-2xl transition-all duration-[550ms] max-lg:w-[75vw]`
              : `fixed top-0 left-0 z-[82] h-screen w-[25vw] -translate-x-full bg-white shadow-2xl transition-all duration-[550ms] max-lg:w-[75vw]`
          }
        >
          {router.asPath.includes("search") ? null : (
            <div className="mx-auto w-[90%]">
              <Filters
                filters={availableFilters}
                filtersMap={filtersMap}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                changeFilters={changeFilters}
                setChangeFilters={setChangeFilters}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                searchProducts={searchProducts}
                updateFilterState={updateFilterState}
              />
            </div>
          )}
        </div>

        {filtersOpen && (
          <div
            className="fixed top-0 left-0 z-[61] h-screen w-screen bg-black bg-opacity-40"
            onClick={() => setFiltersOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default SearchPagee;
