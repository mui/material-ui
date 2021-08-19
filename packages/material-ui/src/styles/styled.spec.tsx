import * as React from 'react';
import { styled } from '@material-ui/core/styles';

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
