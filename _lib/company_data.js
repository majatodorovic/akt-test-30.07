export const company_data = {
  default: {
    name: process.env["NAME"],
    telephone: process.env["TELEPHONE"],
    email: process.env["EMAIL"],
    street_address: process.env["STREET_ADDRESS"],
    city: process.env["CITY"],
    postal_code: process.env["POSTAL_CODE"],
    address_country: process.env["ADDRESS_COUNTRY"],
  },
  stores: [
    {
      name: "Stefan Tekstil - Beograd",
      telephone: "063 / 574 498",
      email: "veleprodaja@stefantekstil.rs",
      street_address: "Smederevski put 39a",
      city: "Beograd",
      postal_code: "11000",
      address_country: "RS",
    },
    {
      name: "Stefan Tekstil - Novi Sad",
      telephone: "021 / 6337 910",
      email: "nsstefan@stefantekstil.rs",
      street_address: "Ćirila i Metodija 42A",
      city: "Novi Sad",
      postal_code: "21000",
      address_country: "RS",
    },
  ],
};
