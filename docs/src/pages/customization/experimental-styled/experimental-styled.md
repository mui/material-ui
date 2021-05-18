# `experimentalStyled()`

<p class="description">Utility for creating styled components, compatible with the Material-UI's core components.</p>

All Material-UI components use the `experimentalStyled()` utility from `@material-ui/core/styles` under the hood.
The utility is build on top of [emotion's `styled()` utility](https://emotion.sh/docs/styled), but provides additional options that can be used for adding some features that are specific to the Material-UI components.
The additional features includes:

- support for [`theme.components[name].styleOverrides`](/customization/theme-components/#global-style-overrides)
- support for [`theme.components[name].variants`](/customization/theme-components/#adding-new-component-variants)
- support for [the `sx` prop](/system/basics/#the-sx-prop)

## What problems does it solve?

The utility can be used as a replacement for emotion's/styled-components' styled() utility.
It aims to solve the same problem, but also provides the following benefits:

1. It uses the default Material-UI's `theme`, if no theme is available in the context.
2. It supports the theme's `styleOverrides` and `variants` to be applied, based on the `name` applied in the options (can be skipped)
3. It adds support for the `sx` prop automatically (can be skipped)
4. It adds by default `shouldForwardProp` option that is taking into account all props used internally in the Material-UI components (can be overriden)

# API

## `experimentalStyled(Component, [options], [muiOptions])(styles) => Component`

### Arguments

1. `Component`: The component that will be wrapped.
2. `options` (_object_ [optional]):

   - `options.shouldForwardProp` (_`(props: string) => boolean`_ [optional]): Indicates whether the `prop` should be forwared to the `Component`.
   - `options.label` (_string_ [optional]): The suffix of the style sheet. Useful for debugging.
   - The other keys are forwarded to the options argument of emotion's [styled([Component], [options])](https://emotion.sh/docs/styled).

3. `muiOptions` (_object_ [optional]):

   - `muiOptions.name` (_string_ [optional]): The key used under `theme.components` for specifying `styleOverrides` and `variants`. Used also for generating the `label`.
   - `muiOptions.slot` (_string_ [optional]): If `Root`, it automatically applies the theme's `styleOverrides` & `variants`
   - `muiOptions.overridesResolver` (_(props: object, styles: Record<string, styles>) => styles_ [optional]): Function that returns styles based on the props and the `theme.components[name]styleOverrides` object.
   - `muiOptions.skipVariantsResolver` (_boolean_): Disables the automatic resolver for the `theme.components[name].variants`
   - `muiOptions.skipSx` (_bool_ [optional]): Disables the `sx` prop on the component.

### Returns

`Component`: The new component created.

# Examples

## Basic usage

{{"demo": "pages/customization/experimental-styled/BasicUsage.js"}}

## Options

{{"demo": "pages/customization/experimental-styled/UsingOptions.js"}}

If you inspect this element with the dev tools, you will notice that the class of the compoent now ends with the `MyTestComponent`, which is the label that we provided. In addition to this, the `color` prop is not propagated to the generated `div` element.

<img src="/static/images/customization/experimental-styled-options.png" alt="dev-tools" width="406" />

## MUI options

{{"demo": "pages/customization/experimental-styled/UsingMuiOptions.js"}}

If you're using TypeScript, you'll need to specify your new component's overrides/variants, using [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

### Removing some MUI feature

If you would like to remove some of the Mui specific features, you can do it like this:

```diff
 const StyledComponent = styled('div', {}, {
   name: 'MuiStyled',
   slot: 'Root',
-  overridesResolver: (props, styles) => styles.root, // disables theme.components[name].styleOverrides
+  skipVariantsResolver: true, // disable theme.components[name].variants
+  skipSx: true, // disable the sx prop
})
```
