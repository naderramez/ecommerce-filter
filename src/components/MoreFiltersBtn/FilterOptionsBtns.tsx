import { Dispatch, FC, SetStateAction } from "react";
import { TFilterOption } from "../../constants/filterOptions";
import { deepCopy, immutableUpdate } from "../../utils";
import { FilterProps, TDraft } from "./MoreFilterBtn.types";

interface Props extends FilterProps {
  filtersDraftSelection: TDraft[];
  setFiltersDraftSelection: Dispatch<SetStateAction<TDraft[]>>;
}

const FilterOptionsBtns: FC<Props> = ({ id, options, filtersDraftSelection, setFiltersDraftSelection }) => {
  const onOptionClick = (option: TFilterOption) => {
    const newDraftSelection = immutableUpdate(filtersDraftSelection, (filterDraft) => {
      const targetDraft = filterDraft.find((draft) => draft.id === id);
      if (targetDraft) {
        const draftSelection = targetDraft.draft;
        const optionSelectedIdx = draftSelection.findIndex((optionDraft) => option.id === optionDraft.id);
        const optionIsSelected = optionSelectedIdx > -1;
        if (optionIsSelected) draftSelection.splice(optionSelectedIdx, 1);
        else {
          const optionCopy = deepCopy(option);
          draftSelection.push(optionCopy);
        }
      } else {
        const newDraft: TDraft = {
          id,
          draft: [option],
        };
        filterDraft.push(newDraft);
      }
    });

    setFiltersDraftSelection(newDraftSelection);
  };

  const filterOptionsBtns = options.map((option) => {
    const targetDraft = filtersDraftSelection.find((draft) => draft.id === id);
    let outlinedClass = "";
    if (targetDraft) {
      const draftSelection = targetDraft.draft;
      outlinedClass = draftSelection.find((draftOption) => option.id === draftOption.id) ? "outline" : "";
    }
    return (
      <button key={option.id} className={`btn ${outlinedClass}`} onClick={() => onOptionClick(option)}>
        {option.title}
      </button>
    );
  });

  return <>{filterOptionsBtns}</>;
};

export default FilterOptionsBtns;
