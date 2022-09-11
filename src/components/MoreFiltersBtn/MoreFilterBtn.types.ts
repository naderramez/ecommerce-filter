import { TFilterOption } from "../../constants/filterOptions";

export interface FilterProps {
  id: string;
  label: string;
  options: TFilterOption[];
  applyFilters: (options: TFilterOption[]) => void;
  clearFilters?: Function;
}

export interface Props {
  filters: FilterProps[];
}

export type TDraft = {
  id: string;
  draft: TFilterOption[];
};

export type TFilterState = {
  id: string;
  expanded: boolean;
};
