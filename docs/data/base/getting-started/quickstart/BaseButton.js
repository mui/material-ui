import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import useButton from '@mui/base/useButton';
import Stack from '@mui/material/Stack';

export default function App() {
  const buttonRef = React.useRef();

  const { getRootProps } = useButton({
    ref: buttonRef,
  });
  return (
    <Stack spacing={2} direction="row">
      <ButtonUnstyled>ButtonUnstyled</ButtonUnstyled>

      <button type="button" {...getRootProps()}>
        useButton
      </button>
    </Stack>
  );
}
