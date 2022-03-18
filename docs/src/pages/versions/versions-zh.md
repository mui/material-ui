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

本文档包含了为您提供的一些前沿的 UI 库所遵循的练习， 在保持稳定的同时确保今后的变更总是以可预测的方式引进。

MUI 遵循[语义化版本 2.0.0](https://semver.org/)。 MUI 的版本号由三部分组成： `主版本号.次版本号.修订号`。 版本号的递增是根据发行的更改级别而定义的。

- **主版本**包含重要的新功能，更新时需要一些少量开发人员的支持。 当更新到一个新的主要的发行版本时，您可能需要运行更新脚本，重构代码，运行其他测试以及学习新的 API。
- **次版本** 包含重要的新功能。 次要发行版本完全向后兼容；更新时不需要开发人员的支持，但您可以选择修改应用程序和库来使用新的版本中添加的新 API ，特征和功能。
- **修订版本** 的更新风险低，包含了对 bug 的修复和较小的新功能。 更新时不需要开发人员的支持。

## 发布周期

规律的发布周期可以帮助您规划和适应 MUI 不断地演变。

通常情况下，你可以预期以下的发布周期：

- 每12个月发布一个**主版本**。
- 每个主版本会包含 1-3 个**次版本**。
- 每周发布**修订**版本（随时都会对紧急错误的修复发布更新）。

## 发布时间表

| 日期         | 版本     | 状态               |
|:---------- |:------ |:---------------- |
| 2018 年 5 月 | v1.0.0 | 已发布              |
| 2018 年 9 月 | v3.0.0 | 已发布              |
| 2019 年 5 月 | v4.0.0 | 已发布              |
| 2021 年 9 月 | v5.0.0 | Work in progress |

查看 [里程碑](https://github.com/mui/material-ui/milestones) 可以得到一个更详细的总览。

> ⚠️**免责声明** ：我们在动态的环境中运作，情况随时可能发生变化。 提供的信息旨在概述总体框架方向， 仅供参考。 我们可能会根据我们的交付能力来随时决定增加或删除新的项目来确保我们的质量标准。 The development, releases, and timing of any features or functionality remains at the sole discretion of MUI. The roadmap does not represent a commitment, obligation, or promise to deliver at any time.

## 支持的版本

MUI Core has been open-source ([MIT](https://tldrlegal.com/license/mit-license)) since the very beginning, and always will be. Developers can ensure MUI is the right choice for their React applications through MUI's community maintenance strategy. The MUI team regularly ships new releases, bug fixes, and is very welcoming to community pull requests.

Given the reality of time and resource constraints, as well as the desire to keep innovating, over time it becomes necessary to shift focus to newer versions of the framework ([our release schedule](#release-frequency)), while making the transition to newer versions as smooth as possible, including publishing migration guides such as [this one for v5](/guides/migration-v4/). The open-source community is always welcome to submit new features and bug fixes as well.

The current status of each MUI version is as follows:

- MUI Core v5: ✅ Active development and continuous support.
- [MUI Core v4](https://v4.mui.com/): ⚠️ Guaranteed Support (only) for security issues and regressions.
- [MUI Core v3](https://v3.mui.com/): 🅧 No longer supported.
- ~MUI Core v2 (never existed)~.
- [MUI Core v1](https://v1.mui.com/): 🅧 No longer supported.
- [MUI Core v0.x](https://v0.mui.com/#/): 🅧 No longer supported.

For teams and organizations that require additional support for older versions, MUI has [options available](/getting-started/support/#professional-support-premium).

### Long-term support (LTS)

MUI will continue to give security updates and regressions support (for example, if there's any regression caused by Chrome, React, etc) to the version prior to the current major until the next one is released.

## 弃用的实践

Sometimes **"breaking changes"**, such as the removal of support for select APIs and features, are necessary.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.
