import * as React from 'react';
import { styled } from '@material-ui/core/styles';
const PREFIX = 'withCreateStyles1';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    background: theme.background,
  }
}));

const MyComponent = (props) => {
  const { } = props;

  return <Root {...props} className={classes.root} />;
};

export default (MyComponent);