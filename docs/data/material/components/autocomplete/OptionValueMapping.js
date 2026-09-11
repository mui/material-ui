import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const films = [
  { id: 1, label: 'The Shawshank Redemption' },
  { id: 2, label: 'The Godfather' },
  { id: 3, label: 'The Dark Knight' },
];

function getFilmValue(film) {
  return film.id;
}

export default function OptionValueMapping() {
  const [value, setValue] = React.useState(2);

  return (
    <div>
      <div>{`value: ${value ?? 'null'}`}</div>
      <br />
      <Autocomplete
        options={films}
        getOptionLabel={(option) => option.label}
        getOptionValue={getFilmValue}
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Film" />}
      />
    </div>
  );
}
