import { get } from "../../api/api";
import { headers } from "next/headers";
import parse from "html-react-parser";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";

const getBlogPost = async (bid) => {
  const getBlogPost = await get(`news/details/${bid}`).then(
    (response) => response?.payload,
  );
  return getBlogPost;
};

const BlogPost = async ({ params: { bid } }) => {
  const blogpost = await getBlogPost(bid);

  return (
    <>
      <div className="mx-auto 4xl:container">
        <div className="blogPostHolder mb-16">
          <div className=" imgHolder">
            <div className="relative max-lg:h-[300px] max-h-[340px] h-[340px] w-auto">
              <Image
                src={convertHttpToHttps(blogpost?.images?.thumb_image)}
                fill
                className="object-cover rounded-xl"
                alt={blogpost?.basic_data?.title ?? "AKT"}
              />
            </div>
          </div>
          <div className=" titleHolder">
            <h1 className="text-4xl mt-16 text-center font-bold uppercase">
              {blogpost?.basic_data?.title}
            </h1>
            <p className=" date text-center font-medium">
              {blogpost?.basic_data?.short_description}
            </p>
          </div>
          <div className=" mt-5 txtHolder mx-10">
            <div className="text-center">
              {parse(blogpost?.basic_data?.description ?? '')}
            </div>
          </div>
          <div className="sliderHolder"></div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;

const getSEO = (slug) => {
  return get(`/news/details/seo/${slug}`).then(
    (response) => response?.payload,
  );
};

export const generateMetadata = async ({ params: { bid } }) => {
  const data = await getSEO(bid);
  const header_list = headers();
  let canonical = header_list?.get("x-pathname") ?? "";
  return {
    title: data?.meta_title || "Blog | Stefan Tekstil",
    description: data?.meta_description || "",
    alternates: {
      canonical: data?.meta_canonical_link || canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title || "Blog | Stefan Tekstil",
      description:
        data?.social?.share_description || "",
      type: "website",
      images: [
        {
          url:
            data?.social?.share_image ||
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
