"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { post } from "@/app/api/api";
import { toast } from "react-toastify";
import Logo from "../../public/logo.png";
import ModalImage from "../../public/posteljina.webp";
import Image from "next/image";

const NewsletterModal = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid },
  } = useForm();

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("newsletterSubscribed");

    if (!hasSubscribed) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);



  const handleClose = () => {
    setShow(false);
    localStorage.setItem("newsletterSubscribed", "true");
  };

  const onSubmit = (data) => {
    setError();
    setLoading(true);
    post("/newsletter", { email: data.email })
      .then((response) => {
        reset();
        toast.success(response?.payload?.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        });
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        console.warn(error);
        setLoading(false);
      });
  };

  const handleError = () => {
    toast.error("Unesite validnu e-mail adresu.", { position: "top-center" });
  };

  return (
    <>
      {show && (
        <>
          {/* Overlay koji zatvara modal na klik */}
          <div
            onClick={handleClose}
            className="fixed top-0 left-0 w-full h-full bg-transparent z-[1000]"
          />

          {/* Modal prozor */}
          <div
            className="
    fixed bottom-0 z-[1001] w-[90%] max-w-md bg-white shadow-2xl min-w-[280px]
    left-1/2 -translate-x-1/2
    md:left-auto md:right-0 md:translate-x-0 md:max-w-[29.333vw]
  "
            style={{
              maxHeight: "100vh",
              overflow: "hidden",
            }}
          >
            {/* Gornja traka */}
            <div className="bg-croonus-4 w-full h-[30px] md:h-[40px]" />

            {/* Slika */}
            <div>
              <Image
                src={ModalImage}
                alt="Posteljina"
                width={300}
                height={150} // smanjena visina slike za mobilni
                className="object-cover w-full h-[120px] md:h-[200px]"
              />
            </div>

            {/* Naslov */}
            <div className="text-black text-center text-2xl md:text-4xl font-bold py-1 md:py-4 uppercase">
              Newsletter prijava
            </div>

            {/* Tekst sa linijama */}
            <div className="text-center text-sm md:text-base text-black">
              <div className="border-t border-black w-full" />
              <div className="py-1 md:py-2 text-lg md:text-xl">
                Uživajte u 10 % popusta u znak dobrodošlice na naš sajt!
              </div>
              <div className="border-b border-black w-full" />
            </div>

            {/* Forma */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full mt-2 md:mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="email"
                placeholder="Unesite email adresu"
                {...register("email", {
                  required: true,
                  validate: {
                    validEmail: (value) =>
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(
                        value.trim(),
                      ),
                  },
                })}
                className="w-1/2 h-10 md:h-12 px-3 md:px-4 border border-black placeholder:text-xs md:placeholder:text-base text-xs md:text-base text-center focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                onClick={() => {
                  if (!isValid) handleError();
                }}
                className="w-1/2 py-2 md:py-3 text-center bg-croonus-4 text-white disabled:opacity-60"
              >
                {loading ? (
                  <i className="fa-solid fa-spinner animate-spin" />
                ) : (
                  "PRIJAVITE SE"
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default NewsletterModal;
