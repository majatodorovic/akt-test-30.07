"use client";
import { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { list } from "@/app/api/api";
import Link from "next/link";
import GenerateBreadCrumbsServer from "@/helpers/generateBreadCrumbsServer";
import Products from "@/components/CategoriesPageComponents/Products/Products";
import { useSearch } from "@/hooks/akt.hooks";
import ThumbSuspense from "@/shared/Thumb/ThumbSuspense";

const SearchAppPage = () => {
  const params = useSearchParams();
  const search = params.get("query");

  const { data, isLoading: loading } = useSearch({
    isSearchPage: true,
    searchTerm: search,
  });

  return (
    <>
      <div className="w-full bg-croonus-5">
        <div className="w-[85%] mx-auto mt-4 pb-1 pt-1">
          <GenerateBreadCrumbsServer />
        </div>
      </div>
      <div className="mx-auto w-[95%] lg:w-[84%]">
        <div className="flex flex-col gap-8 py-5 font-medium  max-lg:gap-8">
          <h1 className="text-xl font-light ">
            Pretražili ste: <span className="font-medium">{search}</span>
          </h1>
        </div>

        {loading ? (
          <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:mt-12 xl:grid-cols-3 3xl:grid-cols-4">
            {Array.from({ length: 12 }, (x, i) => (
              <div
                key={i}
                className="aspect-2/3 h-full max-md:w-full w-full col-span-1 bg-slate-300 object-cover animate-pulse"
              ></div>
            ))}
          </div>
        ) : data?.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 lg:mt-12 xl:grid-cols-3 3xl:grid-cols-4">
            {data?.map(({ id }) => {
              return (
                <Suspense
                  fallback={
                    <div
                      className={`col-span-1 aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                    ></div>
                  }
                >
                  <ThumbSuspense
                    id={id}
                    refreshWishlist={() => {}}
                    categoryId={"*"}
                  />
                </Suspense>
              );
            })}
          </div>
        ) : (
          <div
            className={`col-span-2 md:col-span-2 lg:col-span-3 2xl:col-span-4 text-left`}
          >
            <>
              <div className="mx-auto mt-10 max-lg:text-center max-md:flex max-md:items-center max-md:justify-center max-md:flex-col text-black lg:mt-10 mb-[3rem]">
                <h1 className="text-2xl font-semibold ">
                  Ne postoji rezultat za vašu pretragu "{search}".
                </h1>
                <h2 className="mt-6 text-xl font-normal ">Pomoć u pretrazi:</h2>
                <ul className="mt-6 text-lg  ">
                  <li>- Proverite greške u kucanju</li>
                  <li>- Koristite više generičkih termina za pretragu</li>
                  <li>
                    - Proizvod ili kategorija koju tražite možda još uvek nisu
                    dostupni na našem portalu. Kontaktirajte nas u cilju
                    dodatnog informisanja.
                  </li>
                  <li>
                    - Ukoliko vam je potrebna pomoć, u svakom trenutku nas
                    možete kontakirati pozivom na broj call centra:{" "}
                    <a
                      className={`underline`}
                      href={`tel:${process.env.TELEPHONE}`}
                    >
                      {process.env.TELEPHONE}
                    </a>
                  </li>
                </ul>
                <Link
                  href="/"
                  className="mt-[1rem] max-md:w-[90%] max-md:mx-auto flex max-sm:justify-center rounded-xl bg-croonus-1 px-6 py-2 text-base text-white hover:bg-opacity-80 w-fit"
                >
                  Početna strana
                </Link>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchAppPage;
