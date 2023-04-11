# Understanding MUI packages

<p class="description">An overview of the MUI packages and the relationships between them.</p>

## Overview

- If you want to build a design system based on Material Design, use `@mui/material`.
- If you want to build with components that give you complete control over your app's CSS, use `@mui/base`.
- For CSS utilities to help in laying out custom designs with Material UI or Base UI, use `@mui/system`.

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

### Understanding MUI's products

As a company, MUI maintains a suite of open-source and open-core React UI projects.
These projects live within two product lines: MUI Core and MUI X.

The following chart illustrates how MUI's packages are related to one another:

<img src="/static/images/packages/mui-packages.png" style="width: 600px; margin-top: 4px; margin-bottom: 8px;" alt="The first half of the image shows @mui/material and @mui/base as component libraries, and @mui/system and styled engines as styling solutions, both under the MUI Core umbrella. The second half shows @mui/x-data-grid and @mui/x-date-pickers as components from MUI X." width="1200" height="600" />

In this article, we'll only cover the MUI Core packages.
Visit the [MUI X Overview](/x/introduction/) for more information about our collection of advanced components.

## Component libraries

### Material UI

Material UI is a comprehensive library of components that features our implementation of Google's Material Design.

`@mui/system` is included as dependency, meaning you don't need to install or import it separately—you can import its components and functions directly from `@mui/material`.

### Base UI

[Base UI](/base/getting-started/overview/) is our library of "unstyled" components and hooks.
With Base, you gain complete control over your app's CSS and accessibility features.

The Base package includes prebuilt components with production-ready functionality, along with low-level hooks for transferring that functionality to other components.

### Using them together

Imagine you're working on an application that uses `@mui/material` with a custom theme, and you need to develop a new switch component that looks very different from the one found in Material Design.

In this case, instead of overriding all the styles on the Material UI `Switch` component, you can use the `styled` API to customize the Base `SwitchUnstyled` component from scratch:

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
  const label = { slotProps: { input: { 'aria-label': 'Demo switch' } } };

  return <SwitchUnstyled component={Root} {...label} />;
}
```

## Styling

### Styled engines

Material UI relies on styling engines to inject CSS into your app.
These engines come in two packages:

- `@mui/styled-engine`
- `@mui/styled-engine-sc`

By default, Material UI uses [Emotion](https://emotion.sh/docs/styled) as its styling engine—it's included in the [installation](/material-ui/getting-started/installation/) process.
If you plan to stick with Emotion, then `@mui/styled-engine` is a dependency in your app, and you don't need to install it separately.

If you prefer to use [styled-components](https://styled-components.com/docs/basics#getting-started), then you need to install `@mui/styled-engine-sc` in place of the Emotion packages.
See the [Styled engine guide](/material-ui/guides/styled-engine/) for more details.

In either case, you won't interact much with either of these packages beyond installation—they're used internally in `@mui/system`.

:::warning
Prior to v5, Material UI used `@mui/styles` as a JSS wrapper.
This package is now deprecated and will be removed in the future.
Check out [the guide to migrating from v4 to v5](/material-ui/migration/migration-v4/) to learn how to upgrade to a newer solution.
:::

### MUI System

MUI System is a collection of CSS utilities to help you rapidly lay out custom designs.
It uses the Emotion adapter (`@mui/styled-engine`) as the default style engine to create the CSS utilities.

#### Advantages of MUI System

- You have full control of the `theme` object.
- You can use `sx` prop normally as the `styled` API supports it by default.
- You can have themeable components by using `styled` via slots and variants.

:::warning
To use MUI System, you must install either Emotion or styled-components, because the respective `styled-engine` package depends on it.
:::

<img src="/static/images/packages/mui-system.png" style="width: 600px; margin-top: 4px; margin-bottom: 8px;" alt="A diagram showing an arrow going from @mui/system to @mui/styled-engine, with a note that it is the default engine. Then, from @mui/styled-engine a solid arrow points to @emotion/react and @emotion/styled while a dashed arrow points to @mui/styled-engine-sc, which points to styled-components." width="1200" height="600" />
