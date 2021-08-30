import * as React from 'react';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';

const styles = createStyles({
    root: {
      background: 'red',
    },
  });

const MyComponent = (props) => {
  const { classes } = props;

  return (
    <div {...props} className={classes.root} />
  );
};

export default withStyles(styles)(MyComponent);