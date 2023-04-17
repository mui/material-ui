import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

export default function DivButton() {
  return <ButtonUnstyled slots={{ root: 'div' }}>Button</ButtonUnstyled>;
}
