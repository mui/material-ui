import * as React from 'react';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';

const styles = (theme) =>
  createStyles({
    root: {
      background: theme.background,
    },
  });

const MyComponent = (props) => {
  const { classes } = props;

  return (
    <div {...props} className={classes.root} />
  );
};

export default withStyles(styles)(MyComponent);