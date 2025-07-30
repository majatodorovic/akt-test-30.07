"use client";
import Image from "next/image";
import howtobuyimage1 from "@/assets/Images/howtobuy1.jpg";
import howtobuyimage2 from "@/assets/Images/howtobuy2.jpg";
import howtobuyimage3 from "@/assets/Images/howtobuy3.jpg";
import howtobuyimage4 from "@/assets/Images/howtobuy4.jpg";

const HowToBuy = () => {
  return (
    <div className="w-[85%] mx-auto max-lg:w-[95%] ">
      <div className="text-xl font-normal text-white bg-croonus-1 md:w-1/4 pl-5 py-1 mt-4 mb-[3rem]">
        <h1 className="">Pomoć pri kupovini</h1>
      </div>
      <p className="mb-4">
        U gornjem delu <span className="text-red-600">(1)</span> naše stranice
        nalazi se ikonica koja otvara sekciju sa spiskom proizvoda koje možete
        kupiti na našem shopu. Ukoliko za određeni proizvod imate šifru artikla,
        uvek možete iskoristiti polje za pretragu{" "}
        <span className="text-red-600">(2)</span> koje se nalazi u gornjem
        desnom uglu.
      </p>
      <Image
        src={howtobuyimage1}
        alt="Akt Kako kupiti"
        width={1800}
        height={600}
      />
      <p className="mb-4 mt-[3rem]">
        Klikom na ikonicu otvarate proizvode grupisane u više kategorija{" "}
        <span className="text-red-600">(3)</span> ( spavaća soba, tekstil za
        kupatilo, kuhinja i bašta... ), dok je svaka kategorija podeljena na
        više potkategorija (posteljine, prekrivači, jorgani..). Kada kliknete na
        neku od potkategorija dobijate uvid u njihov sadržaj i na taj način
        tražite željeni proizvod.
      </p>
      <Image
        src={howtobuyimage2}
        alt="Akt Kako kupiti"
        width={1800}
        height={600}
      />
      <p className="mb-4 mt-[3rem]">
        Kada pronađete proizvod koji želite da naručite, kliknite na njegovu
        sliku ili naziv proizvoda, gde će Vam izaći detaljne informacije{" "}
        <span className="text-red-600">(4)</span> o proizvodu koji Vas zanima.
        Ukoliko je to proizvod koji želite da poručite – izaberite odgovarajuću
        veličinu <span className="text-red-600">(5)</span> i kliknite na dugme
        DODAJ U KORPU <span className="text-red-600">(6)</span>.
      </p>
      <Image
        src={howtobuyimage3}
        alt="Akt Kako kupiti"
        width={1800}
        height={600}
      />
      <p className="mb-4 mt-[3rem]">
        Nakon završenog dodavanja željenih proizvoda u korpu, ulaskom u korpu
        popunjavate Vaše informacije <span className="text-red-600">(7)</span> o
        dostavi, načinu dostave i našinu plaćanja. Proverite da li su svi
        artikli naručeni kako želite i kliknete na dugme POTVRDI PORUDŽBENICU{" "}
        <span className="text-red-600">(8)</span> i time ste završili Vaš proces
        naručivanja na našem shopu.
      </p>
      <Image
        src={howtobuyimage4}
        alt="Akt Kako kupiti"
        width={1800}
        height={600}
      />
    </div>
  );
};

export default HowToBuy;
