#### Note

For *how-to* questions and other non-issues, please use [StackOverflow](http://stackoverflow.com/questions/tagged/material-ui) instead of Github issues. There is a StackOverflow tag called "material-ui" that you can use to tag your questions.

#[Material-UI](http://www.material-ui.com/)
[![npm package](https://img.shields.io/npm/v/material-ui.svg?style=flat-square)](https://www.npmjs.org/package/material-ui)
[![Build Status](https://travis-ci.org/callemall/material-ui.svg?branch=master)](https://travis-ci.org/callemall/material-ui)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-f81a65.svg?style=flat-square)](https://gitter.im/callemall/material-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![PeerDependencies](https://img.shields.io/david/peer/callemall/material-ui.svg?style=flat-square)](https://david-dm.org/callemall/material-ui#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/callemall/material-ui.svg?style=flat-square)](https://david-dm.org/callemall/material-ui)
[![DevDependencies](https://img.shields.io/david/dev/callemall/material-ui.svg?style=flat-square)](https://david-dm.org/callemall/material-ui#info=devDependencies&view=list)

Material-UI is a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) specification.

Check out our [documentation site](http://www.material-ui.com/) for live examples. It's still a work in progress, but hopefully you can see where we're headed.

## Prerequisites

We recommend that you get to know [React](http://facebook.github.io/react/) before diving into material-ui. Material-UI is a set of React components, so understanding how React fits into web development is important.

(If you're not familiar with Node, or with the concept of Single Page Applications (SPAs), head over to the [documentation website](http://material-ui.com/#/get-started/prerequisites) for a quick introduction before you read on.)

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
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
```

### Roboto Font
Material-UI was designed with the [Roboto](http://www.google.com/fonts/specimen/Roboto) font in mind. So be sure to include it in your project. Here are [some instructions](http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500) on how to do so.

## Usage

Using material-ui components is very straightforward. Once material-ui is included in your project, you can use the components this way:

```js
import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const MyAwesomeReactComponent = () => (
  <RaisedButton label="Default" />
);

export default MyAwesomeReactComponent;
```

## Customization

We have implemented a default theme to render all Material-UI components. Styling components to your liking is simple and hassle-free. This can be achieved in the following two ways:

* [Use a custom theme to style components](http://material-ui.com/#/customization/themes)
* [Override individual component styles via the `style` prop](http://material-ui.com/#/customization/inline-styles)

## Examples

There are 2 projects that you can look at to get started. They can be found in the [examples folder](https://github.com/callemall/material-ui/tree/master/examples). These projects are basic examples that show how to consume material-ui components in your own project. The first project uses [browserify](http://browserify.org/) for module bundling and [gulp](http://gulpjs.com/) for JS task automation, while the second project uses [webpack](http://webpack.github.io/) for module bundling and building.

The source code for this documentation site is also included in the repository. This is a slightly more complex project that also uses webpack, and contains examples of every material-ui component. Check out the [docs folder](https://github.com/callemall/material-ui/tree/master/docs) for build instructions.

## Roadmap

The future plans and high priority features and enhancements can be found in the [ROADMAP.md](https://github.com/callemall/material-ui/blob/master/ROADMAP.md) file.

## Contribute

[Material-UI](http://www.material-ui.com/) came about from our love of [React](http://facebook.github.io/react/) and [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html). We're currently using it on a project at [Call-Em-All](https://www.call-em-all.com/) and plan on adding to it and making it better. If you'd like to help, check out the [docs folder](https://github.com/callemall/material-ui/tree/master/docs). We'd greatly appreciate any [contribution](https://github.com/callemall/material-ui/blob/master/CONTRIBUTING.md) you make. :)

## License
This project is licensed under the terms of the [MIT license](https://github.com/callemall/material-ui/blob/master/LICENSE)
