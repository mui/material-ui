import * as React from 'react';
import { withStyles } from 'tss-react/mui';

export class Bug {}

const styles = {
  root: {},
};

const Test = withStyles(props => {
  const { classes } = props;
  return <div className={classes.root}>Anonymous</div>;
}, styles);

export default Test