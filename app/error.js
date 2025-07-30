"use client";

import Link from "next/link";

const Error = ({}) => {
  return (
    <div className="nocontent-holder mt-32">
      <div className="text-center">
        <span className="text-3xl font-medium">
          Došlo je do nepoznate greške.
        </span>
      </div>
      <div className="mt-[0.4rem] text-center text-lg font-medium">
        Molimo vas da pokušate ponovo.
      </div>
      <div className="mt-5 text-center">
        <button className="rounded-[5rem] bg-croonus-1 px-4 py-2 text-white hover:bg-opacity-80">
          <Link href="/">Vrati se na početnu stranu.</Link>
        </button>
      </div>
    </div>
  );
};

export default Error;
