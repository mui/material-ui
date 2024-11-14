---
title: The road to MUI X v8
description: Explore the planned features and our roadmap to the next major version.
date: 2024-11-20T00:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
---

We're kicking off the development of [MUI X v8](https://github.com/mui/mui-x/releases/tag/v8.0.0-alpha.0).
Following our yearly release cycle, the target for the first stable release is March 2025.
This major update includes new versions of the Data Grid, Charts, Tree View, and the Date and Time Pickers.
We're excited to share our roadmap with you and invite you to join us on this journey!

:::warning
Only MUI X is getting a new version—Material UI will remain in v6 for now.
Since only MUI X is getting a new version, you can rest assured that all MUI X v8 components will be fully compatible with Material UI v5 and v6.
::::

## What's the plan to get to the next major release?

Before the official release of MUI X v8, we'll go through a few months of pre-releases.
During this period, we'll continue with our usual weekly release process and follow [semantic versioning](https://semver.org/).
While we'll still release bug fixes for v7, these will become less frequent as we progress toward a stable v8 release.
Our primary focus will be on delivering the new features and implementing the necessary breaking changes in the v8 pre-release packages.

In the alpha phase, we'll introduce all planned breaking changes for this major version. Some APIs may be unstable—not in terms of functionality, but there may be adjustments or renaming of parameters. This phase is expected to last about two to three months.

Following the alpha phase, the beta phase will focus on stabilizing the APIs, fixing bugs, and refining the overall experience. This phase is anticipated to take about one month.

Finally, we'll release the first `v8.0.0` stable by March 2025, and we'll continue improving the components and adding features, but without making any new breaking changes until the next major version.

## What happens to v7?

During v8 pre-releases, v7 will continue to be the official current major, and it will remain supported during this time.
However, we will only release new v7 versions as needed to patch bugs or add community contributions.

All new features and enhancements will go to v8, and after its first stable release, v7 will officially transition to [long-term support](https://mui.com/x/introduction/support/#long-term-support-lts) status.

## Where's the v8 documentation?

As mentioned above, v7 is still the official version, so by default, the documentation shows v7 features and API.
The next version's documentation is in the `v8` subdomain.

- [https://next.mui.com/x/introduction/](https://next.mui.com/x/introduction/)

## What's new in v8

The following is a list of enhancements in the pipeline for v8.
It contains the highlights we aim to include in the first versions:

### Data Grid

- [Drag and drop with touch support](https://github.com/mui/mui-x/issues/15385)
- [New Toolbar](https://github.com/mui/mui-x/issues/11584)
- [Row spanning](https://mui.com/x/react-data-grid/row-spanning/) (Now stable)
- [Pivoting](https://github.com/mui/mui-x/issues/214) [<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan 'Premium plan')

### Date and Time Pickers

- [Improved visual customization](https://github.com/mui/mui-x/issues/14753)
- [Accessible DOM field by default](https://mui.com/x/react-date-pickers/fields/#accessible-dom-structure)
- [Time Range Picker](https://github.com/mui/mui-x/issues/4460) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

### Tree View

- [Parent/chidren selection propagation](https://github.com/mui/mui-x/issues/12883)
- [Lazy loading](https://github.com/mui/mui-x/issues/9687)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
- [Virtualization](https://github.com/mui/mui-x/issues/9685)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

### Charts

- Improved design
- [Radar Chart](https://github.com/mui/mui-x/issues/7925)
- [Improved data zoom](https://github.com/mui/mui-x/issues/15383)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
- [Funnel Chart](https://github.com/mui/mui-x/issues/7929)[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

:::info
You can check our [roadmap](https://github.com/orgs/mui/projects/35) for the full live list.
:::

## How to migrate

As usual, we've prepared a migration guide for each component, and we'll continuously update them as we make any breaking changes during the pre-releases.
They list every breaking change you may need to update to migrate your codebase.

- [Data Grid](https://next.mui.com/x/migration/migration-data-grid-v7/)
- [Date and Time Pickers](https://next.mui.com/x/migration/migration-pickers-v7/)
- [Charts](https://next.mui.com/x/migration/migration-charts-v7/)
- [Tree View](https://next.mui.com/x/migration/migration-tree-view-v7/)

We strongly encourage you to try the new version—it builds on the solid foundation we established with v7, bringing even more improvements!

## How to get involved

We'd love to hear about your expectations and pain points! Please consider [connecting with us](https://forms.gle/vsBv6CLPz9h57xg8A) for a user interview.
You'll get an insider's perspective on the development, and you'll be able to help us iterate early on the new features.

We're also happy to receive feedback on new features and bug reports in our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose).
You can follow every step of the v8 development process through our [changelog](https://github.com/mui/mui-x/releases).
