import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import emotionStyled from '@emotion/styled';

const Div = emotionStyled('div')(
  ({ theme }) => `
  width: 200px;
  height: 200px;
  border-width: 3px;
  border-color: white;
  :hover {
    background-color: ${theme.palette.secondary.dark};
  }
  ${[theme.breakpoints.up('sm')]} {
    background-color: ${theme.palette.primary.main};
    border-style: 'dashed';
  }
`,
);

const theme = createTheme();

export default function StyledEmotion() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <Div theme={theme}>test case</Div>
      ))}
    </React.Fragment>
  );
}
