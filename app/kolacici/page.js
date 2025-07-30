import Link from "next/link";

const Kolacici = () => {
  return (
    <div className="w-[85%] mx-auto max-lg:w-[95%] ">
      <div className="text-xl font-normal text-white bg-croonus-1 md:w-1/4 pl-5 py-1 mt-4">
        <h1 className="">Politika kolačića (cookies)</h1>
      </div>
      <p className="mt-8">
        Kako bismo Vam omogućili bolje korisničko iskustvo pregledanja sadržaja
        na našem sajtu i kako bi ova stranica funkcionisala ispravno, moramo
        vršiti konstantna unapređivanja. Zato ova stranica mora poslati Vašem
        računaru malu količinu informacija (tzv. kolačići ili cookies). U skladu
        sa Zakonom o zaštiti podataka o ličnosti smo u obavezi da obezbedimo Vaš
        pristanak pre slanja kolačića. Blokiranjem kolačića i dalje ćete biti u
        mogućnosti pregledanja sadržaja, ali Vam određene mogućnosti neće biti
        dostupne.
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Šta su kolačići?
      </h5>
      <p className="mt-2">
        Kolačići su informacije koje web stranica koju posećujete šalje vašem
        računaru u svrhu poboljšavanja Vašeg korisničkog iskustva i potreba.
        Kolačići čuvaju informacije koje ste Vi podesili za Vašu pretragu kao
        što su jezik, adresa, e-mail, ili podaci o ličnosti, i pamte ih svaki
        put kada se ponovo vratite na istu stranicu. Takodje nam pomažu da Vas
        zaštitimo od elektronskih prevara vezanih sa naš sajt.
      </p>
      <p className="mt-8">
        Ovim informacijama ili bilo kojim drugim datotekama iz vašeg računara ni
        jedan sajt ne može da pristupi ukoliko Vi to ne omogućite na vašem
        računaru. Pomenute informacije koje web stranica šalje Vašem računaru
        Vama nije vidljiva, a takođe možete i da promenite postavke internet
        pretraživača da sami birate da li želite da čuvate kolačiće ili da ih
        odbijete.
      </p>
      <h6 className="font-semibold text-lg mb-[0.4rem] mt-[1.6rem]">
        Korist koju Vi imate ukoliko pristanete na kolačiće?
      </h6>
      <ul className="mt-2 list-disc ml-10">
        <li className="py-2.5">
          Vaš uređaj pamti sve informacije koje ste uneli, tako da sledeći put
          kad se budete vratili na sajt nećete morati da ih ponovo unosite
        </li>
        <li className="py-2.5">
          Prilagođava sadržaj vašim preferencijama, i dobijate informacije u
          skladu sa Vašim profilom
        </li>
        <li className="py-2.5">
          Dobićete promocije i specijalne akcije koje odgovaraju Vašim navikama
          kupovine
        </li>
      </ul>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Kako se brišu kolačići?
      </h5>
      <p className="mt-2">
        Sve postavke kolačića i informacije o istim možete pronaći u
        podešavanjima Vašeg internet pretraživača ili klikom na “Pomoć”.
      </p>
      <p className="mt-8">
        Da biste namestili vaš pretraživač da prihvata kolačiće (cookies) da
        biste mogli nesmetano da koristite naš sajt i kupujete proizvode,
        pratite neki od linkova u zavisnosti koji pretraživač koristite:
      </p>
      <ul className="mt-2 list-disc ml-10">
        <li className="py-2.5">
          <Link
            href="https://support.google.com/accounts/answer/61416?hl=en"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-red-500 font-medium"
          >
            Google Chrome
          </Link>
        </li>
        <li className="py-2.5">
          <Link
            href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-red-500 font-medium"
          >
            Mozilla Firefox
          </Link>
        </li>
        <li className="py-2.5">
          <Link
            href="http://windows.microsoft.com/en-us/internet-explorer/delete-manage-cookies"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-red-500 font-medium"
          >
            Internet Explorer
          </Link>
        </li>
        <li className="py-2.5">
          <Link
            href="http://support.apple.com/kb/PH19214"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-red-500 font-medium"
          >
            Safari
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Kolacici;
