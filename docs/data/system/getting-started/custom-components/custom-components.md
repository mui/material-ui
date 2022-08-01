# Custom components

<p class="description">Learn how to use MUI System with custom components.</p>

## Adding the `sx` prop to your custom components

The `unstable_styleFunctionSx` utility adds the support for the [`sx` prop](/system/basics/#the-sx-prop) to your own components.
Normally you would use the `Box` component from `@mui/material` at the root of your component tree.
If you would like to use the system independently from MUI, the `unstable_styleFunctionSx` utility will give you the same capabilities, while having a smaller bundle size.

{{"demo": "StyleFunctionSxDemo.js"}}

## Using standalone system utilities

If you only need some elements of the system in your custom components, you can directly use and combine the different style functions available, and access them as component props.
You might use this approach if you need smaller bundle size and better performance than using Box, for the price of using a subset of what the [`sx` prop](/system/basics/#the-sx-prop) supports, and a different API.

{{"demo": "CombiningStyleFunctionsDemo.js", "defaultCodeOpen": true}}
