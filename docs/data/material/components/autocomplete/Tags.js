import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import top100Films from './top100Films';

const filmTitles = top100Films.map((option) => option.label);

export default function Tags() {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        options={top100Films}
        defaultValue={[top100Films[13]]}
        renderInput={(params) => (
          <TextField {...params} label="Multiple values" placeholder="Favorites" />
        )}
      />
      <Autocomplete
        multiple
        options={top100Films}
        defaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
      <Autocomplete
        multiple
        options={filmTitles}
        defaultValue={[top100Films[13].label]}
        freeSolo
        renderValue={(value, getItemProps) =>
          value.map((option, index) => {
            const { key, ...itemProps } = getItemProps({ index });
            return (
              <Chip variant="outlined" label={option} key={key} {...itemProps} />
            );
          })
        }
        renderInput={(params) => (
          <TextField {...params} label="freeSolo" placeholder="Favorites" />
        )}
      />
      <Autocomplete
        multiple
        options={filmTitles}
        defaultValue={[top100Films[12].label, top100Films[13].label]}
        readOnly
        renderInput={(params) => (
          <TextField {...params} label="readOnly" placeholder="Favorites" />
        )}
      />
    </Stack>
  );
}
