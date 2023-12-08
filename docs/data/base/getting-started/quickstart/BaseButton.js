import * as React from 'react';
import { Button } from '@mui/base/Button';
import { useButton } from '@mui/base/useButton';
import Stack from '@mui/material/Stack';

export default function BaseButton() {
  const { getRootProps } = useButton({});
  return (
    <Stack spacing={2} direction="row">
      <Button>Button</Button>

      <button type="button" {...getRootProps()}>
        useButton
      </button>
    </Stack>
  );
}
