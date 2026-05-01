import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import top100Films from './top100Films';

export default function LimitTags() {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={top100Films}
      defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
      renderInput={(params) => (
        <TextField {...params} label="limitTags" placeholder="Favorites" />
      )}
      sx={{ width: 500 }}
    />
  );
}
