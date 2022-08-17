# Automatic adjustment

<p class="description">Learn how Joy UI components adapt to one another when composed together to assure the best look and feel.</p>

It's often common to see slight misalignments when composing different components together, for example adding an icon or button inside an input. That's when you'd be probably adjusting pixels by a few nudges to get it just right.

However, these small changes eventually build up to become a problem, not only because it can be cumbersome to do them often but also because it creates a lot of inconsistencies.

That's why we've built Joy UI to heavily rely on CSS variables that take care of these adjustments, bumping up the developer experience as it works under the hood to make the components align perfectly.

Let's look through a few examples:

## Examples

### Input

The `Input` component adjusts its icon's or button's size when they're used as decorators.

{{"demo": "InputIntegration.js"}}

If you customize their CSS variables, Joy UI secures that their spacing and radii follow those of the input.

{{"demo": "InputVariables.js"}}

### List

Nested lists are a common source of frustration when it comes to styling. Again leveraging CSS variables, Joy UI takes care of the customization heavy-lifting by introducing meaningful variables that you can play around with direct from the browser's inspector window.

{{"demo": "ListThemes.js"}}

## HTML semantics

Joy UI components will also adapt the HTML output tag based on the context that they are in.

For example:

- The nested `Typography` component will render as a `span` when in this situation (which is the correct markup):

  ```js
  <Typography> // 👈 by default, it renders as a <p>
    This is a very
      <Typography fontWeight="lg">important</Typography> // automatically rendering as <span>
    message.
  </Typography>
  ```

- The `ListItem` component, which is by default a `li` tag, will render as a `div` if its parent `List` is not rendered as one of these options: `ul`, `ol`, and/or `menu`－following then the correct semantics:

  ```js
  // in cases that you want the same styles as list but not the `ul` tag.
  <List component="div">
    <ListItem> // automatically rendering as <div>
      ...
    </ListItem>
  </List>
  ```
