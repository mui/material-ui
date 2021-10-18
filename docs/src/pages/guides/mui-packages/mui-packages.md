# MUI packages

<p class="description">An overview of the MUI packages and the relationships between them.</p>

So far, these are `@mui` public packages.

- `@mui/material`
- `@mui/system`
- `@mui/core`
- `@mui/styled-engine`
- `@mui/styled-engine-sc`
- `@mui/styles`

**Why does MUI have many packages? Why not just one?**

MUI started as a single package that provides React Material Design components.
However, as the library grew and more people start to use it, it became clear that not everyone wants to use everything.
Some people might want to use the components without styles and use their own methods to do the styling.
Some want to use MUI styling API and build their own design system, etc.

Moreover, abstracting into smaller packages allows MUI to grow out of Material Design and provide more design option to the community.

The packages can be categorized in 3 layers as shown in the picture below.

<img src="/static/images/packages/mui-packages.png" style="width: 700px; max-width: 100%;" />

The **bottom** is the internal layer (used by the upper layers). The **middle** layer is composed of the building-blocks that are foundation for building UIs. The **top** layer combines these building-blocks to create a ready-to-use and customizable component library. Let's take a look at each layer starting from the bottom.

## Styled engine

This layer is specifically related to stylesheet.
We decided to depend on well-established css-in-js libraries so that we can focus on other important aspects.
At this moment, we use `emotion` as a default styled-engine for creating stylesheet.
In addition, we also provide an adapter for people who want to use `styled-components`.

These are the packages in this layer

- `@mui/styled-engine` : an emotion adapter
- `@mui/styled-engine-sc` : a styled-component adapter
- `@mui/styles` : JSS wrapper (`deprecated`)

> These packages are used internally in the upper layer, so you don't ever need to import them.

## System

There is only one package in this layer - `@mui/system`.
It uses a styled-engine package to provide APIs for building a design system from scratch, for example, `styled` is enhanced to provide more theming capabilities.
Here are some benefits:

- You have full control of the `theme` object.
- `styled` API supports `sx` prop by default.
- Components created by `styled` are themable via slot & variants.

> **Note**: you will have to use `emotion` or `styled-components` as styled-engine because the `system` depends on it.

## Core

`@mui/core` also known as unstyled components. This layer provides only component functionalities and accessibility features without styles (CSS). This package is useful if you want to take full control of the styling but you don't want to build a component from scratch.

Since it does not rely on any styling solution, you can pick any method from pure CSS to any css-in-js libraries.

For more details, check out the [unstyled component page](/customization/unstyled-components/)

## Design system

This is the most used layer based on npm downloads because it comes with everything from the ground up.

- Theming capabilities (has `@mui/system` as dependency)
- Accessible components and React hooks (has `@mui/core` as dependency)
- Default styles based on the design principle or guideline

Currently, MUI has one package in the design system layer, `@mui/material`.
This package provides components that follow the Material Design guidelines and also re-export necessary APIs from its dependencies.
Since it has `@mui/system` and `@mui/core` as dependencies, you **should not** install or import them separately.
Instead, you should import from `@mui/material` directly.

However, there might be a case where you want to use a component from `@mui/core`.
For example, you mainly use `@mui/material` throughout your application with your custom theme but the design of a switch you have is quite different from the Material Design guidelines.
So, instead of overriding the `Switch` from `@mui/material` package, you can use the `styled` API to customize `@mui/core` Switch from scratch like this:

```js
import { styled } from '@mui/material/styles';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/core/SwitchUnstyled';

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

> **Note**: there is no need to install `@mui/core` additionally because it already comes with the design system package.

## Summary

- use `@mui/material` if you want to get started with Material design components.
  > 💡 Always import styling APIs (eg. `ThemeProvider`, `styled`, etc.) from `@mui/material`
- use `@mui/core` if you want to style the component from scratch.
  > 💡 This package can be imported along side with `@mui/material`.
- use `@mui/system` if you want to build your own design system.
