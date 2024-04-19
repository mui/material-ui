import * as React from 'react';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

export default function InputSlotProps() {
  const inputRef = React.useRef(null);
  return (
    <Stack spacing={1.5} sx={{ minWidth: 300 }}>
      <Input
        type="number"
        defaultValue={2.5}
        slotProps={{
          input: {
            ref: inputRef,
            min: 1,
            max: 5,
            step: 0.1,
          },
        }}
      />
      <Input
        type="date"
        slotProps={{
          input: {
            min: '2018-06-07',
            max: '2018-06-14',
          },
        }}
      />
    </Stack>
  );
}
