import * as React from 'react';
import Input from '@mui/joy/Input';

export default function InputSlotProps() {
  const [value, setValue] = React.useState('1');

  return (
    <Input
      type="number"
      slotProps={{
        input: {
          min: 1,
          max: 5,
        },
      }}
      sx={{ width: 300 }}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
}
