# Advanced

<p class="description">Here you can find examples of how you can use the system in your custom components.</p>

## Adding the `sx` prop to your custom components

The `unstable_styleFunctionSx` utility adds the support for the `sx` to your own components.

{{"demo": "pages/system/advanced/StyleFunctionSxDemo.js"}}

### Built-in `sx` from the core

If you are already using the Material-UI's `styled()` wrapper, the easiest way to support the `sx` prop on your custom components is to use the `experimentalStyled()` utility that comes from `@material-ui/core/styles` for creating your custom components. Here is an example of how it can be used:

{{"demo": "pages/system/advanced/ExperimentalStyledDemo.js", "defaultCodeOpen": true}}

## Using standalone system utilities

If you wouldn't like to use the `sx` prop on your custom components, but only some bits from the system, you can use and combine the different style functions available as part of the system.

{{"demo": "pages/system/advanced/CombiningStyleFunctionsDemo.js"}}
