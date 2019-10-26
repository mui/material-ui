# Material-UI 的不同版本

<p class="description">你可以随时回到本页来切换不同版本的文档。</p>

## 稳定版本

我们推荐在生产开发中使用最新版本。

{{"demo": "pages/versions/StableVersions.js", "hideHeader": true}}

## 最新版本

在这里您可以找到尚未发布的最新文档和代码。 您可以使用它来查看即将实施的更新 , 并给 Material-UI 的贡献者提供更好的反馈。

{{"demo": "pages/versions/LatestVersions.js", "hideHeader": true}}

## 版本控制方案

Stability ensures that reusable components and libraries, tutorials, tools, and learned practices don't become obsolete unexpectedly. Stability is essential for the ecosystem around Material-UI to thrive.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Material-UI follows [Semantic Versioning 2.0.0](https://semver.org/). Material-UI 的版本号由三部分组成：`主版本号.次版本号.修订版本号`。 版本号的选择是根据更新内容的数量决定

- **主要版本** 包含重要的新功能，有些但在更新期间预计会提供最少的开发人员帮助。 更新到新的主要版本时，您可能需要运行更新脚本，重构代码，运行其他测试以及学习新API。
- **次版本**包含重要的新功能。 次要版本完全向后兼容;更新期间不需要开发人员协助，但您可以选择修改应用程序和库，以开始使用发行版中添加的新API，功能和功能。
- **日常更新**的风险较低。它包含了对bug的修复和较小的新功能。 更新期间不需要开发人员协助。

## 发布周期

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

通常情况下, 你可以根据以下的发布周期来预测:

- A **major** release every 12 months.
- 每个主版本会附带1-3个向下兼容的**次版本**。
- 每周会进行**日常**更新 (如果有紧急的 bugfix，则任何时候都可发布)。

## 发布计划

| 日期             | 版本     | Status   |
|:-------------- |:------ | -------- |
| May 2018       | v1.0.0 | Released |
| Septembre 2018 | v3.0.0 | Released |
| May 2019       | v4.0.0 | Released |
| Q3 2020        | v5.0.0 | ⏳        |


You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

> ⚠️ **Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction. It's intended for informational purposes only. We may decide to add/remove new items at any time depending on our capability to deliver while meeting our quality standards. The development, releases and timing of any features or functionality of Material-UI remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation or promise to deliver at any time.

## 支持政策

Find details on the [supported versions](/getting-started/support/#supported-versions).

## 弃用做法

有时， **“破坏更改”**，例如删除对选定API和功能的支持，是必要的。

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### 弃用原则

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.