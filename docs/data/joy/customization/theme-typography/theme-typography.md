# Theme typography

<p class="description">Learn about the default theme's typography system and how to customize it.</p>

Joy UI includes a typography system within the theme to help you create consistent text across your application. You can customize the default system or start from scratch depending on your needs.

## Default system

The default system consists of 13 built-in levels:

- `body1` - the baseline typography for the application, used as the default configuration in the [Typography](/joy-ui/react-typography/) and [CssBaseline](/joy-ui/react-css-baseline/) components.
- `body2` through `body5` - can be used for secondary and tertiary information.
- The `h1` to `h6` levels follow the semantic HTML headings.
- The `display1` and `display2` usually appear as taglines for marketing and landing pages.

:::info
🔍 You can hover on each cell in the table below to see the preview value.
:::

{{"demo": "TypographyThemeViewer.js", "bg": "inline"}}

:::info
[CSS Baseline](/joy-ui/react-css-baseline/), [Scoped CSS Baseline](/joy-ui/react-css-baseline/#scoping-on-children), and [Typography](/joy-ui/react-typography/) are the only components that consume the theme typography directly.

This ensures that you can customize or even remove the default typography system without affecting other components.
:::

### Customizing the default system

To customize a default level, provide its name as a key and an object containing CSS rules as a value to `theme.typography`.

The example below illustrates the customization of the `display1` level:

{{"demo": "CustomTypographyLevel.js"}}

### Removing the default system

Use `undefined` as a value to remove any unneeded levels:

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

For TypeScript, you must augment the theme structure to exclude the default levels:

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

You can define a new level as a key-value pair in `theme.typography`, where the key is the name of the level and the value is an object containing CSS rules.
The demo below shows how to add a new level called `kbd`:

{{"demo": "NewTypographyLevel.js", "bg": true}}

For TypeScript, you must augment the theme structure to include the new level:

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

- [Typography](/joy-ui/react-typography/) component: use the `level` prop to change between theme typography levels:

  ```jsx
  // use the `theme.typography.body2` styles
  <Typography level="body2">Secondary info</Typography>
  ```

- [CSS Baseline](/joy-ui/react-css-baseline/) component: by default, it applies the `body1` level to the global stylesheet:

  ```jsx
  <CssBaseline />

  // inherits the `theme.typography.body1` styles
  <p>Hello World</p>
  ```

- [`sx`](/joy-ui/customization/approaches/#sx-prop) prop: use `typography: $level` to get the specific theme typography level:

  ```jsx
  // to apply the `theme.typography.body2` styles:
  <Box sx={{ typography: 'body2' }}>Small text</Box>
  ```

- [`styled`](/joy-ui/customization/approaches/#reusable-component): create a custom component and apply the style from `theme.typography.*` directly:

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

Here is a collection of well-known typography systems that you can use with Joy UI.
Feel free to [submit a PR](https://github.com/mui/material-ui/compare) to add your favorite if it's not here. ❤️

### Microsoft's Fluent

- Design resource: [Figma](https://www.figma.com/community/file/836828295772957889)
- Font: [Segoe UI](https://learn.microsoft.com/en-us/typography/font-list/segoe-ui)

<iframe src="https://codesandbox.io/embed/joy-ui-fluent-typography-system-j86fct?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 12px; overflow:hidden;"
     title="Joy UI - Fluent Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Apple's Human Interface Guidelines

- Design resource: [Sketch library](https://developer.apple.com/design/resources/)
- Font: [San Francisco (SF)](https://developer.apple.com/fonts/)

<iframe src="https://codesandbox.io/embed/joy-ui-human-interface-guidelines-typography-system-lkuz4d?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:320px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI - Human Interface Guidelines Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Google's Material Design 3

- Design resource: [Figma](https://www.figma.com/community/file/1035203688168086460)
- Font: [Roboto](https://fonts.google.com/specimen/Roboto)

<iframe src="https://codesandbox.io/embed/joy-ui-material-3-typography-system-lx044f?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 12px; overflow:hidden;"
     title="Joy UI - Joy UI - Material 3 Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
