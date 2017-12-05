
#### Note

For *how-to* questions and other non-issues,
please use [StackOverflow](http://stackoverflow.com/questions/tagged/material-ui)
instead of Github issues. There is a StackOverflow tag called "material-ui"
that you can use to tag your questions.

# [Material-UI@v1-beta](https://material-ui-next.com/)
[![npm package](https://img.shields.io/npm/v/material-ui/next.svg)](https://www.npmjs.org/package/material-ui)
[![npm download](https://img.shields.io/npm/dm/material-ui.svg)](https://www.npmjs.org/package/material-ui)
[![CircleCI](https://img.shields.io/circleci/project/github/mui-org/material-ui/v1-beta.svg)](https://circleci.com/gh/mui-org/material-ui/tree/v1-beta)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-f81a65.svg)](https://gitter.im/callemall/material-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://img.shields.io/codecov/c/github/mui-org/material-ui/v1-beta.svg)](https://codecov.io/gh/mui-org/material-ui/branch/v1-beta)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1320/badge)](https://bestpractices.coreinfrastructure.org/projects/1320)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Follow on Twitter](https://img.shields.io/twitter/follow/MaterialUI.svg?label=follow+Material-UI)](https://twitter.com/MaterialUI)

[![PeerDependencies](https://img.shields.io/david/peer/mui-org/material-ui.svg)](https://david-dm.org/mui-org/material-ui#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/mui-org/material-ui.svg)](https://david-dm.org/mui-org/material-ui)
[![DevDependencies](https://img.shields.io/david/dev/mui-org/material-ui.svg)](https://david-dm.org/mui-org/material-ui#info=devDependencies&view=list)

> Material-UI is a set of [React](http://facebook.github.io/react/) components that implement
[Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) specification.

## We've moved!

We've moved the repo from `callemall/material-ui` to `mui-org/material-ui`. [Find out more](https://medium.com/call-em-all/material-ui-the-move-to-a-sustainable-open-source-project-5261d07b5067) from [@callemall/haicea](https://github.com/hai-cea).

## Installation

Material-UI is available as an [npm package](https://www.npmjs.org/package/material-ui).

**Stable channel**
```sh
npm install --save material-ui
```

**Pre-release channel**
```sh
npm install --save material-ui@next
```

Please note that `@next` will only point to pre-releases; to get the latest stable release use `@latest` instead.

## Usage

Here is a quick example to get you started, **it's all you need**:

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

Yes, it's really all you need to get started as you can see in this live and interactive demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4j7m47vlm4)

## Examples

Are you looking for an example project to get started?
[We host some](https://github.com/mui-org/material-ui/blob/v1-beta/docs/src/pages/getting-started/example-projects.md).

## Documentation

Check out our [documentation website](https://material-ui-next.com/).

## Contributing

We'd greatly appreciate any [contribution](https://github.com/mui-org/material-ui/blob/v1-beta/CONTRIBUTING.md) you make. :)

## Changelog

Recently Updated?
Please read the [changelog](https://github.com/mui-org/material-ui/releases).

## Roadmap

The future plans and high priority features and enhancements can be found in the [ROADMAP.md](https://github.com/mui-org/material-ui/blob/v1-beta/ROADMAP.md) file.

## Thanks

[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)

Thank you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test in real browsers.

## License

This project is licensed under the terms of the
[MIT license](https://github.com/mui-org/material-ui/blob/v1-beta/LICENSE).
