<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://mui.com/" rel="noopener" target="_blank"><img width="150" src="/docs/public/static/logo.svg" alt="MUI logo"></a>
</p>

<h1 align="center">MUI Core</h1>

**MUI Core** 包含基本的 React UI 组件库，可以更快地发布新功能。

- [_Material UI_](https://mui.com/material-ui/getting-started/overview/) 是一个全面的组件库，以我们实现的 Google [Material Design](https://material.io/design/introduction/) 系统为特色。

- [_Joy UI_](https://mui.com/joy-ui/getting-started/overview/) 是一个设计精美的 React UI 组件库。

- [_MUI Base_](https://mui.com/base/getting-started/overview/) 是我们的“无样式”组件和低级挂钩库。使用 MUI Base，您可以完全控制应用程序的 CSS 和辅助功能。

- [_MUI System_](https://mui.com/system/getting-started/overview/) 是 CSS 实用程序的集合，可帮助您快速布置自定义设计。

<div align="center">

**[稳定版 V5.0](https://mui.com/)** | [English](./README.md) | 简体中文


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
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1320/badge)](https://bestpractices.coreinfrastructure.org/projects/1320)

</div>

## 安装

### Material UI

Material UI 作为一个 [npm](https://www.npmjs.com/package/@mui/material) 包提供。

**npm:**

```sh
npm install @mui/material @emotion/react @emotion/styled
```

**yarn:**

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

<details>
  <summary>旧版本</summary>

- **[v4.x](https://v4.mui.com/)** ([从 v4 迁移到 v5](https://mui.com/material-ui/migration/migration-v4/))
- **[v3.x](https://v3.mui.com/)** ([从 v3 迁移到 v4](https://mui.com/material-ui/migration/migration-v3/))
- **[v0.x](https://v0.mui.com/)** ([迁移到 v1](https://mui.com/material-ui/migration/migration-v0x/))

</details>

**批注:** `@next` 仅指向预发布。
使用 `@latest` 获得最新的稳定版本。

### MUI Base

MUI Base 作为一个 [npm](https://www.npmjs.com/package/@mui/base) 包提供。

**npm:**

```sh
npm install @mui/base
```

**yarn:**

```sh
yarn add @mui/base
```

**批注**: MUI Base仍处于测试状态。
我们会定期添加新组件，欢迎您参与我们！

### MUI System

MUI System 作为一个 [npm](https://www.npmjs.com/package/@mui/system) 包提供。

**npm:**

```sh
npm install @mui/system @emotion/react @emotion/styled
```

**yarn:**

```sh
yarn add @mui/system @emotion/react @emotion/styled
```

或者，如果将`样式化组件`用作样式引擎：

**npm:**

```sh
npm install @mui/material @mui/styled-engine-sc styled-components
```

**yarn:**

```sh
yarn add @mui/material @mui/styled-engine-sc styled-components
```

有关如何将`样式化组件配置`为样式引擎的更多信息，请访问我们的[`样式化引擎` 指南](https://mui.com/material-ui/guides/styled-engine/)。
## 赞助商

### 钻石赞助商 💎

<p align="center">
  <a href="https://octopus.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="128" width="128" src="https://i.ibb.co/w0HF0Nz/Logo-Blue-140px-rgb.png" alt="octopus" title="Repeatable, reliable deployments" loading="lazy" /></a>
  <a href="https://www.doit-intl.com/flexsave/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="128" width="128" src="https://avatars.githubusercontent.com/u/8424863?s=256" alt="doit-intl" title="Management Platform for Google Cloud and AWS" loading="lazy" /></a>
  <a href="https://www.zesty.io/integrations/mui-nextjs/?utm_source=mui&utm_medium=referral&utm_campaign=sponsor" rel="noopener sponsored" target="_blank"><img height="90" width="90" src="https://brand.zesty.io/zesty-io-logo.svg" alt="zesty.io" title="The only Next.js CMS you need" loading="lazy" /></a>
</p>

钻石赞助商是那些每月向 MUI 认捐1500美元或以上的人。

### 黄金赞助商 🏆

通过 [OpenCollective](https://opencollective.com/mui) 或 [Patreon](https://www.patreon.com/oliviertassinari)

<p align="center">
  <a href="https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=homepage" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://avatars.githubusercontent.com/u/30204434?s=192" alt="tidelift.com" title="Enterprise-ready open-source software" loading="lazy" /></a>
  <a href="https://bit.dev/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank" style="margin-rig ht: 16px;"><img height="96" width="96" src="https://avatars.githubusercontent.com/u/24789812?s=192" alt="bit.dev" title="The fastest way to share code" loading="lazy" /></a>
  <a href="https://www.text-em-all.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img src="https://avatars.githubusercontent.com/u/1262264?s=192" alt="text-em-all.com" title="Mass Text Messaging & Automated Calling" height="96" width="96" loading="lazy"></a>
  <a href="https://netticasinohex.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://images.opencollective.com/netticasinohex-com/71d7417/logo/192.png" alt="netticasinohex.com" title="A real giant among casino guides" loading="lazy" /></a>
  <a href="https://megafamous.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://mui.com/static/sponsors/megafamous.png" alt="megafamous.com" title="The best place to buy Instagram followers & likes." loading="lazy" /></a>
  <a href="https://www.dialmycalls.com/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://images.opencollective.com/dialmycalls/f5ae9ab/avatar/192.png" alt="dialmycalls.com" title="Send text messages, calls & emails to thousands with ease." loading="lazy" /></a>
  <a href="https://goread.io/?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://images.opencollective.com/goread_io/eb6337d/logo/192.png" alt="goread.io" title="Instagram followers, likes, power likes, views, comments, saves in minutes." loading="lazy" /></a>
  <a href="https://icons8.com?utm_source=MUI&utm_medium=referral&utm_content=readme" rel="noopener sponsored" target="_blank"><img height="96" width="96" src="https://images.opencollective.com/icons8/7fa1641/logo/192.png" alt="Icons8" title="We provide the neat icons, photos, illustrations, and music. Developers, use our API to insert all the content we have into your apps." loading="lazy"></a>
</p>

黄金赞助商是那些每月向 MUI 认捐500美元或以上的赞助商。

### 更多支持者

查看[我们支持者](https://mui.com/material-ui/discover-more/backers/)的完整名单。

## 开始使用 Material UI

以下是使用 Material UI 的`按钮`组件的基本应用程序示例：

```jsx
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}
```
在下面的交互式演示中，尝试更改代码并查看它如何影响输出。（提示：将`变体`更改为`大纲`，将`颜色`更改为`次要`。有关更多选项，请参阅文档中的[`按钮` 组件页面](https://mui.com/material-ui/react-button/)。）

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/material-ui-u9sy1h)

## Questions

For how-to questions that don't involve making changes to the code base, please use [Stack Overflow](https://stackoverflow.com/questions/tagged/mui) instead of GitHub issues.
Use the "mui" tag on Stack Overflow to make it easier for the community to find your question.

## Examples

Our documentation features [a collection of example projects using Material UI](https://mui.com/material-ui/getting-started/example-projects/).

## Documentation

- [Material UI](https://mui.com/material-ui/getting-started/overview/)
- [Joy UI](https://mui.com/joy-ui/getting-started/overview/)
- [MUI Base](https://mui.com/base/getting-started/overview/)
- [MUI System](https://mui.com/system/getting-started/overview/)

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

## Security

For details of supported versions and contact details for reporting security issues, please refer to the [security policy](https://github.com/mui/material-ui/security/policy).

## Sponsoring services

These great services sponsor MUI's core infrastructure:

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/docs/public/static/readme/github-darkmode.svg">
  <source media="(prefers-color-scheme: light)" srcset="/docs/public/static/readme/github-lightmode.svg">
  <img alt="GitHub logo" src="/docs/public/static/readme/github-darkmode.svg">
</picture>

[GitHub](https://github.com/) lets us host the Git repository and coordinate contributions.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/docs/public/static/readme/netlify-darkmode.svg">
  <source media="(prefers-color-scheme: light)" srcset="/docs/public/static/readme/netlify-lightmode.svg">
  <img alt="Netlify logo" src="/docs/public/static/readme/netlify-darkmode.svg">
</picture>

[Netlify](https://www.netlify.com/) lets us distribute the documentation.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/docs/public/static/readme/crowdin-darkmode.svg">
  <source media="(prefers-color-scheme: light)" srcset="/docs/public/static/readme/crowdin-lightmode.svg">
  <img alt="Crowdin logo" src="/docs/public/static/readme/crowdin-darkmode.svg">
</picture>

[Crowdin](https://crowdin.com/) lets us translate the documentation.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="/docs/public/static/readme/browserstack-darkmode.svg">
  <source media="(prefers-color-scheme: light)" srcset="/docs/public/static/readme/browserstack-lightmode.svg">
  <img alt="GitHub logo" src="/docs/public/static/readme/browserstack-darkmode.svg">
</picture>

[BrowserStack](https://www.browserstack.com/) lets us test in real browsers.

<img loading="lazy" alt="CodeCov logo" src="https://github.com/codecov.png?size=70" width="35" height="35">

[CodeCov](https://about.codecov.io/) lets us monitor test coverage.
