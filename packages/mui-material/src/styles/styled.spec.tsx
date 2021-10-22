import * as React from 'react';
import { styled, css } from '@mui/material/styles';

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

const StyledToolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const StyledSpan = styled('span')(({ theme }) => ({
  ...theme.typography.body1,
}));

const Container = styled('div')<{ $heightLimit: boolean }>`
  min-width: 0;

  ${({ $heightLimit }) =>
    $heightLimit &&
    css`
      background: red;
      height: 10vh;
    `}
`;
