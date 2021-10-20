# Understand MUI packages

<p class="description">An overview of the MUI packages and the relationships between them.</p>

The following is an up-to-date list of `@mui` public packages.

- `@mui/material`
- `@mui/system`
- `@mui/core`
- `@mui/styled-engine`
- `@mui/styled-engine-sc`
- `@mui/styles`

> Other packages, such as `@mui/utils` and `@mui/types`, are used internally in the list above.

**Why does MUI have many packages? Why not just one?**

MUI started as a single package that provides React Material Design components.
However, as the library grew and more people started to use it, we saw an opportunity for breaking the main package down into smaller pieces as there was rising interest for specific use cases such as using a version of the components without styles so one can use its preferred styling method or using the MUI styling API to build their own design systems.

Therefore, abstracting into smaller packages not only allows MUI to grow out of Material Design but also extends how the library can be used by the community, providing more flexibility and customizability.

The packages can be categorized in 3 layers as shown in the picture below.

<img src="/static/images/packages/mui-packages.png" style="width: 700px; max-width: 100%;" />

Let's take a look at each layer to understand how they work together, starting from the bottom:

## Styled engine

This layer is specifically related to stylesheets.
We decided to depend on well-established CSS-in-JS libraries so that we could focus on other important developments.
At this moment, we use `emotion` as the default styled-engine for creating stylesheets.
In addition, we also provide an adapter for people who want to use `styled-components`.

These are the packages in this layer

- `@mui/styled-engine` : an emotion adapter
- `@mui/styled-engine-sc` : a styled-component adapter
- `@mui/styles` : JSS wrapper (`deprecated`)

> These packages are already included in the design system packages, so you don't need to worry about importing them if you're using @mui/material, for example.

## System

There is only one package in this layer - `@mui/system`.
It uses a styled-engine package to provide APIs for building a design system from scratch, for example, `styled` is enhanced to provide more theming capabilities.
Here are some benefits:

- You have full control of the `theme` object.
- `styled` API supports `sx` prop by default.
- Components created by `styled` are themable via slot & variants.

> **Note**: you will have to install `emotion` or `styled-components` as styled-engine because the `system` depends on it.

## Core

The core layer is also known as unstyled components - `@mui/core`.

It provides only the component's functionalities and accessibility features without any styles (CSS). It is very useful if you want to take full control of the styling but don't want to spend time actually building the component from scratch.

Since it does not rely on any styling solution, you can pick a method that fits you the most from pure CSS to a CSS-in-JS library.

For more details, check out the [unstyled component page](/customization/unstyled-components/)

## Design system

This is the most used layer based on npm downloads because it comes with everything from the ground up.

- Theming capabilities (has `@mui/system` as dependency)
- Accessible components and React hooks (has `@mui/core` as dependency)
- Default styles are based on the design language being followed.

Currently, MUI has one package in the design system layer (we'll soon add more, though) which is `@mui/material`.
This package provides components that follow the Material Design guidelines and also re-export necessary APIs from its dependencies.
Since it has `@mui/system` and `@mui/core` as dependencies, you **should not** install or import them separately.
Instead, you should import from `@mui/material` directly.

Let's imagine we're working on an application that mainly uses `@mui/material` with a custom theme and we've been given a Switch component design to develop that is very different from the one found in Material Design.
In that case, instead of overriding the `Switch` from `@mui/material` we could use the `styled` API to customize the unstyled version of the Switch, available in the `@mui/core`, from scratch:

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

## Use-cases

In summary, here's how you can use each package:

- Use `@mui/material` if you want to use the components following the Material Design guidelines.
  > 💡 Always import styling APIs (eg. `ThemeProvider`, `styled`, etc.) from `@mui/material`
- Use `@mui/core` if you want to style the components from scratch using your preferred styling method.
  > 💡 This package can be imported alongside `@mui/material`.
- Use `@mui/system` if you want APIs that enable building your own design system.
