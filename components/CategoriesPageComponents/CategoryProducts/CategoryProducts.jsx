"use client";
import { useCategoryFilters, useCategoryProducts } from "@/hooks/akt.hooks";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ThumbSuspense from "@/shared/Thumb/ThumbSuspense";
import Filters from "@/components/Filters/Filters";
import { sortKeys } from "@/helpers/const";
import { CategoryLongDescription } from "@/_components/category-long-description";
import { Pagination } from "@/_components/pagination";
import { CategoryChildren } from "@/_components/category-children";
import { getFilterObject, getSortObject } from "@/helpers/categoryFilters";

export const CategoryProducts = ({
  categoryName,
  categoryDescription,
  categoryShortDescription,
  slug,
  category_id,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const filterKey = params?.get("filteri");
  const pageKey = Number(params?.get("strana"));
  const sortKey = params?.get("sort");

  const { filterArr } = getFilterObject(filterKey);

  const sortObject = getSortObject(sortKey);

  const [page, setPage] = useState(pageKey > 0 ? pageKey : 1);
  const [sort, setSort] = useState(sortObject);
  const [selectedFilters, setSelectedFilters] = useState(filterArr ?? []);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");

  // update the query parameters with the selected sort, page and filters
  const updateURLQuery = (sort, selectedFilters, page) => {
    let sort_tmp;
    let filters_tmp;
    let page_tmp;
    let limit_tmp;

    if (sort?.field !== "" && sort?.direction !== "") {
      sort_tmp = `${sort?.field}_${sort?.direction}`;
    }

    if (selectedFilters?.length > 0) {
      filters_tmp = selectedFilters
        ?.map((filter) => {
          const selectedValues = filter?.value?.selected?.join("_");
          return `${filter?.column}=${selectedValues}`;
        })
        .join("::");
    } else {
      filters_tmp = "";
    }

    page_tmp = page;
    limit_tmp = 12;

    return { sort_tmp, filters_tmp, page_tmp, limit_tmp };
  };

  const generateQueryString = (sort_tmp, filters_tmp, page_tmp, limit_tmp) => {
    const query_string = `?${filters_tmp ? `filteri=${filters_tmp}` : ""}${
      filters_tmp && (sort_tmp || page_tmp) ? "&" : ""
    }${sort_tmp ? `sort=${sort_tmp}` : ""}${
      sort_tmp && page_tmp ? "&" : ""
    }${page_tmp > 1 ? `strana=${page_tmp}` : ""}`;

    return query_string;
  };

  useEffect(() => {
    const { sort_tmp, filters_tmp, page_tmp, limit_tmp } = updateURLQuery(
      sort,
      selectedFilters,
      page,
    );

    const query_string = generateQueryString(
      sort_tmp,
      filters_tmp,
      page_tmp,
      limit_tmp,
    );
    router.push(query_string, { scroll: false });
  }, [sort, selectedFilters, page]);

  // get the products for the category
  const { data } = useCategoryProducts({
    slug,
    page: pageKey ?? 1,
    limit: 12,
    sort: sortKey ?? "_",
    filterKey: filterKey,
    render: false,
  });

  useEffect(() => {
    if (data) {
      if (filterArr?.every((column) => column?.column !== "")) {
        setSelectedFilters(filterArr);
      }
      setSort(sortObject);
    }
  }, [data, filterKey, sortKey]);

  const mutateFilters = useCategoryFilters({
    slug,
    page,
    limit: 10,
    sort,
    selectedFilters,
  });

  // trigger the filter api on filter change
  useEffect(() => {
    mutateFilters.mutate({
      slug,
      selectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
    });
  }, [selectedFilters]);

  const getPaginationArray = (selectedPage, totalPages) => {
    const start = Math.max(1, selectedPage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <>
      <div className="w-full flex-col flex items-center justify-center mt-10">
        <div className={`flex items-center gap-2 flex-wrap`}>
          <h1 className="font-medium uppercase text-2xl max-lg:text-xl max-lg:text-center">
            {categoryName}
          </h1>

          <span className="text-lg lowercase max-md:text-[11px]">
            &nbsp;({data?.pagination?.total_items} proizvoda)
          </span>
        </div>

        <p className="text-[1rem] prose !text-black max-w-full max-md:text-[0.8rem] text-center max-md:mt-5 mt-[1rem] font-light w-[95%] lg:w-[80%] max-lg:text-left">
          {categoryShortDescription}
        </p>
        <div
          className="text-[1rem] prose max-w-full !text-black max-md:text-[0.8rem] text-center max-md:mt-5 mt-1 font-light w-[95%] lg:w-[80%] max-lg:text-left"
          dangerouslySetInnerHTML={{
            __html: categoryDescription,
          }}
        ></div>
        <Suspense
          fallback={
            <div
              className={`mt-[2rem] w-full h-10 bg-slate-300 animate-pulse`}
            />
          }
        >
          <CategoryChildren slug={category_id} name={categoryName} />
        </Suspense>
      </div>

      <div className="max-lg:w-[95%] w-[85%] mx-auto mt-10">
        <Filters
          filters={availableFilters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          changeFilters={changeFilters}
          setPage={setPage}
          setChangeFilters={setChangeFilters}
          sort={sort}
          setSort={setSort}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
          sortKeys={sortKeys}
          limit={12}
        />
      </div>
      <div
        className={`max-lg:w-[95%] lg:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2  gap-x-10 gap-y-10 bg-white pt-12 lg:grid-cols-3 2xl:grid-cols-4`}
      >
        {(data?.items ?? [])?.map(({ id }) => {
          return (
            <Suspense
              key={id}
              fallback={
                <div
                  className={`col-span-1 aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                />
              }
            >
              <ThumbSuspense
                id={id}
                refreshWishlist={() => {}}
                categoryId={slug}
              />
            </Suspense>
          );
        })}
      </div>
      <Pagination
        generateQueryString={() => {
          const { sort_tmp, filters_tmp, page_tmp } = updateURLQuery(
            sort,
            selectedFilters,
            page,
          );
          return generateQueryString(sort_tmp, filters_tmp, page_tmp);
        }}
        data={data}
        page={page}
        slug={slug}
        setPage={setPage}
        getPaginationArray={getPaginationArray}
      />
      <Suspense
        fallback={
          <div className={`mt-10 w-full h-10 bg-slate-200 animate-pulse`} />
        }
      >
        <CategoryLongDescription category_id={category_id} />
      </Suspense>
    </>
  );
};
