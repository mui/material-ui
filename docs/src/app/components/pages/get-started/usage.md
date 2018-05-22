## Usage

Beginning with v0.15.0, Material-UI components require a theme to be provided. The quickest way to get up and running is by using the `MuiThemeProvider` to inject the theme into your application context. Following that, you can use any of the components as demonstrated in our documentation.

Here is a quick example to get you started:

**./App.js**
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

const App = () => (
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

**./MyAwesomeReactComponent.js**
```jsx
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const MyAwesomeReactComponent = () => (
  <RaisedButton label="Default" />
);

export default MyAwesomeReactComponent;
```

Please refer to each component's documentation page to see how they should be imported.

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
see [`/src/index.js`](https://github.com/mui-org/material-ui/blob/v0.x/src/index.js) inside the Material-UI npm package root directory.

### Customization

We have implemented a default theme to render all Material-UI components.
Styling components to your liking is simple and hassle-free.
This can be achieved in the following two ways:
- [With the theme](#/customization/themes), you can use a custom theme to style components.
- [With the inline style](#/customization/styles), you can override individual
component styles via the style property.
