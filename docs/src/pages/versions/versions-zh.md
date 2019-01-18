# Material-UI 版本号

<p class="description">你可以在任意时间回到本页切换文档的版本。</p>

## 稳定版本

我们推荐在生产环境中使用最新版本。

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## 最新版本

在这里您可以找到尚未发布的最新文档和代码。 你可以使用它来查看最新的更新内容, 并为 Material-UI 的贡献者提供更好的反馈。

{{"demo": "pages/versions/LatestVersion.js", "hideHeader": true}}

## 版本控制策略

我们认识到您需要来自Material-UI库的**稳定性**. 稳定性确保可重用组件和库、教程、工具和学习教程不会意外过时. 稳定性对于Material-UI蓬勃发展的生态系统至关重要.

This document contains **the practices that we follow** to provide you with a leading-edge UI library, balanced with stability. We strive to ensure that future changes are always introduced in a predictable way. We want everyone who depends on Material-UI to know when and how new features are added, and to be well-prepared when obsolete ones are removed.

Material-UI 严格遵循 [Semantic Versioning 2.0.0](https://semver.org/) 语义化版本规范。 Material-UI 的版本号由三部分组成：`主版本号.次版本号.修订版本号`。 版本号的选择是根据更新内容的数量决定

- **Major releases** contain significant new features, some but minimal developer assistance is expected during the update. When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.
- **次版本**包含重要的新功能。 Minor releases are fully backward-compatible; no developer assistance is expected during update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release.
- **日常更新**的风险较低。它包含了对bug的修复和较小的新功能。 No developer assistance is expected during update.

## 发布周期

We work toward a regular schedule of releases, so that you can plan and coordinate your updates with the continuing evolution of Material-UI.

通常情况下, 你可以根据以下的发布周期来预测:

- 每六个月发布一个**主版本**。
- 每个主版本会附带1-3个向下兼容的**次版本**。
- 每周会进行**日常**更新 (如果有紧急的 bugfix，则任何时候都可发布)。

## 发布计划

> 免责声明: 日期作为一般指导提供, 我们可以在必要时调整, 以确保交付高质量的代码。

| 日期      | 版本                         |
|:------- |:-------------------------- |
| 2019年1月 | `@material-ui/core` v4.0.0 |
| 2019年7月 | `@material-ui/core` v5.0.0 |

你可以在 [ 我们的里程碑 ](https://github.com/mui-org/material-ui/milestones) 中查看更详细的概述。

## Support policy

我们只支持Material-UI的最新版本。 我们目前还没有提供[LTS](https://en.wikipedia.org/wiki/Long-term_support)的版本

## Deprecation practices

Sometimes **"breaking changes"**, such as the removal of support for select APIs and features, are necessary.

To make these transitions as easy as possible, we make two commitments to you:

- We work hard to minimize the number of breaking changes and to provide migration tools when possible.
- We follow the deprecation policy described here, so you have time to update your apps to the latest APIs and best practices.

为了确保您有足够的时间和明确的方法更新, 以下是我们的弃用策略:

- 我们会在更新日志中公布过时的功能, 并在可能的情况下, 在运行时发出警告。
- 当我们公布一个过时的功能时, 同时会提供一个最佳的更新方法。
- We support existing use of a stable API during the deprecation period, so your code will keep working during that period.
- We only make peer dependency updates (React) that require changes to your apps in a major release.