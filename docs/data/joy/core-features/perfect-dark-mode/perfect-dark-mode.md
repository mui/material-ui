# Perfect dark mode

<p class="description">Built-in support for perfect dark mode on server-side rendering.</p>

## The flicker

It happens with SSR (server-side rendering) and SSG (server-side generation) applications when users have switched to dark mode and refresh the page. It page appears as light mode and then quickly turn dark after hydrated. This experience could cause eye fatigue to the users that are in low lighting condition.

<img src="https://media.giphy.com/media/9hvxemkpotSiQGzLo8/giphy.gif" style="border-radius: 4px; display: block; width: 400px; margin-inline: auto; margin-bottom: 24px;" alt="First look at Joy UI: a new starting point for your design system." />

The above recording is taken from [mui.com](https://mui.com/) when the page is hard refreshed. Usually, the root cause of this issue comes from the javascript runtime calculation to switch the stylesheet between light and dark modes.

## The solution

The root cause requires us to rethink about the styling and theming approach while building Joy UI. If you want to read more about the implementation details, please check out the [Github RFC](https://github.com/mui/material-ui/issues/27651).

Joy provides the `getInitColorSchemeScript()` function that you can integrate with various React frameworks such as Next.js, Gatsby, and Remix. The function must be placed before the main script to apply the correct stylesheet before your application appears on the screen.

```js
// Next.js example
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getInitColorSchemeScript } from '@mui/joy/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>...</Head>
        <body>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

You can find other framework setup and more details in the [apply dark mode](/joy-ui/guides/apply-dark-mode/) page.
