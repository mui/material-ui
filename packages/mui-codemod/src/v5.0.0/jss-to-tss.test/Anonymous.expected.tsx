import * as React from 'react';
import { withStyles } from 'tss-react/mui';

const styles = {
  root: {},
};

export default withStyles(
  props => {
    const { classes } = props;
    return <div className={classes.root}>Anonymous</div>;
  },
  styles
);
