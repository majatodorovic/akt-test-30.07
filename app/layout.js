import "swiper/css";
import Footer from "@/components/Footer/Footer";
import NavigationDesktop from "@/components/Navigation/NavigationDesktop";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import { CartContextProvider } from "./api/cartContext";
import "./globals.css";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "@/components/GoogleTagManager/GoogleTagManager";
import Script from "next/script";
import { Suspense } from "react";
import { UserProvider } from "@/_context/userContext";
import { QueryProvider } from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import NewsletterModal from "@/components/NewsletterModal/NewsletterModal";

export const metadata = {
  title: `Kućni tekstil - posteljine, jastuci i jorgani - Stefan kućni tekstil Arilje`,
  description:
    "AKT doo Arilje proizvodi i prodaje kvalitetan kućni tekstil. Posetite naš online shop i kupite brzo, jednostavno i povoljno.",
  keywords: ["stefan, arilje, tekstil, posteljina, jastuci, disney"],
  openGraph: {
    title:
      "Kućni tekstil - posteljine, jastuci i jorgani - Stefan kućni tekstil Arilje",
    description:
      "AKT doo Arilje proizvodi i prodaje kvalitetan kućni tekstil. Posetite naš online shop i kupite brzo, jednostavno i povoljno.",
    keywords: ["stefan, arilje, tekstil, posteljina, jastuci, disney"],
    images: [
      {
        url: "https://api.akt.croonus.com/croonus-uploads/config/b2c/logo-bcca26522da09b0cfc1a9bd381ec4e99.jpg",
        width: 800,
        height: 800,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr-RS">
      <head>
        <link
          rel={`stylesheet`}
          href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css`}
        />
        <Script
          src={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/regular.js`}
        ></Script>
      </head>

      <body className="4xl:container mx-auto">
        <QueryProvider>
          <UserProvider>
            <CartContextProvider>
              <Suspense>
                <Analytics />
              </Suspense>
              <CookieAlert />
              <NavigationDesktop />
              <NavigationMobile />
              {children}
              <Footer />
              <NewsletterModal />
            </CartContextProvider>
          </UserProvider>
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
