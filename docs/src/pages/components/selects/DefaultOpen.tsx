import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectOtherProps() {
  const [dog, setDog] = React.useState('');
  const [cat, setCat] = React.useState('');

  const handleChangeDog = (event: SelectChangeEvent) => {
    setDog(event.target.value);
  };
  const handleChangeCat = (event: SelectChangeEvent) => {
    setCat(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-dog-label">Dog</InputLabel>
        <Select
          defaultOpen
          labelId="demo-simple-select-dog-label"
          id="demo-simple-select-dog"
          value={dog}
          label="Dog"
          onChange={handleChangeDog}
        >
          <MenuItem value="Husky">Husky</MenuItem>
          <MenuItem value="Akita">Akita</MenuItem>
          <MenuItem value="Border Collie">Border Collie</MenuItem>
        </Select>
        <FormHelperText>defaultOpen = true</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-cat-label">Cat</InputLabel>
        <Select
          labelId="demo-simple-select-cat-label"
          id="demo-simple-select-cat"
          value={cat}
          label="Cat"
          onChange={handleChangeCat}
        >
          <MenuItem value="Siamese">Siamese</MenuItem>
          <MenuItem value="Maine Coon">Maine Coon</MenuItem>
          <MenuItem value="Bengal">Bengal</MenuItem>
        </Select>
        <FormHelperText>defaultOpen = false</FormHelperText>
      </FormControl>
    </div>
  );
}
