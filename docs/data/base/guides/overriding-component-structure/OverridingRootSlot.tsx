import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

export default function DivButton() {
  return (
    <ButtonUnstyled<'div'>
      slots={{
        root: 'div',
      }}
    >
      Button
    </ButtonUnstyled>
  );
}
