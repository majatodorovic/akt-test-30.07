import { list } from "@/app/api/api";
import ProductDetailsSlider from "@/components/ProductDetailsSlider/ProductDetailsSlider";
import MobileImageSlider from "@/components/MobileImageSlider/MobileImageSlider";
import { Breadcrumbs } from "@/_components/breadcrumbs";
import { Suspense } from "react";
import { Description } from "@/_components/desc";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import ProductsSlider from "@/components/ProductsSlider/ProductsSlider";
import ProductReviewsMarks from "@/components/ProductReviews/Marks/ProductReviewsMarks";
import ProductComments from "@/components/ProductReviews/Comments/ProductComments";
import ProductQuestions from "@/components/ProductReviews/Questions/ProductQuestions";

const getCrossSell = async (slug) => {
  return await list(`/product-details/cross-sell/${slug}`, {
    render: false,
  }).then((response) => response?.payload);
};

const ProductPage = async ({ id, path, category_id, canonical }) => {
  const cross_sell = await getCrossSell(path[path?.length - 1]);

  return (
    <>
      <Suspense>
        <Breadcrumbs slug={path} categoryId={category_id} id={id} />
      </Suspense>
      <div className="mt-5 sm:mt-10 w-[95%] lg:w-[85%] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-10">
          <div className="col-span-2 lg:col-span-3 max-md:hidden">
            <Suspense
              fallback={
                <div
                  className={`h-[40rem] bg-slate-300 w-full aspect-square animate-pulse`}
                />
              }
            >
              <ProductDetailsSlider slug={path} id={id} />
            </Suspense>
          </div>
          <div className="col-span-2 md:hidden">
            <Suspense
              fallback={
                <div
                  className={`h-[20rem] bg-slate-300 w-full aspect-square animate-pulse`}
                />
              }
            >
              <MobileImageSlider slug={path} id={id} />
            </Suspense>
          </div>
          <Suspense>
            <ProductInfo
              slug={path}
              categoryId={category_id}
              canonical={canonical}
              id={id}
            />

            <Description slug={path} id={id} />
          </Suspense>
        </div>
      </div>

      {/* These are 3 review components (Marks, Comments, Q&A)
        Each one works separately. 
        Based on the Product ID, it displays all the necessary data and forms. 
        It can be displayed here or moved as needed. */}
      <ProductReviewsMarks id_product={id} />
      <ProductComments id_product={id} />
      <ProductQuestions id_product={id} />

      {cross_sell?.items?.length > 0 && (
        <div className="mt-[3rem] sm:mt-[7.688rem]">
          <ProductsSlider
            data={cross_sell?.items}
            text="Možda će Vas zanimati i sledeći proizvodi"
          />
        </div>
      )}
    </>
  );
};

export default ProductPage;
