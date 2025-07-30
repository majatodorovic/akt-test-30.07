"use client";
import React, { useState } from "react";
import { Slider } from "@/_components/slider";

const ProductsSlider = ({ text, data }) => {
  const [swiper, setSwiper] = useState();
  return (
    <>
      <div className="mt-[3.688rem] max-md:mt-[1rem] navigation-wrapper w-[95%] lg:w-[85%] mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-[1.1rem] font-semibold">{text}</h2>
          <div className="md:hidden">
            <i
              className="fa-solid md:hidden fa-chevron-right text-white text-xl bg-croonus-1 px-3 py-1.5"
              onClick={() => {
                swiper?.slideNext();
              }}
            ></i>
          </div>
        </div>

        <Slider setSwiperData={setSwiper} data={data} />
      </div>
    </>
  );
};

export default ProductsSlider;
