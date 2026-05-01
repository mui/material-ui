import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import top100Films from './top100Films';

const filterOptions = createFilterOptions<{ label: string; year: number }>({
  matchFrom: 'start',
  stringify: (option) => option.label,
});

export default function Filter() {
  return (
    <Autocomplete
      options={top100Films}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Custom filter" />}
    />
  );
}
