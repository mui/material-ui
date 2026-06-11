import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import top100Films from './top100Films';

type Film = (typeof top100Films)[number];

const filmTitles = top100Films.map((option) => option.label);
const defaultProps = {
  options: top100Films,
};
const flatProps = {
  options: filmTitles,
};

export default function Playground() {
  const [value, setValue] = React.useState<Film | null>(null);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField {...params} label="disableCloseOnSelect" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        clearOnEscape
        renderInput={(params) => (
          <TextField {...params} label="clearOnEscape" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label="disableClearable" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        includeInputInList
        renderInput={(params) => (
          <TextField {...params} label="includeInputInList" variant="filled" />
        )}
      />
      <Autocomplete
        {...flatProps}
        renderInput={(params) => (
          <TextField {...params} label="flat" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="controlled" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        autoComplete
        includeInputInList
        renderInput={(params) => (
          <TextField {...params} label="autoComplete" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        disableListWrap
        renderInput={(params) => (
          <TextField {...params} label="disableListWrap" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        openOnFocus
        renderInput={(params) => (
          <TextField {...params} label="openOnFocus" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        autoHighlight
        renderInput={(params) => (
          <TextField {...params} label="autoHighlight" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        autoSelect
        renderInput={(params) => (
          <TextField {...params} label="autoSelect" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        disabled
        renderInput={(params) => (
          <TextField {...params} label="disabled" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        disablePortal
        renderInput={(params) => (
          <TextField {...params} label="disablePortal" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        blurOnSelect
        renderInput={(params) => (
          <TextField {...params} label="blurOnSelect" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        clearOnBlur
        renderInput={(params) => (
          <TextField {...params} label="clearOnBlur" variant="filled" />
        )}
      />
      <Autocomplete
        {...defaultProps}
        selectOnFocus
        renderInput={(params) => (
          <TextField {...params} label="selectOnFocus" variant="filled" />
        )}
      />
      <Autocomplete
        {...flatProps}
        readOnly
        defaultValue={flatProps.options[13]}
        renderInput={(params) => (
          <TextField {...params} label="readOnly" variant="filled" />
        )}
      />
    </Stack>
  );
}
