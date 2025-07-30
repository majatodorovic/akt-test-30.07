"use client";

import {
  useProductDeclaration,
  useProductSpecification,
} from "@/hooks/akt.hooks";
import React, { useState } from "react";
import Image from "next/image";

const Specifications = ({ id }) => {
  const { data: specification } = useProductSpecification({ slug: id });
  const { data: declaration } = useProductDeclaration({ slug: id });

  const [activeTab, setActiveTab] = useState(2);

  return (
    <div
      className={`specifications-component flex mt-6 ml-0 md:mt-8 flex-col overflow-y-auto max-w-[390px]`}
    >
      <hr className="mb-0" />

      {specification?.length > 0 &&
        specification?.map((item) => {
          return item.groups.map((group, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() =>
                    setActiveTab(
                      activeTab === group.group.id ? null : group.group.id,
                    )
                  }
                  className={`pl-3 py-3 cursor-pointer flex items-center justify-between`}
                >
                  <span className={`font-light text-[20px]`}>
                    {group.group.name}
                  </span>
                  <i
                    className={`fa fa-solid pr-2 transition-all duration-500 fa-chevron-${
                      activeTab === group.group.id ? "up" : "down"
                    }`}
                  />
                </div>
                {activeTab === group.group.id && (
                  <div
                    className={`py-2 pl-6 pr-3 max-h-[150px] overflow-y-auto customScroll`}
                  >
                    {group.attributes.map((attr) =>
                      attr.values.map((value) =>
                        value?.image ? (
                          <Image
                            src={value.image}
                            width={24}
                            height={24}
                            style={{
                              objectFit: "cover",
                            }}
                            className="mr-2"
                            alt={value.image}
                          />
                        ) : (
                          <p
                            key={value.id}
                            className={`font-light flex align-middle mb-1`}
                          >
                            {value?.name}
                          </p>
                        ),
                      ),
                    )}
                  </div>
                )}
              </div>
            );
          });
        })}

      {declaration && declaration.name && (
        <div>
          <div
            onClick={() =>
              setActiveTab(activeTab === "declaration" ? null : "declaration")
            }
            className={`pl-3 ${
              activeTab === "declaration" && ""
            } py-3 cursor-pointer flex items-center font-light justify-between `}
          >
            <p className="font-light text-[20px]">Deklaracija</p>
            <i
              className={`fa fa-solid pr-2 transition-all duration-500 fa-chevron-${
                activeTab === "declaration" ? "up" : "down"
              }`}
            />
          </div>
          {activeTab === "declaration" && (
            <div
              className={`py-2 pl-6 pr-3 max-h-[150px] overflow-y-auto customScroll`}
            >
              <p className={``}>
                {declaration?.manufacture_name && (
                  <>
                    {" "}
                    <span className={`font-bold`}>Proizvođač: </span>
                    {declaration?.manufacture_name}
                  </>
                )}
              </p>
              <p className={``}>
                {declaration?.country_name && (
                  <>
                    {" "}
                    <span className={`font-bold`}>Zemlja porekla:</span>{" "}
                    {declaration?.country_name}
                  </>
                )}
              </p>
              <p className={``}>
                {declaration?.name && (
                  <>
                    {" "}
                    <span className={`font-bold`}>Naziv:</span>{" "}
                    {declaration?.name}
                  </>
                )}
              </p>
              <p className={``}>
                {declaration?.year && (
                  <>
                    <span className={`font-bold`}>Godina proizvodnje:</span>{" "}
                    {declaration?.year}
                  </>
                )}
              </p>
              <p className={``}>
                {declaration?.importer_name && (
                  <>
                    <span className={`font-bold`}>Uvoznik:</span>{" "}
                    {declaration?.importer_name}
                  </>
                )}
              </p>
              <p className={``}>
                {declaration?.note && (
                  <>
                    <span className={`font-bold`}>Procenat skupljanja:</span>{" "}
                    <p>{declaration?.note}</p>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Specifications;
