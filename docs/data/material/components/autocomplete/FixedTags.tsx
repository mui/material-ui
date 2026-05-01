import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import top100Films from './top100Films';

const fixedOptions = [top100Films[6]];

export default function FixedTags() {
  const [value, setValue] = React.useState([...fixedOptions, top100Films[13]]);

  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => !fixedOptions.includes(option)),
        ]);
      }}
      options={top100Films}
      renderValue={(values, getItemProps) =>
        values.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index });
          return (
            <Chip
              key={key}
              label={option.label}
              {...itemProps}
              disabled={fixedOptions.includes(option)}
            />
          );
        })
      }
      sx={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Fixed tag" placeholder="Favorites" />
      )}
    />
  );
}
