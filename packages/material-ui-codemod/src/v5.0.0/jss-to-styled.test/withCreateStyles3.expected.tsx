import * as React from 'react';
import { styled } from '@material-ui/core/styles';
const PREFIX = 'MyComponent';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')({
    [`&.${classes.root}`]: {
      background: 'red',
    },
  });

const MyComponent = (props) => {


  return <Root {...props} className={classes.root} />;
};

export default MyComponent;