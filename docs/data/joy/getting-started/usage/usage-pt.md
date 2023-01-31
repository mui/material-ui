# Usage

<p class="description">Learn the basics of using Joy UI components in two quick steps.</p>

## Getting started

### Set up the `CssVarsProvider` component

Go to your `App.js` file and replace it with the code snippet below. You should see the text `Hello with joy` being rendered on your browser.

```jsx
import { CssVarsProvider } from '@mui/joy/styles';

function MyApp() {
  return <CssVarsProvider>Hello from Joy</CssVarsProvider>;
}

export default App;
```

### Render your first component

To render any Joy UI component, make sure you place them inside the `CssVarProvider` element.

```diff
import { CssVarsProvider } from '@mui/joy/styles';
+ import Button from '@mui/joy/Button';

function MyApp() {
  return (
    <CssVarsProvider>
+     <Button>Joy UI</Button>
    </CssVarsProvider>
  );
}

export default App;
```

It's that fast to have your first app with Joy UI going!
