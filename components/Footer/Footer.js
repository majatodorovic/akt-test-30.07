"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { post, get, list } from "@/app/api/api";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../assets/Icons/american.png";
import Image2 from "../../assets/Icons/img3.png";
import Image3 from "../../assets/Icons/master.png";
import Image4 from "../../assets/Icons/bancaIntesa.png";
import Image5 from "../../assets/Icons/img.png";
import Image6 from "../../assets/Icons/img1.png";
import Image7 from "../../assets/Icons/visa.png";
import Image8 from "../../assets/Icons/img4.png";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [recommendedCategories, setRecommendedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const currentYear = format(new Date(), "yyyy");
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting: isSubmitted, isSubmitSuccessful, isValid },
  } = useForm();

  useEffect(() => {
    const getCategories = async () => {
      await get("/categories/product/tree").then((res) => {
        setCategories(res?.payload);
      });
    };
    const getRecommendedCategories = () => {
      return list("/categories/section/recommended?limit=20").then((res) => {
        setRecommendedCategories(res?.payload);
      });
    };

    getCategories();
    getRecommendedCategories();
  }, []);

  const onSubmit = (data) => {
    setError();
    setLoading(true);
    post("/newsletter", {
      email: data.email,
    })
      .then((response) => {
        reset();
        toast.success(response?.payload?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => console.warn(error));
  };

  const handleError = () => {
    toast.error("Unesite validnu e-mail adresu.", {
      position: "top-center",
    });
  };

  return (
    <>
      <div className="max-lg:mt-6 mt-[5rem] pt-4 w-[95%] lg:w-[85%] mx-auto border-t border-t-black text-croonus-1 text-sm font-normal">
        {recommendedCategories?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 mb-6 lg:mb-[150px]">
            <div className="font-bold text-[1.1rem] col-span-1 max-lg:text-center">
              Najtraženije kategorije
            </div>
            <div className="col-span-1 gap-1 max-lg:text-center mt-4 lg:mt-12 lg:col-span-2 2xl:col-span-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
              {recommendedCategories.map((category, index) => {
                return (
                  <Link
                    key={index}
                    href={category?.link?.absolute_link}
                    className="hover:underline"
                  >
                    {category.basic_data.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <div className="grid grid-cols-6 lg:gap-x-20 justify-center lg:justify-around max-lg:mt-0 mt-12">
          <div className="flex flex-col col-span-6 lg:col-span-2 max-lg:items-center gap-5 ">
            <div className="max-lg:mt-10">
              <Image
                src={Logo}
                width={400}
                height={100}
                alt="stefantekstil logo"
                className="w-auto h-auto 2xl:h-[80px]"
              />
            </div>
            <div className="flex flex-col max-lg:items-center gap-1 max-md:text-sm ">
              <div>
                <span className="uppercase">{process.env.COMPANY}</span>
                <span className="mx-2">-</span>
                <Link
                  href={`https://www.google.com/maps/place/Stefan+ku%C4%87ni+tekstil+Arilje+-+AKT+d.o.o./@43.7588672,20.06973,14z/data=!4m10!1m2!2m1!1s22+avgusta+arilje!3m6!1s0x475783202233eed5:0x350be1a19d9fe701!8m2!3d43.7627428!4d20.0954014!15sChEyMiBhdmd1c3RhIGFyaWxqZVoTIhEyMiBhdmd1c3RhIGFyaWxqZZIBDmNsb3RoaW5nX3N0b3Jl4AEA!16s%2Fg%2F11c1p2kh6x?entry=ttu`}
                  target={`_blank`}
                >
                  {process.env.ADDRESS}
                </Link>
                <span>{process.env.TOWN}</span>
              </div>
              <div>
                <span>PIB: {process.env.PIB}</span>
                <span className="mx-2">-</span>
                <span>MB: {process.env.MB}</span>
              </div>
              <Link
                href={`mailto:${process.env.EMAIL}`}
                className="text-sm font-normal"
              >
                {process.env.EMAIL}
              </Link>
            </div>
            <div className="w-[100px] h-[1px] bg-croonus-3" />
            <div>
              <Link
                href={`https://www.facebook.com/STEFAN.DOO.ARILJE`}
                rel={`noopener noreferrer nofollow`}
                target={`_blank`}
                className={`hover:underline`}
              >
                Facebook
              </Link>
              <span className="mx-2">-</span>
              <Link
                href={`https://www.instagram.com/stefantekstil.rs/`}
                rel={`noopener noreferrer nofollow`}
                target={`_blank`}
                className={`hover:underline`}
              >
                Instagram
              </Link>
            </div>
          </div>
          <div className="flex  max-lg:py-0  col-span-6  lg:col-span-1 flex-col gap-6 self-start max-lg:items-center max-lg:mt-10">
            <h3
              className="text-[1.1rem] font-bold text-croonus-1 flex gap-2 items-center"
              onClick={() => setOpenInfo(!openInfo)}
            >
              Informacije
              <div className="lg:hidden">
                <i
                  className={`fa-solid fa-chevron-down transition duration-300 text-black text-sm ${
                    openInfo ? "rotate-180" : ""
                  }`}
                ></i>
              </div>
            </h3>
            <div
              className={`flex-col max-lg:items-center gap-1 ${openInfo ? "flex" : "hidden"} lg:flex`}
            >
              <Link
                className={`hover:underline`}
                href="/strana/pomoc-pri-kupovini"
              >
                Pomoć pri kupovini
              </Link>
              <Link
                className={`hover:underline`}
                href="/strana/uslovi-koriscenja"
              >
                Uslovi korišćenja
              </Link>
              <Link
                className={`hover:underline`}
                href="/strana/politika-o-kolacicima"
              >
                Politika o kolačićima
              </Link>
              <Link
                className={`hover:underline`}
                href="/strana/politika-privatnosti"
              >
                Politika privatnosti
              </Link>
              <Link
                className={`hover:underline`}
                href="/strana/uslovi-koriscenja#nacin-placanja"
              >
                Načini plaćanja
              </Link>
              <Link className={`hover:underline`} href="/kontakt">
                Kontakt
              </Link>
            </div>
          </div>
          <div className="flex  max-lg:py-0  col-span-6  lg:col-span-1 flex-col gap-6 self-start max-lg:items-center max-lg:mt-10">
            <h3
              className="text-[1.1rem] font-bold text-croonus-1 flex gap-2 items-center"
              onClick={() => setOpenCategories(!openCategories)}
            >
              Kategorije
              <div className="lg:hidden">
                <i
                  className={`fa-solid fa-chevron-down text-black text-sm transition-transform ${
                    openCategories ? "rotate-180" : ""
                  }`}
                ></i>
              </div>
            </h3>
            <div
              className={`flex-col gap-1 max-lg:items-center transition duration-300 ${openCategories ? "flex" : "hidden"} lg:flex`}
            >
              <Link
                href="https://www.stefantekstil.rs/kategorija/spavaca-soba/jastucnice"
                className="hover:underline"
              >
                Jastučnice
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/spavaca-soba/posteljine/satenska-posteljina"
                className="hover:underline"
              >
                Satenska posteljina
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/spavaca-soba/posteljine/pamucne-posteljine"
                className="hover:underline"
              >
                Pamučne posteljine
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/spavaca-soba/prekrivaci-za-krevet/step-deka"
                className="hover:underline"
              >
                Štep deka
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/spavaca-soba/prekrivaci-za-krevet/frotirski-prekrivaci"
                className="hover:underline"
              >
                Frotirski prekrivači
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/deca/decije-posteljine"
                className="hover:underline"
              >
                Dečije posteljine
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/spavaca-soba"
                className="hover:underline"
              >
                Spavaća soba
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/kupatilski-tekstil"
                className="hover:underline"
              >
                Kupatilski tekstil
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/spavaca-soba/carsavi"
                className="hover:underline"
              >
                Čaršavi
              </Link>
              <Link
                href="https://www.stefantekstil.rs/kategorija/spavaca-soba/navlake-za-dusek-2"
                className="hover:underline"
              >
                Navlake za dušek
              </Link>
            </div>
          </div>
          <div className="flex  max-lg:py-0  col-span-6  lg:col-span-2 flex-col gap-6 self-start max-lg:items-center max-lg:mt-10">
            <h3 className="text-[1.1rem] font-bold text-croonus-1">
              Newsletter
            </h3>
            <div>
              <p className="max-lg:text-center text-croonus-1 mb-4"></p>
              {loading ? (
                <div>
                  <i className="fa-solid fa-spinner text-[1.1rem] animate-spin"></i>
                </div>
              ) : (
                <>
                  <form
                    className="flex justify-center items-center w-full relative"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Unesite email adresu"
                      {...register("email", {
                        required: true,
                        validate: {
                          validEmail: (value) => {
                            const currentEmails = value
                              .split(",")
                              .filter((e) => e && e.trim());
                            const regex =
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
                            for (let i = 0; i < currentEmails?.length; i++) {
                              if (
                                !regex.test(currentEmails[i].replace(/\s/g, ""))
                              ) {
                                return false;
                              }
                            }
                          },
                          emailLength: (value) => {
                            const currentEmails = value
                              .split(",")
                              .filter((e) => e && e.trim());
                            if (currentEmails.length > 10) {
                              return false;
                            }
                          },
                        },
                      })}
                      className="rounded-lg w-full py-3 pl-5 text-sm pr-[8rem] bg-black/10 placeholder:text-black/50 placeholder:text-sm border border-none self-stretch focus:ring-0 focus:outline-none focus:border-none"
                    />
                    <button
                      onClick={() => {
                        if (!isValid && !isSubmitted && !isSubmitSuccessful) {
                          handleError();
                        }
                      }}
                      className="absolute right-0 bg-croonus-3 w-[7rem] py-3 text-black hover:bg-opacity-80 rounded-lg"
                    >
                      Prijavite se
                    </button>
                  </form>
                </>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <div className="max-lg:text-center">
                  Prihvaćeni načini plaćanja
                </div>
                <div className="flex gap-1 items-center max-lg:justify-center mt-2 flex-wrap">
                  <Link
                    href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="p-1 relative border rounded-md"
                  >
                    <Image
                      src={Image7}
                      alt="AKT"
                      width={36}
                      height={30}
                      style={{ objectFit: "contain" }}
                      className="object-scale-down"
                    />
                  </Link>
                  <div className="p-1 relative border rounded-md">
                    <Image
                      src={Image2}
                      alt="AKT"
                      width={36}
                      height={30}
                      style={{ objectFit: "contain" }}
                      className="object-scale-down"
                    />
                  </div>
                  <Link
                    href="https://www.mastercard.rs/sr-rs/korisnici/pronadite-karticu.html"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="p-1 relative border rounded-md"
                  >
                    <Image
                      src={Image3}
                      alt="AKT"
                      width={64}
                      height={30}
                      style={{ objectFit: "contain" }}
                      className="object-scale-down"
                    />
                  </Link>
                  <div className="p-1 relative border rounded-md">
                    <Image
                      src={Image8}
                      alt="AKT"
                      width={36}
                      height={30}
                      style={{ objectFit: "contain" }}
                      className="object-scale-down"
                    />
                  </div>
                  <div className="p-1 relative border rounded-md">
                    <Image
                      src={Image5}
                      alt="AKT"
                      width={35}
                      height={30}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <Link
                    href="https://www.bancaintesa.rs"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    className="p-1 relative border rounded-md"
                  >
                    <Image
                      src={Image4}
                      alt="AKT"
                      width={110}
                      height={30}
                      style={{ objectFit: "contain" }}
                    />
                  </Link>
                  <div className="p-1 relative border rounded-md">
                    <Image
                      src={Image6}
                      alt="AKT"
                      width={35}
                      height={30}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="p-1 relative border rounded-md">
                    <Image
                      src={Image1}
                      alt="AKT"
                      width={32}
                      height={30}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
                
              </div>
              
              {/* <div>
                <div className="max-lg:text-center">Načini dostave</div>
              </div> */}
   <div className="flex flex-col gap-4">
  {/* ...ostali kod... */}

  <a
    href="https://www.stefantekstil.rs/trust/"
    className="block mx-auto lg:mx-0"
  >
    <img src="https://verify.etrustmark.rs/cert/image.php" width="200" alt="E-Trustmark sertifikat" />
  </a>
</div>
            </div>
          </div>
          
        </div>
      
      </div>
  
      <div className="w-[95%] lg:w-[85%] mx-auto mb-4">
        <div className="text-sm mt-6 pb-5 border-b border-croonus-3 max-lg:text-center">
          &copy; {currentYear} AKT DOO | Sva prava zadržana. Powered by{" "}
          <Link className="underline font-medium" href="https://croonus.com">
            Croonus Technologies
          </Link>
        </div>
        <p className="text-sm mt-5 max-lg:text-center">
          Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a plaćanje
          se vrši isključivo u dinarima, isporuka se vrši samo na teritoriji
          Republike Srbije. Nastojimo da budemo što precizniji u opisu
          proizvoda, prikazu slika i samih cena, ali ne možemo garantovati da su
          sve informacije kompletne i bez grešaka. Svi artikli prikazani na
          sajtu su deo naše ponude i ne podrazumeva se da su dostupni u svakom
          trenutku. Raspoloživost robe možete proveriti pozivanjem call centra
          po ceni lokalnog poziva.
        </p>
      </div>
    </>
  );
};

export default Footer;
