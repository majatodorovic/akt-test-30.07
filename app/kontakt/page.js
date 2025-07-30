import ContactPage from "@/app/kontakt/contactPage";
import { Suspense } from "react";
import { headers } from "next/headers";

const Contact = () => {
  return (
    <Suspense>
      <ContactPage />
    </Suspense>
  );
};

export default Contact;

export const generateMetadata = async () => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Kontakt | Stefan Tekstil`,
    description: "Kontakt | Stefan Tekstil",
    alternates: {
      canonical: canonical,
    },
  };
};
