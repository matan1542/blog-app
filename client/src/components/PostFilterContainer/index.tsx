import React, { FC } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TagsMultiSelect from "./TagsMultiSelect";

import style from "./style.module.scss";
import { Button } from "@mui/material";

interface SearchBarProps {
  searchText: string;
  setSearchText: (search: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchText, setSearchText }) => {
  return (
    <OutlinedInput
      sx={{ width: "100%", height: "56px" }}
      placeholder={"Search"}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      id="input-with-icon-adornment"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

interface SearchPanelProps {
  searchText: string;
  setSearchText: (search: string) => void;
  tagFilter: string[];
  setTagFilter: (tag: string[]) => void;
  sortDir: string;
  toggleSortDir: () => void;
  onFilter: () => void;
}

const PostFilterContainer: FC<SearchPanelProps> = ({
  searchText,
  setSearchText,
  tagFilter,
  setTagFilter,
  onFilter,
}) => {
  return (
    <>
      <div className={style.postFilterContainer}>
        <SearchBar {...{ searchText, setSearchText }} />
        <TagsMultiSelect inputValue={tagFilter} setInputValue={setTagFilter} />
        <Button variant="contained" color="primary">
          Apply
        </Button>
      </div>
    </>
  );
};

export default PostFilterContainer;
