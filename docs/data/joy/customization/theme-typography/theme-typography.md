# Theme typography

<p class="description">Learn about the typography system and how to customize it.</p>

Joy UI ships a typography system to the theme to help you create consistent texts across your application. You are able to customize the default system or start from scratch depending on your need.

## Default system

It consists of 13 built-in levels that are comprehensive for building a web application.

- The `body1` level is the **baseline** typography for the application (used as a default configuration in [`Typography`](/joy-ui/react-typography/) and [`CssBaseline`](/joy-ui/react-css-baseline/) components).
- The `body2` to `body5` levels can be used for secondary and tertiary information.
- The `h1` to `h6` levels follow the semantic HTML headings.
- The `display1` and `display2` usually appear as taglines for marketing and landing pages.

{{"demo": "DefaultTypographySystem.js"}}

:::success
**Gotcha**: The [`CssBaseline`](/joy-ui/react-css-baseline/), [`ScopedCssBaseline`](/joy-ui/react-css-baseline/#scoping-on-children) and [`Typography`](/joy-ui/react-typography/) are the only components that consume the theme typography directly.

This ensures that you can customize or even remove the default typography system without affecting other components.
:::

### Customizing the default system

Provide the key and a CSS object to `theme.typography` to override the default style.

The example below illustrates the customization of the `display1` level:

{{"demo": "CustomTypographyLevel.js"}}

### Removing the default system

Use `undefined` as a value to the levels that you want to remove:

```js
const customTheme = extendTheme({
  typography: {
    h5: undefined,
    h6: undefined,
    body4: undefined,
    body5: undefined,
  },
});
```

For **TypeScript**, you need to augment the theme structure to exclude the default levels:

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    h5: false;
    h6: false;
    body4: false;
    body5: false;
  }
}
```

## Adding more levels

Provide the new level as the key and a CSS object value to the `theme.typography`.

{{"demo": "MoreTypographyLevel.js", "bg": true}}

For **TypeScript**, you need to augment the theme structure to include the new level:

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    kbd: true;
  }
}
```

## Usage

There are several ways that you can use the theme typography in your application:

- [Typography](/joy-ui/react-typography/) component: use the `level` prop to change to between theme typography levels.

  ```jsx
  // use the `theme.typography.body2` styles
  <Typography level="body2">Secondary info</Typography>
  ```

- [CssBaseline](/joy-ui/react-css-baseline/) component: by default, it applies the `body1` level to the global stylesheet.

  ```jsx
  <CssBaseline />

  // inherits the `theme.typography.body1` styles
  <p>Hello World</p>
  ```

- [`sx`](/joy-ui/customization/approaches/#sx-prop) prop: use `typography: $level` to get the specific theme typography level.

  ```jsx
  // use the `theme.typography.body2` styles
  <Box sx={{ typography: 'body2' }}>Small text</Box>
  ```

- [`styled`](/joy-ui/customization/approaches/#reusable-component): create a custom component and apply the style from `theme.typography.*` directly.

  ```jsx
  import { styled } from '@mui/joy/styles';

  const Tag = styled('span')((theme) => ({
    ...theme.typography.body2,
    color: 'inherit',
    borderRadius: theme.vars.radius.xs,
    boxShadow: theme.vars.shadow.sm,
    padding: '0.125em 0.375em',
  }));
  ```

## Common examples

Here is a collection of well-known typography systems that you can get-started with Joy UI.

### Fluent (Microsoft)

- Design resource: [Figma](https://www.figma.com/community/file/836828295772957889)
- Font: [Segoe UI](https://learn.microsoft.com/en-us/typography/font-list/segoe-ui)

<iframe src="https://codesandbox.io/embed/joy-ui-fluent-typography-system-j86fct?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI - Fluent Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Human interface guidelines (Apple)

- Design resource: [Sketch library](https://developer.apple.com/design/resources/)
- Font: [San Francisco (SF)](https://developer.apple.com/fonts/)

<iframe src="https://codesandbox.io/embed/joy-ui-human-interface-guidelines-typography-system-lkuz4d?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:320px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI - Human Interface Guidelines Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Material Design 3 (Google)

- Design resource: [Figma](https://www.figma.com/community/file/1035203688168086460)
- Font: [Roboto](https://fonts.google.com/specimen/Roboto)

<iframe src="https://codesandbox.io/embed/joy-ui-material-3-typography-system-lx044f?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI - Joy UI - Material 3 Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

:::success
Feel free to [submit a PR](https://github.com/mui/material-ui/compare) to add your favorite typography system ❤️.
:::
