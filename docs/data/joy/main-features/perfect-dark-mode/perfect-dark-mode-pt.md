# Perfect dark mode

<p class="description">Joy UI's solution for perfect dark mode on server-side rendering.</p>

## The current flickering problem

In apps using SSR (server-side rendering) and SSG (static site generation－e.g. Jamstack), switching to dark mode and then refreshing the page will initially load the light mode to only then, after hydration, go back to the dark mode.

This not only causes eye-fatigue to users that are in low-light settings as it also interrupts the browsing experience for those who interact with the website in the in-between of modes changing.

<img src="https://media.giphy.com/media/9hvxemkpotSiQGzLo8/giphy.gif" style="border-radius: 10px; display: block; width: 400px; margin-inline: auto; margin-bottom: 24px;" alt="Today's dark mode flickering in MUI's website." />

The above recording is taken from [MUI's website](https://mui.com/) when the page is hard refreshed. The root cause of this issue usually comes from the JavaScript runtime calculation to switch the stylesheet between light and dark modes.

## The solution: CSS variables

Ultimately, to solve this problem, we needed to think of a different styling and theming approach altogether. Joy UI comes with CSS variables support out-of-the-box which allows every color schemes to be rendered at build time, given we want to set the selected mode before the browser renders the DOM.

Joy UI provides the `getInitColorSchemeScript()` function that enables you to integrate with various React frameworks, such as Next.js, Gatsby, and Remix. This function must be placed before the main script so it can apply the correct stylesheet before your components are rendered.

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

- Learn [how to apply dark mode](/joy-ui/guides/applying-dark-mode/) in various frameworks by visiting the How To Guides.
- Check out our [RFC on CSS variables support](https://github.com/mui/material-ui/issues/27651) to get the full picture of its implementation in Joy UI.
