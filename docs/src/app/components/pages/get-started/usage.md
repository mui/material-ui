## Usage

Using material-ui components is very straightforward.
Once material-ui is included in your project, you can use the components this way:
```js
// Basic React component that renders a Material-UI
// raised button with the text "Default"
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

const MyAwesomeReactComponent = () => (
  <RaisedButton label="Default" />
);

export default MyAwesomeReactComponent;
```

Notice that in the above example, we used:
```js
import RaisedButton from 'material-ui/RaisedButton';
```

instead of
```js
import {RaisedButton} from 'material-ui';
```

This will make your build process faster and your build output smaller.
For a complete mapping of Material-UI components to `import`,
see `/lib/index.js` inside the Material-UI root directory.

### Customization

We have implemented a default theme to render all Material-UI components.
Styling components to your liking is simple and hassle-free.
This can be achieved in the following two ways:
- [With the theme](#/customization/themes), you can use a custom theme to style components.
- [With the inline style](#/customization/inline-styles), you can override individual
component styles via the style property.
