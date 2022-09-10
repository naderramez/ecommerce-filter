import { Dispatch, FC, SetStateAction } from "react";
import { TFilterOption } from "../../constants/filterOptions";
import { immutableUpdate } from "../../utils";
import AppliedFilter from "./AppliedFilter";

interface Props {
  options: TFilterOption[];
  setOptions: Dispatch<SetStateAction<TFilterOption[]>>;
}

const WrappedAppliedFilter: FC<Props> = ({ options, setOptions }) => {
  const selectedOptions = options.filter((option) => option.selected === true);

  const clearAppliedFilter = (option: TFilterOption) => {
    setOptions((prevOptions) => {
      const newOptions = immutableUpdate(prevOptions, (optionsDraft) => {
        optionsDraft.forEach((optionDraft) => {
          if (optionDraft.id === option.id) optionDraft.selected = false;
        });
      });
      return newOptions;
    });
  };

  const appliedFilters = selectedOptions.map((option) => (
    <AppliedFilter key={option.id} option={option} onClear={() => clearAppliedFilter(option)} />
  ));

  return <>{appliedFilters}</>;
};

export default WrappedAppliedFilter;
