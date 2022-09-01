import * as React from 'react';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function SelectFieldDemo() {
  const [value, setValue] = React.useState('dog');
  return (
    <Box sx={{ width: 240 }}>
      <FormLabel htmlFor="select-field-pet">Favorite pet</FormLabel>
      <Select
        id="select-field-pet"
        defaultValue="dog"
        componentsProps={{
          button: {
            // screen readers will announce "Favorite pet, dog selected" when the select is focused.
            'aria-label': `Favorite pet, ${value} selected.`,
            // and this in the next sentence.
            'aria-describedby': 'select-field-pet-helper',
          },
        }}
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        sx={{ mt: 0.25 }}
      >
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
      <FormHelperText id="select-field-pet-helper">
        This is a helper text.
      </FormHelperText>
    </Box>
  );
}
