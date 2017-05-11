# Composition

Material-UI tries to make composition as easy as possible.

## Wrapping components

In order to provide the maximum flexibility and performance,
we need a way to know the nature of the child elements a component receives.
To solve this problem we tag some of our components when needed
with a `muiName` static property.

However, users like to wrap components in order to enhance them.
That can conflict with our `muiName` solution.
If you encounter this issue, you need to:
1. Forward the properties.
2. Use the same tag for your wrapping component that is used with the wrapped component.

Let's see an example:

{{demo='pages/guides/Composition.js'}}
