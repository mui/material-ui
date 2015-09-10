#[Material-UI](http://callemall.github.io/material-ui/) [![npm package](https://img.shields.io/npm/v/material-ui.svg?style=flat-square)](https://www.npmjs.org/package/material-ui) [![Build Status](https://img.shields.io/travis/callemall/material-ui.svg?style=flat-square)](https://travis-ci.org/callemall/material-ui) [![Gitter](https://img.shields.io/badge/gitter-join%20chat-f81a65.svg?style=flat-square)](https://gitter.im/callemall/material-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![PeerDependencies](https://img.shields.io/david/peer/callemall/material-ui.svg?style=flat-square)](https://david-dm.org/callemall/material-ui#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/callemall/material-ui.svg?style=flat-square)](https://david-dm.org/callemall/material-ui)
[![DevDependencies](https://img.shields.io/david/dev/callemall/material-ui.svg?style=flat-square)](https://david-dm.org/callemall/material-ui#info=devDependencies&view=list)

Material-UI is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) specification.

Check out our [documentation site](http://www.material-ui.com/) for live examples. It's still a work in progress, but hopefully you can see where we're headed.

## Prerequisites

We recommend that you get to know [React](http://facebook.github.io/react/) before diving into material-ui. Material-UI is a set of React components, so understanding how React fits into web development is important.

If you're already familiar with single page applications (SPAs) and Node, feel free to skip the prerequisites and head straight to the [installation and usage](#installation) part.

Otherwise, what follows is a quick and brief introduction to SPAs and Node. You'll find this helpful, especially if you have limited prior experience with web development, or if your experience only consists of "traditional" websites built using HTML, CSS and some JavaScript.

### Single Page Applications (SPAs)

A long(?) time ago, websites were built using static pages in HTML, with CSS used for styling, and JavaScript used to support user interactions or for animations. Most client interactions, especially those that acted on data, involved complete server round-trips: data from the client was sent to the server where it was processed, and then the result was sent back to the client. Moreover, most of this communication was "blocking." That is, during these round-trips, the client was busy and could not be interacted with.

With the advent of asynchronous server calls (AJAX), the client could now do other things while it sent data to the server and awaited a response. However, most client interactions still needed server round-trips, and websites just didn’t feel as fluid and responsive as, say, native desktop apps. That's why SPAs came into being.

An SPA is a "website" that essentially consists of a single page. That is, the whole website lives in a single file (usually a JavaScript file) that is sent from the server to the client once. Most of the logic to handle client interactions lives in that single file. Hence, everything that's necessary to provide a fluid, responsive, and fast web experience is present in the browser’s memory. This web programming architecture has gained tremendous traction in the last decade, with many popular JavaScript presentation frameworks geared towards SPAs ([Angular](https://angularjs.org/), [Ember](http://emberjs.com/), [Backbone](http://backbonejs.org/), [React](http://facebook.github.io/react/), etc.).

Including all of the code for a website in a single file creates significant code organization challenges. Thankfully, there are several tools that allow us to break up our code into smaller modules (similar to breaking down an object-oriented application into different classes and interfaces) that can be bundled together later. This is where Node comes into play.

### Node

At its core, [Node](https://nodejs.org/) is a program written in C that allows us to run JavaScript in the shell (yes, your terminal, not the browser). To do this, It uses Chrome’s V8 JavaScript engine. Hence, Node is essentially a runtime environment.

When it was first created, Node was primarily targeted towards developing web servers in JavaScript. This was somewhat radical since JavaScript has traditionally been restricted to the client. However, over time, web developers recognized the benefits of using Node for tooling and dependency management, and created projects like [grunt](http://gruntjs.com/), [gulp](http://gulpjs.com/), [Browserify](http://browserify.org/), and [Webpack](http://webpack.github.io/).

As Node became popular, independent developers and organizations wrote scripts (that ran using Node) to do almost everything web apps-related. Of course, the whole community could benefit from these “custom Node scripts.” This called for some kind of package repository where anybody could upload their Node scripts, and other developers could use these scripts in their own projects. [Node Package Manager](https://www.npmjs.com/), better known as “npm,” does exactly that. NPM is a command line tool that, among other things, can be used to incorporate external JavaScript into one's own project. Material-UI, for instance, is available as a package through npm. This means that you can include material-ui in your project by simply running npm install material-ui from your project’s directory, and then using the components of material-ui that you need.

That's it for a quick introduction! If you feel like you need more of Node, we recommend that you consult some quick tutorials online before jumping into material-ui. This [blog post](http://openmymind.net/2012/2/3/Node-Require-and-Exports/) and [video](https://www.youtube.com/watch?v=pU9Q6oiQNd0) are good starting points.

<a name="installation">
## Installation
</a>

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
let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
```

### Roboto Font
Material-UI was designed with the [Roboto](http://www.google.com/fonts/specimen/Roboto) font in mind. So be sure to include it in your project. Here are [some instructions](http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500) on how to do so.

## Usage

Once material-ui is included in your project, you can use the components this way:
```js
/** MyAwesomeReactComponent.jsx */

let React = require('react'),
  mui = require('material-ui'),
  ThemeManager = new mui.Styles.ThemeManager(),
  RaisedButton = mui.RaisedButton;

let MyAwesomeReactComponent = React.createClass({

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

There are 2 projects that you can look at to get started. They can be found in the [examples folder](https://github.com/callemall/material-ui/tree/master/examples). These projects are basic examples that show how to consume material-ui components in your own project. The first project uses [browserify](http://browserify.org/) for module bundling and [gulp](http://gulpjs.com/) for JS task automation, while the second project uses [webpack](http://webpack.github.io/) for module bundling and building.

The source code for this documentation site is also included in the repository. This is a slightly more complex project that also uses webpack, and contains examples of every material-ui component. Check out the [docs folder](https://github.com/callemall/material-ui/tree/master/docs) for build instructions.

## Contribute

[Material-UI](http://www.material-ui.com/) came about from our love of [React](http://facebook.github.io/react/) and [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html). We're currently using it on a project at [Call-Em-All](https://www.call-em-all.com/) and plan on adding to it and making it better. If you'd like to help, check out the [docs folder](https://github.com/callemall/material-ui/tree/master/docs). We'd greatly appreciate any contribution you make. :)

## License
This project is licensed under the terms of the [MIT license](https://github.com/callemall/material-ui/blob/master/LICENSE)
