# Advanced

<p class="description">Here you can find examples of how you can use the system in your custom components.</p>

## Adding the `sx` prop to your custom components

The `unstable_styleFunctionSx` utility adds the support for the `sx` to your own components. Normally you would use the `Box` components from `@material-ui/core` as the root of your component tree. If you would like to use it independently from Material-UI, this utility will give you the same capabilities, while having a smaller bundle size.

{{"demo": "pages/system/advanced/StyleFunctionSxDemo.js"}}

## Using standalone system utilities

If you wouldn't like to use the `sx` prop on your custom components, but only some bits from the system, you can use and combine the different style functions available as part of the system. You are likely to use this approach if you neeed smaller bundle size and better performance for the price of using a small set of what the `sx` supports.

{{"demo": "pages/system/advanced/CombiningStyleFunctionsDemo.js", "defaultCodeOpen": true}}
