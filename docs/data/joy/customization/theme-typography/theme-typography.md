# Theme typography

<p class="description">Learn about the default theme's typography system and how to customize it.</p>

## Default system

Joy UI's default theme includes a built-in typography system of 11 distinct levels—including semantic HTML headers as well as a comparable system for body text—to help you ensure consistency across your interface.

{{"demo": "TypographyThemeViewer.js", "bg": "inline"}}

:::info
[CSS Baseline](/joy-ui/react-css-baseline/), [Scoped CSS Baseline](/joy-ui/react-css-baseline/#scoping-on-children), and [Typography](/joy-ui/react-typography/) are the only components that consume the theme typography directly, ensuring you can customize or even remove the default typography system without affecting other components.
:::

### Usage

There are several ways that you can use the theme typography in your application:

#### Typography component

Use the `level` prop in the [Typography](/joy-ui/react-typography/) component:

```jsx
// use the `theme.typography['body-sm']` styles
<Typography level="body-sm">Secondary info</Typography>
```

#### CSS Baseline

The [CSS Baseline](/joy-ui/react-css-baseline/) component applies `body-md` as the default level on the global stylesheet:

```jsx
<CssBaseline />

// inherits the `theme.typography['body-md']` styles
<p>Hello World</p>
```

#### sx prop

Customize the typographic styles via the `sx` prop using `typography: 'some-level'`:

```jsx
// to apply the `theme.typography['body-sm']` styles:
<Box sx={{ typography: 'body-sm' }}>Small text</Box>
```

#### Applying theme styles to custom components

Use the [`styled`](/joy-ui/customization/approaches/#reusable-component) function to create a custom component and apply styles from `theme.typography.*`:

```jsx
import { styled } from '@mui/joy/styles';

const Tag = styled('span')((theme) => ({
  ...theme.typography['body-sm'],
  color: 'inherit',
  borderRadius: theme.vars.radius.xs,
  boxShadow: theme.vars.shadow.sm,
  padding: '0.125em 0.375em',
}));
```

## Customizations

To customize a default level, provide its name as a key along with an object containing the CSS rules as a value to the `theme.typography` node.

The example below illustrates the customization of the `h1` level:

{{"demo": "CustomTypographyLevel.js"}}

### Removing the default system

Use `undefined` as a value to remove any unwanted levels:

```js
const customTheme = extendTheme({
  typography: {
    'title-sm': undefined,
    'title-xs': undefined,
  },
});
```

For TypeScript, you must augment the theme structure to exclude the default levels:

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    'title-sm': false;
    'title-xs': false;
  }
}
```

### Adding more levels

To add a new level, define it as a key-value pair in the `theme.typography` node, where the key is the name of the new level and the value is an object containing the CSS rules.

The demo below shows how to add a new level called `kbd`:

{{"demo": "NewTypographyLevel.js"}}

For TypeScript, you must augment the theme structure to include the new level:

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    kbd: true;
  }
}
```

### Changing the default font

Joy UI uses the [Inter](https://rsms.me/inter/) font by default.
To change it, override the theme's `fontFamily` property:

```js
extendTheme({
  fontFamily: {
    display: 'Noto Sans', // applies to `h1`–`h4`
    body: 'Noto Sans', // applies to `title-*` and `body-*`
  },
});
```

## Common examples

Here is a collection of well-known typography systems that you can use with Joy UI.
Feel free to [submit a PR](https://github.com/mui/material-ui/compare) to add your favorite if it's not here. ❤️

### Microsoft's Fluent

- Design resource: [Figma](https://www.figma.com/community/file/836828295772957889/microsoft-fluent-2-web)
- Font: [Segoe UI](https://learn.microsoft.com/en-us/typography/font-list/segoe-ui)

<iframe src="https://codesandbox.io/embed/joy-ui-fluent-typography-system-j86fct?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:360px; border:0; border-radius: 12px; overflow:hidden;"
     title="Joy UI - Fluent Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Apple's Human Interface Guidelines

- Design resource: [Sketch library](https://developer.apple.com/design/resources/)
- Font: [San Francisco (SF)](https://developer.apple.com/fonts/)

<iframe src="https://codesandbox.io/embed/joy-ui-human-interface-guidelines-typography-system-lkuz4d?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:320px; border:0; border-radius: 12px; overflow:hidden;"
     title="Joy UI - Human Interface Guidelines Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Google's Material Design 3

- Design resource: [Figma](https://www.figma.com/community/file/1035203688168086460/material-3-design-kit)
- Font: [Roboto](https://fonts.google.com/specimen/Roboto)

<iframe src="https://codesandbox.io/embed/joy-ui-material-3-typography-system-lx044f?module=%2Fdemo.tsx&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 12px; overflow:hidden;"
     title="Joy UI - Joy UI - M3 Typography System"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
