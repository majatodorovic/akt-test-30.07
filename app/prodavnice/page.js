import ProdavnicePage from "@/components/MarketsPage/ProdavnicePage";
import { headers } from "next/headers";

const Prodavnice = () => {
  return (
    <>
      <ProdavnicePage />
    </>
  );
};

export default Prodavnice;

export const generateMetadata = async ({ searchParams: { search } }) => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Prodavnice | Stefan Tekstil`,
    description:
      "Stefan Tekstil prodavnice se nalaze u Arilje Put 22.avgusta bb, Beograd Nusiceva br. 19, Novi Sad Bulevar Evrope br.2",
    alternates: {
      canonical: canonical,
    },
  };
};
