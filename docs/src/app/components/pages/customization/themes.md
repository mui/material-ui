There are now two kinds of themes in Material-UI: **base theme** and **mui theme**.
The base theme is a plain JS object containing three keys: spacing, palette and fontFamily.
The mui theme, on the other hand, is a much bigger object. It contains a key for every Material-UI
component, and the value corresponding to that key describes the styling of that particular component
under the current base theme. In this sense, the mui theme is *produced* from the base theme.
The base theme acts as a basis for styling components, whereas the mui theme contains specific values
(that are calculated based on the base theme) for styling each component.

## Customizing the theme

By default the light base theme is used to calculate the mui theme object. To customize the base theme
or the calculated mui theme you can use `getMuiTheme` to create a theme object and pass it down the context:

```js
import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import AppBar from 'material-ui/lib/app-bar';

const muiTheme = getMuiTheme({palette: {textColor: Colors.cyan500}});

class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title="Hello World!"/>
      </MuiThemeProvider>
    );
  }
}

export default Main;
```

Internally, Material-UI components use React's context feature to implement theming. Context is a way
to pass down values through the component hierarchy without having to use props at every level.
In fact, context is very convenient for concepts like theming, which are usually implemented in
a hierarchical manner.

`MuiThemeProvider` uses this feature to pass down the theme to components that need it.

## Using the theme

In case you wish to access the theme object yourself you can use the `muiThemeable` decorator:

```js
import React from 'react';
import muiThemeable from 'material-ui/lib/muiThemeable';

class DeepDownTheTree extends React.Component {
  render() {
    return (
      <span style={{color: this.props.muiTheme.baseTheme.palette.textColor}}>
        Hello World!
      </span>
    );
  }
}

DeepDownTheTree.propTypes = {
  muiTheme: React.PropTypes.object,
};

export default muiThemeable()(DeepDownTheTree);
```

`muiThemeable` gets the theme from context and passes it down as a property.

## Predefined themes

We ship two base themes with Material-UI: light and dark. They are located
under `material-ui/lib/styles/baseThemes/`. Custom themes may be defined similarly.

The `lightBaseTheme` is the default so you will not need to do anything to use it.
But for the `darkBaseTheme` you can use this snippet:

```js
import React from 'react';
import darkBaseTheme from 'material-ui/lib/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import AppBar from 'material-ui/lib/app-bar';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <AppBar title="Hello World!"/>
      </MuiThemeProvider>
    );
  }
}

export default Main;
```

## Using context

The `MuiThemeProvider` and `muiThemeable` simply use context. If you prefer
using context instead of these you can follow these pattern:

Pass theme down the context:

```js
import React from 'react';
import darkBaseTheme from 'material-ui/lib/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import AppBar from 'material-ui/lib/app-bar';

class Main extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(darkBaseTheme)};
  }

  render () {
    return (
      <div>
        <AppBar title="My AppBar"/>
      </div>
    );
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default Main;
```

Get theme whenever you need to use it in your own components:

```js
import React from 'react';

class DeepDownTheTree extends React.Component {
  render () {
    return (
      <span style={{color: this.context.muiTheme.baseTheme.palette.textColor}}>
        Hello World!
      </span>
    );
  }
}

DeepDownTheTree.contextTypes = {
  muiTheme: React.PropTypes.object,
};

export default DeepDownTheTree;
```

## API

The items listed below are everything related to how Material-UI's theme work.

### `getMuiTheme(baseTheme, themeOverrides) => muiTheme`

This function takes in the `baseTheme` merges in onto the default base theme that is the 
[lightBaseTheme](https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js)
and calculates the muiTheme from it. In other words anything you don't specify on the
`baseTheme` object will be picked up from the `lightBaseTheme`.

Keep in mind, any changes to the theme object must appear as another call to this function.
**Never** directly mutate the theme as the effects will not be reflected in any component
until another render is triggered for that component leaving your application in a moody state.

The `baseTheme` object looks like this (these are the defaults):

```js
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

const baseTheme = {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopLeftNavMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.cyan500,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.grey400,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
    clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
    shadowColor: Colors.fullBlack,
  },
};
```

The second argument can be used to override the values calculated from the `baseTheme`.
To see what are the values you can override with this argument. Use the
[source](https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js#L23-L262)
, Luke...

### `<MuiThemeProvider/>`

This component takes a theme as a property and passes it down with context.
This should preferably be at the root of your component tree. The first
example demonstrates it's usage.

### `muiThemeable() => ThemeWrapper(Component) => WrappedComponent`

This function creates a wrapper function that you can call providing a component.
The resulting component from that latter call is a higher order component (HOC)
that takes the theme from the context and passes it down as a prop to the wrapped
component. The second example demonstrates it's usage.
