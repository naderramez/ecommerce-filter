import React, { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from "react";
import { FILTER_OPTIONS, TFilterOption } from "../../constants/filterOptions";
import Filter from "../Filter";

import "./filters.scss";
import WrappedAppliedFilter from "./WrappedAppliedFilter";

const Filters: FC = () => {
  const {
    size: sizeInitialOptions,
    color: colorInitialOptions,
    room: roomInitialOptions,
    price: priceInitialOptions,
    material: materialInitialOptions,
    construction: constructionInitialOptions,
    style: styleInitialOptions,
  } = FILTER_OPTIONS;

  const [sizeOptions, setSizeOptions] = useState<TFilterOption[]>(sizeInitialOptions);
  const [colorOptions, setColorOptions] = useState<TFilterOption[]>(colorInitialOptions);
  const [roomOptions, setRoomOptions] = useState<TFilterOption[]>(roomInitialOptions);
  const [priceOptions, setPriceOptions] = useState<TFilterOption[]>(priceInitialOptions);
  const [materialOptions, setMaterialOptions] = useState<TFilterOption[]>(materialInitialOptions);
  const [constructionOptions, setConstructionOptions] = useState<TFilterOption[]>(constructionInitialOptions);
  const [styleOptions, setStyleOptions] = useState<TFilterOption[]>(styleInitialOptions);

  const clearAllFilters = () => {
    setSizeOptions(sizeInitialOptions);
    setColorOptions(colorInitialOptions);
    setRoomOptions(roomInitialOptions);
    setPriceOptions(priceInitialOptions);
    setMaterialOptions(materialInitialOptions);
    setConstructionOptions(constructionInitialOptions);
    setStyleOptions(styleInitialOptions);
  };

  const hasSelectedOption = useCallback((options: TFilterOption[]): boolean => {
    let isFilterApplied = false;
    options.forEach((option) => {
      if (option.selected === true) isFilterApplied = true;
    });
    return isFilterApplied;
  }, []);

  const isFilterApplied = useMemo(() => {
    console.log("isFilterApplied memo");

    if (hasSelectedOption(sizeOptions)) return true;
    if (hasSelectedOption(colorOptions)) return true;
    if (hasSelectedOption(roomOptions)) return true;
    if (hasSelectedOption(priceOptions)) return true;
    if (hasSelectedOption(materialOptions)) return true;
    if (hasSelectedOption(constructionOptions)) return true;
    if (hasSelectedOption(styleOptions)) return true;
    else return false;
  }, [sizeOptions, colorOptions, roomOptions, priceOptions, materialOptions, constructionOptions, styleOptions, hasSelectedOption]);

  const clearFilters = (initialOptions: TFilterOption[], setter: Dispatch<SetStateAction<TFilterOption[]>>) => {
    setter(initialOptions);
  };

  const applyFilters = (options: TFilterOption[], setter: Dispatch<SetStateAction<TFilterOption[]>>) => {
    setter(options);
  };

  return (
    <div>
      <div className="filtersContainer">
        <Filter
          id="sizeFilter"
          label="Size"
          options={sizeOptions}
          applyFilters={(options) => applyFilters(options, setSizeOptions)}
          clearFilters={() => clearFilters(sizeInitialOptions, setSizeOptions)}
        />
        <Filter
          id="colorFilter"
          label="Color"
          options={colorOptions}
          applyFilters={(options) => applyFilters(options, setColorOptions)}
          clearFilters={() => clearFilters(colorInitialOptions, setColorOptions)}
        />
        <Filter
          id="roomFilter"
          label="Room"
          options={roomOptions}
          applyFilters={(options) => applyFilters(options, setRoomOptions)}
          clearFilters={() => clearFilters(roomInitialOptions, setRoomOptions)}
        />
        <Filter
          id="priceFilter"
          label="Price"
          options={priceOptions}
          applyFilters={(options) => applyFilters(options, setPriceOptions)}
          clearFilters={() => clearFilters(priceInitialOptions, setPriceOptions)}
        />
        <Filter
          id="materialFilter"
          label="Material"
          options={materialOptions}
          applyFilters={(options) => applyFilters(options, setMaterialOptions)}
          clearFilters={() => clearFilters(materialInitialOptions, setMaterialOptions)}
        />
        <Filter
          id="constructionFilter"
          label="Construction"
          options={constructionOptions}
          applyFilters={(options) => applyFilters(options, setConstructionOptions)}
          clearFilters={() => clearFilters(constructionInitialOptions, setConstructionOptions)}
        />
        <Filter
          id="styleFilter"
          label="Style"
          options={styleOptions}
          applyFilters={(options) => applyFilters(options, setStyleOptions)}
          clearFilters={() => clearFilters(styleInitialOptions, setStyleOptions)}
        />
      </div>

      <div className="appliedFiltersContainer">
        <span>Applied Filters:</span>
        <WrappedAppliedFilter options={sizeOptions} setOptions={setSizeOptions} />
        <WrappedAppliedFilter options={colorOptions} setOptions={setColorOptions} />
        <WrappedAppliedFilter options={roomOptions} setOptions={setRoomOptions} />
        <WrappedAppliedFilter options={priceOptions} setOptions={setPriceOptions} />
        <WrappedAppliedFilter options={materialOptions} setOptions={setMaterialOptions} />
        <WrappedAppliedFilter options={constructionOptions} setOptions={setConstructionOptions} />
        <WrappedAppliedFilter options={styleOptions} setOptions={setStyleOptions} />
        {isFilterApplied === true && (
          <button className="btn" onClick={clearAllFilters}>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
