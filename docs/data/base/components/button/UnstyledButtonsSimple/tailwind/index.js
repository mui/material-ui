import * as React from 'react';
import Button from '@mui/base/Button';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonsSimple() {
  return (
    <Stack spacing={2} direction="row">
      <Button className="cursor-pointer rounded-xl border-none bg-violet-500 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-600 active:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50">
        Button
      </Button>
      <Button
        className="cursor-pointer rounded-xl border-none bg-violet-500 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled
      >
        Disabled
      </Button>
    </Stack>
  );
}
