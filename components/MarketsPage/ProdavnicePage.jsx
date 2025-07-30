"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

const prodavnice = [
  {
    grad: "Arilje",
    lokacije: [
      {
        adresa: "Put 22. avgusta bb",
        telefon: "031 3894222",
        radnoVreme: {
          ponPet: "8-20",
          subota: "9-15",
          nedelja: "zatvoreno",
        },
      },
    ],
  },
  {
    grad: "Beograd",
    lokacije: [
      {
        adresa: "Nušićeva br. 19",
        telefon: "063 371 942",
        radnoVreme: {
          ponPet: "9-20",
          subota: "9-16",
          nedelja: "zatvoreno",
        },
      },
      {
        adresa: "Smederevski put 39a",
        telefon: "063 850 89 63",
        radnoVreme: {
          ponPet: "8-20",
          subota: "9-19",
          nedelja: "zatvoreno",
        },
      },
    ],
  },
  {
    grad: "Novi Sad",
    lokacije: [
      {
        adresa: "Bulevar Evrope br. 2",
        telefon: "062 269 803",
        radnoVreme: {
          ponPet: "8-20",
          subota: "9-16",
          nedelja: "zatvoreno",
        },
      },
      {
        adresa: "Pavla Papa br. 22",
        telefon: "063 371 319",
        radnoVreme: {
          ponPet: "8-20",
          subota: "8-16",
          nedelja: "zatvoreno",
        },
      },
    ],
  },
];

const ProdavnicePage = () => {
  return (
    <div className="w-[85%] mx-auto max-lg:w-[95%]">
      <div className="text-xl font-normal text-white bg-croonus-1 md:w-1/4 pl-5 py-1 mt-4">
        <h1>Prodavnice</h1>
      </div>
      <div className="mt-12">
        {prodavnice.map(({ grad, lokacije }, index) => (
          <div
            key={grad}
            className="grid grid-cols-[100px_2fr] md:grid-cols-[200px_2fr] gap-6 lg:gap-12 items-start"
          >
            <div
              className={`text-lg font-semibold border-r h-full  ${index === 0 ? "pt-0" : "pt-10"}`}
            >
              {grad}
            </div>
            <div
              className={`grid  grid-cols-1 sm:grid-cols-2  ${index === 0 ? "pt-0" : "pt-10"}`}
            >
              {lokacije.map(({ adresa, telefon, radnoVreme }, index) => (
                <div key={index} className={`mb-4`}>
                  <p>{adresa}</p>
                  <a href={`tel:${telefon}`}>{telefon}</a>
                  <p className="font-bold">radno vreme:</p>
                  <p>ponedeljak - petak: {radnoVreme.ponPet}</p>
                  <p>subota: {radnoVreme.subota}</p>
                  <p>nedeljom {radnoVreme.nedelja}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <Map />
      </div>
    </div>
  );
};

export default ProdavnicePage;
