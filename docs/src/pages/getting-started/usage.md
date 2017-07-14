# Usage

Material-UI components work in isolation.
**They are self-supporting**, they will inject and only inject the style they need to display.
They don't rely on any global style like [normalize.css](https://github.com/necolas/normalize.css/).
You can use any of the components as demonstrated in our documentation.

Here is a quick example to get you started:

**./App.js**
```jsx
import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';

function App() {
  return (
    <Button>
      Hello World
    </Button>
  );
}

render(<App />, document.querySelector('#app'));
```

Please refer to each component's [demo page](/component-demos) to see how they should be imported.
