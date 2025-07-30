"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { get, post } from "@/app/api/api";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useStaticPage } from "@/hooks/akt.hooks";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/MarketsPage/Map"), {
  ssr: false,
});

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [error, setError] = useState(true);
  const params = useSearchParams();
  const slug = params.get("slug");
  const [product, setProduct] = useState(null);

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const { data } = useStaticPage("kontakt");

  const [formData, setFormData] = useState({
    page_section: "contact_page",
    customer_name: "",
    phone: "",
    email: "",
    mail_to: "",
    subject: "",
    company_sector: "",
    message: "",
    gcaptcha: token,
  });
  useEffect(() => {
    if (slug) {
      const getProduct = async (slug) => {
        const getProduct = await get(
          `/product-details/basic-data/${slug}`,
        ).then((res) => {
          setProduct(res?.payload);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: `Upit za proizvod ${product?.data?.item?.basic_data?.name} (${product?.data?.item?.basic_data?.sku})`,
            company_sector: "",
            message: `Poštovani, \n\nMolim Vas da na datu e-mail adresu pošaljete ponudu za proizvod ${product?.data?.item?.basic_data?.name} ${product?.data?.item?.basic_data?.sku}.\n\nHvala.`,
            accept_rules: false,
            gcaptcha: token,
          });
        });
      };
      getProduct(slug);
    } else return;
  }, [
    slug,
    product?.data?.item?.basic_data?.name,
    product?.data?.item?.basic_data?.sku,
  ]);
  const formChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await post(
      "/contact/contact_page?page_section=contact_page",
      formData,
    );
    if (res?.code === 200) {
      toast.success("Uspešno ste poslali poruku!", {
        autoClose: 3000,
        position: "top-center",
      });
      setLoading(false);
      setFormData({
        page_section: "contact_page",
        customer_name: "",
        phone: "",
        email: "",
        mail_to: "",
        subject: "",
        company_sector: "",
        message: "",
        gcaptcha: token,
      });
    } else {
      toast.error("Došlo je do greške, molimo Vas pokušajte ponovo!", {
        autoClose: 3000,
        position: "top-center",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({ ...formData, gcaptcha: token });
  }, [token]);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha
        onVerify={verifyCaptcha}
        refreshReCaptcha={refreshReCaptcha}
      />
      <div className="w-[85%] mx-auto max-lg:w-[95%] ">
        <div className="text-xl font-normal text-white bg-croonus-1 max-lg:w-full w-1/4 pl-5 py-1 mt-4">
          <h1 className="">Budite u kontaktu sa nama</h1>
        </div>
        <div className="grid grid-cols-2  max-lg:divide-y lg:divide-x mt-8 gap-x-20">
          <div className="col-span-1 max-lg:col-span-2 w-full lg:pl-5">
            <div className="flex flex-col">
              <div className="flex flex-col">
                {/*<h1 className="text-xl font-normal">Pošaljite poruku.</h1>*/}
                {/*<p className="text-sm font-light">*/}
                {/*  Popunite formu ispod i kontaktiraćemo Vas u najkraćem roku.*/}
                {/*</p>*/}
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.content?.[0]?.content,
                  }}
                />
              </div>
              {error ? (
                <>
                  {" "}
                  <form
                    onSubmit={(e) => onSubmitHandler(e)}
                    className="grid grid-cols-2 max-lg:gap-x-5 lg:gap-x-10 gap-y-5 mt-10 lg:ml-5"
                  >
                    {" "}
                    <input
                      type="text"
                      value={formData.customer_name}
                      name="customer_name"
                      className="infoForm col-span-1 h-12 border-b border-b-black   border-l-0 border-t-0 border-r-0  md:placeholder:absolute placeholder:top-0 placeholder:left-2 placeholder:text-sm placeholder:font-medium placeholder:text-black focus:outline-none focus:ring-0"
                      placeholder="Ime i prezime*"
                      onChange={formChangeHandler}
                    />
                    <input
                      type="text"
                      value={formData.email}
                      name="email"
                      className="placeholder:top-0 col-span-1 h-12 border-b border-b-black   border-l-0 border-t-0 border-r-0  md:placeholder:absolute placeholder:left-2 placeholder:text-sm placeholder:font-medium placeholder:text-black focus:outline-none focus:ring-0"
                      placeholder="E-mail*"
                      onChange={formChangeHandler}
                    />
                    <input
                      type="text"
                      value={formData.phone}
                      name="phone"
                      className="h-12 border-b border-b-black   border-l-0 border-t-0 border-r-0 col-span-1 md:placeholder:absolute  placeholder:top-0 placeholder:left-2 placeholder:text-sm placeholder:font-medium placeholder:text-black focus:outline-none focus:ring-0"
                      placeholder="Broj telefona*"
                      onChange={formChangeHandler}
                    />
                    <input
                      type="text"
                      value={formData.subject}
                      name="subject"
                      className="h-12 border-b border-b-black   border-l-0 border-t-0 border-r-0 col-span-1  md:placeholder:absolute  placeholder:top-0 placeholder:left-2 placeholder:text-sm placeholder:font-medium placeholder:text-black focus:outline-none focus:ring-0"
                      placeholder="Naslov poruke*"
                      onChange={formChangeHandler}
                    />
                    <textarea
                      type="text"
                      value={formData.message}
                      name="message"
                      className="messageForm  col-span-2  md:placeholder:absolute placeholder:top-0 placeholder:left-2 placeholder:text-sm placeholder:font-medium placeholder:text-black focus:outline-none focus:ring-0 max-lg:w-full  border-b border-b-black border-l-0 border-t-0 border-r-0"
                      placeholder="Poruka*"
                      rows={"4"}
                      onChange={formChangeHandler}
                    />
                  </form>
                  <div className="mt-5 flex w-full items-center justify-end  pb-5 uppercase">
                    {loading ? (
                      <i className="fas fa-spinner fa-spin text-croonus-1 text-2xl"></i>
                    ) : (
                      <button
                        onClick={onSubmitHandler}
                        className="flex items-center gap-3  bg-croonus-1 px-8 py-2 text-base  text-white"
                      >
                        Pošalji poruku
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className=" messHolder col-span-2 h-[100%]">
                  <img
                    src="/icons/successmessage.png"
                    alt={process.env.COMPANY}
                    className="mt-10 h-[60px]"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 max-lg:col-span-2 w-full max-lg:pt-5 lg:pl-20">
            <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:text-center gap-10">
              <div className="flex flex-col">
                <h1 className="text-xl font-normal">Pozovite nas</h1>
                {/*<p className="text-sm font-light">*/}
                {/*  Popunite formu ispod i kontaktiraćemo Vas u najkraćem roku.*/}
                {/*</p>*/}
              </div>
              <div className="pl-10 pt-3 bg-[#f5f5f6] gap-5 pb-3 w-full max-lg:pt-5 flex flex-col justify-around">
                <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:text-center gap-0">
                  <h1 className="text-base font-medium">Arilje</h1>
                  <Link
                    href={`https://www.google.com/maps/place/Stefan+ku%C4%87ni+tekstil+Arilje+-+AKT+d.o.o./@43.7574576,20.0701954,14z/data=!4m10!1m2!2m1!1s22+avgusta+arilje!3m6!1s0x475783202233eed5:0x350be1a19d9fe701!8m2!3d43.7627428!4d20.0954014!15sChEyMiBhdmd1c3RhIGFyaWxqZVoTIhEyMiBhdmd1c3RhIGFyaWxqZZIBDmNsb3RoaW5nX3N0b3Jl4AEA!16s%2Fg%2F11c1p2kh6x?entry=ttu`}
                    target={`_blank`}
                    className="text-sm font-light"
                  >
                    Put 22. avgusta bb, 31230 Arilje
                  </Link>
                  <Link href={`tel:0313894222`} className="text-sm font-light">
                    031 / 3894 222
                  </Link>
                  <Link href={`tel:0313894946`} className="text-sm font-light">
                    031 / 3891 946
                  </Link>
                  <Link
                    href={`mailto:prodaja@stefantekstil.rs`}
                    className="text-sm font-light"
                  >
                    prodaja@stefantekstil.rs
                  </Link>
                </div>
                <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:text-center gap-0">
                  <h1 className="text-base font-medium">Beograd</h1>
                  <Link
                    href={`https://www.google.com/maps/place/%D0%A1%D0%BC%D0%B5%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D1%81%D0%BA%D0%B8+%D0%BF%D1%83%D1%82+39a,+%D0%91%D0%B5%D0%BE%D0%B3%D1%80%D0%B0%D0%B4+11000/@44.7508643,20.5842746,19.5z/data=!4m6!3m5!1s0x475a77af3c7ef441:0xf90be4a66f96f46e!8m2!3d44.7506404!4d20.5850449!16s%2Fg%2F11js97gppd?entry=ttu`}
                    target={`_blank`}
                    className="text-sm font-light"
                  >
                    Smederevski put 39a
                  </Link>
                  <Link href={`tel:063/574 498`} className="text-sm font-light">
                  063 / 574 498
                  </Link>
                  <Link
                    href={`mailto:veleprodaja@stefantekstil.rs`}
                    className="text-sm font-light"
                  >
                    veleprodaja@stefantekstil.rs
                  </Link>
                </div>
                <div className="flex flex-col max-lg:items-center max-lg:justify-center max-lg:text-center gap-0">
                  <h1 className="text-base font-medium">Novi Sad</h1>
                  <Link
                    href={`https://www.google.com/maps/place/%D0%8B%D0%B8%D1%80%D0%B8%D0%BB%D0%B0+%D0%B8+%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D0%B8%D1%98%D0%B0+42a,+%D0%9D%D0%BE%D0%B2%D0%B8+%D0%A1%D0%B0%D0%B4+21000/@45.2386437,19.8158403,17z/data=!3m1!4b1!4m6!3m5!1s0x475b1025c59f848d:0x20192a17d9430c85!8m2!3d45.23864!4d19.8184152!16s%2Fg%2F11fxf1bp5r?entry=ttu`}
                    target={`_blank`}
                    className="text-sm font-light"
                  >
                    Ćirila i Metodija 42A
                  </Link>
                  <Link href={`tel:0216337910`} className="text-sm font-light">
                    021 / 6337 910
                  </Link>
                  <Link
                    href={`mailto:nsstefan@stefantekstil.rs`}
                    className="text-sm font-light"
                  >
                    nsstefan@stefantekstil.rs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mt-16 ">
          <div className="col-span-2 max-lg:col-span-2 w-full max-lg:pt-5 h-[450px]">
            <Map />
          </div>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};
export default ContactPage;
