"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FreeMode, Pagination, Thumbs } from "swiper/modules";
import Image from "next/image";
import classes from "./styles.module.css";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { useProductGallery } from "@/hooks/akt.hooks";

const ProductGallery = ({ id }) => {
  const { data: productGallery } = useProductGallery({ id });

  function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 300,
    magnifierWidth = 300,
    zoomLevel = 2.5,
  }) {
    const [[x, y], setXY] = useState([0, 0]);

    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

    const [showMagnifier, setShowMagnifier] = useState(false);

    return (
      <div
        style={{
          position: "relative",
          zIndex: 100,
        }}
        className="h-full w-full object-cover"
      >
        <Image
          src={src}
          width={0}
          height={0}
          sizes={"100vw"}
          priority
          className="h-full w-full object-cover"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt={src.alt ?? "AKT"}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            borderRadius: "50%",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    );
  }
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const productImage =
    productGallery.length > 0 ? (
      productGallery?.map((image, index) => {
        return (
          <SwiperSlide key={index} className="w-full !relative">
            <ImageMagnifier
              src={convertHttpToHttps(image?.image)}
              fill
              alt="AKT"
              priority
              style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        );
      })
    ) : (
      <Image
        src="/placeholder.jpg"
        fill
        priority
        alt="no image"
        style={{ objectFit: "cover" }}
      />
    );

  const thumbImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index} className={`!relative h-full w-full`}>
        <Image
          src={convertHttpToHttps(image?.image)}
          fill
          priority
          alt="AKT"
          style={{ objectFit: "cover" }}
          className="cursor-pointer max-md:hidden aspect-square"
        />
      </SwiperSlide>
    );
  });
  return (
    <div className="h-full max-md:h-[450px] md:flex md:flex-row-reverse gap-5 md:h-[380px] lg:h-[550px] xl:h-[680px] 2xl:h-[720px] 3xl:h-[778px]">
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={true}
        modules={[FreeMode, Thumbs, Pagination]}
        className={`${classes.mySwiper2} mySwiper2`}
        breakpoints={{
          320: {
            direction: "vertical",
            slidesPerView: 1,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              enabled: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            },
          },
          768: {
            direction: "horizontal",
            slidesPerView: 1,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              enabled: false,
            },
          },
        }}
      >
        {productImage}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={0}
        autoplay={true}
        breakpoints={{
          320: {
            direction: "horizontal",
            slidesPerView: 0,
            thumbs: {
              enabled: false,
            },
            modules: [],
          },
          768: {
            direction: "vertical",
            slidesPerView: 4.3,
            enabled: true,
            modules: [FreeMode, Thumbs],
          },
        }}
        freeMode={true}
        watchSlidesProgress={true}
        className={`${classes.mySwiper} mySwiper max-md:hidden`}
      >
        {" "}
        {thumbImage}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
