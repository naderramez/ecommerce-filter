import { Popover } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { TFilterOption } from "../../constants/filterOptions";
import { deepCopy, immutableUpdate } from "../../utils";

import "./filter.scss";

interface Props {
  id: string;
  label: string;
  options: TFilterOption[];
  applyFilters: (options: TFilterOption[]) => void;
  clearFilters?: Function;
}

const Filter: FC<Props> = ({ id, label = "button", options, clearFilters, applyFilters }) => {
  const btnRef: any = useRef();
  const [filterIsActive, setFilterIsActive] = useState<boolean>(false);

  const selectedOptions = options.filter((option) => option.selected === true);
  const [draftSelection, setDraftSelection] = useState<TFilterOption[]>([]);

  const onOptionClick = (option: TFilterOption) => {
    const newDraftSelection = immutableUpdate(draftSelection, (optionsDraft) => {
      const optionSelectedIdx = optionsDraft.findIndex((optionDraft) => option.id === optionDraft.id);
      const optionIsSelected = optionSelectedIdx > -1;
      if (optionIsSelected) optionsDraft.splice(optionSelectedIdx, 1);
      else {
        const optionCopy = deepCopy(option);
        optionsDraft.push(optionCopy);
      }
    });

    setDraftSelection(newDraftSelection);
  };

  const onClearFilters = () => {
    if (clearFilters) clearFilters();
    setFilterIsActive(false);
    setDraftSelection([]);
  };

  useEffect(() => {
    setDraftSelection([...selectedOptions]);

    return () => {
      setDraftSelection([...selectedOptions]);
    };
  }, []);

  const selectedClass = selectedOptions.length > 0 ? "outline" : "";

  const toggleFilterIsActive = () => {
    setFilterIsActive((prevState) => {
      if (prevState === false) {
        setDraftSelection([...selectedOptions]);
      }
      return !prevState;
    });
  };

  const closeFilter = () => {
    setFilterIsActive(false);
    setDraftSelection([...selectedOptions]);
  };

  const onApplyFilters = () => {
    const newOptions = immutableUpdate(options, (optionsDraft) => {
      optionsDraft.forEach((option) => {
        const optionIsSelected = draftSelection.some((draftOption) => draftOption.id === option.id);
        if (optionIsSelected) option.selected = true;
        else option.selected = false;
      });
    });
    applyFilters(newOptions);
    setFilterIsActive(false);
  };

  const filterOptionsBtns = options.map((option) => {
    const outlinedClass = draftSelection.find((draftOption) => option.id === draftOption.id) ? "outline" : "";
    return (
      <button key={option.id} className={`btn ${outlinedClass}`} onClick={() => onOptionClick(option)}>
        {option.title}
      </button>
    );
  });

  return (
    <div>
      <button className={`btn ${selectedClass}`} ref={btnRef} aria-describedby={id} onClick={toggleFilterIsActive}>
        {label}
      </button>
      <Popover
        id={id}
        open={filterIsActive}
        anchorEl={btnRef.current}
        container={btnRef.current}
        onClose={closeFilter}
        anchorPosition={{ left: 80, top: 150 }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ horizontal: "center", vertical: -10 }}
      >
        <div className="popup-container">
          <div className="options-container">{filterOptionsBtns}</div>

          <div className="action-btns-container">
            <button className="btn" onClick={onClearFilters}>
              Cancel
            </button>
            <button className="btn" onClick={onApplyFilters}>
              Apply
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Filter;
