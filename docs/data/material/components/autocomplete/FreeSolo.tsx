import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import top100Films from './top100Films';

const filmTitles = top100Films.map((option) => option.label);

export default function FreeSolo() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        resetHighlightOnMouseLeave
        options={filmTitles}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
      <Autocomplete
        freeSolo
        resetHighlightOnMouseLeave
        disableClearable
        options={filmTitles}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
                type: 'search',
              },
            }}
          />
        )}
      />
      <Autocomplete
        freeSolo
        resetHighlightOnMouseLeave
        options={top100Films}
        renderInput={(params) => (
          <TextField {...params} label="freeSolo (handle string values)" />
        )}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.label
        }
        // A typed free solo value is a string, but a selected option is an object.
        // The equality check needs to compare both shapes.
        isOptionEqualToValue={(option, value) => {
          if (typeof value === 'string') {
            return option.label === value;
          }
          return option.label === value.label;
        }}
      />
    </Stack>
  );
}
