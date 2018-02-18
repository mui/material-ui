# Usage

Material-UI components work in isolation.
**They are self-supporting**, they will inject, and only inject, the styles they need to display.
They don't rely on any global styles like [normalize.css](https://github.com/necolas/normalize.css/),
although Material-UI does provide an optional [Reboot](/style/reboot) component.

You can use any of the components as demonstrated in the documentation.
Please refer to each component's [demo page](/demos/app-bar/) to see how they should be imported.

## Quick start

Here is a quick example to get you started, **it's all you need**:

```jsx
import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';

function App() {
  return (
    <Button variant="raised" color="primary">
      Hello World
    </Button>
  );
}

render(<App />, document.querySelector('#app'));
```

Yes, it's really all you need to get started as you can see in this live and interactive demo:

{{"demo": "pages/getting-started/usage/Usage.js"}}

## Next steps

Now that you have an idea about the basic setup, it's time to learn more about:
- How to provide [the Material Design font and typography](/style/typography).
- How to take advantage of the [theming solution](/customization/themes).
- How to [override](/customization/overrides) the look and feel of the components.
