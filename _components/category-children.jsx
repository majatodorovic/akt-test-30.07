"use client";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/app/api/api";

export const CategoryChildren = ({ slug, name }) => {
  const { data: categories } = useSuspenseQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      return await get(`/categories/product/tree/branch/parent/${slug}`).then(
        (response) => response?.payload,
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const currentSlug = categories?.slug;
  return (
    <>
      {name !== "Akcija" &&
      name !== "Novo" &&
      name !== "OUTLET" ? (
        <div className="mt-[2rem] pl-2 flex flex-wrap justify-center md:gap-y-2">
          {categories?.childrens &&
            (categories?.childrens ?? [])?.map((child) => (
              <div className="max-md:mx-[2px] mx-1 max-md:my-1" key={child?.id}>
                {currentSlug === child?.slug ? (
                  <div
                    className={`max-md:text-xs text-sm font-light py-2 max-md:px-2 px-4 hover:bg-croonus-1 hover:text-white whitespace-nowrap w-max border border-black ${
                      currentSlug === child?.slug
                        ? "bg-croonus-1 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p className="">{child?.basic_data?.name}</p>
                  </div>
                ) : (
                  <Link href={`/${child?.link?.link_path}`}>
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
                )}
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
};
