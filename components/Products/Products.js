import Layout from "../UI/Layout";
import ProductItemOne from "./ProductItemOne";
import ProductItemTwo from "./ProductItemTwo";

const Products = ({
  recommendedCategories1,
  recommendedCategories2,
  indexBanner2,
  indexBanner1,
}) => {
  return (
    <div className="border-b-[3px] pb-20 border-b-croonus-1">
      <Layout>
        <div className="mt-10 grid grid-cols-2 gap-x-5">
          <ProductItemOne
            indexBanner1={indexBanner1}
            recommendedCategories1={recommendedCategories1}
          />
          <ProductItemTwo
            indexBanner2={indexBanner2}
            recommendedCategories2={recommendedCategories2}
          />
        </div>
      </Layout>
    </div>
  );
};

export default Products;
