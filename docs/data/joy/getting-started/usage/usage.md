# Usage

<p class="description">Learn the basics of using Joy UI components.</p>

## Getting started

The following code snippet demonstrates a simple app that uses the Joy UI [Button](/joy-ui/react-button/) component:

```jsx
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

export default function App() {
  return (
    <CssVarsProvider>
      <Button>Hello World</Button>
    </CssVarsProvider>
  );
}
```

### CssVarsProvider

In the example above, you can see that the Button component is nested within `<CssVarsProvider />`.
This provider unlocks a whole host of customization options powered by CSS variables.
See [Using CSS variables](/joy-ui/customization/using-css-variables/) for more details.
