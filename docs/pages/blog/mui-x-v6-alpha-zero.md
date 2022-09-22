---
title: MUI X v6.0.0-alpha.0
description: We’re kicking off the development of the next version.
date: 2022-09-30T00:00:00.000Z
authors: ['josefreitas']
tags: ['News']
---

We’re kicking off the development of MUI X v6. Both the Data Grid and Date Pickers are getting a new major version. We want to share our plans and invite you to join us on this next step.

:::warning

It’s important to notice that only MUI X is getting a new version; The core components remain in v5 for a while longer.
You can rest assured that all MUI X v6 components will be fully compatible with MUI Core v5.
::::

## How is it going to work?

Before officially releasing v6, we'll go through a few months with pre-releases. We’ll follow the current weekly release process and [semver versioning](https://semver.org/); The difference now is that instead of v5, we’ll ship v6 pre-release packages.

First, in the alpha phase, we’ll introduce all the breaking changes planned for this major. We’ll be exploring a bit, so it’s expected that some APIs will be unstable, not in terms of functionality, but we may need to rename or adjust parameters. This phase is planned to take about two months.

Next, comes the beta phase, where the APIs are more stable, and we focus on bug fixing and polishing the hard edges. This phase is planned to take about one month.

:::info
Disclaimer: We're working with 2 and 1 months for the alpha and beta phase respectively, but that's just a **reference**.

We operate in a dynamic environment that's subject to change. We may need to do more iterations or change the referenced time windows to deliver the great product we want.
:::

At last, we’ll release the first `v6.0.0` stable, and we’ll continue improving the components and adding features, but without making any new breaking changes until the next major version.
We’re establishing a one-year cycle for major versions, meaning the next major comes about one year after this release.

## What happens to v5?

During v6 pre-releases, v5 is the official current major, and it will remain supported during the next version development.
However, we’ll release new v5 versions by demand, only to patch bugs, or add community contributions.

All new features and enhacements go to v6, and after its first stable release, v5 is officially in [Long-term support](https://mui.com/versions/#long-term-support-lts).

## Where's the v6 documentation?

As mentioned above, v5 is still the official version, so by default, the documentation shows v5 features and API.
The next version's documentation is in the `next` subdomain.

- [https://next.mui.com/x/react-data-grid/](https://next.mui.com/x/react-data-grid/)
- [https://next.mui.com/x/react-date-pickers/](https://next.mui.com/x/react-date-pickers/)

## What’s coming next?

The following is a list of enhancements on the pipeline for the next few months. It contains the highlights that will make into the first versions.

### Data Grid

- **Extended customization abilities**.  
   We want to empower more users to suit the data grid to complex use cases.

  - [ApiRef in the community package](https://github.com/mui/mui-x/issues/6147).
  - [Filtering on header](https://github.com/mui/mui-x/issues/6247).
  - [Use the Data Grid internal components outside the grid](https://github.com/mui/mui-x/issues/2522).

- **Improved Design**  
   We’re polishing edges in terms of design and usability.

  - [New column menu](https://github.com/mui/mui-x/issues/4929).
  - [New column visibility panel](https://github.com/mui/mui-x/issues/5700).
  - [Column Resize Bar only on hover](https://github.com/mui/mui-x/issues/1623).

- **Rockstar feature**
  - [Copy and paste from/to multiple cells](https://github.com/mui/mui-x/issues/199).

### Date pickers

- **Improved UX**  
   On the previous version we focused a lot on developer experience and overall stability of the components. Now we’re pushing the lines to improve usability.
  - [Remove the clock view on time pickers (for desktop)](https://github.com/mui/mui-x/issues/4483).
  - [Visually edit a range by dragging date markers](https://github.com/mui/mui-x/issues/5311).
  - [Range shortcuts](https://github.com/mui/mui-x/issues/4563).
  - [A new text input for date and time values, retiring the mask solution (early preview)](https://next.mui.com/x/react-date-pickers/date-field/).

:::info
You can check our [roadmap](https://github.com/mui/mui-x/projects/1) for the full live list.
:::

## How to migrate?

We’ve prepared a [migration guide](https://mui.com/x/react-data-grid/migration-v5/), and we’ll feed the page over time, as we make any breaking changes during the pre-releases. It lists every update you need to do on your code to use the most recent packages.

We highly encourage you to try the new version. It is, after all, an improvement over the solid foundation we established with v5.

## How to get involved?

Please consider joining our alpha testers group channel and [giving us](https://forms.gle/vsBv6CLPz9h57xg8A) an user interview.  
You'll get an insider's perspective of the development and can help us iterate early in the new features.

As usual, we're glad to listen all the feedback, and you can also participate in the discussion by commenting on the features or reporting bugs in our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose). Finally, you can follow every step of the development through our [changelog](https://github.com/mui/mui-x/releases).
