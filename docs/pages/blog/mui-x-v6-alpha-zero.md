---
title: A major update is coming for MUI X—and you can get involved
description: Let us know what you want to see in MUI X v6 as we begin the alpha phase of development.
date: 2022-09-30T00:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: true
---

We're kicking off the development of [MUI X v6](https://github.com/mui/mui-x/releases/tag/v6.0.0-alpha.0).
Both the Data Grid and the Date and Time Pickers will get a new major version.
We want to share our plans and invite you to join us on this next step.

:::warning
It's important to note that only MUI X is getting a new version—MUI Core (including Material UI) will remain in v5 for now.
You can rest assured that all MUI X v6 components will be fully compatible with MUI Core v5.
::::

## What's the plan to get to a stable release?

Before officially releasing v6, we'll go through a few months with pre-releases.
We'll follow the current weekly release process and [semver versioning](https://semver.org/); the difference now is that instead of v5, we'll ship v6 pre-release packages.

First, in the alpha phase, we'll introduce all the breaking changes planned for this major.
We'll be exploring a bit, so it's expected that some APIs will be unstable—not in terms of functionality, but we may need to rename or adjust parameters.
This phase is planned to take about two months.

Next comes the beta phase, where the APIs will be more stable, and we'll focus on fixing bugs and polishing the hard edges.
This phase is planned to take about one month.

:::info
Disclaimer: This timeline—2 months in alpha, 1 month in beta—is purely for reference.

We operate in a dynamic environment that's subject to change, and the actual timeline could vary.
We may need to do more iterations in the interest of delivering the best possible product.
:::

Finally, we'll release the first `v6.0.0` stable, and we'll continue improving the components and adding features, but without making any new breaking changes until the next major version.
We hope to reach the stable release by the end of 2022.
We're establishing a one-year cycle for major versions, meaning the next major will arrive about one year after this release.

## What happens to v5?

During v6 pre-releases, v5 will continue to be the official current major, and it will remain supported during this time.
However, we will only release new v5 versions as needed to patch bugs or add community contributions.

All new features and enhancements will go to v6, and after its first stable release, v5 will officially transition to [long-term support](https://mui.com/x/introduction/support/#long-term-support-lts) status.

## Where's the v6 documentation?

As mentioned above, v5 is still the official version, so by default, the documentation shows v5 features and API.
The next version's documentation is in the `next` subdomain.

- [https://next.mui.com/x/react-data-grid/](https://next.mui.com/x/react-data-grid/)
- [https://next.mui.com/x/react-date-pickers/](https://next.mui.com/x/react-date-pickers/)

## What's coming next?

The following is a list of enhancements in the pipeline for v6.
It contains the highlights that will be included in the first versions.

### Data Grid

- **Extended customization abilities**.\
  We want to empower more users to employ the Data Grid for complex use cases.

  - [ApiRef in the community package](https://github.com/mui/mui-x/issues/6147).
  - [Filtering on header](https://github.com/mui/mui-x/issues/6247).
  - [Use the Data Grid internal components outside the grid](https://github.com/mui/mui-x/issues/2522).

- **Improved look & feel**\
  We're polishing edges in terms of design and usability.

  - [New column menu](https://github.com/mui/mui-x/issues/4929).
  - [New column visibility panel](https://github.com/mui/mui-x/issues/5700).
  - [Column resize bar only on hover](https://github.com/mui/mui-x/issues/1623).

- **Rockstar feature**
  - [Copy and paste from/to multiple cells](https://github.com/mui/mui-x/issues/199).

### Date and Time Pickers

- **Improved UX**\
  In the previous version we focused on developer experience and overall stability of the components.
  Now we're tackling ways to improve usability.

  - [Remove the clock view on time pickers (for desktop)](https://github.com/mui/mui-x/issues/4483).
  - [Visually edit a range by dragging date markers](https://github.com/mui/mui-x/issues/5311).
  - [Range shortcuts](https://github.com/mui/mui-x/issues/4563).
  - [A new text input for date and time values, retiring the mask solution (early preview)](https://next.mui.com/x/react-date-pickers/date-field/).

- **Improved Customization**\
  v6 will be packed with new customization abilities and support for new use cases.
  - [The new fields are based on a headless approach with custom hooks. (Documentation is coming soon)](https://next.mui.com/x/react-date-pickers/date-field/#headless-usage).
  - [Single Input for Date Range](https://github.com/mui/mui-x/issues/5193).
  - [Enable customization through component slots on every component](https://github.com/mui/mui-x/issues/4466).

:::info
You can check our [roadmap](https://github.com/orgs/mui/projects/35) for the full live list.
:::

## How to migrate?

We've prepared a [migration guide](https://deploy-preview-6235--material-ui-x.netlify.app/x/react-data-grid/migration-v5/), and we'll continuously update it as we make any breaking changes during the pre-releases.
It lists every update you need to make to your code to use the most recent packages.

We highly encourage you to try the new version.
It is, after all, an improvement over the solid foundation we established with v5.

## How to get involved?

Please consider joining our alpha testers group channel and [connecting with us](https://forms.gle/vsBv6CLPz9h57xg8A) for a user interview.
You'll get an insider's perspective on the development, and you'll be able to help us iterate early on the new features.

As always, we're happy to get your feedback.
You can participate in the discussion by commenting on new features or reporting bugs in our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose).
Finally, you can follow every step of the development through our [changelog](https://github.com/mui/mui-x/releases).
