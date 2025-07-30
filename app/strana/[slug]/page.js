import { headers } from "next/headers";
import { get } from "@/app/api/api";
import { StaticBasicData } from "@/_components/static-page";
import { Suspense } from "react";

const Static = ({ params: { slug } }) => {
  return (
    <Suspense
      fallback={
        <>
          <div className={`mt-10 w-full bg-slate-200 animate-pulse`} />
          <div className={`mt-10 w-full bg-slate-200 animate-pulse`} />
          <div className={`mt-10 w-full bg-slate-200 animate-pulse`} />
          <div className={`mt-10 w-full bg-slate-200 animate-pulse`} />
          <div className={`mt-10 w-full bg-slate-200 animate-pulse`} />
          <div className={`mt-10 w-full bg-slate-200 animate-pulse`} />
        </>
      }
    >
      <StaticBasicData slug={slug} />
    </Suspense>
  );
};

export default Static;

const getSEO = (slug) => {
  return get(`/static-pages/seo/${slug}`).then((response) => response?.payload);
};

export const generateMetadata = async ({ params: { slug } }) => {
  const data = await getSEO(slug);
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
