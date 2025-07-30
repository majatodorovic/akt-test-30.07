"use client";
import React, { useState } from "react";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function extractYoutubeId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const BannerSlider = ({ banners }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderSlideContent = (item, index) => {
    switch (item?.type) {
      case "video":
        return (
          <SwiperSlide key={index} className={`!grid !grid-cols-2`}>
            <div className="col-span-4 w-full flex  relative max-lg:row-start-1 lg:col-span-1 max-lg:h-[300px] max-h-[600px]  h-[600px]">
              <Link href={item?.url ?? "/"}>
                <video
                  width={item?.file_data?.banner_position?.width || 0}
                  height={item?.file_data?.banner_position?.height || 0}
                  className="relative object-cover h-full w-full"
                  autoPlay
                  muted
                  loop
                >
                  <source
                    src={
                      item?.file_data?.url
                        ? convertHttpToHttps(item?.file_data?.url)
                        : "/"
                    }
                    type="video/mp4"
                  />
                </video>
              </Link>
            </div>
          </SwiperSlide>
        );

      case "video_link":
        const videoProvider = item?.video_provider;
        const videoUrl = item?.video_url;

        const src =
          videoProvider === "youtube"
            ? `https://www.youtube.com/embed/${extractYoutubeId(videoUrl)}?autoplay=1&mute=1&loop=1&playsinline=1&controls=0&playlist=${extractYoutubeId(videoUrl)}`
            : `${videoUrl}?autoplay=1&muted=1&loop=1&background=1&playsinline=1}`;

        return (
          <SwiperSlide key={index} className={`!grid !grid-cols-2`}>
            <div className="col-span-4 w-full  relative max-lg:row-start-1 lg:col-span-1 max-lg:h-[300px] max-h-[600px]  h-[600px]">
              <Link href={item?.url ?? "/"}>
                <iframe
                  className="w-full h-full object-cover aspect-[960/1550] md:aspect-[1920/800] pointer-events-none"
                  width={item?.width || 0}
                  height={item?.height || 0}
                  src={src || "/"}
                  frameborder="0"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Link>
            </div>
          </SwiperSlide>
        );
      default:
        return (
          <SwiperSlide key={index} className={`!grid !grid-cols-2`}>
            <div className="col-span-2 max-lg:py-8 lg:col-span-1 w-full h-full flex max-lg:items-start items-center justify-start bg-croonus-3 ">
              {/*<h2 className="text-[1.661rem] text-black font-semibold pb-5 max-md:text-[1.1rem] absolute top-0 z-[20] lg:hidden">*/}
              {/*  {item?.title}*/}
              {/*</h2>*/}
              <div className="flex flex-col max-lg:items-start gap-5 lg:gap-10 max-lg:w-full max-md:px-2 max-lg:pr-5 w-[80%] mx-auto px-0 md:px-5">
                <h2 className="text-[1.661rem] max-md:text-[1.1rem] text-croonus-1 font-bold text-center lg:text-left">
                  {item?.title}
                </h2>
                <p className="text-[1rem] max-md:text-[0.8rem] font-normal text-black text-left max-lg:py-4 max-md:py-0">
                  {item?.text}
                </p>
                <Link
                  href={`${item?.url}`}
                  className="bg-croonus-1 text-white text-xs md:text-base font-normal px-4 py-2 max-w-max rounded-md"
                >
                  {item?.button}
                </Link>
              </div>
            </div>
            <div className="col-span-2  relative max-lg:row-start-1 lg:col-span-1 max-lg:h-[300px] max-h-[600px]  h-[600px]">
              <Link href={item?.url ?? "/"}>
                <Image
                  width={0}
                  height={0}
                  className="relative h-auto w-full"
                  src={convertHttpToHttps(item?.file_data?.url) ?? ""}
                  alt={item?.file_data?.descriptions?.alt ?? "AKT"}
                  priority={true}
                />
              </Link>
            </div>
          </SwiperSlide>
        );
    }
  };
  const items = banners?.map((item, index) => renderSlideContent(item, index));

  return (
    <>
      <div className="mt-24 max-lg:mt-16 navigation-wrapper w-[95%] lg:w-[85%] mx-auto">
        <Swiper
          onSlideChange={(swiper) => setActiveIndex(swiper?.activeIndex)}
          onSwiper={(swiper) => setSwiper(swiper)}
        >
          {items}
        </Swiper>
      </div>
      <div className="dots2 mt-3">
        {banners?.map((idx, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                swiper?.slideTo(i);
              }}
              className={"dot2" + (activeIndex === i ? " active" : "")}
            ></button>
          );
        })}
      </div>
    </>
  );
};

export default BannerSlider;
