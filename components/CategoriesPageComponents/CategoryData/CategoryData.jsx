"use client";
import { useCategory } from "@/hooks/akt.hooks";
import Link from "next/link";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { generateBreadcrumbSchema } from "@/_functions";
import { CategoryProducts } from "@/components/CategoriesPageComponents/CategoryProducts/CategoryProducts";

export const CategoryData = ({ base_url, path, category_id, slug_path }) => {
  const {
    data: {
      basic_data: { name, short_description, description },
      images: { image },
      seo: { meta_description, meta_image },
      parents,
    },
    data,
  } = useCategory({ category_id });

  let breadcrumbs = [];

  data?.parents?.forEach((parent) => {
    if (!breadcrumbs.some((breadcrumb) => breadcrumb.name === parent?.name)) {
      breadcrumbs = [
        ...breadcrumbs,
        {
          name: parent?.name,
          slug: parent?.link?.link_path,
        },
      ];
    }
  });

  const breadcrumbs_schema = generateBreadcrumbSchema(
    parents,
    name,
    path,
    base_url,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs_schema) }}
      />

      <div className="w-full bg-croonus-5">
        <div className="w-[85%] mx-auto mt-4 pb-1 pt-1">
          <div className="text-[0.875rem] font-light">
            {breadcrumbs?.length > 0 ? (
              <div className="flex items-center gap-1 flex-wrap">
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
                {breadcrumbs.map((breadcrumb, index) => {
                  return (
                    <div key={index} className="flex items-center gap-1">
                      <Link
                        href={`/${breadcrumb.slug}`}
                        className="text-[#191919] text-[0.851rem] font-normal hover:text-black"
                      >
                        {breadcrumb?.name}
                      </Link>
                      {index !== breadcrumbs.length - 1 && (
                        <span className="text-[#191919] text-[0.85rem]">/</span>
                      )}
                    </div>
                  );
                })}
                <span className="text-[#191919] text-[0.85rem]">/</span>
                <p className="text-[0.85rem] font-normal text-black">{name}</p>
              </div>
            ) : (
              <div className="flex items-center gap-1">
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
                <p className="text-[0.85rem] font-normal text-black">{name}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`mt-4 max-md:mt-4 w-[95%] lg:w-[80%] mx-auto`}>
        {meta_image || image ? (
          <Image
            width={0}
            height={0}
            src={convertHttpToHttps(meta_image ?? image) ?? ""}
            className={`w-full !h-auto`}
            sizes={`100vw`}
            priority={true}
            alt={meta_description ?? name ?? "Stefan Tekstil"}
          />
        ) : null}
      </div>

      <CategoryProducts
        categoryName={name}
        categoryDescription={description}
        categoryShortDescription={short_description}
        category_id={category_id}
        slug={slug_path}
      />
    </>
  );
};
