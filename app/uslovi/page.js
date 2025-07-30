import Link from "next/link";

const Uslovi = () => {
  return (
    <div className="w-[85%] mx-auto max-lg:w-[95%] ">
      <div className="text-xl font-normal text-white bg-croonus-1 md:w-1/4 pl-5 py-1 mt-4">
        <h1 className="">Uslovi korišćenja - AKT DOO Arilje</h1>
      </div>
      <h5 className="font-semibold text-lg mt-[3rem]">
        Osnovni podaci o firmi
      </h5>
      <ul className="mt-3">
        <li>
          pun naziv pravnog subjekta:{" "}
          <span className="font-semibold">{process.env.COMPANY}</span>
        </li>
        <li>
          adresa: <span className="font-semibold">{process.env.ADDRESS}</span>
        </li>
        <li>
          delatnost i šifra delatnosti:{" "}
          <span className="font-semibold">{process.env.CODE}</span>
        </li>
        <li>
          matični broj: <span className="font-semibold">{process.env.MB}</span>
        </li>
        <li>
          poreski broj: <span className="font-semibold">{process.env.PIB}</span>
        </li>
        <li>
          web adresa: <span className="font-semibold">{process.env.SITE}</span>
        </li>
        <li>
          kontakt telefon:{" "}
          <span className="font-semibold">{process.env.TELEPHONE}</span>
        </li>
        <li>
          kontakt e-mail:{" "}
          <span className="font-semibold">{process.env.EMAIL}</span>
        </li>
      </ul>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Izjava o konverziji{" "}
      </h5>
      <p>
        Sva plaćanja biće izvršena u lokalnoj valuti Republike Srbije – dinar
        (RSD).Za informativni prikaz cena u drugim valutama koristi se srednji
        kurs Narodne Banke Srbije. Iznos za koji će biti zadužena Vaša platna
        kartica biće izražen u Vašoj lokalnoj valuti kroz konverziju u istu po
        kursu koji koriste kartičarske organizacije, a koji nama u trenutku
        transakcije ne može biti poznat. Kao rezultat ove konverzije postoji
        mogućnost neznatne razlike od originalne cene navedene na našem sajtu
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem] ">
        Kontakt podaci – korisnički servis
      </h5>
      <span>Broj telefona: </span>
      <Link
        href={`tel:${process.env.TELEPHONE}`}
        className="underline font-semibold"
      >
        031 389 4222
      </Link>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Dostava robe i eventualna ograničenja
      </h5>
      <p>
        Dostava naručenih proizvoda i/ili usluga se vrši putem kurirske službe
        Dexpress na adresu Korisnika ili na adresu koju je Korisnik naveo kao
        adresu za dostavu i moguća je (trenutno) na teritoriji Republike Srbije.
        Naručeni proizvodi se dostavljaju u roku od 7 dana od dana prispeća
        narudžbine. S obzirom na radno vreme kurirske službe, potrebno je da
        Korisnik ili drugo lice koje može preuzeti pošiljku, bude na naznačenoj
        adresi za dostavu, u vremenskom periodu od 9h do 15h.
      </p>
      <p>
        Ukoliko iz bilo kog razloga Korisnik, prilikom podnošenja narudžbine,
        unese netačne ili pogršne podatke, AKT ne snosi odgovornost za slučaj
        neisporučivanja prizvoda i/ili usluga. U tom slučaju AKT će kontaktirati
        Korisnika na dostavljeni kontakt broj ili e-mail adresu, proveriti
        tačnost navedenih podataka i ponoviti postupak isporuke. U slučaju da se
        ponovi nemogućnost isporuke, kupovina će se smatrati neuspelom.
      </p>
      <p>
        U slučaju eventualnih promena ili situacija koje onemogućavaju redovan
        tok isporuke, ili u slučaju da iz tehničkih razloga, razloga više sile i
        slično AKT nije u mogućnosti da isporuči kupljenu robu i/ili usluge, bez
        odlaganja će obavestiti Korisnika o novonastalim promenama, sa
        naznačenjem novih rokova isporuke, ili u slučaju nemogućnosti izvršenja
        isporuke i sa povraćajem uplaćenih sredstava.
      </p>
      <p>
        Prilikom isporuke proizvoda, dužnost je Korisnika da izvrši pregled
        proizvoda i da ukaže na evetualna mehanička oštećenja, u kom slučaju će
        proizvod biti zamenjen.
      </p>
      <p>
        Ukoliko pri prispeću pošiljke Korisnik ustanovi nedostatak ili grešku na
        proizvodu, isti može zameniti za novi, u kom slučaju troškove ponovne
        dostave snosi AKT.
      </p>
      <p>
        U slučaju da Korisnik želi da promeni artikal za isti artikal druge
        veličine, troškove ponovne dostave snosi Korisnik.Odgovornost zbog
        nesaobraznosti robe ugovoru
      </p>
      <p>
        Odgovornost Akta zbog nesaobraznosti robe ugovoru predviđena je Zakonom
        o zaštiti potrošača („Sl. glasnik RS“ br.62/2014 I 6/2016 – dr. zakon).
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Politika reklamacija
      </h5>
      <p>
        Sve reklamacije na proizvode kupljene preko vebsajta Korisnik može
        izjaviti elektronski na e-mail adresu{" "}
        <Link href="mailto:webshop@stefantekstil.rs" className="underline">
          webshop@stefantekstil.rs
        </Link>{" "}
        ili uputiti na broj korisničkog servisa{" "}
        <Link href="tel:0313894222" className="underline">
          031/3894-222
        </Link>
        .
      </p>
      <p>
        Prilikom izjavljivanja reklamacije dužni ste da dostavite robu na koju
        se reklamacija odnosi, kao i račun na uvid ili drugi dokaz o kupovini te
        robe (kopija računa, slip i sl.).
      </p>
      <p>
        Nemogućnost potrošača da dostavi ambalažu robe ne može biti uslov za
        rešavanje reklamacije, niti razlog za odbijanje otklanjanja
        nesaobraznosti.
      </p>
      <p>
        Stefan će elektronski potvrditi prijem reklamacije Korisnika, odnosno
        saopštiti broj pod kojim je ista zavedena u evidenciji primljenih
        reklamacija i odgovoriti na istu u zakonom predviđenom roku za rešavanje
        reklamacija.
      </p>
      <p className="font-semibold my-[0.6rem]">
        Obaveštenje o pravu na odustanak od ugovora
      </p>
      <p>
        Korisnik ima pravo da odustane od ugovora o kupovini proizvoda koje je
        kupio preko vebsajta, bez navođenja razloga zbog kojeg odustaje od
        ugovora, u roku od 14 dana od dana kada je roba dospela u državinu
        korisnika, odnosno trećeg lica koje je korisnik odredio, a koje nije
        prevoznik.
      </p>
      <p>
        Ukoliko korisnik želi da odustane od ugovora o kupovini proizvoda koji
        je zaključen putem vebsajta, to može učiniti slanjem{" "}
        <a
          href="/doc/izjava_o_odustajanju_od_ugovora_stefan_arilje.pdf"
          download
          className="underline cursor-pointer"
        >
          Obrasca za odustanak od ugovora
        </a>{" "}
        elektronski na mail adresu{" "}
        <Link href="mailto:webshop@stefantekstil.rs" className="underline">
          webshop@stefantekstil.rs
        </Link>{" "}
        ili na drugi nedvosmislen način.
      </p>
      <p>
        Obrazac za odustanak od ugovora možete preuzeti na{" "}
        <a
          href="/doc/izjava_o_odustajanju_od_ugovora_stefan_arilje.pdf"
          download
          className="underline cursor-pointer text-red-600"
        >
          ovom linku
        </a>
        .
      </p>
      <p>
        Ukoliko obrazac za odustanak od ugovora Korisnik dostavi elektronski,
        AKT će ga, bez odlaganja pismenim putem obavestiti o prijemu obrasca.
      </p>
      <p>
        Izjava o odustajanju od ugovora proizvodi pravno dejstvo od dana kada je
        poslata Aktu i smatra se blagovremenom, ako je poslata u roku od 14 dana
        od dana kada je roba dospela u državinu korisnika, odnosno trećeg lica
        koje je korisnik odredio, a koje nije prevoznik. Istekom navedenog roka
        Korisnik gubi pravo na odustajanje od ugovora.
      </p>
      <p>
        U slučaju odustanka od ugovora, Korisnik snosi troškove vraćanja robe i
        dužan je da u roku od 14 dana od dana odustajanja od ugovora pošalje
        kupljene proizvode Aktu.
      </p>
      <p>
        AKT će, bez odlaganja izvršiti povraćaj uplata koje je primio za robu,
        uključujući i troškove isporuke, a najkasnije u roku od 14 dana od dana
        kada je primio obrazac o odustanku od ugovora, s tim da AKT može
        odložiti povraćaj navedenih sredstava dok ne dobije robu koja se vraća,
        ili dok Korisnik ne dostavi dokaz da je poslao robu Aktu, u zavisnosti
        od toga šta nastupa prvo.
      </p>
      <p>
        Korisnik je u obavezi da dostavljene proizvode vrati Aktu u originalnom
        trgovačkom pakovanju, kako mu je roba bila i dostavljena.
      </p>
      <p>
        Korisnik je isključivo odgovoran za umanjenu vrednost robe koja nastane
        kao posledica rukovanja robom na način koji nije adekvatan, odnosno
        prevazilazi ono što je neophodno da bi se ustanovili priroda,
        karakteristike i funkcionalnost robe.
      </p>
      <p>
        Korisnik nema pravo da odustane od ugovora u slučaju isporuke robe
        proizvedene prema posebnim zahtevima korisnika ili jasno
        personalizovane.
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Zaštita privatnosti korisnika
      </h5>
      <p>
        U ime {process.env.COMPANY} obavezujemo se da ćemo čuvati privatnost
        svih naših kupaca. Prikupljamo samo neophodne, osnovne podatke o
        kupcima/ korisnicima i podatke neophodne za poslovanje i informisanje
        korisnika u skladu sa dobrim poslovnim običajima i u cilju pružanja
        kvalitetne usluge. Dajemo kupcima mogućnost izbora uključujući mogućnost
        odluke da li žele ili ne da se izbrišu sa mailing lista koje se koriste
        za marketinške kampanje. Svi podaci o korisnicima/kupcima se strogo
        čuvaju i dostupni su samo zaposlenima kojima su ti podaci nužni za
        obavljanje posla. Svi zaposleni {process.env.COMPANY} (i poslovni
        partneri) odgovorni su za poštovanje načela zaštite privatnosti.
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Zaštita poverljivih podataka o transakciji
      </h5>
      <p>
        Prilikom unošenja podataka o platnoj kartici, poverljive informacija se
        prenose putem javne mreže u zaštićenoj (kriptovanoj) formi upotrebom SSL
        protokola i PKI sistema, kao trenutno najsavremenije kriptografske
        tehnologije.
      </p>
      <p>
        Sigurnost podataka prilikom kupovine, garantuje procesor platnih
        kartica, Banca Intesa ad Beograd, pa se tako kompletni proces naplate
        obavlja na stranicama banke. Niti jednog trenutka podaci o platnoj
        kartici nisu dostupni našem sistemu.
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Povraćaj sredstava
      </h5>
      <p>
        U slučaju vraćanja robe i povraćaja sredstava kupcu koji je prethodno
        platio nekom od platnih kartica, delimično ili u celosti, a bez obzira
        na razlog vraćanja, {process.env.COMPANY} je u obavezi da povraćaj vrši
        isključivo preko VISA, EC/MC, Maestro, Amex i Dina metoda plaćanja, što
        znači da će banka na zahtev prodavca obaviti povraćaj sredstava na račun
        korisnika kartice.
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Izjava o PDV-u
      </h5>
      <p>PDV uračunat u cenu i nema skrivenih troškova.</p>
      <p className="mt-8">
        Slede odredbe kojima se utvrđuju uslovi koji regulišu pristup i
        korišćenje usluga na vebsajtu stefantekstil.rs i posebno vršenje
        kupovine i plaćanje roba i usluga iz ponude AKT doo Arilje on-line.
      </p>
      <p className="mt-8">
        Vebsajt je postavljen i njime upravlja Preduzeće za proizvodnju i promet
        AKT d.o.o. Arilje, Put 22.avgusta bb (u daljem tekstu: AKT), a koristi
        se za predstavljanje Aktovih aktivnosti i proizvoda, prodaju proizvoda,
        i pružanje usluga njegovim korisnicima.
      </p>
      <p className="mt-8">
        Pristupanjem vebsajtu ili njegovim korišćenjem vi pristajete da
        postupate u skladu sa ovde navedenim odredbama. Akt zadržava pravo da
        promeni ovde navedene uslove korišćenja, u skladu sa svojom poslovnom
        politikom, odnosno izmenom ponude i / ili pozitivnih zakonskih propisa,
        bez posebnog obaveštavanja. Pristup vebsajtu posle takve promene
        smatraće se kao bezuslovno prihvatanje novih uslova korišćenja.
      </p>
      <p className="mt-8">
        Korisnici treba da imaju u vidu da se sadržaji vebsajta ne smeju
        koristiti, osim u skladu sa ovim odredbama. Ukoliko ne želite da budete
        obavezani ovim uslovima korišćenja, molimo da ne koristite vebsajt.
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Odricanje od odgovornosti
      </h5>
      <p className="mt-2">
        Bez obzira na tehničke nepreciznosti ili štamparske greške koje se mogu
        javiti u sadržajima vebsajta, AKT ulaže napore da podaci na vebsajtu
        budu tačni i precizni i stara se o ažuriranju vebsajta. AKT zadržava
        pravo izmene, ukidanja (privremenog ili trajnog) bilo kojeg sadržaja ili
        usluge na vebsajtu, bez obaveze prethodne najave. AKT ne preuzima
        odgovornost za bilo kakvu štetu koju korisnici ili treća lica pretrpe
        pristupom i pretragom vebsajta. AKT se ni u kom slučaju neće smatrati
        odgovornim za bilo kakvu štetu koju korisnik pretrpi zbog nemogućnosti
        da se izvrši bilo koja usluga koju nudi vebsajt. AKT može prekinuti u
        svakom trenutku pristup vebsajtu radi njegovog održavanja, obezbeđenja
        ili bilo kog drugog tehničkog razloga i iz navedenih razloga neće biti
        odgovoran za bilo kakvu štetu koju pretrpi korisnik. AKT može zabraniti
        pristup korisniku ako oceni da je način njegovog korišćenja vebsajta
        suprotan ovim dredbama, pozitivnom zakonodavstvu ili se njegovim
        postupanjem povređuju bilo koja prava Akta ili trećih lica.
      </p>
      <p className="mt-8">
        AKT ovim uslovima ne daje nikakve garancije za proizvode i/ili usluge
        koje se mogu kupiti preko vebsajta, uključujući i sve izražene ili
        implicitne trgovačke garancije, osim eksplicitno navedenih u okviru ovih
        uslova korišćenja. AKT nikog nije ovlastio da u njegovo ime i za njegov
        račun daje garancije bilo koje vrste, pa se Korisnik ne može osloniti na
        bilo koje izjave garancije, osim eksplicitno navedenih u okviru ovih
        uslova korišćenja.
      </p>
      <p className="mt-8">
        AKT je proizvođač proizvoda datih u okviru ponude i garancije koje su
        primenjive na proizvode koji se koriste uz usluge Akta su one koje su
        obezbeđene i date od strane proizvođača (Deklaracija o kvalitetu
        proizvoda I deklaracija za održavanje proizvoda).
      </p>
      <p className="mt-8">
        AKT nije odgovoran za bilo koju vrstu ili iznos naknade štete koja
        proizilazi u vezi sa korišćenjem proizvoda kupljenih putem korišćenja
        usluge shop-a na vebsajtu. Ova odredba o ograničenju odgovornosti se
        odnosi na štetu bilo koje vrste, uključujući direktnu, indirektnu,
        konsekventnu, slučajnu ili namernu, gubitak podataka, prihoda ili
        profita i slično, kao i bilo koju štetu nastalu Korisniku i / ili trećim
        licima.
      </p>
      <p className="mt-8">
        AKT naglašava da boja proizvoda može da bude različita od prirodne, u
        zavisnosti od tipa i kvaliteta monitora, kao i od postavke boja na
        monitoru. AKT ne snosi odgovornost ako boja kupljenog proizvoda nije
        identična onoj koja je reprodukovana na monitoru.
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Zaštita ličnih podataka
      </h5>
      <p className="mt-2">
        AKT postupa sa ličnim podacima u skladu sa važećim zakonskim propisima i
        preduzeće sve raspoložive mere u cilju zaštite podataka o Korisniku, kao
        i o podacima o izvršenoj kupovini proizvoda i/ili usluga. Navedeni
        podaci o Korisniku se neće koristiti u cilju dostave reklamnih
        obaveštenja svojih i/ili trećih lica, osim u slučaju da je Korisnik dao
        svoju izričitu suglasnost za prethodno navedeno.
      </p>
      <p className="font-semibold text-md mb-[1rem] mt-[1.6rem]">
        Zaštićeni znakovi
      </p>
      <p className="mt-2">
        Sve slike, ilustracije, žigovi, fotografije, grafizmi koje se nalaze na
        vebsajtu su u vlasništvu AKT ili trećih lica koji su Aktu dali licencu
        ili pravo za njihovo korišćenje. Nije dozvoljena bilo kakva potpuna ili
        delimična reprodukcija, distribucija ili izmena navedenog sadržaja sa
        Vebsajta i svako postupanje suprotno navedenom predstavlja kršenje
        zakona.
      </p>
      <p className="font-semibold text-md mb-[1rem] mt-[1.6rem]">
        Kupovina proizvoda
      </p>
      <p className="mt-2">
        Prezentacija proizvoda na sajtu stefantekstil.rs predstavlja ponudu za
        kupovinu proizvoda. Proizvodi koji se prodaju putem vebsajta poseduju
        svojstva potrebna za redovnu upotrebu te vrste proizvoda u skladu sa
        namenom i deklaracijom.
      </p>
      <p className="mt-8">
        Prodaja preko vebsajta (trenutno) važi isključivo za teritoriju
        Republike Srbije.
      </p>
      <p className="mt-8">
        U cilju posebne zaštite maloletnika, pravo kupovine preko vebsajta imaju
        lica starija od 18 godina.
      </p>
      <p className="mt-8">
        Prilikom prihvatanja Opštih uslova korišćenja na poslednjem koraku
        postupka naručivanja, vi ste izdali obavezujući nalog za kupovinu i
        obavezali ste se da izvršite plaćanje.
      </p>
      <p className="font-semibold text-md mb-[1rem] mt-[1.6rem]">
        Ugovorna strana sa kojom zaključujete ugovor prilikom kupovine preko
        vebsajta je:
      </p>
      <div>
        <p className="font-medium">
          Preduzeće za proizvodnju i promet AKT doo Arilje
        </p>
        <p className="font-medium">Put 22. avgusta bb, Grdovići, Arilje</p>
        <p className="font-medium">31230 Arilje</p>
        <p>MB 21748854</p>
        <p>PIB 112833547</p>
        <p>Tel/Fax: 031/3894-222</p>
        <p>e-mejl: webshop@stefantekstil.rs</p>
      </div>
      <p className="mt-8">
        Stupanjem u ugovorni odnos sa Aktom ostvarujete potrošačka prava
        predviđena Zakonom o zaštiti potrošača („Sl. glasnik RS“ br.62/2014 i
        6/2016 – dr. zakon) koja uključuju i pravo na vansudsko rešavanje
        eventualnog spora povodom ugovora o kupovini robe.
      </p>
      <h5 className="font-semibold text-lg mb-[1rem] mt-[1.6rem]">
        Cene i troškovi dostave
      </h5>
      <p className="mt-2">
        Cene proizvoda i usluga izražene su u dinarima i iskazane su u bruto
        iznosu (sa PDV-om) uz svaki artikal. Cene svih proizvoda i usluga su
        podložne promeni do momenta potvrde kupovine.
      </p>
      <p className="mt-8">
        Troškovi dostave putem usluge kurirske službe se naplaćuju Korisniku u
        iznosu od 450 dinara za porudžbine ispod 5000 dinara. Troškovi dostave
        za iznose iznad 5000 dinara se ne naplaćuju.
      </p>
      <p className="mt-8">
        U postupku naručivanja, prilikom izbora svakog novog artikla, program će
        vam na odgovarajući način omogućiti uvid u trenutni saldo. Odabrane
        proizvode uvek možete pogledati, dodavati i uklanjati iz svoje korpe.
        Potvrdom kupovine dajete svoju izričitu suglasnost za plaćanje troškova
        dostave.
      </p>
      <p className="mt-8">
        Ukoliko Korisnik želi da poništi svoju narudžbinu, neophodno je da se
        javi našoj službi prodaje na telefon 031/3894-222 i usmeno dostavi svoje
        podatke, kao i kod-broj narudžbine.
      </p>
      <h5
        className="font-semibold text-lg mb-[1rem] mt-[1.6rem]"
        id={`nacin-placanja`}
      >
        Način plaćanja
      </h5>
      <p className="mt-2">Korisnik naručenu robu i usluge može platiti:</p>
      <div className="ml-10">
        <ul className="list-disc mt-5">
          <li>uplatom na tekući račun,</li>
          <li>pouzećem pri preuzimanju robe od kurirske službe,</li>
          <li>platnim karticama.</li>
        </ul>
      </div>
    </div>
  );
};

export default Uslovi;
