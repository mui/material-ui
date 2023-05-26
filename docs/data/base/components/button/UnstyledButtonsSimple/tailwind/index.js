import * as React from 'react';
import Button from '@mui/base/Button';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonsSimple() {
  return (
    <Stack spacing={2} direction="row">
      <Button className="text-sm bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white rounded-xl font-semibold px-6 py-3 border-none disabled:opacity-50">
        Button
      </Button>
      <Button
        className="text-sm bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white rounded-xl font-semibold px-6 py-3 border-none disabled:opacity-50"
        disabled
      >
        Disabled
      </Button>
    </Stack>
  );
}
