#[Material-UI](http://callemall.github.io/material-ui/) [![Build Status](https://travis-ci.org/callemall/material-ui.svg?branch=master)](https://travis-ci.org/callemall/material-ui) [![npm version](https://badge.fury.io/js/material-ui.svg)](http://badge.fury.io/js/material-ui)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/callemall/material-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Pair on this](https://tf-assets-staging.s3.amazonaws.com/badges/thinkful_repo_badge.svg)](http://start.thinkful.com/react/?utm_source=github&utm_medium=badge&utm_campaign=material-ui)

Material-UI is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) specification.

Check out our [documentation site](http://www.material-ui.com/) for live examples. It's still a work in progress, but hopefully you can see where we're headed.

## Prerequisites

We recommend that you get started with the [React Library](http://facebook.github.io/react/) before diving into material-ui for a better understanding. Should you choose to skip this, don't worry, we'll explain relevant React concepts as they come along.

## Installation

Material-UI is available as an [npm package](https://www.npmjs.org/package/material-ui).
```sh
npm install material-ui
```
After npm install, you'll find all the .jsx files in the /src folder and their compiled versions in the /lib folder.

### React-Tap-Event-Plugin
Some components use [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin) to
listen for touch events. This dependency is temporary and will go away once react v1.0 is released. Until then, be
sure to inject this plugin at the start of your app.
```js
var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
```

### Roboto Font
Be sure to include the [Roboto](http://www.google.com/fonts/specimen/Roboto) font in your project.
Here are [some instructions](http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500) on how to include it in your project.

## Usage

Once material-ui is included in your project, you can use the components this way:
```js
/** MyAwesomeReactComponent.jsx */

var React = require('react'),
  mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  RaisedButton = mui.RaisedButton;

var MyAwesomeReactComponent = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    return (
        <RaisedButton label="Default" />
    );
  }

});

module.exports = MyAwesomeReactComponent;

```

### Theme

**Please note that since v0.8.0, you also need to define a theme for components to start working.** For instructions on implementing and using themes, visit our [documentation](http://material-ui.com/#/customization/themes).

## Customization

Material-UI components have their styles defined inline. There are two approaches to overriding these styles:

* Override individual component styles via the `style` prop
* Define a Theme to apply overarching style changes

This allows you to override variables used by components without having to modify material-ui source files directly.

## Examples
There are 2 projects that you can look at to help you get started. The first project can be found in the [example folder](https://github.com/callemall/material-ui/tree/master/example). This is a basic project that shows how you can consume material-ui components in your own project.

The second project is the actual documentation site. This is a more complex project but will give examples of every component. Check out the [docs folder](https://github.com/callemall/material-ui/tree/master/docs) for build instructions.

## Contribute

[Material-UI](http://www.material-ui.com/) came about from our love of [React](http://facebook.github.io/react/) and [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html). We're currently using it on a project at [Call-Em-All](https://www.call-em-all.com/) and plan on adding to it and making it better. If you'd like to help, check out the [docs folder](https://github.com/callemall/material-ui/tree/master/docs). We'd greatly appreciate any contribution you make. :)

## License
This project is licensed under the terms of the [MIT license](https://github.com/callemall/material-ui/blob/master/LICENSE)
