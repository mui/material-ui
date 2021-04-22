---
title: NProgress React component
components: NProgressBar
githubLabel: 'component: NProgress'
materialDesign: https://material.io/components/progress-indicators
---

# NProgress

<p class="description">Display a linear progress when the app takes too long for navigating to a page to convince that it is loading.</p>

Using frameworks like Next.js or Gatsby you have scenarios where your page may take some time to
load and don't show any indication that it is loading when navigating to it.

To inform the user that a page is being loaded, several popular websites use a technique
commonly called `nprogress`, which adds a linear progress bar to the top of the page simulating
progress with a decreasing pace while getting closer to the end of the progress bar.

**Note:** This component is not documented in the [Material Design guidelines](https://material.io/)
, but it is actually a [progress indicator](https://material.io/components/progress-indicators)
which is documented.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic usage

{{"demo": "pages/components/n-progress/BasicUsage.js", "iframe": true}}

## Next.js usage

Next.js provides [routing events](https://nextjs.org/docs/api-reference/next/router#routerevents) the component can listen to.

```jsx
import * as React from 'react';
import NProgress, { NProgressBar } from '@material-ui/core/NProgressBar';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.finish();
});
Router.events.on('routeChangeError', () => {
  NProgress.finish();
});

export default function App() {
  return (
    <React.Fragment>
      <NProgressBar />
    </React.Fragment>
  );
}
```

## Delayed appearance

By default, the NProgressBar takes 300ms to appear after starting.
To change this behavior, you change the `initialDelay` prop.

{{"demo": "pages/components/n-progress/DelayedAppearance.js", "iframe": true}}

## External methods

### `NProgress.start()`

Start the progress after set delay and shows the NProgressBar.

### `NProgress.finish()`

Start the progress after set delay and shows the NProgressBar.
