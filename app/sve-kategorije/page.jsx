import { get } from "@/app/api/api";
import { headers } from "next/headers";
import AllCategoriesList from "@/components/AllCategoriesList/AllCategoriesList";

const getCategories = () => {
  return get("/categories/product/tree").then((res) => res?.payload);
};

const AllCategories = async () => {
  const categories = await getCategories();

  return (
    <div className={`w-[95%] lg:w-[85%] mx-auto`}>
      <div
        className={`text-xl font-normal text-white bg-croonus-1 w-[14rem] pl-5 py-1 mt-5 mb-12`}
      >
        Kategorije
      </div>
      <AllCategoriesList initialCategories={categories} />
    </div>
  );
};

export default AllCategories;

export const generateMetadata = async () => {
  const header_list = headers();
  let canonical = header_list?.get("x-pathname");
  return {
    title: `Sve kategorije | Stefan Tekstil`,
    description:
      "Sve kategorije proizvoda Stefan kućni tekstil Arilje kao sto su Posteljine, Jorgani, Jastuci, Peskiri...",
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: `Sve kategorije | Stefan Tekstil`,
      description:
        "Sve kategorije proizvoda Stefan kućni tekstil Arilje kao sto su Posteljine, Jorgani, Jastuci, Peskiri...",
      type: "website",
      images: [
        {
          url: "https://api.akt.croonus.com/croonus-uploads/config/b2c/logo-bcca26522da09b0cfc1a9bd381ec4e99.jpg",
          width: 800,
          height: 600,
          alt: "Stefan Tekstil DOO Logo",
        },
      ],
      locale: "sr_RS",
    },
  };
};
