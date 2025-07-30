export const getFilterObject = (filterKey) => {
  if (!filterKey) return { filterArr: [], filterObject: {} };

  const selectedFilters_tmp = (filterKey ?? "::")
    ?.split("::")
    ?.map((filter) => {
      const splitted = filter ? filter.split("=") : ["", undefined];
      const [column, selected] = splitted;
      const selectedValues = selected ? selected.split("_") : undefined;

      return {
        column,
        value: {
          selected: column?.includes("cena")
            ? [Number(selectedValues[0]), Number(selectedValues[1])]
            : selectedValues,
        },
      };
    });

  const filters = selectedFilters_tmp?.every((column) => column?.column !== "")
    ? selectedFilters_tmp
    : [];

  return { filterArr: selectedFilters_tmp, filterObject: filters };
};

export const getSortObject = (sort) => {
  const sort_tmp = (sort ?? "_")?.split("_");
  const sortObj = {
    field: sort_tmp[0],
    direction: sort_tmp[1],
  };
  return sortObj;
};
