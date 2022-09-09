import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function SelectFieldDemo() {
  const [value, setValue] = React.useState('dog');
  return (
    <FormControl sx={{ width: 240 }}>
      <FormLabel
        // screen readers will announce "Favorite pet, dog selected" when the select is focused.
        aria-label={`Favorite pet, ${value} selected.`}
      >
        Favorite pet
      </FormLabel>
      <Select defaultValue="dog" value={value} onChange={setValue}>
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
      <FormHelperText>This is a helper text.</FormHelperText>
    </FormControl>
  );
}
