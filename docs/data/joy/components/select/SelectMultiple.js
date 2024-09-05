import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function SelectMultiple() {
  const handleChange = (event, newValue) => {
    console.log(`You have choosen "${newValue}"`);
  };
  return (
    <Select
      defaultValue={['dog']}
      multiple
      onChange={handleChange}
      sx={{ minWidth: '13rem' }}
      slotProps={{
        listbox: {
          sx: {
            width: '100%',
          },
        },
      }}
    >
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
      <Option value="fish">Fish</Option>
      <Option value="bird">Bird</Option>
    </Select>
  );
}
