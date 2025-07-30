import ImageSlider from "../ImageSlider/ImageSlider";
import Link from "next/link";
import Image from "next/image";
import classes from "./ProductItem.module.css";

const ProductItemTwo = ({ recommendedCategories2, indexBanner2 }) => {
  return (
    <div className="col-span-1 max-lg:col-span-2 max-lg:mt-10">
      <div className="grid grid-cols-3 gap-x-0 lg:gap-x-4">
        <div className=" col-span-3 hidden pl-20 lg:block">
          {indexBanner2.map((item) => (
            <Image
              src={item.image}
              width={400}
              height={400}
              className="w-full"
              alt="AKT"
            />
          ))}
        </div>
        <div className="relative col-span-1 flex flex-col justify-center gap-1 max-lg:col-span-3 max-lg:text-center lg:gap-6">
          <h1
            className={`${classes.line} relative text-xl font-bold text-croonus-3 2xl:text-2xl 3xl:text-2xl 4xl:text-3xl `}
          >
            {recommendedCategories2.basic_data.name}
          </h1>
          <Link
            href={`categories/${recommendedCategories2.id}`}
            className="hover:text-croonus-4"
          >
            <span className="text-base text-croonus-3 max-lg:bg-croonus-1 max-lg:py-1 max-lg:text-base">
              Pogledaj celu kolekciju
            </span>
          </Link>
        </div>
        <div className="col-span-2 mt-8 max-lg:col-span-3 max-lg:mt-3">
          <Image
            src={recommendedCategories2.images.image}
            width={400}
            height={400}
            className="w-full"
            alt="AKT"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductItemTwo;
