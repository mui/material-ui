import * as React from 'react';
import Input from '@mui/joy/Input';

export default function InputSlotProps() {
  return (
    <Input
      type="number"
      defaultValue={2.5}
      slotProps={{
        input: {
          min: 1,
          max: 5,
          step: 0.1,
        },
      }}
    />
  );
}
