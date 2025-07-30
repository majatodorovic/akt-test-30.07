"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Suspense,
} from "react";
import Filters from "../../Filters/Filters";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { queryKeys, sortKeys } from "@/helpers/const";
import { post, list, get } from "@/app/api/api";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import ThumbSuspense from "@/shared/Thumb/ThumbSuspense";

const CategoriesPageDisplay = ({
  filtersMap,
  filters,
  id,
  query,
  newProducts,
  categoryDataa,
  productsDataResponse,
  categories,
  gridProducts,
}) => {
  const [open, setOpen] = useState(false);
  const { push: navigate, asPath } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const updateFilterState = (newState) => {
    setFiltersOpen(newState);
  };

  const router = useRouter();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const categoryData = { id: id };
  // const replaceQuery = useCallback(
  //   (newQuery) => {
  //     delete newQuery.path;
  //     router.replace({
  //       pathname: router.asPath.split("?")[0],
  //       query: newQuery,
  //     });
  //   },
  //   [router]
  // );
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState(productsDataResponse);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const elementRef = useRef(null);

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      const { pagination } = productsData;
      const { total_pages } = pagination;
      const scrollPercentage =
        (window?.scrollY + window?.innerHeight) /
        document?.documentElement?.scrollHeight;

      if (page !== total_pages && scrollPercentage >= 0.7) {
        setPage(page + 1);
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight;

      if (hasMore && scrollPercentage >= 0.8) {
        const { pagination } = productsData;
        const { total_pages } = pagination;
        if (page < total_pages) {
          setPage(page + 1);
        }
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productsData]);

  const [limit, setLimit] = useState(16);

  const newSort = Object?.keys(sortKeys).find(
    (key) => sortKeys[key]?.query === query[queryKeys?.sort],
  );

  const [sort, setSort] = useState({
    field: "",
    direction: "",
  });

  const newSelected = [];
  // for (const item in query) {
  //   if (item !== "path" && !Object?.values(queryKeys)?.includes(item))
  //     newSelected?.push({
  //       column: item,
  //       value: { selected: query[item]?.split(",") },
  //     });
  // }
  const [selectedFilters, setSelectedFilters] = useState(newSelected);
  const [availableFilters, setAvailableFilters] = useState(filters);
  const [changeFilters, setChangeFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState();

  useEffect(() => {
    if (changeFilters) {
      post(`/products/category/filters/${categoryData?.id}`, {
        filters: selectedFilters,
      }).then((response) => {
        const lastSelectedFilterValues = selectedFilters?.find((item) => {
          return item?.column === lastSelectedFilterKey;
        });

        const lastSelectedFilter = availableFilters?.find((item) => {
          return item?.key === lastSelectedFilterKey;
        });

        const filterLastSelectedFromResponse = response?.payload?.filter(
          (item) => {
            return item?.key !== lastSelectedFilterKey;
          },
        );

        const indexOfLastSelectedFilter = availableFilters?.findIndex(
          (index) => {
            return index?.key === lastSelectedFilterKey;
          },
        );

        if (
          lastSelectedFilter &&
          lastSelectedFilterValues?.value?.selected?.length > 0
        ) {
          setAvailableFilters([
            ...filterLastSelectedFromResponse.slice(
              0,
              indexOfLastSelectedFilter,
            ),
            lastSelectedFilter,
            ...filterLastSelectedFromResponse.slice(indexOfLastSelectedFilter),
          ]);
        } else {
          setAvailableFilters(response?.payload);
        }
        setChangeFilters(false);
      });
    }

    const arr = selectedFilters?.reduce((obj, item) => {
      return {
        ...obj,
        [item?.column]: String([item?.value?.selected]),
      };
    }, {});
    setPage(1);

    let newQuery = {};

    if (query?.hasOwnProperty(queryKeys?.page) && query?.page !== undefined) {
      newQuery[queryKeys.page] = 1;
    }

    if (query?.hasOwnProperty(queryKeys?.limit) && query?.limit !== undefined) {
      newQuery[queryKeys.limit] = query[queryKeys.limit];
    }

    if (query?.hasOwnProperty(queryKeys?.sort) && query?.sort !== undefined) {
      newQuery[queryKeys?.sort] = query[queryKeys?.sort];
    }

    newQuery = { ...newQuery, ...arr };

    // replaceQuery(newQuery);
  }, [selectedFilters, categoryData.id]);

  const getProductList = useCallback(
    (limit, sort, page, selectedFilters) => {
      if (
        query?.hasOwnProperty(queryKeys?.page) ||
        query?.hasOwnProperty(queryKeys?.limit) ||
        query?.hasOwnProperty(queryKeys?.sort) ||
        selectedFilters?.length >= 0
      ) {
        setLoading(true);
        list(`products/category/list/${categoryData?.id}`, {
          limit: limit,
          page: page,
          sort: sort,
          filters: selectedFilters,
          render: false,
        })
          .then((response) => {
            if (page > 1) {
              setProductsData((prevData) => ({
                items:
                  prevData?.items?.length === 0
                    ? response?.payload?.items
                    : [
                        ...prevData?.items,
                        ...response?.payload?.items.filter(
                          (item) =>
                            !prevData?.items?.some((i) => i.id === item.id),
                        ),
                      ],
                pagination: response?.payload?.pagination,
              }));
            } else {
              setProductsData({
                items: response?.payload?.items,
                pagination: response?.payload?.pagination,
              });
            }
          })
          .finally(() => setLoading(false));
      }
    },
    [page, limit, sort, selectedFilters],
  );
  useEffect(() => {
    if (
      query?.hasOwnProperty(queryKeys?.page) ||
      query?.hasOwnProperty(queryKeys?.sort) ||
      query?.hasOwnProperty(queryKeys?.limit) ||
      selectedFilters?.length >= 0
    ) {
      getProductList(limit, sort, page, selectedFilters);
    }
  }, [selectedFilters, showSearch, page, limit, sort]);

  const searchProducts = () => {
    getProductList(limit, sort, page, selectedFilters);
  };

  useEffect(() => {
    setPage(
      query[queryKeys?.page] != null ? Number(query[queryKeys?.page]) : 1,
    );
  }, [query]);

  const onSortChange = ({ target }) => {
    const sortValue = sortKeys[target?.value];
    if (sortValue) {
      const newQuery = {
        ...query,
        [queryKeys?.sort]: sortValue.query,
        [queryKeys?.page]: 1,
      };
      const [field, direction] = target?.value?.split("_");
      setSort({ field, direction });
    } else {
      const newQuery = { ...query };
      delete newQuery[queryKeys?.sort];
      newQuery[queryKeys?.page] = 1;
      setSort(null);
    }
    setPage(1);
  };

  const onLimitChange = ({ target }) => {
    const newQuery = query;
    newQuery[queryKeys?.limit] = target?.value;
    newQuery[queryKeys?.page] = 1;
    replaceQuery(newQuery);

    setLimit(target?.value);
    setPage(1);
  };

  const onPageChange = (num) => {
    setPage(num);
  };
  const currentSlug = categories?.slug;
  const products = productsData?.items;
  const pagination = productsData?.pagination;
  const [newProductsArray, setNewProductsArray] = useState(products);
  const [productNum, setProductNum] = useState(newProductsArray?.length);

  useEffect(() => {
    setNewProductsArray(products);
  }, [products]);
  const numPostsLoaded = Math.min(productNum, newProductsArray?.length);
  const allPostsLoaded = numPostsLoaded === newProductsArray?.length;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const generateBreadcrumbs = (categoryDataa) => {
      categoryDataa?.parents?.forEach((parent) => {
        if (
          !breadcrumbs.some((breadcrumb) => breadcrumb.name === parent?.name)
        ) {
          setBreadcrumbs((prevBreadcrumbs) => [
            ...prevBreadcrumbs,
            {
              name: parent?.name,
              slug: parent?.slug,
            },
          ]);
        }
      });
    };

    if (categoryDataa?.parents) {
      generateBreadcrumbs(categoryDataa);
    }
  }, [categoryDataa, breadcrumbs]);

  const uniqueBreadcrumbs = [
    ...new Set(breadcrumbs?.map((breadcrumb) => breadcrumb?.slug)),
  ];

  return (
    <>
      <div className="w-full bg-croonus-5">
        {router?.pathname?.includes("search") ? null : (
          <div className="w-[85%] mx-auto mt-4 pb-1 pt-1 max-md:hidden">
            <div className="text-[0.875rem] max-lg:hidden font-light">
              {breadcrumbs?.length > 0 && (
                <div className="flex items-center gap-1 py-2flex-wrap">
                  <Link
                    href={`/`}
                    className="text-[#191919] text-[0.85rem] font-normal hover:text-black"
                  >
                    Početna
                  </Link>
                  <span className="text-[#191919] text-[0.85rem]">/</span>
                  <Link
                    href={`/sve-kategorije`}
                    className="text-[#191919] text-[0.85rem] font-normal hover:text-black"
                  >
                    Kategorije
                  </Link>
                  <span className="text-[#191919] text-[0.85rem]">/</span>
                  {uniqueBreadcrumbs.map((slug, index) => {
                    const breadcrumb = breadcrumbs.find(
                      (bc) => bc.slug === slug,
                    );
                    return (
                      <div key={index} className="flex items-center gap-1">
                        <Link
                          href={`/${slug}`}
                          className="text-[#191919] text-[0.851rem] font-normal hover:text-black"
                        >
                          {breadcrumb?.name}
                        </Link>
                        {index !== uniqueBreadcrumbs.length - 1 && (
                          <span className="text-[#191919] text-[0.85rem]">
                            /
                          </span>
                        )}
                      </div>
                    );
                  })}
                  <span className="text-[#191919] text-[0.85rem]">/</span>
                  <h1 className="text-[0.85rem] font-normal text-black">
                    {categoryDataa?.basic_data?.name}
                  </h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {router?.asPath?.includes("search") ? null : (
        <div
          className={
            categoryDataa?.seo?.image
              ? `mt-4 max-md:mt-0 w-[95%] lg:w-[80%] mx-auto h-[23.125rem] 3xl:h-[28.125rem]`
              : `mt-4 max-md:mt-0 w-[95%] lg:w-[80%] mx-auto`
          }
        >
          {" "}
          {categoryDataa?.seo?.image ? (
            <Image
              width={22200}
              height={22200}
              src={convertHttpToHttps(categoryDataa?.seo?.image)}
              className="w-full h-full object-cover"
              priority={true}
              alt="AKT"
            />
          ) : null}
        </div>
      )}

      <div className="w-full flex-col flex items-center justify-center mt-10">
        <h1 className="font-medium uppercase text-2xl max-lg:text-xl max-lg:text-center max-md:hidden">
          {router?.pathname?.includes("search") ? (
            <>Pretražili ste: {search}</>
          ) : (
            <>{categoryDataa?.basic_data?.name}</>
          )}

          <span className="text-lg lowercase max-md:text-[11px]">
            &nbsp;({pagination?.total_items} proizvoda)
          </span>
        </h1>{" "}
        <h1 className="font-medium uppercase text-2xl max-lg:text-xl max-lg:text-center md:hidden">
          {router?.pathname?.includes("search") ? (
            <>Pretražili ste: {search}</>
          ) : (
            <>{categoryDataa?.basic_data?.name}</>
          )}
        </h1>{" "}
        <span className="text-lg lowercase max-md:text-[11px] md:hidden">
          &nbsp;({pagination?.total_items} proizvoda)
        </span>
        {router?.asPath?.includes("search") ? null : (
          <>
            <h5 className="text-[1rem] max-md:text-[0.8rem] text-center max-md:mt-5 mt-[1rem] font-light w-[95%] lg:w-[80%] max-lg:text-left">
              {categoryDataa?.basic_data?.short_description}
            </h5>
            <p
              className="text-[1rem] max-md:text-[0.8rem] text-center max-md:mt-5 mt-1 font-light w-[95%] lg:w-[80%] max-lg:text-left"
              dangerouslySetInnerHTML={{
                __html: categoryDataa.basic_data.description,
              }}
            ></p>
          </>
        )}
        {categoryDataa?.basic_data?.name !== "Akcija" &&
        categoryDataa?.basic_data?.name !== "Novo" &&
        categoryDataa?.basic_data?.name !== "OUTLET" &&
        categoryDataa?.basic_data?.name !== "Hotelski program" ? (
          <div className="mt-[2rem] pl-2 flex flex-wrap justify-center md:gap-y-2">
            {categories?.childrens &&
              categories.childrens.map((child) => (
                <div
                  className="max-md:mx-[2px] mx-1 max-md:my-1"
                  key={child?.id}
                >
                  <Link
                    href={`/${child?.link?.link_path}`}
                    key={child?.id}
                    onClick={() => setOpen(false)}
                  >
                    <div
                      className={`max-md:text-xs text-sm font-light py-2 max-md:px-2 px-4 hover:bg-croonus-1 hover:text-white whitespace-nowrap w-max border border-black ${
                        currentSlug === child?.slug
                          ? "bg-croonus-1 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <p className="">{child?.basic_data?.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        ) : null}
        <div className="max-lg:w-[95%] w-[85%] mx-auto mt-10">
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
            onSortChange={onSortChange}
            sort={sort}
            setLastSelectedFilterKey={setLastSelectedFilterKey}
            sortKeys={sortKeys}
            onLimitChange={onLimitChange}
            limit={limit}
          />
        </div>
        {productsData?.items?.length === 0 ? (
          <div className="my-[10rem] flex h-full text-lg font-medium items-center justify-center max-md:text-center max-md:px-4">
            Za ovu kategoriju trenutno nemamo proizvoda
          </div>
        ) : (
          <div
            ref={elementRef}
            className="max-lg:w-[95%] lg:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2  gap-x-10 gap-y-10 bg-white pt-12 lg:grid-cols-3 2xl:grid-cols-4 "
          >
            {productsData?.items?.map(({ id: id_product }) => {
              return (
                <Suspense
                  fallback={
                    <div
                      className={`aspect-2/3 h-full w-full bg-slate-300 animate-pulse`}
                    ></div>
                  }
                >
                  <ThumbSuspense
                    categoryId={currentSlug}
                    slug={id_product}
                    id={id_product}
                    refreshWishlist={() => {}}
                  />
                </Suspense>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesPageDisplay;
