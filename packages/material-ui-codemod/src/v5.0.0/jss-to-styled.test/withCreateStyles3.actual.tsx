import * as React from 'react';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(createStyles({
    root: {
      background: 'red',
    },
  })
);

const MyComponent = (props) => {
  const classes = useStyles();

  return (
    <div {...props} className={classes.root} />
  );
};

export default MyComponent;