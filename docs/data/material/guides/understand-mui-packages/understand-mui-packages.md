# Understanding MUI packages

<p class="description">An overview of the MUI packages and the relationships between them.</p>

## Overview

If you want to build a design system based on Material Design, use `@mui/material`.

> 💡 You can import styling APIs (eg. `ThemeProvider`, `styled`, etc.) directly from `@mui/material`.

If you want to use components that offers you complete control over your app's CSS, use `@mui/base`.

> 💡 You can import any component from MUI Base while using`@mui/material` without an installation.

If you want to use CSS utilities to lay out custom designs, use `@mui/system`.

### Glossary

- **install** refers to running `yarn add $module` or `npm install $module`.
- **import** refers to making a module API available in your code by adding `import ... from '$module'`.

## MUI packages

The following is an up-to-date list of `@mui` public packages.

- `@mui/material`
- `@mui/base`
- `@mui/system`
- `@mui/styled-engine`
- `@mui/styled-engine-sc`
- `@mui/styles`

### Why does MUI have multiple packages? Why not just one?

MUI started with Material UI, the most successful React implementation of Google's Material Design.
With the growth of that product over the years, we started exploring other types of problems around the UI building space, such as a version of the components without styles and a proprietary styling API to increase efficiency.

Each of these opportunities are now individual packages within our two main product lines, MUI Core and MUI X:

<img src="/static/images/packages/mui-packages.png" style="width: 796px; margin-top: 4px; margin-bottom: 8px;" alt="The first half of the image shows @mui/material and @mui/base as component libraries, and @mui/system and styled engines as styling solutions, both under the MUI Core umbrella. The second half shows @mui/x-data-grid and @mui/x-date-pickers as components from MUI X."/>

In this article, we'll only cover the MUI Core packages.
Check the [MUI X overview](/x/advanced-components) for more information about our collection of advanced components.

## Component libraries

### Material UI

Material UI is a comprehensive library of components that features our implementation of Google's Material Design system. It has `@mui/system` and `@mui/base` as dependencies, meaning you don't need to install or import them seperately—importing any modules you need from `@mui/material` itself will work.

### MUI Base

MUI Base is our library of "unstyled" components and low-level hooks.
With Base, you gain complete control over your app's CSS and accessibility features.

Check [the documentation](/base/getting-started/installation) to get started with it right way.

### Using them together

Let's imagine we're working on an application that mainly uses `@mui/material` with a custom theme and we've been given a Switch component design to develop that looks very different from the one found in Material Design.
In this case, instead of overriding the `Switch` from `@mui/material` we could use the `styled` API to customize the unstyled version of the Switch, available in `@mui/base`, from scratch:

```js
import { styled } from '@mui/material/styles';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';

const Root = styled('span')(`
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;

  & .${switchUnstyledClasses.track} {
    // ...css
  }

  & .${switchUnstyledClasses.thumb} {
    // ...css
  }
`);

export default function CustomSwitch() {
  const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };

  return <SwitchUnstyled component={Root} {...label} />;
}
```

## Styling

### Styled engines

Styled engines come in two packages:

- `@mui/styled-engine`: an [emotion](https://emotion.sh/docs/styled) wrapper.
- `@mui/styled-engine-sc`: a [styled-components](https://styled-components.com/docs/basics#getting-started) wrapper.

They were introduced in MUI Core's v5 to unlock more styling possibilities and enhanced customization features.
It refers specifically to stylesheet generation (CSS-in-JS).

These adapters unify the APIs of both `emotion` and `styled-components`, and you can choose to use whichever suits you best.
The previous style library `@mui/styles` (JSS wrapper) is deprecated and will be removed in the future.

In any case, it's likely that you won't interact much with these as they're used internally in `@mui/system`.
Check [the RFC](https://github.com/mui/material-ui/issues/22342) to learn more about v5's styling solution change.

### MUI System

MUI System is a collection of CSS utilities to help you rapidly lay out custom designs.
It uses the emotion adapter (`@mui/styled-engine`) as the default styled-engine to create the CSS utilities.

Using MUI system:

- You have full control of the `theme` object.
- You can use `sx` prop normally as the `styled` API supports it by default.
- You can have themeable components by using `styled` via slots and variants.

> **Note**: To use it, you will have to install either `emotion` or `styled-components`, because the respective styled-engine package depends on it.

<img src="/static/images/packages/mui-system.png" style="width: 796px; margin-top: 4px; margin-bottom: 8px;" alt="A diagram showing an arrow going from @mui/system to @mui/styled-engine, with a note that it is the default engine. Then, from @mui/styled-engine a solid arrow points to @emotion/react and @emotion/styled while a dashed arrow points to @mui/styled-engine-sc, which points to styled-components." />

If you want to switch the styled-engine to use styled-components, [follow this guide](/material-ui/guides/styled-engine/#how-to-switch-to-styled-components).
