<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://mui.com/" rel="noopener" target="_blank"><img width="150" src="https://mui.com/static/logo.svg" alt="MUI logo"></a>
</p>

<h1 align="center">MUI Core</h1>

**MUI Core** contains foundational React UI component libraries for shipping new features faster.

- _Material UI_ is a comprehensive library of components that features our implementation of Google's [Material Design](https://material.io/design/introduction/) system.

- _MUI Base_ is our library of "unstyled" components and low-level hooks. With Base, you gain complete control over your app's CSS and accessibility features.

- _MUI System_ is a collection of CSS utilities to help you rapidly lay out custom designs.

<div align="center">

**[Stable channel v5](https://mui.com/)**

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui/material-ui/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@mui/material/latest.svg)](https://www.npmjs.com/package/@mui/material)
[![npm next package](https://img.shields.io/npm/v/@mui/material/next.svg)](https://www.npmjs.com/package/@mui/material)
[![npm downloads](https://img.shields.io/npm/dm/@mui/material.svg)](https://www.npmjs.com/package/@mui/material)
[![CircleCI](https://circleci.com/gh/mui/material-ui/tree/master.svg?style=shield)](https://app.circleci.com/pipelines/github/mui/material-ui?branch=master)
[![Coverage Status](https://img.shields.io/codecov/c/github/mui/material-ui/master.svg)](https://codecov.io/gh/mui/material-ui/branch/master)
[![Follow on Twitter](https://img.shields.io/twitter/follow/MUI_hq.svg?label=follow+MUI)](https://twitter.com/MUI_hq)
[![Renovate status](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://github.com/mui/material-ui/issues/27062)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/mui/material-ui.svg)](https://isitmaintained.com/project/mui/material-ui 'Average time to resolve an issue')
[![Crowdin](https://badges.crowdin.net/material-ui-docs/localized.svg)](https://translate.mui.com/project/material-ui-docs)
[![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/mui)](https://opencollective.com/mui)

</div>

## Installation

### Material UI

Material UI is available as an [npm package](https://www.npmjs.com/package/@mui/material).

```sh
// with npm
npm install @mui/material @emotion/react @emotion/styled

// with yarn
yarn add @mui/material @emotion/react @emotion/styled
```

<details>
  <summary>Older versions</summary>

- **[v4.x](https://v4.mui.com/)** ([Migration from v4 to v5](https://mui.com/material-ui/guides/migration-v4/))
- **[v3.x](https://v3.mui.com/)** ([Migration from v3 to v4](https://mui.com/material-ui/guides/migration-v3/))
- **[v0.x](https://v0.mui.com/)** ([Migration to v1](https://mui.com/material-ui/guides/migration-v0x/))

</details>

**Note:** `@next` only points to pre-releases.
Use `@latest` for the latest stable release.

### MUI Base

MUI Base is available as an [npm package](https://www.npmjs.com/package/@mui/base).

```sh
// with npm
npm install @mui/base

// with yarn
yarn add @mui/base
```

**Note**: MUI Base is still in alpha.
We are adding new components regularly and you're welcome to contribute!

### MUI System

MUI System is available as an [npm package](https://www.npmjs.com/package/@mui/system).

```sh
// with npm
npm install @mui/system @emotion/react @emotion/styled

// with yarn
yarn add @mui/system @emotion/react @emotion/styled
```

Or if you want to use `styled-components` as a styling engine:

```sh
// with npm
npm install @mui/system @mui/styled-engine-sc styled-components

// with yarn
yarn add @mui/system @mui/styled-engine-sc styled-components
```

Visit our [`styled-engine` guide](https://mui.com/material-ui/guides/styled-engine/) for more information about how to configure `styled-components` as the style engine.

## Sponsors

### Diamond 💎

<p align="center">
  <a href="https://octopus.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="128" width="128" src="https://avatars3.githubusercontent.com/u/1287123?s=256" alt="octopus" title="Repeatable, reliable deployments" loading="lazy" /></a>
  <a href="https://www.doit-intl.com/flexsave/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="128" width="128" src="https://avatars3.githubusercontent.com/u/8424863?s=256" alt="doit-intl" title="Management Platform for Google Cloud and AWS" loading="lazy" /></a>
</p>

Diamond Sponsors are those who have pledged \$1,500/month or more to MUI.

### Gold 🏆

via [OpenCollective](https://opencollective.com/mui) or via [Patreon](https://www.patreon.com/oliviertassinari)

<p align="center">
  <a href="https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=homepage" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://github.com/tidelift.png?size=192" alt="tidelift.com" title="Enterprise-ready open-source software" loading="lazy" /></a>
  <a href="https://bit.dev/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-rig ht: 16px;"><img height="96" width="96" src="https://github.com/teambit.png?size=192" alt="bit.dev" title="The fastest way to share code" loading="lazy" /></a>
  <a href="https://www.text-em-all.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img src="https://images.opencollective.com/callemall/09710fe/logo/192.png" alt="text-em-all.com" title="Mass Text Messaging & Automated Calling" height="96" width="96" loading="lazy"></a>
  <a href="https://www.laststance.io/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://images.opencollective.com/laststance/daffd6c/avatar/192.png" alt="laststance.io" title="Indipendent organization for OSS activity based on Tokyo" loading="lazy" /></a>
  <a href="https://online-aussie-casino.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://images.opencollective.com/aussiecasinohex/923df37/logo/192.png" alt="online-aussie-casino.com" title="Aussie Gambling Guide" loading="lazy" /></a>
  <a href="https://sumatosoft.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://images.opencollective.com/sumatosoft_company/0b78570/avatar/192.png" alt="sumatosoft.com" title="We help companies to digitalize their businesses" loading="lazy" /></a>
  <a href="https://megafamous.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://p18.zdusercontent.com/attachment/9422375/Rullx0rw9lUGKuyKOy4VQ9Zxq?size=192" alt="megafamous.com" title="The best place to buy Instagram followers & likes." loading="lazy" /></a>
</p>

Gold Sponsors are those who have pledged \$500/month or more to MUI.

### More backers

See the full list of [our backers](https://mui.com/material-ui/discover-more/backers/).

## Getting started with Material UI

Here is an example of a basic app using Material UI's `Button` component:

```jsx
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}
```

In the interactive demo below, try changing the code and see how it affects the output.
(Hint: change `variant` to `"outlined"` and `color` to `"secondary"`.
For more options, see the [`Button` component page](https://mui.com/material-ui/react-button/) in our docs.)

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4j7m47vlm4)

## Questions

For how-to questions that don't involve making changes to the code base, please use [Stack Overflow](https://stackoverflow.com/questions/tagged/mui) instead of GitHub issues.
Use the "mui" tag on Stack Overflow to make it easier for the community to find your question.

## Examples

Our documentation features [a collection of example projects using Material UI](https://mui.com/material-ui/getting-started/example-projects/).

## Documentation

- [Material UI](https://mui.com/material-ui/getting-started/installation/)
- [MUI Base](https://mui.com/base/getting-started/installation/)
- [MUI System](https://mui.com/system/basics/)

## Premium themes

You can find complete templates and themes in the [MUI Store](https://mui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=readme-store).

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build and test your changes.

Contributing to MUI Core is about more than just issues and pull requests!
There are many other ways to [support MUI](https://mui.com/material-ui/getting-started/faq/#mui-is-awesome-how-can-i-support-the-project) beyond contributing to the code base.

## Changelog

The [changelog](https://github.com/mui/material-ui/releases) is regularly updated to reflect what's changed in each new release.

## Roadmap

Future plans and high-priority features and enhancements can be found in our [roadmap](https://mui.com/material-ui/discover-more/roadmap/).

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).

## Sponsoring services

These great services sponsor MUI's core infrastructure:

[<img loading="lazy" alt="GitHub" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" height="25">](https://github.com/)

GitHub lets us host the Git repository and coordinate contributions.

[<img loading="lazy" alt="Netlify" src="https://cdn.netlify.com/15ecf59b59c9d04b88097c6b5d2c7e8a7d1302d0/1b6d6/img/press/logos/full-logo-light.svg" height="30">](https://www.netlify.com/)

Netlify lets us distribute the documentation.

[<img loading="lazy" alt="CrowdIn" src="https://support.crowdin.com/assets/logos/crowdin-logo1-small.png" height="30">](https://crowdin.com/)

Crowdin lets us translate the documentation.

[<img loading="lazy" alt="BrowserStack" src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" height="30">](https://www.browserstack.com/)

BrowserStack lets us test in real browsers.

[<img loading="lazy" alt="CodeCov" src="https://github.com/codecov.png?size=70" width="35" height="35">](https://codecov.io/)

CodeCov lets us monitor test coverage.
