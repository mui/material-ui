import * as React from 'react';
import { ThemeProvider, makeStyles } from '@mui/styles';

interface MyTheme {
  background: string;
  boxShadow: string;
}

const useStyles = makeStyles((theme: MyTheme) => ({
  root: {
    background: theme.background,
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    boxShadow: theme.boxShadow,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

function DeepChild() {
  const classes = useStyles();

  return (
    <button type="button" className={classes.root}>
      Theme nesting
    </button>
  );
}

export default function ThemeNesting() {
  return (
    <div>
      <ThemeProvider<MyTheme>
        theme={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        }}
      >
        <DeepChild />
        <br />
        <br />
        <ThemeProvider<MyTheme>
          theme={(outerTheme) => ({
            ...outerTheme,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          })}
        >
          <DeepChild />
        </ThemeProvider>
      </ThemeProvider>
    </div>
  );
}
