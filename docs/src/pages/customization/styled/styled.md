# `experimentalStyled()`

<p class="description">Utility for creating styled components.</p>

## Introduction

All Material-UI components use the `experimentalStyled()` utility from `@material-ui/core/styles` under the hood.
The utility is built on top of [emotion's `styled()` utility](https://emotion.sh/docs/styled) but provides additional options that can be used for adding some features that are specific to Material-UI's components.
The additional features include:

- support for [`theme.components[name].styleOverrides`](/customization/theme-components/#global-style-overrides)
- support for [`theme.components[name].variants`](/customization/theme-components/#adding-new-component-variants)
- support for [the `sx` prop](/system/basics/#the-sx-prop)

### What problems does it solve?

The utility can be used as a replacement for emotion's or styled-components' styled() utility.
It aims to solve the same problem, but also provides the following benefits:

1. It uses Material-UI's default `theme` if no theme is available in React context.
2. It supports the theme's `styleOverrides` and `variants` to be applied, based on the `name` applied in the options (can be skipped).
3. It adds support for the `sx` prop automatically (can be skipped).
4. It adds by default `shouldForwardProp` option that is taking into account all props used internally in the Material-UI components (can be overridden).

## API

### `experimentalStyled(Component, [options], [muiOptions])(styles) => Component`

#### Arguments

1. `Component`: The component that will be wrapped.
2. `options` (_object_ [optional]):

   - `options.shouldForwardProp` (_`(props: string) => boolean`_ [optional]): Indicates whether the `prop` should be forwarded to the `Component`.
   - `options.label` (_string_ [optional]): The suffix of the style sheet. Useful for debugging.
   - `options.name` (_string_ [optional]): The key used under `theme.components` for specifying `styleOverrides` and `variants`. Also used for generating the `label`.
   - `options.slot` (_string_ [optional]): If `Root`, it automatically applies the theme's `styleOverrides` & `variants`.
   - `options.overridesResolver` (_(props: object, styles: Record<string, styles>) => styles_ [optional]): Function that returns styles based on the props and the `theme.components[name]styleOverrides` object.
   - `options.skipVariantsResolver` (_boolean_): Disables the automatic resolver for the `theme.components[name].variants`.
   - `options.skipSx` (_bool_ [optional]): Disables the `sx` prop on the component.
   - The other keys are forwarded to the `options` argument of emotion's [`styled([Component], [options])`](https://emotion.sh/docs/styled).

#### Returns

`Component`: The new component created.

## Basic usage

{{"demo": "pages/customization/styled/BasicUsage.js", "defaultCodeOpen": true}}

## Options

{{"demo": "pages/customization/styled/UsingOptions.js", "defaultCodeOpen": true, "iframe": true }}

If you inspect this element with the browser DevTools, you will notice that the class of the component now ends with the `MyTestComponent-root`, which comes from the `name` and `slot` options that were provided. In addition to this, the `color` and `variant` props are not propagated to the generated `div` element.

<img src="/static/images/customization/styled-options.png" alt="Developer tools showing the rendered component" width="312" />

### Removing some Material-UI feature

If you would like to remove some of the Material-UI specific features, you can do it like this:

```diff
const StyledComponent = styled('div', {}, {
   name: 'MuiStyled',
   slot: 'Root',
-  overridesResolver: (props, styles) => styles.root, // disables theme.components[name].styleOverrides
+  skipVariantsResolver: true, // disable theme.components[name].variants
+  skipSx: true, // disable the sx prop
})
```
