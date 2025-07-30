import Filter from "../Filter/Filter";
import { useEffect, useState } from "react";
const Filters = ({
  filtersMap,
  selectedFilters,
  setSelectedFilters,
  categoryData,
  setSort,
  setChangeFilters,
  sort,
  filters,
  sortKeys,
  setLastSelectedFilterKey,
  setPage = () => {},
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const handleClick = (filter) => {
    setActiveFilter(filter);
  };
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    setActiveFilters(selectedFilters);
  }, [selectedFilters]);

  const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <>
      <div className={`relative ${!filtersOpen && "overflow-hidden"}`}>
        <div
          className={`relative z-20 max-lg:hidden min-w-[125px] w-fit flex items-center gap-10 border px-3 py-2 cursor-pointer hover:border-black`}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <span className={`text-[0.9rem]`}>FILTERI</span>
          {!filtersOpen && <i className={`fa fa-solid fa-chevron-right`}></i>}
        </div>
        <div
          className={
            filtersOpen
              ? `visible opacity-100 absolute z-10 top-0  left-[125px] right-0 flex items-center translate-x-0 transition-all duration-500`
              : `invisible opacity-0 -translate-x-[150%] transition-all duration-[1000ms] absolute top-0 -z-[50]  left-[125px] right-0 flex items-center`
          }
        >
          {(filters ?? []).map((filter, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                className={`relative max-lg:hidden w-[calc(100vw/9)]`}
                key={index}
              >
                <div
                  className="col-span-1 relative select-none cursor-pointer"
                  key={filter?.id}
                  onClick={() => {
                    setOpenIndex(isOpen ? null : index);
                  }}
                >
                  <div
                    className={` border-t border-t-transparent hover:border-t hover:border-t-croonus-4 relative py-2`}
                  >
                    <p className="uppercase text-[0.9rem] text-center line-clamp-1">
                      {filter?.attribute?.name}
                    </p>
                    <i className="fa-solid absolute right-0 top-2 fa-chevron-down text-base ml-auto mr-2"></i>
                  </div>
                </div>
                {isOpen && (
                  <div
                    className={`row-start-2 z-[20] bg-white border-l border-r border-b border-t border-t-white absolute w-full col-start-${
                      index + 1
                    }`}
                  >
                    <div className="w-[90%] uppercase mx-auto pb-3.5">
                      <Filter
                        setPage={setPage}
                        filter={filter}
                        setChangeFilters={setChangeFilters}
                        setLastSelectedFilterKey={setLastSelectedFilterKey}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div
            className="max-lg:hidden row-start-1 hover:border-black cursor-pointer border py-2 relative flex justify-center items-center gap-3 col-span-1 w-fit px-5"
            onClick={() => {
              setSelectedFilters([]);

              setActiveFilters([]);
              setFiltersOpen(false);
            }}
          >
            <p className="uppercase text-[0.9rem]">PONIŠTI I ZATVORI</p>
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </div>
        </div>
      </div>
      <div className="grid max-lg:gap-x-5 2xl:grid-cols-5 3xl:grid-cols-6 grid-cols-2">
        <div className="col-span-2 max-lg:hidden mt-6 flex justify-end gap-5 items-center 2xl:col-start-5 3xl:col-start-5">
          <span className="uppercase font-normal text-[0.9rem]">
            Sortiraj po
          </span>
          <select
            name="sort"
            id="sort"
            className="border-[#f2f2f2] py-3 uppercase text-xs select-none focus:ring-0 focus:border-croonus-1 focus:outline-none"
            onChange={(e) => {
              setSort({
                field: e.target.value.split("_")[0],
                direction: e.target.value.split("_")[1],
              });
            }}
            value={sort ? `${sort.field}_${sort.direction}` : "none"}
          >
            <option value="null">Izaberite</option>
            {Object.entries(sortKeys).map((item, index) => (
              <option className="text-xs" value={item[0]} key={index}>
                {item[1].label}
              </option>
            ))}
          </select>
        </div>
        <div
          className="col-span-1 lg:hidden text-center text-white bg-croonus-1"
          onClick={() => setOpenModal(true)}
        >
          <p className="uppercase text-base font-medium py-3.5 max-md:text-xs">
            Filteri
          </p>
        </div>
        <select
          name="sort"
          id="sort"
          className="col-span-1 uppercase focus:ring-0 lg:hidden text-center text-white bg-croonus-1 relative focus:border-croonus-1 focus:outline-none max-md:text-xs"
          onChange={(e) => {
            setSort({
              field: e.target.value.split("_")[0],
              direction: e.target.value.split("_")[1],
            });
          }}
          value={(sort && `${sort.field}_${sort.direction}`) || "none"}
        >
          <option value="none">Sortiraj</option>
          {Object.entries(sortKeys).map((item, index) => (
            <option className="text-xs uppercase" value={item[0]} key={index}>
              {item[1].label}
            </option>
          ))}
        </select>
        <div
          className={
            openModal
              ? `fixed top-0 justify-between flex flex-col translate-x-0 transition-all duration-[550ms] left-0 w-screen h-[100dvh] bg-white z-[200]`
              : `fixed top-0 justify-between flex flex-col -translate-x-full transition-all duration-[550ms] left-0 w-screen h-[100dvh] bg-white z-[200]`
          }
        >
          <div className="flex flex-col h-full justify-between">
            <div className="w-[95%] relative mt-5 mx-auto ">
              <p className="uppercase text-xl pb-4 font-semibold text-center">
                Odaberite filtere
              </p>
              {activeFilters?.map((item) => {
                item?.value?.selected?.map((item2, index) => {
                  return <p key={index}>{item2}</p>;
                });
              })}
              <i
                className="absolute fa-solid fa-x right-10 top-1"
                onClick={() => setOpenModal(false)}
              ></i>

              {(filters ?? []).map((filter, index) => {
                const isOpen = openIndex === index;
                const isActive = filter === activeFilter;

                return (
                  <div key={index}>
                    <div
                      className={`relative border-t border-b px-5 py-5 ${
                        isActive ? "bg-croonus-5" : ""
                      }`}
                      onClick={() => {
                        handleClick(filter);

                        setOpenIndex(isOpen ? null : index);
                      }}
                    >
                      <summary
                        className={`uppercase font-medium text-lg flex items-center`}
                      >
                        <i
                          className={
                            isOpen
                              ? `fa-solid fa-play -rotate-90 text-sm`
                              : `fa-solid fa-play rotate-90 text-sm`
                          }
                        ></i>
                        <p className="ml-5">{filter?.name}</p>
                      </summary>
                    </div>
                    {isOpen && (
                      <div
                        className={`row-start-2 z-[20] bg-white mt-5 border-t-white  w-full col-start-${
                          index + 1
                        }`}
                      >
                        <div className="w-[85%] uppercase mx-auto">
                          <Filter
                            setChangeFilters={setChangeFilters}
                            filter={filter}
                            selectedFilters={selectedFilters}
                            setLastSelectedFilterKey={setLastSelectedFilterKey}
                            setSelectedFilters={setSelectedFilters}
                            setActiveFilters={setActiveFilters}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div>
              <button
                className="py-3.5  w-full text-white text-center bg-croonus-4 uppercase font-medium"
                onClick={() => setOpenModal(false)}
              >
                Prikaži rezultat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
