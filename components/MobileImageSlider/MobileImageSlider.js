"use client";
import { useState } from "react";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { useProductGallery } from "@/hooks/akt.hooks";
import { Swiper, SwiperSlide } from "swiper/react";

const MobileImageSlider = ({ id }) => {
  const { data: images } = useProductGallery({ id });

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
        {images?.map(({ image, id }) => {
          return (
            <SwiperSlide key={id} className={`!h-auto`}>
              <Image
                src={convertHttpToHttps(image)}
                alt={`Stefan Tekstil`}
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
            {images?.map((i, x) => {
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
