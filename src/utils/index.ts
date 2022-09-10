import { TFilterOption, TRawOption } from "../constants/filterOptions";

export const deepCopy = <T>(obj: T): T => {
  const objCopy = JSON.parse(JSON.stringify(obj));
  return objCopy;
};

export const immutableUpdate = <T>(obj: T, handler: (draft: T) => void): any => {
  const objCopy = deepCopy(obj);
  handler(objCopy);
  return objCopy;
};

export const mapRawOptionsToFilterOptions = (rawOptions: TRawOption[]): TFilterOption[] => {
  const rawOptionsCopy = deepCopy(rawOptions);
  const filterOptions: TFilterOption[] = rawOptionsCopy.map((option) => {
    const filterOption: TFilterOption = {
      ...option,
      selected: false,
    };
    return filterOption;
  });

  return filterOptions;
};
