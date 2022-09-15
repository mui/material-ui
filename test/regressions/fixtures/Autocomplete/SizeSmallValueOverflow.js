import * as React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const movies = [
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
];

export default function Sizes() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="size-small-outlined"
        size="small"
        options={movies}
        getOptionLabel={(option) => option.title}
        defaultValue={movies[0]}
        disableClearable
        renderInput={(params) => <TextField {...params} label="Movie" placeholder="Favorites" />}
      />
      <Autocomplete
        multiple
        id="size-small-outlined-multi"
        size="small"
        options={movies}
        getOptionLabel={(option) => option.title}
        defaultValue={[movies[0]]}
        disableClearable
        renderInput={(params) => <TextField {...params} label="Movie" placeholder="Favorites" />}
      />
      <Autocomplete
        id="size-small-outlined"
        size="small"
        options={movies}
        getOptionLabel={(option) => option.title}
        defaultValue={movies[0]}
        renderInput={(params) => <TextField {...params} label="Movie" placeholder="Favorites" />}
      />
      <Autocomplete
        multiple
        id="size-small-outlined-multi"
        size="small"
        options={movies}
        getOptionLabel={(option) => option.title}
        defaultValue={[movies[0]]}
        renderInput={(params) => <TextField {...params} label="Movie" placeholder="Favorites" />}
      />
      <Autocomplete
        id="size-small-standard"
        size="small"
        options={movies}
        getOptionLabel={(option) => option.title}
        defaultValue={movies[0]}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Movies" placeholder="Favorites" />
        )}
      />
      <Autocomplete
        multiple
        id="size-small-standard-multi"
        size="small"
        options={movies}
        getOptionLabel={(option) => option.title}
        defaultValue={[movies[0]]}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Movies" placeholder="Favorites" />
        )}
      />
      <Autocomplete
        id="size-small-filled"
        size="small"
        options={movies}
        getOptionLabel={(option) => option.title}
        defaultValue={movies[0]}
        disableClearable
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.title}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="Movies" placeholder="Favorites" />
        )}
      />
      <Autocomplete
        multiple
        id="size-small-filled-multi"
        size="small"
        options={movies}
        getOptionLabel={(option) => option.title}
        defaultValue={[movies[0]]}
        disableClearable
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.title}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="Movies" placeholder="Favorites" />
        )}
      />
    </Stack>
  );
}
