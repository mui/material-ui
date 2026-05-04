import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import top100Films from './top100Films';

export default function Sizes() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        size="small"
        options={top100Films}
        defaultValue={top100Films[13]}
        renderInput={(params) => (
          <TextField {...params} label="Size small" placeholder="Favorites" />
        )}
      />
      <Autocomplete
        multiple
        disableCloseOnSelect
        size="small"
        options={top100Films}
        defaultValue={[top100Films[13]]}
        renderInput={(params) => (
          <TextField {...params} label="Size small" placeholder="Favorites" />
        )}
      />
      <Autocomplete
        size="small"
        options={top100Films}
        defaultValue={top100Films[13]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Size small"
            placeholder="Favorites"
          />
        )}
      />
      <Autocomplete
        multiple
        disableCloseOnSelect
        size="small"
        options={top100Films}
        defaultValue={[top100Films[13]]}
        renderValue={(values, getItemProps) =>
          values.map((option, index) => {
            const { key, ...itemProps } = getItemProps({ index });
            return (
              <Chip
                key={key}
                variant="outlined"
                label={option.label}
                size="small"
                {...itemProps}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Size small"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}
