import React from 'react';
import mediaQuery from 'css-mediaquery';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}

export default function ServerSide() {
  const ssrMatchMedia = query => ({
    // Use https://github.com/ericf/css-mediaquery as ponyfill.
    matches: mediaQuery.match(query, {
      // The estimated CSS width of the browser.
      // For the sake of this demo, we are using a fixed value.
      //
      // In production, you can leverage:
      //
      // - Client hints. You can ask the client to send your server its width.
      // Be aware that this feature is not supported everywhere: https://caniuse.com/#search=client%20hint.
      // - User-agent. You can parse the user agent of the client, then convert the data to a
      // is mobile or is desktop variable, and finally, guess the most likely screen width of the client.
      width: 800,
    }),
  });

  return (
    <ThemeProvider
      theme={{
        props: {
          MuiUseMediaQuery: { ssrMatchMedia },
        },
      }}
    >
      <MyComponent />
    </ThemeProvider>
  );
}
