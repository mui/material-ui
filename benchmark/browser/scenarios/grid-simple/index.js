import * as React from 'react';
import { styled } from '@mui/material/styles';

const Container = styled('div')({ display: 'flex', flexWrap: 'wrap', gap: 2 });

const Item = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
  [theme.breakpoints.up('md')]: {
    width: 'calc(100% / 4)',
  },
}));

export default function GridSimple() {
  return (
    <Container>
      {new Array(1000).fill().map(() => (
        <Item>test case</Item>
      ))}
    </Container>
  );
}
