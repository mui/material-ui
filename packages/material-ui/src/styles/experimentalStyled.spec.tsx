import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Box = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const SimpleBox = styled('div')``;

function SxTestSimpleBox() {
  <SimpleBox sx={{ p: [2, 3, 4] }} />;
}

function SxTest() {
  <Box sx={{ p: [2, 3, 4] }} />;
}

function WorksWithNoTheme() {
  <Box />;
}
