"use client";
import { useState, useCallback, useEffect } from "react";
import { list, get } from "../api/api";
import Image from "next/image";
import Link from "next/link";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const fetchBlog = await list("news/category/list/all").then((res) =>
        setBlog(res?.payload?.items),
      );
    };
    fetchBlog();
  }, []);
  const [postNum, setPostNum] = useState(15);

  function handleClick() {
    setPostNum((prevPostNum) => prevPostNum + 3); // 3 is the number of posts you want to load per click
  }
  const numPostsLoaded = Math.min(postNum, blog?.length);
  const allPostsLoaded = numPostsLoaded === blog?.length;

  return (
    <>
      <div className="mx-auto 4xl:container text-croonus-1">
        <div className=" blogHolder mx-4">
          <div className=" titleHolder">
            <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">
              Blog
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-3 p-6">
            {blog?.slice(0, postNum).map((row) => {
              return (
                <div className="col-span-1 mb-6 p-4" key={row?.id}>
                  <Link href={`/blog/${row?.slug}`}>
                    <div className=" postHolder" id={row.id}>
                      <div className="relative  max-lg:h-[300px] max-h-[240px]  h-[240px] w-full">
                        <Image
                          src={convertHttpToHttps(row?.images?.thumb_image)}
                          fill
                          alt={row?.basic_data?.title ?? "AKT"}
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className=" textHolder">
                        <h5 className="mt-2 mb-2 text-[1.2rem] font-bold uppercase">
                          {row.basic_data.title}
                        </h5>
                        <button className=" blogReadMore text-[18px]">
                          Pročitajte više
                          <i className="fa-solid fa-arrow-right ml-2 h-[20px] cursor-pointer text-base hover:text-croonus-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {allPostsLoaded ? (
          <button className="flex mx-auto px-4 py-2 text-[#c3c3c3]">
            Nema više
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="flex mx-auto px-4 py-2 border border-croonus-1"
          >
            Učitaj još
          </button>
        )}
      </div>
    </>
  );
};

export default Blog;
