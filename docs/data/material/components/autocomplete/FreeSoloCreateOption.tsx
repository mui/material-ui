import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import top100Films from './top100Films';

interface Film {
  label: string;
  year: number;
}

const filter = createFilterOptions<Film | string>();
const filmOptions: readonly Film[] = top100Films;

export default function FreeSoloCreateOption() {
  const [value, setValue] = React.useState<Film | string | null>(null);

  return (
    <Autocomplete<Film | string, false, false, true>
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue, getOptionLabel } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === getOptionLabel(option),
        );
        if (inputValue !== '' && !isExisting) {
          filtered.push(inputValue);
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={filmOptions}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.label;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {typeof option === 'string' ? `Add "${option}"` : option.label}
          </li>
        );
      }}
      sx={{ width: 300 }}
      freeSolo
      resetHighlightOnMouseLeave
      renderInput={(params) => (
        <TextField {...params} label="Free solo with text demo" />
      )}
    />
  );
}
