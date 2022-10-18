# Theme typography

<p class="description">Learn about the typography system and how to customize it.</p>

Joy UI ships a typography system to the theme to help you create consistent texts across your application. You are able to customize the default system or start from scratch depending on your need.

## Default system

It consists of built-in levels that are common to many types of application.

- The `body1` level is the **baseline** typography for the application (used as a default configuration in `Typography` and `CssBaseline` components).
- The `body2` to `body5` levels are responsible for secondary and tertiary information.
- The `h*` levels are mostly headlines that follow semantic HTML headings.
- The `display*` levels usually appear as taglines for marketing and landing pages.

{{"demo": "DefaultTypographySystem.js"}}

:::success
**Gotcha**: The `CssBaseline` and `Typography` are the only 2 components that consume the theme typography directly.

This ensures that you can customize or even remove the default typography system without affecting other components.
:::

### Customize the default system

Provide the style to the key inside the `typography` node, it will override the default value of that system.

The example below illustrates the customization of the `display1` typography:

{{"demo": "CustomTypographyLevel.js"}}

:::info
**Keep in mind**: `--joy` is the default CSS variable prefix. If you have a [custom prefix](/joy-ui/customization/using-css-variables/#custom-prefix), you have to use it instead.
:::

### Remove the default system

Provide `undefined` as a value to the levels that you want to remove:

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

To remove them from the theme typings, use module augmentation:

```ts
// You can put this to any file that is included in your tsconfig
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    h5: false;
    h6: false;
    body4: false;
    body5: false;
  }
}
```

## Add more levels

Provide the new level as a key to the `theme.typography` and specify the style as a value.

{{"demo": "MoreTypographyLevel.js", "bg": true}}

For **TypeScript**, you have to add the new levels to the theme typings via module augmentation:

```ts
// You can put this to any file that is included in your tsconfig
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    kbd: true;
  }
}
```

## Usage

These are several ways that you can use the theme typography in your application:

- [**Typography**](/joy-ui/react-typography/) component: you can use the `level` prop to change to other levels.

  ```jsx
  <Typography level="body2">Secondary info</Typography> {/* has the `body2` style */}
  ```

- [**CssBaseline**](/joy-ui/react-css-baseline/) component: by default, it applies the `body1` level to the global stylesheet.

  ```jsx
  <CssBaseline />

  <p>Hello World</p> {/* inherits the `body1` typography level */}
  ```

- **sx** prop: you can use the `typography: $level` inside the `sx` prop.

  ```jsx
  <Box sx={{ typography: 'body2' }}>Small text</Box>
  ```

- **styled**: you can create a custom component and use the `theme.typography` directly.

  ```jsx
  const Tag = styled('span')((theme) => ({
    ...theme.typography.body2,
    color: 'inherit',
    borderRadius: theme.vars.radius.xs,
    boxShadow: theme.vars.shadow.sm,
    padding: '0.125em 0.375em',
  }));
  ```

## Ready-to-use typography

Here is a collection of the well-known typography systems that you can copy and paste to Joy UI theme.

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

### Material Design (Google)

- Design resource: [Figma](https://www.figma.com/community/file/1035203688168086460)
- Font: [Roboto](https://fonts.google.com/specimen/Roboto)

<iframe src="https://codesandbox.io/embed/joy-ui-material-3-typography-system-lx044f?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Joy UI - Joy UI - Material 3 Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

:::success
Feel free to [submit a PR](https://github.com/mui/material-ui/compare) to add more examples to the list! We can't wait to see what's your favorite one ❤️.
:::
