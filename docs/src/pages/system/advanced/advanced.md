# Advanced

<p class="description">Here you can find examples of how you can use the system on your custom components.</p>

## Adding the `sx` prop on your custom components

The easiest way to support the `sx` prop on your custom components is to use the `experimentalStyled()` utility that comes from `@material-ui/core/styles` for creating your custom components. Here is an example of how it can be use:

{{"demo": "pages/system/advanced/ExperimentalStyledDemo.js"}}

## Use the `unstable_styleFuntionSx` utility

The `experimentalStyled()` offers other functionalities, like access to default theme, as well as access to the theme overrides and variants. If you would not like to use these utility, you may use the lighter version of utility for adding the `sx` utility on your custom components - the `unstable_styleFunctionSx` utility.

{{"demo": "pages/system/advanced/StyleFunctionSxDemo.js"}}

## Using standalone system utilities

If you wouldn't like to use the `sx` prop on your custom components, but only some bits from the system, you can use and combine the different style function available as part of the system.

{{"demo": "pages/system/advanced/CombiningStyleFunctionsDemo.js"}}
