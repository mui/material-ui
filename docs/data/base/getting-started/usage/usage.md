# MUI Base - Usage

<p class="description">Learn the basics of working with MUI Base components.</p>

## Getting started

The following code snippet demonstrates a simple app that uses the MUI Base `ButtonUnstyled` component:

```jsx
import * as React from "react";
import ReactDOM from "react-dom";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";

function App() {
  return (
    <div>
      <ButtonUnstyled variant="contained" color="primary">
        Hello World
      </ButtonUnstyled>
    </div>
  );
}
```

You can play around with this code in the interactive Code Sandbox demo below.
Try adding an `InputUnstyled` component inside of the `<div>`:

{{"demo": "Usage.js", "hideToolbar": true, "bg": true}}

## Shared props

Base components are self-supporting and fully functional in isolation.
Each component has its own unique API, but all components accept the following common props:

- `components` - an object that allows you to override subcomponents (slots) used by the unstyled "host" component. Each host component will at least have the `Root` slot. Many complex components have more slots. You can either provide a custom component or an HTML tag there.

  ```jsx
  <BadgeUnstyled components={{ Root: 'div', Badge: MyCustomBadge }} />
  ```

- `component` - a shortcut to `components.Root`. Note that if both `components.Root` and `component` are specified, `component` takes precedence.

  ```jsx
  <BadgeUnstyled component="div" />
  ```

- `componentsProps` - an object with each slot's props. Even if you don't override a specific slot (with `components` or `component`), you can provide additional props for the default components. For example, if you want to add a custom CSS class to one of the slots' components, specify it in the `componentsProps`.

  ```jsx
  <BadgeUnstyled componentsProps={{ input: { className: 'my-badge' } }} />
  ```

Additionally, all the extra props placed on the host component are propagated into the root component (just as if they were placed in `componentsProps.root`).
These two examples are equivalent:

```jsx
<BadgeUnstyled id="badge1">
```

```jsx
<BadgeUnstyled componentsProps={{ root: { id: 'badge1' } }}>
```
