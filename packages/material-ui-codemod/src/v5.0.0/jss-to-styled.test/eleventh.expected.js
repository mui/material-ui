import React, { Fragment } from 'react';
import SomeNamespace from 'SomeNamespace';
import { styled } from '@material-ui/core/styles';
const PREFIX = 'eleventh';

const classes = {
  header: `${PREFIX}-header`,
  img: `${PREFIX}-img`
};

// Expected!!!
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
    <StyledSomeNamespaceSomeComponent>
      <h1 className={classes.header}></h1>
      <img className={classes.img}></img>
    </StyledSomeNamespaceSomeComponent>
  );
}