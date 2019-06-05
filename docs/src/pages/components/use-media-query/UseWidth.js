import React from 'react';
import { ThemeProvider, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  const queries = useMediaQuery(keys.map(key => theme.breakpoints.only(key)));
  return (
    queries.reduce((output, matches, index) => {
      return !output && matches ? keys[index] : output;
    }, null) || 'xs'
  );
}

function MyComponent() {
  const width = useWidth();
  return <span>{`width: ${width}`}</span>;
}

const theme = createMuiTheme();

export default function UseWidth() {
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
}
