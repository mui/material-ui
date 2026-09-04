import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Film {
  id: number;
  label: string;
}

const films: Film[] = [
  { id: 1, label: 'The Shawshank Redemption' },
  { id: 2, label: 'The Godfather' },
  { id: 3, label: 'The Dark Knight' },
];

export default function OptionValueMapping() {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <div>
      <div>{`value: ${value ?? 'null'}`}</div>
      <br />
      <Autocomplete
        options={films}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.id}
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
