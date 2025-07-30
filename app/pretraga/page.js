import SearchAppPage from "@/components/SearchAppPage/SearchAppPage";
import { Suspense } from "react";

const Search = () => {
  return (
    <Suspense>
      <SearchAppPage />
    </Suspense>
  );
};

export default Search;

export const generateMetadata = async ({ searchParams: { query } }) => {
  return {
    title: `Pretraga: ${query} | Stefan Tekstil`,
    robots: {
      index: false,
      follow: false,
    },
  };
};
