import { get, list } from "./api/api";
import HomepageBanners from "@/components/HomepageBanners/HomepageBanners";
import ProductsSlider from "@/components/ProductsSlider/ProductsSlider";
import BannerSlider from "@/components/BannerSlider/BannerSlider";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";

const fetchBanners = () => {
  return get("/banners/index_slider").then((response) => response?.payload);
};

const fetchMobileBanners = () => {
  return get("/banners/index_slider_mobile").then(
    (response) => response?.payload,
  );
};

const fetchBannersBanners = () => {
  return get("/banners/banners").then((res) => res?.payload);
};

const getTopSellers = () => {
  return list("/products/section/list/top_sellers", {
    render: false,
  }).then((response) => response?.payload?.items);
};

const Index = async () => {
  const [banners, mobileBanners, homeBanners, top_sellers] = await Promise.all([
    fetchBanners(),
    fetchMobileBanners(),
    fetchBannersBanners(),
    getTopSellers(),
  ]);

  let all_headers = headers();
  let base_url = all_headers.get("x-base_url");

  let schema = generateOrganizationSchema(base_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomepageBanners banners={banners} mobileBanners={mobileBanners} />
      <ProductsSlider text="Najpopularnije" data={top_sellers} />
      <BannerSlider banners={homeBanners} />
      {/* <Instagram /> */}
    </>
  );
};

export default Index;

export const revalidate = 30;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Stefan Tekstil",
    description:
      data?.meta_description ?? "Dobrodošli na Stefan Tekstil Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Stefan Tekstil",
      description:
        data?.social?.share_description ??
        "Dobrodošli na Stefan Tekstil Online Shop",
      type: "website",
      images: [
        {
          url:
            data?.social?.share_image ??
            "https://api.akt.croonus.com/croonus-uploads/config/b2c/logo-bcca26522da09b0cfc1a9bd381ec4e99.jpg",
          width: 800,
          height: 600,
          alt: "Stefan Tekstil",
        },
      ],
      locale: "sr_RS",
    },
  };
};
