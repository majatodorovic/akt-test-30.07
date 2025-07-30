"use client";

import Link from "next/link";

export const Pagination = ({
  getPaginationArray = (r, m) => {},
  data,
  page,
  setPage,
  generateQueryString = () => {},
}) => {
  let query_string = generateQueryString();

  const handleQueryString = (page) => {
    let new_string = query_string;
    let page_string = query_string?.split("strana=")?.[1];

    if (page_string) {
      new_string = query_string?.replace(
        `strana=${page_string}`,
        `strana=${page + 1}`,
      );
    }

    if (!page_string) {
      new_string = `${query_string}&strana=${page + 1}`;
    }
    return new_string;
  };

  return (
    <div
      className={`flex mt-10 py-2 px-2 sm:px-[3rem] bg-[#f2f2f2] items-center justify-center sm:justify-end gap-1 lg:w-[85%] mx-auto`}
    >
      {getPaginationArray(
        data?.pagination?.selected_page,
        data?.pagination?.total_pages,
      )?.map((num, index, array) => (
        <div key={index}>
          {index === 0 && num !== 1 && (
            <>
              <Link
                key={index}
                href={`${handleQueryString(0)}`}
                className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-croonus-1 hover:text-croonus-1`}
                onClick={() => {
                  setPage(1);
                  window.scrollTo(0, 0);
                }}
              >
                1
              </Link>
              {num - 1 !== 1 && (
                <span className={`select-none py-1 px-3`}>...</span>
              )}
            </>
          )}
          {index > 0 && num - array[index - 1] > 1 && (
            <span className={`select-none py-1 px-3`}>...</span>
          )}
          <Link
            href={`${handleQueryString(num - 1)}`}
            className={`${
              num === data.pagination.selected_page
                ? "cursor-pointer select-none bg-croonus-1 py-1 px-3 text-white"
                : "cursor-pointer select-none py-1 px-3 border border-white hover:border-croonus-1 hover:text-croonus-1"
            }`}
            onClick={() => {
              setPage(num);
              window.scrollTo(0, 0);
            }}
          >
            {num}
          </Link>
          {index === array?.length - 1 &&
            num !== data.pagination.total_pages && (
              <>
                {data.pagination.total_pages - num !== 1 && (
                  <span className={`select-none py-1 px-3 `}>...</span>
                )}
                <Link
                  href={`${handleQueryString(data.pagination.total_pages - 1)}`}
                  className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-croonus-1 hover:text-croonus-1`}
                  onClick={() => {
                    setPage(data.pagination.total_pages);
                    window.scrollTo(0, 0);
                  }}
                >
                  {data.pagination.total_pages}
                </Link>
              </>
            )}
        </div>
      ))}
    </div>
  );
};
