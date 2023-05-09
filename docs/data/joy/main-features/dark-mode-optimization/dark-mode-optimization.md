# Dark mode optimization

<p class="description">Joy UI uses CSS variables to ensure that server-rendered apps can load in dark mode on first render.</p>

Joy UI is optimized so that end users who select dark mode as their preferred color scheme never see a flash of light mode when the app first renders.
This is a common problem for server-side-rendered (SSR) apps and sites built with static-site generators (SSGs).

To solve this problem, Joy UI uses CSS variables to render all color schemes at build time so that the user's preferred mode can be served to them on first load.

## The problem: flickering on first load

In a server-rendered context, an app is built long before it reaches the client—which means that it can't account for the user's preferred color scheme when it first loads.

As a result, if you load such an app, switch to dark mode, and then refresh, you'll see a flash of the default light mode before client-side hydration kicks in and switches it back to dark mode.
Indeed, this light-mode "flash" will occur _every_ time you load up the app in the future, as long as your browser remembers that you prefer dark mode.

This can cause eye fatigue in a low-light setting, not to mention a frustrating interruption of the user experience—especially for those who interact with the app when it's in between modes.

The gif below illustrates this problem as it would appear on [mui.com](https://mui.com/) without a fix:

<img src="https://media.giphy.com/media/9hvxemkpotSiQGzLo8/giphy.gif" style="margin-bottom: 24px; width: 240px;" alt="The dark-mode flashing problem at mui.com." width="480" height="294" />

## The solution: CSS variables

Solving this problem required us to take a novel approach to styling and theming.
(See this [RFC on CSS variables support](https://github.com/mui/material-ui/issues/27651) to learn more about the implementation of this feature.)

Thanks to Joy UI's built-in support for CSS variables, your app can render all of its color schemes at build time, so that the user's preference can be injected _before_ the DOM is rendered in the browser.

Joy UI provides the `getInitColorSchemeScript()` function to make this flash-free dark mode possible with React frameworks like Next.js, Remix, and Gatsby.
This function must be placed before the main script so it can apply the correct stylesheet before your components are rendered.

The code snippet below shows how this works with Next.js—see the [Applying dark mode](/joy-ui/customization/dark-mode/) page for more details on usage with other frameworks:

```jsx
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
