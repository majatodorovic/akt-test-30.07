"use client";

import { useProductDescription } from "@/hooks/akt.hooks";

export const Description = ({ slug, id }) => {
  const { data: description } = useProductDescription({ slug: slug, id });
  return (
    <div className={`flex flex-col max-md:mt-5 col-span-2 lg:col-span-6`}>
      <h1 className={`font-medium text-[1.4rem`}>Opis proizvoda</h1>
      <div
        className={`p-3 bg-croonus-2 prose !max-w-full prose:!max-w-full prose:!w-full w-full roboto nobg`}
        dangerouslySetInnerHTML={{ __html: description?.description }}
      ></div>
    </div>
  );
};
