<p align="center">
  <a href="https://mui.com/" rel="noopener" target="_blank"><img width="150" src="https://mui.com/static/logo.svg" alt="MUI logo"></a></p>
</p>

<h1 align="center">MUI</h1>

<div align="center">

Quickly build beautiful [React](https://reactjs.org/) apps. MUI is a simple and customizable component library to build faster, beautiful, and more accessible React applications. Follow your own design system, or start with [Material Design](https://material.io/design/introduction/).

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui-org/material-ui/blob/master/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@mui/material/latest.svg)](https://www.npmjs.com/package/@mui/material)
[![npm next package](https://img.shields.io/npm/v/@mui/material/next.svg)](https://www.npmjs.com/package/@mui/material)
[![npm downloads](https://img.shields.io/npm/dm/@mui/material.svg)](https://www.npmjs.com/package/@mui/material)
[![CircleCI](https://img.shields.io/circleci/project/github/mui-org/material-ui/next.svg)](https://app.circleci.com/pipelines/github/mui-org/material-ui?branch=next)
[![Coverage Status](https://img.shields.io/codecov/c/github/mui-org/material-ui/next.svg)](https://codecov.io/gh/mui-org/material-ui/branch/next)
[![Follow on Twitter](https://img.shields.io/twitter/follow/MaterialUI.svg?label=follow+Material-UI)](https://twitter.com/MaterialUI)
[![Renovate status](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://github.com/mui-org/material-ui/issues/27062)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/mui-org/material-ui.svg)](https://isitmaintained.com/project/mui-org/material-ui 'Average time to resolve an issue')
[![Crowdin](https://badges.crowdin.net/material-ui-docs/localized.svg)](https://translate.mui.com/project/material-ui-docs)
[![Open Collective backers and sponsors](https://img.shields.io/opencollective/all/material-ui)](https://opencollective.com/material-ui)

</div>

## Installation

MUI is available as an [npm package](https://www.npmjs.com/package/@mui/material).

**[Stable channel v5](https://mui.com/)**

```sh
// with npm
npm install @mui/material @emotion/react @emotion/styled

// with yarn
yarn add @mui/material @emotion/react @emotion/styled
```

<details>
  <summary>Older versions</summary>

- **[v4.x](https://v4.mui.com/)** ([Migration from v4 to v5](https://mui.com/guides/migration-v4/))
- **[v3.x](https://v3.mui.com/)** ([Migration from v3 to v4](https://mui.com/guides/migration-v3/))
- **[v0.x](https://v0.mui.com/)** ([Migration to v1](https://mui.com/guides/migration-v0x/))

</details>

Please note that `@next` will only point to pre-releases; to get the latest stable release use `@latest` instead.

## Who sponsors MUI?

### Diamond 💎

<p style="display: flex; justify-content: center;">
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="octopus" href="https://octopus.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="128" width="128" src="https://avatars3.githubusercontent.com/u/1287123?s=256" alt="octopus" title="Repeatable, reliable deployments" loading="lazy" /></a>
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="doit-intl" href="https://www.doit-intl.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="128" width="128" src="https://avatars3.githubusercontent.com/u/8424863?s=256" alt="doit-intl" title="Management Platform for Google Cloud and AWS" loading="lazy" /></a>
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="aptugo" href="https://www.aptugo.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="128" width="128" src="https://www.aptugo.com/img/favicon.png" alt="aptugo" title="Augmented Software Development Platform" loading="lazy" /></a>
</p>

Diamond Sponsors are those who have pledged \$1,500/month or more to MUI.

### Gold 🏆

via [Patreon](https://www.patreon.com/oliviertassinari)

<p style="display: flex; justify-content: center;">
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="tidelift" href="https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=homepage" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="96" width="96" src="https://github.com/tidelift.png?size=192" alt="tidelift" title="Enterprise-ready open-source software" loading="lazy" /></a>
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="bitsrc" href="https://bit.dev/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="96" width="96" src="https://github.com/teambit.png?size=192" alt="bitsrc" title="The fastest way to share code" loading="lazy" /></a>
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="movavi" href="https://spicefactory.co/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="96" width="96" src="https://avatars.githubusercontent.com/u/13365608?s=192" alt="Next gen digital product studio." loading="lazy" /></a>
</p>

via [OpenCollective](https://opencollective.com/material-ui)

<p style="display: flex; justify-content: center; flex-wrap: wrap;">
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="textemall" href="https://www.text-em-all.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img src="https://images.opencollective.com/callemall/a6946da/logo/192.png" alt="call-em-all" title="Mass Text Messaging & Automated Calling" height="96" width="96" loading="lazy"></a>
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="hoodiebees" href="https://hoodiebees.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="96" width="96" src="https://images.opencollective.com/hoodiebees1/617b451/logo/192.png" alt="hoodiebees" loading="lazy" /></a>
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="movavi" href="https://www.movavi.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="96" width="96" src="https://images.opencollective.com/movavi-software/a1d0167/logo/192.png" alt="Screen recorder for Mac" loading="lazy" /></a>
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="sunmatosoft" href="https://sumatosoft.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="96" width="96" src="https://images.opencollective.com/sumatosoft_company/0b78570/avatar/192.png" alt="We help companies to digitalize their businesses" loading="lazy" /></a>
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="topaussiecasinos.com" href="https://topaussiecasinos.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img height="96" width="96" src="https://images.opencollective.com/aussiecasinohex/923df37/logo/192.png" alt="Aussie Gambling Guide" loading="lazy" /></a>
</p>

Direct

<p style="display: flex; justify-content: center; flex-wrap: wrap;">
  <a data-ga-event-category="sponsor" data-ga-event-action="logo" data-ga-event-label="elevator" href="https://www.elevatormag.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-right: 16px;"><img src="https://mui.com/static/sponsors/elevator.png" alt="elevator" title="The dopest new hip hop, upcoming artists, music news, culture, and style" height="57" width="191" loading="lazy"></a>
</p>

Gold Sponsors are those who have pledged \$500/month or more to MUI.

### There is more!

See the full list of [our backers](https://mui.com/discover-more/backers/).

## Usage

Here is a quick example to get you started, **it's all you need**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

Yes, it's really all you need to get started as you can see in this live and interactive demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4j7m47vlm4)

## Questions

For _how-to_ questions and other non-issues,
please use [StackOverflow](https://stackoverflow.com/questions/tagged/material-ui) instead of GitHub issues.
There is a StackOverflow tag called "material-ui" that you can use to tag your questions.

## Examples

Are you looking for an example project to get started?
[We host some](https://mui.com/getting-started/example-projects/).

## Documentation

Check out our [documentation website](https://mui.com/).

## Premium Themes

You can find complete templates & themes in the [MUI store](https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=readme-store).

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to MUI.

Notice that contributions go far beyond pull requests and commits.
Although we love giving you the opportunity to put your stamp on MUI, we also are thrilled to receive a variety of [other contributions](https://mui.com/getting-started/faq/#mui-is-awesome-how-can-i-support-the-project).

## Changelog

If you have recently updated, please read the [changelog](https://github.com/mui-org/material-ui/releases) for details of what has changed.

## Roadmap

The future plans and high priority features and enhancements can be found in the [roadmap](https://mui.com/discover-more/roadmap/) file.

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).

## Sponsoring services

These great services sponsor MUI's core infrastructure:

[<img loading="lazy" alt="GitHub" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" height="25">](https://github.com/)

GitHub allows us to host the Git repository and coordinate contributions.

[<img loading="lazy" alt="Netlify" src="https://cdn.netlify.com/15ecf59b59c9d04b88097c6b5d2c7e8a7d1302d0/1b6d6/img/press/logos/full-logo-light.svg" height="30">](https://www.netlify.com/)

Netlify allows us to distribute the documentation.

[<img loading="lazy" alt="CrowdIn" src="https://support.crowdin.com/assets/logos/crowdin-logo1-small.png" height="30">](https://crowdin.com/)

CrowdIn allows us to translate the documentation.

[<img loading="lazy" alt="BrowserStack" src="https://www.browserstack.com/images/mail/browserstack-logo-footer.png" height="30">](https://www.browserstack.com/)

BrowserStack allows us to test in real browsers.

[<img loading="lazy" alt="CodeCov" src="https://github.com/codecov.png?size=70" width="35" height="35">](https://codecov.io/)

CodeCov allows us to monitor the test coverage.
