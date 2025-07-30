import { Suspense } from "react";
import { CategoryData } from "@/components/CategoriesPageComponents/CategoryData/CategoryData";

const CategoryPage = async ({ params: { path }, base_url, category_id }) => {
  const slug_path = path[path?.length - 1];

  return (
    <>
      <Suspense
        fallback={
          <>
            <div
              className={`w-[80%] mx-auto h-[2rem] bg-slate-300 animate-pulse mt-10`}
            ></div>
            <div
              className={`w-[80%] mx-auto h-[1.3rem] mt-5 bg-slate-300 animate-pulse`}
            ></div>
            <div
              className={`w-[80%] mx-auto h-[4rem] mt-3 bg-slate-300 animate-pulse`}
            ></div>
            <div
              className={`w-[80%] mx-auto h-[2rem] mt-6 bg-slate-300 animate-pulse`}
            ></div>
          </>
        }
      >
        <CategoryData
          slug_path={slug_path}
          base_url={base_url}
          path={path}
          category_id={category_id}
        />
      </Suspense>
    </>
  );
};

export default CategoryPage;
