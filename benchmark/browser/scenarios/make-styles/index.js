import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: 200,
      height: 200,
      borderWidth: 3,
      borderColor: 'white',
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
      [theme.breakpoints.up('sm')]: {
        backgroundColor: theme.palette.primary.main,
        borderStyle: 'dashed',
      },
    },
  }),
  { defaultTheme },
);

const Div = React.forwardRef(function Div(props, ref) {
  const classes = useStyles();

  return <div ref={ref} className={classes.root} {...props} />;
});

export default function MakeStyles() {
  return (
    <React.Fragment>
      {new Array(1000).fill().map(() => (
        <Div>test case</Div>
      ))}
    </React.Fragment>
  );
}
