import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function SelectFieldDemo() {
  return (
    <FormControl sx={{ width: 240 }}>
      <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
        Favorite pet
      </FormLabel>
      <Select
        defaultValue="dog"
        slotProps={{
          button: {
            id: 'select-field-demo-button',
            // TODO: Material UI set aria-labelledby correctly & automatically
            // but Base UI and Joy UI don't yet.
            'aria-labelledby': 'select-field-demo-label select-field-demo-button',
          },
        }}
      >
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
      <FormHelperText id="select-field-demo-helper">
        This is a helper text.
      </FormHelperText>
    </FormControl>
  );
}
