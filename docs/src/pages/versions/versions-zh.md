# MUI 的不同版本

<p class="description">你可以随时回到本页来切换你在查阅的不同版本的文档。</p>

## 发行版本

建议在生产开发中使用最新的稳定版本.

{{"demo": "pages/versions/ReleasedVersions.js", "hideToolbar": true, "bg": "inline"}}

## 最新的版本

在这里您可以找到最新的尚未发布的文档和代码。 您可以使用它来查看即将实施的更新 , 并给 MUI  的贡献者提供更好地反馈。

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## 版本控制方案

稳定的版本保证了可重复使用的组件和库、教程、工具和学习教程不会意外的过时。 稳定性是 MUI  生态系统蓬勃发展的关键。

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced predictably.

MUI 遵循[语义化版本 2.0.0](https://semver.org/)。 MUI 的版本号由三部分组成： `主版本号.次版本号.修订号`。 版本号的递增是根据发行的更改级别而定义的。

- **Major releases** contain significant new features, some developer assistance is expected during the update. These releases include [breaking changes](#what-doesnt-count-as-a-breaking-change). When updating to a new major release, you may need to run update scripts, refactor code, run additional tests, and learn new APIs.
- **次版本** 包含重要的新功能。 Minor releases are fully backward-compatible; no developer assistance is expected during the update, but you can optionally modify your apps and libraries to begin using new APIs, features, and capabilities that were added in the release.
- **修订版本** 的更新风险低，包含了对 bug 的修复和较小的新功能。 No developer assistance is expected during the update.

## What doesn't count as a breaking change?

We call "breaking changes" those that require updating your codebase when upgrading to a new version, with the exception of:

- **APIs starting with "unstable\_"**. These are provided as experimental features whose APIs we are not yet confident in. By releasing these with an `unstable_` prefix, we can iterate faster and get to a stable API sooner, or simply learn that we don't need the API/feature in the first place.
- **APIs documented as experimental**. Same as the above.
- **Undocumented APIs and internal data structures**. If you access internal properties, there is no warranty. You are on your own.
- **Development warnings**. Since these don't affect production behavior, we may add new warnings or modify existing warnings in between major versions. In fact, this is what allows us to reliably warn about upcoming breaking changes.
- **Pre-releases versions**. We provide pre-release versions as a way to test new features early, but we need the flexibility to make changes based on what we learn in the pre-release period. If you use these versions, note that APIs may change before the stable release.
- **Small CSS changes**. Visual design changes that have a very low probability of negatively impacting your UI are not considered breaking.

## 发布周期

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of MUI.

In general, you can expect the following release cycle:

- A **major** release every 12 months.
- 1-3 **minor** releases for each major release.
- A **patch** release every week (anytime for an urgent bug fix).

## 发布时间表

| 日期         | 版本     | 状态   |
|:---------- |:------ |:---- |
| 待定         | v6.0.0 | 暂未开发 |
| 2021 年 9 月 | v6.0.0 | 已发布  |
| 2019 年 5 月 | v4.0.0 | 已发布  |
| 2018 年 9 月 | v3.0.0 | 已发布  |
| 2018 年 5 月 | v1.0.0 | 已发布  |

You can follow the [milestones](https://github.com/mui/material-ui/milestones) for a more detailed overview.

> ⚠️**免责声明** ：我们在动态的环境中运作，情况随时可能发生变化。 提供的信息旨在概述总体框架方向， 仅供参考。 我们可能会根据我们的交付能力来随时决定增加或删除新的项目来确保我们的质量标准。 The development, releases, and timing of any features or functionality remains at the sole discretion of MUI. The roadmap does not represent a commitment, obligation, or promise to deliver at any time.

## Supported versions

MUI Core has been open-source ([MIT](https://tldrlegal.com/license/mit-license)) since the very beginning, and always will be. Developers can ensure MUI is the right choice for their React applications through MUI's community maintenance strategy. The MUI team regularly ships new releases, bug fixes, and is very welcoming to community pull requests.

Given the reality of time and resource constraints, as well as the desire to keep innovating, over time it becomes necessary to shift focus to newer versions of the framework ([our release schedule](#release-frequency)), while making the transition to newer versions as smooth as possible, including publishing migration guides such as [this one for v5](/material-ui/migration/migration-v4/). The open-source community is always welcome to submit new features and bug fixes as well.

The current status of each MUI version is as follows:

- MUI Core v5: ✅ Active development and continuous support.
- [Material UI v4](https://v4.mui.com/): ⚠️ Guaranteed Support for security issues and regressions.
- [Material UI v3](https://v3.mui.com/): 🅧 No longer supported.
- Material UI v2: 🅧 Never existed.
- [Material UI v1](https://v1.mui.com/): 🅧 No longer supported.
- [Material UI v0.x](https://v0.mui.com/#/): 🅧 No longer supported.

For teams and organizations that require additional support for older versions, MUI has [options available](/material-ui/getting-started/support/#paid-support).

### 长期支持 (LTS)

MUI will continue to provide security updates and support for regressions for one version prior to the current major version, for example regressions caused by external factors such as browser updates, or changes to upstream dependencies.

## Deprecation practices

Sometimes "breaking changes", such as the removal of support for select APIs and features, are necessary. To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools are provided when possible (e.g. codemods).
- The deprecation policy described below is followed so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
