import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";

const TagsMultiSelect: FC<{
  inputValue: string[];
  setInputValue: (tag: string[]) => void;
}> = ({ inputValue, setInputValue }) => {
  const [tag, setTag] = useState<string[]>([]);

    const handleChange = () => {
      setInputValue(tag);
  };
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Tag</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={inputValue}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TagsMultiSelect;
