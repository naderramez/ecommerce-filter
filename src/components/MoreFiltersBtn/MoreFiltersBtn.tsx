import { Popover } from "@mui/material";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { TFilterOption } from "../../constants/filterOptions";
import { immutableUpdate } from "../../utils";
import { FilterProps, Props, TDraft, TFilterState } from "./MoreFilterBtn.types";

import "../Filter/filter.scss";
import FilterOptionsBtns from "./FilterOptionsBtns";

const MoreFiltersBtn: FC<Props> = ({ filters }) => {
  const initialFiltersState: TFilterState[] = useMemo(() => {
    return filters.map((filter) => ({
      id: filter.id,
      expanded: false,
    }));
  }, [filters]);

  const btnRef: any = useRef();
  const [filterIsActive, setFilterIsActive] = useState<boolean>(false);
  const [filtersDraftSelection, setFiltersDraftSelection] = useState<TDraft[]>([]);
  const [filtersState, setFiltersState] = useState<TFilterState[]>(initialFiltersState);

  const getSelectedFilters = (): TDraft[] => {
    const filtersWithSelectedOptions = filters.filter((filter) => filter.options.some((option) => option.selected === true));
    const selectedFilters: TDraft[] = filtersWithSelectedOptions.map((filter) => ({
      id: filter.id,
      draft: filter.options.filter((option) => option.selected === true),
    }));
    return selectedFilters;
  };

  const onClearFilters = (id: string) => {
    const filter = filters.find((fltr) => fltr.id === id);
    if (filter?.clearFilters) filter.clearFilters();
    const newFiltersDraftSelection = immutableUpdate(filtersDraftSelection, (draft) => {
      const filterDraft = draft.find((item) => item.id === id);
      if (filterDraft) {
        filterDraft.draft = [];
      }
    });
    setFiltersDraftSelection(newFiltersDraftSelection);
  };

  const onApplyFilters = (filter: FilterProps) => {
    const { id, options, applyFilters } = filter;
    const draftSelection = filtersDraftSelection.find((filterDraft) => filterDraft.id === id)?.draft;
    const newOptions = immutableUpdate(options, (optionsDraft) => {
      optionsDraft.forEach((option) => {
        const optionIsSelected = draftSelection?.some((draftOption) => draftOption.id === option.id);
        if (optionIsSelected) option.selected = true;
        else option.selected = false;
      });
    });
    applyFilters(newOptions);
  };

  const getSelectedOptions = useCallback((): TFilterOption[] => {
    const selectedOptions: TFilterOption[] = [];
    filters.forEach((filter) => {
      filter.options.forEach((option) => {
        if (option.selected === true) selectedOptions.push(option);
      });
    });
    return selectedOptions;
  }, [filters]);

  const selectedOptions = useMemo(getSelectedOptions, [getSelectedOptions]);

  const selectedClass = selectedOptions.length > 0 ? "outline" : "";

  const toggleFilterIsActive = () => {
    setFilterIsActive((prevState) => {
      if (prevState === false) {
        const selectedFilters = getSelectedFilters();
        setFiltersDraftSelection(selectedFilters);
      }
      return !prevState;
    });
  };

  const closeFilter = () => {
    setFilterIsActive(false);
    const selectedFilters = getSelectedFilters();
    setFiltersDraftSelection(selectedFilters);
  };

  const onToggleExpansion = (filterID: string) => {
    const targetFilter = filtersState.find((filter) => filter.id === filterID);
    if (targetFilter) {
      const newFiltersState = immutableUpdate(filtersState, (filtersStateDraft) => {
        const filterToUpdate = filtersStateDraft.find((filter) => filter.id === targetFilter.id);
        if (filterToUpdate) filterToUpdate.expanded = !filterToUpdate.expanded;
      });
      setFiltersState(newFiltersState);
    }
  };

  return (
    <div>
      <button className={`btn ${selectedClass}`} ref={btnRef} aria-describedby="moreFiltersBtn" onClick={toggleFilterIsActive}>
        More Filters
      </button>
      <Popover
        id="moreFiltersBtn"
        open={filterIsActive}
        anchorEl={btnRef.current}
        container={btnRef.current}
        onClose={closeFilter}
        anchorPosition={{ left: 80, top: 150 }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ horizontal: "center", vertical: -10 }}
      >
        <div className="popup-container" style={{ position: "relative" }}>
          {filters.map((filter) => {
            const filterState = filtersState.find((fltr) => fltr.id === filter.id);
            const isExpanded = filterState ? filterState.expanded : false;
            return (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <h3>{filter.label}</h3>
                  <h3 onClick={() => onToggleExpansion(filter.id)}>{isExpanded ? "-" : "+"}</h3>
                </div>
                <div className="options-container" style={{ display: isExpanded ? "block" : "none" }}>
                  <FilterOptionsBtns
                    {...filter}
                    filtersDraftSelection={filtersDraftSelection}
                    setFiltersDraftSelection={setFiltersDraftSelection}
                  />
                </div>

                <div className="action-btns-container" style={{ display: isExpanded ? "flex" : "none" }}>
                  <button className="btn" onClick={() => onClearFilters(filter.id)}>
                    Cancel
                  </button>
                  <button className="btn" onClick={() => onApplyFilters(filter)}>
                    Apply
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </Popover>
    </div>
  );
};

export default MoreFiltersBtn;
