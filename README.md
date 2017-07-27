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

> Material-UI is a set of [React](http://facebook.github.io/react/) components that implement
[Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html)
specification.

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

## Usage

Here is a quick example to get you started, it's all you need:

```jsx
import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';

function App() {
  return (
    <Button>
      Hello World
    </Button>
  );
}

render(<App />, document.querySelector('#app'));
```

## Examples

Are you looking for an example project to get started?
[We host some](https://github.com/callemall/material-ui/blob/v1-beta/docs/src/pages/getting-started/examples.md).

## Documentation

Check out our [documentation website](https://material-ui-1dab0.firebaseapp.com/).

## Contributing

We'd greatly appreciate any [contribution](https://github.com/callemall/material-ui/blob/v1-beta/CONTRIBUTING.md) you make. :)

## Changelog

Recently Updated?
Please read the [changelog](https://github.com/callemall/material-ui/releases).

## Roadmap

The future plans and high priority features and enhancements can be found in the [ROADMAP.md](https://github.com/callemall/material-ui/blob/v1-beta/ROADMAP.md) file.

## Thanks

[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)

Thank you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test in real browsers.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/callemall/material-ui/blob/v1-beta/LICENSE)
