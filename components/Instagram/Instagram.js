"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Instagram = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getInstagramPost = async () => {
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;
      const data = await fetch(url);
      const posts = await data.json();
      setData(posts.data);
    };
    getInstagramPost();
  }, []);
  return (
    <>
      <div
        className={`mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-[95%] mx-auto`}
      >
        <h3
          className={`col-span-2 md:col-span-3 xl:col-span-4 text-[1.1rem] font-semibold`}
        >
          Poslednje sa Instagrama
        </h3>
        {data?.slice(0, 5)?.map((item) => {
          return (
            <div
              key={item.id}
              className={`relative col-span-1 flex flex-col ${
                item?.media_type === "VIDEO" && "hidden"
              }`}
            >
              <Link href={item.permalink} target="_blank" rel="noreferrer">
                <div
                  className={`h-[200px] md:h-[400px] relative rounded-t-2xl`}
                >
                  {item?.media_type === "VIDEO" ? null : (
                    <Image
                      fill
                      src={item.media_url ?? ""}
                      alt={item.caption ?? ""}
                      className={`w-full h-full object-cover rounded-t-2xl`}
                    />
                  )}
                </div>
              </Link>
              <div
                className={`border-l border-b border-r rounded-b-2xl border-croonus-3`}
              >
                <p
                  className={`pt-2 pl-2 pr-2 pb-2 text-black line-clamp-2 max-h-[3.8rem]`}
                >
                  {item.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Instagram;
