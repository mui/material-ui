import React from 'react';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQueryTheme from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQueryTheme('@media (min-width:600px)');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}

export default function ServerSide() {
  // Use https://github.com/ericf/css-mediaquery as ponyfill.
  const ssrMatchMedia = query => ({
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      // For the sake of this demo, we are using a fixed value.
      // In production, you can look into client-hint https://caniuse.com/#search=client%20hint
      // or user-agent resolution.
      width: 800,
    }),
  });

  return (
    <ThemeProvider theme={{ props: { MuiUseMediaQuery: { ssrMatchMedia } } }}>
      <MyComponent />
    </ThemeProvider>
  );
}
