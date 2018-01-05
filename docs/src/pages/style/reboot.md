---
components: Reboot
---

# Reboot

You might be familiar with [normalize.css](https://github.com/necolas/normalize.css), a collection of HTML element and attribute style-normalizations.
Material-UI provides a `Reboot` component to kickstart an elegant, consistent, and simple baseline to build upon.

```jsx
import Reboot from 'material-ui/Reboot';

function MyApp() {
  return (
    <div>
      <Reboot />
      {/* The rest of your application */}
    </div>
  );
}

export default MyApp;
```

## Approach

### Page

The `<html>` and `<body>` elements are updated to provide better page-wide defaults. More specifically:
- The margin in all browsers is removed.
- The default Material Design background color is applied.

### Layout

- `box-sizing` is set globally on the `<html>` element to `border-box`.
Every element—including `*::before` and `*::after` are declared to inherit this property, 
which ensures that the declared width of the element is never exceeded due to padding or border.

### Typography

- Font antialiasing is enabled for better display of the Roboto font.
- No base font-size is declared on the `<html>`, but 16px is assumed (the browser default).
