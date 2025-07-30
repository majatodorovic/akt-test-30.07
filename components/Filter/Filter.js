"use client";
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { useRouter } from "next/navigation";
import classes from "./Filter.module.css";
import Link from "next/link";

const Filter = ({
  filter,
  selectedFilters,
  setSelectedFilters,
  categoryData,
  changeFilters,
  setChangeFilters,
  changeFilterOptions,
  setActiveFilters,
  setLastSelectedFilterKey,
  setPage,
}) => {
  const changeHandler = (data) => {
    let tmp = [...selectedFilters];
    const filtered = tmp.filter((item) => item.column === data.column);
    if (data?.value.selected?.length === 0) {
      if (filtered?.length > 0) {
        const index = tmp.indexOf(filtered[0]);
        tmp.splice(index, 1);
      }
    } else {
      if (filtered?.length > 0) {
        tmp = tmp.map((item) => (item.column === data.column ? data : item));
      } else {
        tmp.push(data);
      }
    }
    setSelectedFilters([...tmp]);
    setLastSelectedFilterKey(data?.column);
    setPage(1);
    setChangeFilters(true);
    // setActiveFilters([...tmp]);
  };

  let selected = selectedFilters.filter(
    (item) => item.column === filter.key,
  )[0];
  selected = selected ? selected.value.selected : [];

  switch (filter.type) {
    case "range":
      return (
        <FilterRange
          filter={filter}
          onChange={changeHandler}
          selected={selected}
        />
      );
    case "in":
      return (
        <FilterIn
          filter={filter}
          onChange={changeHandler}
          selected={selected}
        />
      );
    case "within_tree":
      return <FilterWithinTree filter={filter} />;
  }
};

export default Filter;

const FilterIn = ({
  filter,
  onChange = () => {},
  selected,
  changeFilterOptions,
}) => {
  const [filterNumber, setFilterNumber] = useState(3);
  const numFiltersLoaded = Math.min(
    filterNumber,
    filter?.params?.items?.length,
  );
  const allFiltersLoaded = numFiltersLoaded === filter?.params?.items?.length;
  const handleFilterNumber = () => {
    setFilterNumber(filterNumber + 3);
  };
  const checkedChanged = ({ target }) => {
    if (target.checked) {
      if (!selected.includes(target.value)) {
        const tmp = [...selected, target.value];

        onChange({
          column: filter?.params?.use_field
            ? filter[filter?.params?.use_field]
            : filter.key,
          value: { selected: tmp },
        });
      }
    } else {
      const tmp = [...selected];
      var index = tmp.indexOf(target.value);
      if (index !== -1) {
        tmp.splice(index, 1);
      }

      onChange({
        column: filter.key,
        value: { selected: tmp },
      });
    }
  };
  return (
    <>
      {(filter?.params?.items ?? []).slice(0, filterNumber).map((item) => (
        <div
          key={item.id}
          className="mt-2 flex flex-row items-center gap-2 pl-4 text-[0.775rem] hover:underline cursor-pointer"
        >
          <input
            type="checkbox"
            className="h-4 w-4 rounded-sm bg-transparent   text-croonus-1 focus:ring-0 hover:underline cursor-pointer"
            name={item.label}
            checked={selected.includes(
              filter?.params?.use_field
                ? item[filter?.params?.use_field]
                : item.key,
            )}
            onChange={checkedChanged}
            value={
              filter?.params?.use_field
                ? item[filter?.params?.use_field]
                : item.key
            }
            id={"chbx-" + item.id}
          />
          <label
            className="text-[0.875rem] leading-[1.625rem] hover:underline cursor-pointer"
            htmlFor={"chbx-" + item.id}
          >
            {item.label}
          </label>
        </div>
      ))}
      {allFiltersLoaded ? null : (
        <div className="mt-[0.813rem] flex cursor-pointer items-center gap-1">
          <span onClick={handleFilterNumber} className="text-[0.75rem] ">
            Prikaži više
          </span>
          <i className="fa-solid fa-chevron-down text-xs"></i>{" "}
        </div>
      )}
    </>
  );
};

const FilterRange = ({ filter, onChange, selected }) => {
  const [selectedValue, setSelectedValue] = useState(
    selected.length === 2
      ? selected
      : [Number(filter.params.min), Number(filter.params.max)],
  );
  const onRangeChange = (data, value) => {
    onChange({
      column: filter?.params?.use_field
        ? filter[filter?.params?.use_field]
        : filter.key,
      value: { selected: value },
    });
  };

  useEffect(() => {
    if (selected?.length !== 2)
      setSelectedValue([Number(filter.params.min), Number(filter.params.max)]);
  }, [selected, filter.params]);
  return (
    <>
      <div className={classes.slidecontainer}>
        <Slider
          sx={{
            width: "100%",
            "& .MuiSlider-thumb": {
              color: "black",
            },
            "& .MuiSlider-track": {
              color: "black",
            },
            "& .MuiSlider-rail": {
              color: "black",
            },
            "& .MuiSlider-active": {
              color: "black",
            },
          }}
          value={selectedValue}
          onChange={(e) => {
            setSelectedValue(e.target.value);
          }}
          onChangeCommitted={onRangeChange}
          step={500}
          valueLabelDisplay="auto"
          min={Number(filter.params.min)}
          max={Number(filter.params.max)}
        />
      </div>
      <div className={classes.valueHolder}>
        <span>od: {selectedValue[0]}</span>
        <span> do: {selectedValue[1]}</span>
      </div>
    </>
  );
};

const FilterWithinTree = ({ filter }) => {
  const router = useRouter();
  const [filterNumber, setFilterNumber] = useState(3);
  const numFiltersLoaded = Math.min(filterNumber, filter?.params?.items.length);
  const allFiltersLoaded = numFiltersLoaded === filter?.params?.items.length;
  const handleFilterNumber = () => {
    setFilterNumber(filterNumber + 3);
  };
  return (
    <>
      {(filter?.params?.items ?? []).slice(0, filterNumber).map((item) => (
        <div
          key={item.id}
          className="mt-2 flex flex-row items-center gap-2 pl-4 text-[0.775rem]"
        >
          <Link
            className="text-[0.875rem] leading-[1.625rem] hover:underline"
            htmlFor={"chbx-" + item.id}
            href={`/${item?.link?.link_path}`}
          >
            {item.label}
          </Link>
        </div>
      ))}
      {allFiltersLoaded ? null : (
        <div className="mt-[0.813rem] flex cursor-pointer items-center gap-1">
          <span onClick={handleFilterNumber} className="text-[0.75rem] ">
            Prikaži više
          </span>
          <i className="fa-solid fa-chevron-down text-xs"></i>{" "}
        </div>
      )}
    </>
  );
};
