import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/core/Box';

const Div = styled('div')<{sx?: SxProps}>``;

export default function Demo() {
  return <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component using the system</Div>
}