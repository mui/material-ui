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

// https://github.com/mui-org/material-ui/issues/28844
interface PropsFooVariant {
  variant: 'foo';
}
interface PropsBarVariant {
  variant: 'bar';
}
const Component = (props: PropsFooVariant | PropsBarVariant) => <div />;
const StyledComponent = styled(Component)(({ theme }) => ({}));
const rendered = (
  <React.Fragment>
    <StyledComponent variant="foo" />
    <StyledComponent variant="bar" />
  </React.Fragment>
);
