# Automatic adjustment

<p class="description">Joy UI components adapt to one another to ensure consistency across your app without the need to micromanage your CSS.</p>

Joy UI components automatically adjust their styles and DOM structure relative to one another to ensure consistent sizing, spacing, and semantically appropriate HTML throughout your app.

This makes it much faster and more efficient for you to apply pixel-perfect adjustments to your UI without having to worry to about minor inconsistencies between components.

## Style adjustments

Joy UI components adapt their styles relative to the context in which they're rendered.
You can see a few examples of this below.

### Input

When using icons or buttons within an Input component, Joy UI automatically adjusts their size:

{{"demo": "InputIntegration.js"}}

If you customize their respective CSS variables, Joy UI ensures that their spacing and radii follow those of the Input:

{{"demo": "InputVariables.js"}}

### List

Nested lists are a common source of frustration when it comes to styling.
Joy UI's meaningful variables are intended to simplify this process.

Play around with different presets in the demo below to see which CSS variables are customized:

{{"demo": "ListThemes.js"}}

## Structure adjustments

Joy UI components adjust their DOM structure based on their context to ensure that the appropriate HTML tags are used.
Check out a few examples below:

### Typography

The Typography component renders as a `<p>` tag by default.
When a second Typography component is nested inside, it will automatically render as a `<span>`, which is the correct markup in this situation:

```js
<Typography> // the parent Typography renders as a <p>
  This is a very
    <Typography fontWeight="lg">important</Typography> // the child renders as a <span>
  message.
</Typography>
```

### List Item

The List Item component renders as an `<li>` tag by default.
If its parent List component is not a `<menu>`, `<ul>`, or `<ol>`, then the List Item will correct itself and render as a `<div>` instead.

```js
<List component="div">
  <ListItem> // automatically renders as a <div>
    ...
  </ListItem>
</List>
```
