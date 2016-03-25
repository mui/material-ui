### How it works

To achieve the level of customizability that you can see in the example above,
Material-UI is using a single JS object called `muiTheme`.
By default, this `muiTheme` object is based on the
[`lightBaseTheme`](https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js).

This object contains the following keys:
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

To customize the `muiTheme` you must use `getMuiTheme()` to compute a valid `muiTheme`.
Then, you can use `<MuiThemeProvider />` to provide it down the tree to components.

```js
import React from 'react';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/stylesMuiThemeProvider';
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

class Main extends React.Component {
  render() {
    // MuiThemeProvider takes the theme as a property and passed it down the hierarchy
    // using React's context feature. If no muiTheme is on the context the default
    // lazily calculated theme is used instead.
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title="My AppBar" />
      </MuiThemeProvider>
    );
  }
}

export default Main;
```

Internally, Material-UI components use React's context feature to implement theming.
Context is a way to pass down values through the component hierarchy without having
to use props at every level.
In fact, context is very convenient for concepts like theming, which are usually
implemented in a hierarchical manner.

### Predefined themes

We ship two base themes with Material-UI: light and dark. They are located
under [`material-ui/lib/styles/baseThemes/`](https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/).
Custom themes may be defined similarly.
The [`lightBaseTheme`](https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js)
is the default so you will not need to do anything to use it.
But for the [`darkBaseTheme`](https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/darkBaseTheme.js) you can use this snippet:

```js
import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <AppBar title="My AppBar" />
      </MuiThemeProvider>
    );
  }
}

export default Main;
```

### Using the theme

In case you wish to access the theme object yourself you can use the
`muiThemeable` decorator:

```js
import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class DeepDownTheTree extends React.Component {
  render() {
    return (
      <span style={{color: this.props.muiTheme.palette.textColor}}>
        Hello World!
      </span>
    );
  }
}

DeepDownTheTree.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default muiThemeable()(DeepDownTheTree);
```

`muiThemeable` gets the theme from context and passes it down as a property.

### Using context

The `MuiThemeProvider` component and `muiThemeable` decorator simply use context.
If you prefer using context instead of these you can follow these pattern:

Pass theme down the context:

```js
import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class Main extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render () {
    return <AppBar title="My AppBar" />;
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Main;
```

Get theme whenever you need to use it in your own components:

```js
import React from 'react';

class DeepDownTheTree extends React.Component {
  render () {
    return (
      <span style={{color: this.context.muiTheme.palette.textColor}}>
        Hello World!
      </span>
    );
  }
}

DeepDownTheTree.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default DeepDownTheTree;
```

### API

The items listed below are everything related to how Material-UI's theme work.

#### `getMuiTheme(muiTheme) => muiTheme`

This function takes in a `muiTheme`, it will use this parameter to computes the right keys.

Keep in mind, any changes to the theme object must appear as another call
to this function.
**Never** directly mutate the theme as the effects will not be reflected in any component
until another render is triggered for that component leaving your application
in a moody state.

To see what are the values you can override, use the
[source](https://github.com/callemall/material-ui/blob/master/src/getMuiTheme.js).
The `lightBaseTheme` object looks like this (these are the defaults):

```js
import {
cyan500, cyan700,
grey100, grey300, grey400, grey500,
pinkA200,
white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import ColorManipulator from 'material-ui/utils/color-manipulator';

const lightBaseTheme = {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
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
    disabledColor: ColorManipulator.fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: ColorManipulator.fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};
```

#### `<MuiThemeProvider />`

This component takes a theme as a property and passes it down with context.
This should preferably be at the root of your component tree. The first
example demonstrates it's usage.

#### `muiThemeable() => ThemeWrapper(Component) => WrappedComponent`

This function creates a wrapper function that you can call providing a component.
The resulting component from calling `ThemeWrapper` is a higher order component (HOC)
that retrieves the theme from the context and passes it down as a property to the wrapped
component. The second example demonstrates it's usage.
