import * as React from 'react';
import Button from '@mui/base/Button';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonsSimple() {
  return (
    <Stack spacing={2} direction="row">
      <Button className="bg-sky-500 text-white rounded-lg font-semibold p-3 border-none disabled:opacity-50">
        Button
      </Button>
      <Button
        className="bg-sky-500 text-white rounded-lg font-semibold p-3 border-none disabled:opacity-50"
        disabled
      >
        Disabled
      </Button>
    </Stack>
  );
}
