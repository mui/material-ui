### Predefined themes

We ship two base themes with Material-UI: light and dark. They are located
under [`material-ui/styles/baseThemes/`](https://github.com/mui-org/material-ui/blob/v0.x/src/styles/baseThemes/).
Custom themes may be defined similarly.
The [`lightBaseTheme`](https://github.com/mui-org/material-ui/blob/v0.x/src/styles/baseThemes/lightBaseTheme.js)
is the default so you will not need to do anything to use it other than using `MuiThemeProvider` as described in [Usage](/#/get-started/usage).
For the [`darkBaseTheme`](https://github.com/mui-org/material-ui/blob/v0.x/src/styles/baseThemes/darkBaseTheme.js) you can use this snippet:

```js
import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const Main = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <AppBar title="My AppBar" />
  </MuiThemeProvider>
);

export default Main;
```

### How it works

To achieve the level of customizability that you can see in the example above,
Material-UI is using a single JS object called `muiTheme`.
By default, this `muiTheme` object is based on the
[`lightBaseTheme`](https://github.com/mui-org/material-ui/blob/v0.x/src/styles/baseThemes/lightBaseTheme.js).

The `muiTheme` object contains the following keys:
 - `spacing`: can be used to change the spacing of components.
 - `fontFamily` can be used to change the default font family.
 - `palette` can be used to change the color of components.
 - `zIndex` can be used to change the level of each component.
 - `isRtl` can be used to enable the right to left mode.
 - There is also one key for each component so you can use to customize them individually:
  - `appBar`
  - `avatar`
  - ...

### Customizing the theme

To customize the `muiTheme` you must use `getMuiTheme()` to compute a valid `muiTheme` object,
and providing an object containing the keys you wish to customize.
Then, you can use `<MuiThemeProvider />` to provide it down the tree to components.

```js
import React from 'react';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

// MuiThemeProvider takes the theme as a property and passed it down the hierarchy.
const Main = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppBar title="My AppBar" />
  </MuiThemeProvider>
);

export default Main;
```

Internally, Material-UI components use React's context feature to implement theming.
In fact, context is very convenient for concepts like theming, which are usually
implemented in a hierarchical manner.
However, it should be considered **an implementation detail**.

### Using the `muiTheme` on your custom components

In some case to keep the interface consistent you want to access the `muiTheme`
variable provided by the `MuiThemeProvider` component.
To do so, we expose a higher-order component: `muiThemeable`.
Here is an example:

```js
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

const DeepDownTheTree = (props) => (
  <span style={{color: props.muiTheme.palette.textColor}}>
    Hello World!
  </span>
);

export default muiThemeable()(DeepDownTheTree);
```

### API

The items listed below are everything related to how Material-UI's theme work.

#### `getMuiTheme(muiTheme)`

This function takes in a `muiTheme`, it will use this parameter to computes and returns an enhanced `muiTheme`.

Keep in mind, any changes to the theme object must appear as another call
to this function.
**Never** directly mutate the theme as the effects will not be reflected in any component
until another render is triggered for that component leaving your application
in a moody state.

To see what are the values you can override, use the
[source](https://github.com/mui-org/material-ui/blob/v0.x/src/styles/getMuiTheme.js).
The `lightBaseTheme` object looks like this (these are the defaults):

```js
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from '../colors';
import {fade} from '../../utils/colorManipulator';
import spacing from '../spacing';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};
```

#### `<MuiThemeProvider>`

This component takes a theme as a property and passes it down with context.
This should preferably be at the root of your component tree. The first
example demonstrates it's usage.

#### `muiThemeable()`

This higher-order component wraps another component to provide a `muiTheme` property.
Pass in your component and it will return the wrapped component.
