<p align="center">
  <a href="https://material-ui-next.com/" target="_blank"><img width="200" src="/static/brand.png" alt="Material-UI logo"></a></p>
</p>

<h1 align="center">Material-UI</h1>

<div align="center">

[React](http://facebook.github.io/react/) components that implement [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html).

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

</div>

<h2 align="center">Supporting Material-UI</h2>

Material-UI is an MIT-licensed open source project. It's an independent project with ongoing development made possible thanks to the support of these awesome [backers](/BACKERS.md). If you'd like to join them, please consider:
- [Become a backer or sponsor on Patreon](https://www.patreon.com/oliviertassinari).
- [Become a backer or sponsor on OpenCollective](https://opencollective.com/material-ui).

Your contributions, donations, and sponsorship allow us to build a sustainable organization. They directly support office hours, continued enhancements, great documentation and learning materials!

### What's the difference between Patreon and OpenCollective?

Funds donated via Patreon directly support [Olivier Tassinari](https://github.com/oliviertassinari)'s work on Material-UI.
Funds donated via OpenCollective also support Olivier, but will be shared amongst other contributors and pay for operating expenses.
These funds are managed transparently through the OpenCollective website.
Your name/logo will receive proper recognition and exposure by donating on either platform.

<h3 align="center">Gold Sponsors</h3>

Gold Sponsors are those who have pledged $500/month and more to Material-UI.

#### via [Patreon](https://www.patreon.com/oliviertassinari)

#### via [OpenCollective](https://opencollective.com/material-ui)

<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/0/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/0/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/1/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/1/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/2/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/2/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/3/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/3/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/4/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/4/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/5/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/5/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/6/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/6/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/7/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/7/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/8/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/8/avatar.svg"></a>
<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/9/website" target="_blank"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/9/avatar.svg"></a>

## Installation

Material-UI is available as an [npm package](https://www.npmjs.org/package/material-ui).

**[Stable channel (v0.x)](http://material-ui.com/)**
```sh
npm install --save material-ui
```

**[Pre-release channel (v1-beta)](https://material-ui-next.com/)**
```sh
npm install --save material-ui@next
```

Please note that `@next` will only point to pre-releases; to get the latest stable release use `@latest` instead.

## Usage (v1-beta)

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

## Questions

For *how-to* questions and other non-issues,
please use [StackOverflow](http://stackoverflow.com/questions/tagged/material-ui)
instead of Github issues. There is a StackOverflow tag called "material-ui"
that you can use to tag your questions.

## Examples

Are you looking for an example project to get started?
[We host some](https://github.com/mui-org/material-ui/blob/v1-beta/docs/src/pages/getting-started/example-projects.md).

## Documentation

Check out our [documentation website](https://material-ui-next.com/).

## Contributing

We'd greatly appreciate any [contribution](/CONTRIBUTING.md) you make. :)

## Changelog

Recently Updated?
Please read the [changelog](https://github.com/mui-org/material-ui/releases).

## Roadmap

The future plans and high priority features and enhancements can be found in the [ROADMAP.md](/ROADMAP.md) file.

## Thanks

[<img src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" width="120">](https://www.browserstack.com/)

Thank you to [BrowserStack](https://www.browserstack.com/) for providing the infrastructure that allows us to test in real browsers.

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
