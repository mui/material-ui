#### Note

For *how-to* questions and other non-issues,
please use [StackOverflow](http://stackoverflow.com/questions/tagged/material-ui)
instead of Github issues. There is a StackOverflow tag called "material-ui"
that you can use to tag your questions.

# [Material-UI](http://www.material-ui.com/)
[![npm package](https://img.shields.io/npm/v/material-ui.svg)](https://www.npmjs.org/package/material-ui)
[![CircleCI](https://img.shields.io/circleci/project/github/callemall/material-ui/next.svg)](https://circleci.com/gh/callemall/material-ui/tree/next)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-f81a65.svg)](https://gitter.im/callemall/material-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://img.shields.io/codecov/c/github/callemall/material-ui/next.svg)](https://codecov.io/gh/callemall/material-ui/branch/next)

[![PeerDependencies](https://img.shields.io/david/peer/callemall/material-ui.svg)](https://david-dm.org/callemall/material-ui#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/callemall/material-ui.svg)](https://david-dm.org/callemall/material-ui)
[![DevDependencies](https://img.shields.io/david/dev/callemall/material-ui.svg)](https://david-dm.org/callemall/material-ui#info=devDependencies&view=list)

Material-UI is a set of [React](http://facebook.github.io/react/) components that implement
[Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html)
specification.

Check out our [documentation site](https://material-ui-1dab0.firebaseapp.com/) for live examples.
It's still a work in progress, but hopefully you can see where we're headed.

**Recently Updated?** Please read the [changelog](https://github.com/callemall/material-ui/releases), this README and the documentation before posting an issue.

## Prerequisites

We recommend that you get to know [React](http://facebook.github.io/react/)
before diving into material-ui. Material-UI is a set of React components,
so understanding how React fits into web development is important.

(If you're not familiar with Node, or with the concept of Single Page Applications (SPAs),
head over to the [documentation website](http://material-ui.com/#/get-started/required-knowledge)
for a quick introduction before you read on.)

## Installation

Material-UI is available as an [npm package](https://www.npmjs.org/package/material-ui).

**Stable channel**
```sh
npm install material-ui
```

**Pre-release channel**
```sh
npm install material-ui@next
```

Please note that `@next` will only point to pre-releases; to get the latest stable release use `@latest` instead.

### Roboto Font

Material-UI was designed with the [Roboto](http://www.google.com/fonts/specimen/Roboto)
font in mind. So be sure to follow [those instructions](https://github.com/callemall/material-ui/blob/v1-beta/docs/src/pages/style/typography.md#general).

### Packaging for use with separate React

For using with React and React DOM from a CDN or as separate minified scripts,
you can build files with UMD module support as follows:

```sh
npm install
npm run build:min
```

This will build one `material-ui.min.js` file into the `/dist` folder.

## Usage

Beginning with v0.15.0, Material-UI components require a theme to be provided. The quickest way to get up and running is by using the `MuiThemeProvider` to inject the theme into your application context. Following that, you can to use any of the components as demonstrated in the documentation.

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
import Button from 'material-ui/Button';

const MyAwesomeReactComponent = () => (
  <Button>Default</Button>
);

export default MyAwesomeReactComponent;
```

Please refer to each component's documentation page to see how they should be imported.

## Customization

We have implemented a default theme to render all Material-UI components.
Styling components to your liking is simple and hassle-free. This can be
achieved in the following two ways:

* [Use a custom theme to style components](http://material-ui.com/#/customization/themes)
* [Override individual component styles via the `style` prop](http://material-ui.com/#/customization/inline-styles)

## [Examples](https://github.com/callemall/material-ui/blob/v1-beta/docs/src/pages/getting-started/examples.md)

## [Roadmap](https://github.com/callemall/material-ui/blob/master/ROADMAP.md)

## [Contributing](https://github.com/callemall/material-ui/blob/master/CONTRIBUTING.md)

## Thanks

[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)

Thank you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test in real browsers.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/callemall/material-ui/blob/master/LICENSE)
