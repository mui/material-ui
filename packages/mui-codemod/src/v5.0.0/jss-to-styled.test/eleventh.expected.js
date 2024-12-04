import * as React from 'react';
import { styled } from '@mui/material/styles';
import SomeNamespace from 'SomeNamespace';
const PREFIX = 'eleventh';

const classes = {
  header: `${PREFIX}-header`,
  img: `${PREFIX}-img`
};

const StyledSomeNamespaceSomeComponent = styled(SomeNamespace.SomeComponent)((
  {
    theme
  }
) => ({
  [`& .${classes.header}`]: {
    marginLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
    marginRight: 'auto',
    minWidth: 400,
  },

  [`& .${classes.img}`]: {
    marginTop: theme.spacing(4),
  }
}));

export default function Page() {


  return (
    (<StyledSomeNamespaceSomeComponent>
      <h1 className={classes.header}></h1>
      <img className={classes.img}></img>
    </StyledSomeNamespaceSomeComponent>)
  );
}