import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    paddingTop: 80 + 20,
    // We're mostly hosting text content so max-width by px does not make sense considering font-size is system-adjustable.
    // 105ch ≈ 930px
    fontFamily: 'Arial',
    maxWidth: '105ch',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  };
});

export default function AppContainer(props) {
  return <StyledContainer id="main-content" maxWidth={false} tabIndex={-1} {...props} />;
}
