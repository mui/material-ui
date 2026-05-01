import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import top100Films from './top100Films';

const options = top100Films
  .map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  })
  .sort((a, b) => a.firstLetter.localeCompare(b.firstLetter));

export default function Grouped() {
  return (
    <Autocomplete
      options={options}
      groupBy={(option) => option.firstLetter}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="With categories" />}
    />
  );
}
