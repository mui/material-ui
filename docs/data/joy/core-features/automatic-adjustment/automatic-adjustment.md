# Automatic adjustment

<p class="description">Joy components are able to adapt to have the best look when they are composed together.</p>

Joy components can adjust themselves to make the appearance looks great while preserving the correct semantics.

## Visual appearance

It is sometimes frustrated when you compose multiple components together, eg. putting an icon or a button inside a text input, and they are not aligned perfectly. You might have to adjust the margin or lower the border radius by a few pixels. These hacks become problems when there are changes on the design which consume a lot of time from developers.

Joy wants to spark the developer experience by taking care of the integration between components so that developers don't have to style each component the make them perfectly aligned.

:::info
Joy relies heavily on CSS variables so that these built-in integration does not prevent developers from usual customization experience.
:::

To give you an idea of what it looks like, here are some common examples:

### Input

It can adjust the size of the icons or the buttons when they are used as a decorators.

{{"demo": "InputIntegration.js"}}

Moreover, Joy guarantees that the spacing and the radius follows the input if you customize the variable.

{{"demo": "InputChildHeight.js"}}

### List

Nested list is another example that can cause headache to developers when it comes to styling. Joy makes the customization easier and simpler by introducing meaningful variables that you can change right inside the devtool.

{{"demo": "ListThemes.js", "bg": true}}

## HTML semantics

Some components will adapt the html tag output based on the context that they are in.

For example:

- The nested `Typography` will render as `span` to have the correct markup when it is used like this:

  ```js
  <Typography> // 👈 By default, it renders as <p>
    This is a very
      <Typography fontWeight="lg">important</Typography> // automatically render as <span>
    message.
  </Typography>
  ```

- The `ListItem` (by default, an `li`) will render as `div` when the parent `List` is not one of `ul | ol | menu` to follow the correct semantics.
  ```js
  // in some case that you want the same styles as list but not the `ul` tag.
  <List component="div">
    <ListItem> // automatically render as <div>
      ...
    </ListItem>
  </List>
  ```
