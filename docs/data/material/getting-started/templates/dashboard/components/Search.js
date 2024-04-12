import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <FormControl sx={{ width: '25ch' }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}
