# Usage

Material-UI components require a theme and a style manager to be provided.
You need to use the `<MuiThemeProvider />` component in order to inject them into your application context.
Following that, you can use any of the components as demonstrated in our documentation.

Here is a quick example to get you started:

**./App.js**
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import Root from './Root';

function App() {
  return (
    <MuiThemeProvider>
      <Root />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

**./MyComponent.js**
```jsx
import React from 'react';
import Button from 'material-ui/Button';

export default function MyComponent() {
  return (
    <Button>
      Hello Wolrd
    </Button>
  )
}
```

Please refer to each component's [demo page](/component-demos) to see how they should be imported.
