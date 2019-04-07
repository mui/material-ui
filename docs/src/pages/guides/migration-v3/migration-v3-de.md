# Migration From v3 to v4

<p class="description">Yeah, v4 alpha has been released!</p>

Looking for the v3 docs? [Find them here](https://material-ui.com/versions/).

> This document is a work in progress. Have you upgraded your site and run into something that's not covered here? [Add your changes on GitHub](https://github.com/mui-org/material-ui/blob/next/docs/src/pages/guides/migration-v3/migration-v3.md)

## Introduction

This is a reference for upgrading your site from Material-UI v3 to v4. While there's a lot covered here, you probably won't need to do everything for your site. We'll do our best to keep things easy to follow, and as sequential as possible so you can quickly get rocking on v4!

## Why you should migrate

This documentation page covers the *how* of migrating from v3 to v4. The *why* is covered in the release blog post: [*Work in progress, on Medium*](https://medium.com/material-ui).

## Updating Your Dependencies

The very first thing you will need to do is update your dependencies.

### Update Material-UI version

You need to update your `package.json` to use the latest version of Material-UI.

```json
"dependencies": {
  "@material-ui/core": "^4.0.0-alpha.0"
}
```

Oder führe aus

```sh
npm install @material-ui/core@next

or

yarn add @material-ui/core@next
```

### Update React version

The minimum required version of React was increased from `react@^16.3.0` to `react@^16.8.0`. This allows us to rely on [Hooks](https://reactjs.org/docs/hooks-intro.html).

## Handling Breaking Changes

### Grundlegendes

- Every component forward their ref. This is implemented by using `React.forwardRef()`. This affects the internal component tree and display name and therefore might break shallow or snapshot tests. `innerRef` will no longer return a ref to the instance (or nothing if the inner component is a function component) but a ref to its root component. The corresponding API docs list the root component.

### Stile

- Isolation of the styling solution of the core components in a dedicated package. Remove the `MuiThemeProvider` component:
  
  ```diff
  -import { MuiThemeProvider } from '@material-ui/core/styles';
  +import { ThemeProvider } from '@material-ui/styles';
  ```

- Remove the first option argument of `withTheme()`. The first argument was a placeholder for a potential future option. We have never found a need for it. It's time to remove this argument. It matches the emotion and styled-components API.
  
  ```diff
  -const DeepChild = withTheme()(DeepChildRaw);
  +const DeepChild = withTheme(DeepChildRaw);
  ```

- Richten Sie die Keyframes-API ein. Sie sollten die folgenden Änderungen in Ihrer Codebase anwenden. Es hilft, die Animationslogik zu isolieren:
  
  ```diff rippleVisible: { opacity: 0.3,

- animation: 'mui-ripple-enter 100ms cubic-bezier(0.4, 0, 0.2, 1)',
- animation: `$mui-ripple-enter 100ms cubic-bezier(0.4, 0, 0.2, 1)`, }, '@keyframes mui-ripple-enter': { '0%': { opacity: 0.1, }, '100%': { opacity: 0.3, }, }, ```

### Theme

- The `theme.palette.augmentColor()` method no longer performs a side effect on its input color. To use it correctly, you have to use the returned value.
  
  ```diff
  -const background = { main: color };
  -theme.palette.augmentColor(background);
  +const background = theme.palette.augmentColor({ main: color });
  
  console.log({ background });
  ```

- You can safely remove the next variant from the theme creation:
  
  ```js
  typography: {
    useNextVariants: true,
  },
  ```

### Typografie

- [Typography] Remove the deprecated typography variants. You can upgrade by performing the following replacements: 
  - display4 => h1
  - display3 => h2
  - display2 => h3
  - display1 => h4
  - headline => h5
  - title => h6
  - subheading => subtitle1
  - body2 => body1
  - body1 (default) => body2 (default)
- [Typography] Remove the opinionated `display: block` default typography style. You can use the new `display?: 'initial' | 'inline' | 'block';` property.
- [Typography] Rename the `headlineMapping` property to `variantMapping` to better align with its purpose.
  
  ```diff
  -<Typography headlineMapping={headlineMapping}>
  +<Typography variantMapping={variantMapping}>
  ```

- [Typography] Change the default variant from `body2` to `body1`. A font size of 16px is a better default than 14px. Bootstrap, material.io or even our documentation use 16px as a default font size. 14px like Ant Design is understandable as Chinese users have a different alphabet. We document 12px as the default font size for Japanese.
- [Typography] Remove the default color from the typography variants. The color should inherit most of the time. It's the default behavior of the web.
- [Typography] Rename `color="default"` to `color="initial"` following the logic of #13028. The usage of *default* should be avoided, it lakes semantic.

### Button

- [Button] Remove the deprecated button variants (flat, raised and fab):
  
  ```diff
  -<Button variant="raised" />
  +<Button variant="contained" />
  ```
  
  ```diff
  -<Button variant="flat" />
  +<Button variant="text" />
  ```
  
  ```diff
  -import Button from '@material-ui/core/Button';
  -<Button variant="fab" />
  +import Fab from '@material-ui/core/Fab';
  +<Fab />
  ```

### TextField

- [InputLabel] You should be able to override all the styles of the FormLabel component using the CSS API of the InputLabel component. The `FormLabelClasses` property has been removed.
  
  ```diff
  <InputLabel
  - FormLabelClasses={{ asterisk: 'bar' } }
  + classes={{ asterisk: 'bar' } }
  >
    Foo
  </InputLabel>
  ```

- [InputBase] Change the default box sizing model. It uses the following CSS now:
  
  ```css
  box-sizing: border-box;
  ```
  
  It solves issues with the `fullWidth` prop.

### Layout

- [Grid] In order to support arbitrary spacing values and to remove the need to mentally county by 8, we are changing the spacing API:
  
  ```diff
    /**
     * Defines the space between the type `item` component.
     * It can only be used on a type `container` component.
     */
  -  spacing: PropTypes.oneOf([0, 8, 16, 24, 32, 40]),
  +  spacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ```
  
  Going forward, you can use the theme to implement [a custom Grid spacing transformation function](https://material-ui.com/system/spacing/#transformation).

### Tabelle

- [TableCell] Remove the deprecated `numeric` property.
  
  ```diff
  -<TableCell numeric>{row.calories}</TableCell>
  +<TableCell align="right">{row.calories}</TableCell>
  ```

- [TableRow] Remove the fixed height CSS property. The cell height is computed by the browser using the padding and line-height.
- [TableCell] Move the `dense` mode to a different property:
  
  ```diff
  -<TableCell padding="dense" />
  +<TableCell size="small" />
  ```

- [TablePagination] The component no longer tries to fix invalid (`page`, `count`, `rowsPerPage`) property combinations. It raises a warning instead.

### Reiter

- [Tab] Remove the `labelContainer`, `label` and `labelWrapped` class keys for simplicity. This has allowed us to removed 2 intermediary DOM elements. You should be able to move the custom styles to the root class key.
  
  ![capture d ecran 2019-02-23 a 15 46 48](https://user-images.githubusercontent.com/3165635/53287870-53a35500-3782-11e9-9431-2d1a14a41be0.png)

### Menu

- [MenuItem] Remove the fixed height of the MenuItem. The padding and line-height are used by the browser to compute the height.

### Dialog

- [DialogActions] `action` CSS class is applied to root element instead of children if `disableActionSpacing={false}`.
- [DialogContentText] Use typography variant `body1` instead of `subtitle1`.

### Divider

- [Divider] Entfernen Sie die veraltete `inset` Eigenschaft.
  
  ```diff
  - <0 />
  + <1 />
  ```

### SvgIcon

- [SvgIcon] Umbenennung nativeColor -> htmlColor.
  
  React löst dasselbe Problem mit dem`for` HTML-Attribut. Sie haben beschlossen, die Eigenschaft `htmlFor` zu nennen. Diese Änderung folgt den gleichen Überlegungen.
  
  ```diff
  -<0 />
  +<1 />
  ```

### Node

- [Lassen Sie die offizielle Unterstützung für Knoten 6 fallen](https://github.com/nodejs/Release/blob/eb91c94681ea968a69bf4a4fe85c656ed44263b3/README.md#release-schedule); Sie sollten ein Upgrade auf Knoten 8 durchführen.

### UMD

- Diese Änderung erleichtert die Verwendung von Material-UI mit einem CDN:
  
  ```diff
  const {
    Button,
    TextField,
  -} = window['material-ui'];
  +} = MaterialUI;
  ```
  
  Es stimmt mit den anderen React-Projekten überein:
  
  - material-ui => MaterialUI
  - react-dom => ReactDOM
  - prop-types => PropTypes

### Modal

- [Modal] Ignore event.defaultPrevented (#14991) @oliviertassinari
  
  The new logic closes the Modal even if `event.preventDefault()` is called on the key down escape event. `event.preventDefault()` is meant to stop default behaviors like clicking a checkbox to check it, hitting a button to submit a form, and hitting left arrow to move the cursor in a text input etc. Only special HTML elements have these default behaviors. People should use `event.stopPropagation()` if they don't want to trigger a `onClose` event on the modal.