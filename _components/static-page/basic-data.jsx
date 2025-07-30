"use client";

import { useStaticPage } from "@/hooks/akt.hooks";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { notFound } from "next/navigation";

export const StaticBasicData = ({ slug }) => {
  const { data } = useStaticPage(slug);

  const items = (data?.content ?? [])?.flatMap((item) => item);

  if (!data) {
    return notFound();
  } else {
    return (
      <div className={`max-lg:w-[95%] w-[85%] mx-auto`}>
        <div
          className={`text-xl font-normal text-white bg-croonus-1 md:w-1/4 pl-5 py-1 mt-5 mb-12`}
        >
          {data?.basic_data?.name} - AKT DOO Arilje
        </div>
        {(items ?? [])?.map((item) => {
          switch (item?.type) {
            case "html_editor":
              return (
                <div
                  className={`mt-5`}
                  key={item?.id}
                  dangerouslySetInnerHTML={{
                    __html: item?.content,
                  }}
                />
              );
            case "multiple_images":
              return (
                <div className={`flex flex-wrap gap-5 mt-5`}>
                  {(item?.content ?? [])?.map((image) => (
                    <Image
                      key={item?.id}
                      src={convertHttpToHttps(image?.file ?? "")}
                      alt={image?.alt}
                      width={0}
                      height={0}
                      sizes={`100vw`}
                      className={`w-full h-auto`}
                    />
                  ))}
                </div>
              );
            case "textarea":
              return (
                <p
                  key={item?.id}
                  className={`text-[#191919] text-[0.95rem] font-normal mt-5`}
                >
                  {item?.content}
                </p>
              );
          }
        })}
      </div>
    );
  }
};
