"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCurrentGalleryByVariantKeys } from "@/helpers/gallery";

const MobileImageSlider = ({ variantKeyArray, productGallery, id }) => {
  let variantKeyString = "";
  variantKeyArray?.forEach((item, index) => {
    variantKeyString += `${item.attribute_key}:${item.value_key}`;
    if (index + 1 !== variantKeyArray?.length) variantKeyString += ";";
  });

  const currentGallery = variantKeyArray
    ? getCurrentGalleryByVariantKeys({
        variantKeyString,
        productGallery,
      })
    : [];

  const [gallery, setGallery] = useState(
    productGallery?.length > 0
      ? currentGallery && currentGallery?.length > 0
        ? currentGallery
        : productGallery
      : [
          {
            image_data: {
              url: "/placeholder.png",
              description: {
                alt: "nimaco",
              },
            },
          },
        ],
  );


  useEffect(() => {
    if (variantKeyArray) {
      const currentGallery = variantKeyArray
        ? getCurrentGalleryByVariantKeys({
            variantKeys: variantKeyArray,
            productGallery,
          })
        : [];

      if (currentGallery?.length > 0) {
        setGallery(currentGallery);
      }
    }
  }, [variantKeyArray]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperData, setSwiperData] = useState(null);

  return (
    <div className={`relative h-full`}>
      <Swiper
        autoHeight={true}
        rewind
        onSwiper={(swiper) => setSwiperData(swiper)}
        onSlideChange={(swiper) => {
          setSwiperData(swiper);
          setActiveIndex(swiper?.activeIndex);
        }}
        className={`!relative`}
        direction={`horizontal`}
        slidesPerView={1}
      >
        {gallery?.map((image, index) => {
          return (
            <SwiperSlide key={index} className={`!h-auto`}>
              <Image
                src={convertHttpToHttps(image?.image_data?.url)}
                alt={
                  image?.image_data?.description?.alt
                    ? image?.image_data?.description?.alt
                    : image?.image_data?.file_data?.filename
                      ? image?.image_data?.file_data?.filename
                      : "stefan tekstil shop"
                }
                width={0}
                height={0}
                sizes={`100vw`}
                className={`w-full h-auto aspect-2/3 object-cover`}
              />
            </SwiperSlide>
          );
        })}
        {swiperData && (
          <div
            className={`absolute z-10 bottom-3 mx-auto flex flex-row left-0 right-0 gap-3 justify-center`}
          >
            {gallery?.map((i, x) => {
              return (
                <span
                  key={x}
                  onClick={() => {
                    swiperData?.slideTo(x);
                  }}
                  className={`rounded-full p-1 border-2 border-croonus-1 ${
                    activeIndex === x ? "bg-white" : "bg-croonus-1"
                  }`}
                />
              );
            })}
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default MobileImageSlider;
