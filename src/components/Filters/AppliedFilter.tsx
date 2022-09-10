import React, { FC, MouseEventHandler } from "react";
import { TFilterOption } from "../../constants/filterOptions";

interface Props {
  onClear: MouseEventHandler;
  option: TFilterOption;
}

const AppliedFilter: FC<Props> = ({ onClear, option }) => {
  return (
    <div className="appliedFilterContainer">
      <span className="label">{option.title}</span>
      <span className="clearBtn" onClick={onClear}>
        X
      </span>
    </div>
  );
};

export default AppliedFilter;
