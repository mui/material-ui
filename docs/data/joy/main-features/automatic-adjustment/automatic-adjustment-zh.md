# Automatic adjustment

<p class="description">Joy UI components adapt to one another when composed together to ensure the best look and feel.</p>

When composing a UI of multiple, especially nested, components, oftentimes you get small inconsistencies between them. That's probably when you'll be adjusting pixels by a few nudges here and there to get them just right. Over time, these small and arbitrary changes build up to become a problem.

That's why we've built Joy UI to heavily rely on CSS variables, assigning to them the heavy lifting for these small adjustments. It saves you time and ensures consistency. Let's look through a few examples:

## Examples of style adjustments

### Input

When using icons or buttons within an `Input`, Joy UI will automatically adjust their size.

{{"demo": "InputIntegration.js"}}

If you customize their CSS variables, Joy UI secures that their spacing and radii follow those of the input.

{{"demo": "InputVariables.js"}}

### List

Nested lists are a common source of frustration when it comes to styling. Joy UI's meaningful variables take care of that for you.

Play around with different presets to see which CSS variables are customized.

{{"demo": "ListThemes.js"}}

## Ensuring semantic HTML

Joy UI components will also adapt the HTML tag that a given component is rendered with based on the context that they are in. For example:

- This nested `Typography` component will automatically render as a `span` when in this situation (which is the correct markup):

  ```js
  <Typography> // 👈 the parent Typography, by default, renders as a <p>
    This is a very
      <Typography fontWeight="lg">important</Typography> // automatically renders as <span>
    message.
  </Typography>
  ```

- The `ListItem` component, which is by default a `li` tag, will render as a `div` if its parent `List` is not rendered as one of these options: `ul`, `ol`, and/or `menu`－following then, the correct semantics:

  ```js
  // in cases that you want the same styles as list but not the `ul` tag.
  <List component="div">
    <ListItem> // automatically rendering as <div>
      ...
    </ListItem>
  </List>
  ```
