import * as React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(
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

export default function StyledMaterialUI() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <Div>test case</Div>
      ))}
    </React.Fragment>
  );
}
