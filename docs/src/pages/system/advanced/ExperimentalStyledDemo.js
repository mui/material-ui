import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Div = styled('div')``;

export default function ExperimentalStyledDemo() {
  return <Div sx={{ m: 1, p: 1, border: 1 }}>Custom component using the system</Div>;
}
