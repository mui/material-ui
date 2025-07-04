import * as React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const StyledAppContainer = styled(Container)(({ theme }) => {
  return {
    paddingTop: `calc(var(--MuiDocs-header-height) + ${theme.spacing(4)})`,
    fontFamily: 'Arial',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  };
});

export default function AppContainer(props) {
  return <StyledAppContainer id="main-content" maxWidth={false} {...props} />;
}
