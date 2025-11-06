# Using styled-components with Material UI

<p class="description">Learn how to use styled-components instead of Emotion with Material UI.</p>

:::error
As of late 2021, [styled-components](https://github.com/styled-components/styled-components) is
**not compatible** with server-rendered Material UI projects.
This is because `babel-plugin-styled-components` isn't able to work with the `styled()` utility
inside `@mui` packages.
See [this GitHub issue](https://github.com/mui/material-ui/issues/29742) for more details.

We **strongly recommend** using Emotion for SSR projects.
:::

## Overview

By default, Material UI uses [Emotion](https://github.com/emotion-js/emotion) to generate CSS
styles. All components rely on the `styled()` API to inject CSS into the page. This API is
supported by multiple popular styling libraries, which makes it possible to switch between
them in Material UI.

We provide two different packages to wrap your chosen styling solution for compatibility
with Material UI:

- `@mui/styled-engine`: a thin wrapper around Emotion's
  [`styled()`](https://emotion.sh/docs/styled) API that includes required utilities like
  the `<GlobalStyles />` component, the `css` and `keyframe` helpers, and more. This is
  the default, and you do not need to install it.
- `@mui/styled-engine-sc`: a similar wrapper, but specifically tailored for
  styled-components. You must install and implement this package to use styled-components
  with Material UI.

These two packages implement the same interface, making them interchangeable.

## Bundler configuration

By default, `@mui/material` has `@mui/styled-engine` as a dependency.
To use styled-components, you need to configure your bundler to replace it with
`@mui/styled-engine-sc`.

### With yarn

If you're using yarn, you can configure it using a package resolution:

<!-- #npm-tag-reference -->

```diff title="package.json"
{
  "dependencies": {
-   "@mui/styled-engine": "latest"
+   "@mui/styled-engine": "npm:@mui/styled-engine-sc@latest"
  },
+ "resolutions": {
+   "@mui/styled-engine": "npm:@mui/styled-engine-sc@latest"
+ }
}
```