import { list, fetch } from "@/app/api/api";
import { Breadcrumbs } from "@/_components/breadcrumbs";
import { Suspense } from "react";
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

const getProductImages = async (id) => {
  return await fetch(`/product-details/gallery/${id}`).then(
    (response) => response?.payload?.gallery,
  );
};

const ProductPage = async ({ id, path, category_id, canonical }) => {
  const cross_sell = await getCrossSell(path[path?.length - 1]);

  const productGallery = await getProductImages(id);

  return (
    <>
      <Suspense>
        <Breadcrumbs slug={path} categoryId={category_id} id={id} />
      </Suspense>

      <ProductInfo
        path={path}
        category_id={category_id}
        canonical={canonical}
        id={id}
        productGallery={productGallery}
      />

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
