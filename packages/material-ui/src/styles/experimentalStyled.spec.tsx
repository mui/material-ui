import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Box = styled('div')``;

function SxTest() {
  <Box sx={{ p: [2, 3, 4] }} />;
}
