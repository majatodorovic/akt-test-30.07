"use client";
import { useProductBreadcrumbs } from "@/hooks/akt.hooks";
import Link from "next/link";

export const Breadcrumbs = ({ slug, categoryId, id }) => {
  const { data: breadcrumbs } = useProductBreadcrumbs({
    slug: slug,
    categoryId: categoryId,
    id,
  });

  return (
    <div className="bg-[#f5f5f6] mt-3.5">
      <div className="py-1 w-[95%] lg:w-[85%] mx-auto">
        <div className="flex items-center gap-[0.3rem] flex-wrap">
          <Link
            href={`/`}
            className="text-[#191919] text-[0.85rem] font-normal hover:text-black"
          >
            Početna
          </Link>{" "}
          <span className="text-[#191919] text-[0.85rem]">/</span>
          {breadcrumbs?.steps?.length > 0 &&
            breadcrumbs?.steps?.map((breadcrumb, index, arr) => {
              return (
                <div className="flex items-center gap-[0.1rem]" key={index}>
                  <Link
                    href={
                      index === arr?.length - 1
                        ? `/${breadcrumb?.link?.link_path}`
                        : `/${breadcrumb?.link?.link_path}`
                    }
                    className="text-[#191919] text-[0.85rem] font-normal hover:text-black"
                  >
                    {breadcrumb?.name}
                  </Link>
                  {index !== arr?.length - 1 && (
                    <span className="text-[#191919] text-[0.85rem]">/</span>
                  )}
                </div>
              );
            })}
          {breadcrumbs?.steps?.length > 0 && (
            <span className="text-[#191919] text-[0.85rem]">/</span>
          )}
          <h1 className="text-[0.85rem] font-normal text-black">
            {breadcrumbs?.end?.name}
          </h1>
        </div>
      </div>
    </div>
  );
};
