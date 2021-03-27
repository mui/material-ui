---
title: Q1 2021 Update
description: An update on our mission for Q1 2021.
date: 2021-04-12T00:00:00.000Z
authors: ['oliviertassinari']
card: true
---

This update covers our progress over the last three months and what we aim to achieve in the coming months.

## Product

Here are the most significant improvements since December 2020.

### Design system

- 👩‍🎤 We have worked on rolling out and scaling the new **styling engine**  to all the components.
  At this point, we have migrated 121 components out of 167 to emotion/styled-components.
  Most of the components left to be migrated are in the lab.
  We are almost done! You can subscribe to [material-ui#24405](https://github.com/mui-org/material-ui/issues/24405) to be notified once finished.
  The community has been a valuable aid.
- 📚 As a corollary to the migration of the components, we have worked on the migration of the **documentation**.
  We have favoured the `sx` prop anytime possible.
  When the examples need to adapt to the provided props, we have used the `styled` API.
  Effectively, `makeStyle` and `withStyles` have been removed.
  You can subscribe to [material-ui#16947](https://github.com/mui-org/material-ui/issues/16947) to be notified once finished.
- 📚 We have used the migration of the documentation as an opportunity to breakdown the demos into smaller **single-focused** ones, with inline previews.
  For instance:

  <img src="/static/blog/2021-q1-update/docs-before.png" alt="" style="width: 526px; margin-top: 16px;" />

  <p class="blog-description">Before</p>

  was turned into multiple chunks, among:

  <img src="/static/blog/2021-q1-update/docs-after.png" alt="" style="width: 525px; margin-top: 16px;" />

  <p class="blog-description">After</p>

- 🥞 We have introduced a new `<Stack>` component.
  The component handles one-dimensional layouts and is quite interesting to fill the CSS browser support for the flexbox `gap` CSS property ([no support](https://caniuse.com/flexbox-gap) in Safari).

  <img src="/static/blog/2021-q1-update/stack.png" alt="" style="width: 502px; margin-bottom: 16px;" />

  You can find [more details](https://next.material-ui.com/components/stack/) in the documentation.

- 🎨 We have improved the support for custom colors and variants.
  This is [one](https://github.com/mui-org/material-ui/issues/13875) of the most upvoted issues in the GitHub issue tracker.
  The migration to the new style engine allows us to fully rely on dynamic styles.
  Developers can now do the following:

  ```jsx
  import { createMuiTheme, Button } from '@material-ui/core';

  // 1. Extend the theme.
  const theme = createMuiTheme({
    palette: {
      neutral: {
        main: '#5c6ac4',
      },
    },
  });

  // 2. Notify TypeScript about the new color in the palette
  declare module '@material-ui/core/styles' {
    interface Palette {
      neutral: Palette['primary'];
    }
    interface PaletteOptions {
      neutral: PaletteOptions['primary'];
    }
  }

  // 3. Profit
  <Button color="neutral"  />
  ```

  This new feature removes the need to create a wrapper component.

- 📍 We have synchronized the icons with the latest update of the Material Design icons.<br />
  Google has moved its icons to a new location: https://fonts.google.com/icons.
  At the same time, they have increased the number of provided icons from 6,500 to 8,500.
  You can find all these icons under the `@material-ui/icons` package.

- 🦴 We have migrated a couple of components to the `@material-ui/unstyled` package.
  The package aims to host the unstyled and headless (hooks) components.
  So far, you can only find:

  - Backdrop
  - Badge
  - Focus trap
  - Modal
  - Slider

  We are synchronizing the development of this package with the second theme effort (and not v5).

- 🛠 We added a subset of the system as flattened props to the CSS utilities components.
  While we initially didn't plan to do such, we went backward, hearing the feedback of the community.
  Developers can no do:

  ```jsx
  <Typography p={2} color="text.secondary" />
  <Box display="grid" />
  <Stack mt={1} />
  <Grid color="success.main" />
  ```

  Note that with the other components, only the `sx` prop is available.

- ⚓️ We have introduced a new release line: `v4.x.x-deprecations.x`.
  This release line is synchronized with the latest version of v4 and includes actionable deprecations to ease the migration to v5.

### Advanced components

We have primarily focused on the data grid components. We have fixed a lot of bugs but also delivered new features.

#### Date Picker

The date picker is at the border between the advanced components and the design system realms.

- 📚 We have fixed the generation of the API pages.
  You can now find all the props supported by all the public pickers components, e.g. [DatePicker](https://next.material-ui.com/api/date-picker/).
- ⚙️ We have mostly focused on addressing the technical debt present on the pickers components (ported from `@materal-ui/pickers`).

#### Data Grid

- 🔄 We have started to bring the support for [lazy-loading](/components/data-grid/rows/#infinite-loading).
- ⬇️ We have introduced the support for [CSV export](/components/data-grid/export/#csv-export).

  <img src="/static/blog/2021-q1-update/csv-export.png" alt="" style="width: 523px; margin-bottom: 16px;" />

- ♿️ We have fixed a couple of accessibility issues (more in progress).
- 🌏 We have introduced the support for [custom locales](/components/data-grid/localization/).
- 🚨 We have started to work on breaking changes to reach a stable stage.
- 💾 We have extended the support of @material-ui/core to handle v4 and v5 at the same time.
  In the future, we might desynchronize the release version of _mui/material-ui_ and _mui/material-ui-x_.
  For Material-UI X, we will likely need to release breaking changes at a higher frequency: every six months.
- 🎛 We have added a column selector.

  <img src="/static/blog/2021-q1-update/column-selector.png" alt="" style="width: 518px; margin-bottom: 16px;" />

### Design kits

#### Figma

We have migrated all the components to leverage the [Figma variant](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants) feature.
We have also taken this as an opportunity to polish the components:

- Improve usage of auto-layout
- Fix theme design token usage
- Add the Autocomplete component

#### Adobe XD

We have made Adobe XD available with a first release.

#### Sketch

We have redesigned most of the components from scratch to make sure all components show their CSS properties using inspection tools such as [Sketch Cloud Inspect tool](https://www.sketch.com/blog/2020/01/29/introducing-cloud-inspector-free-developer-handoff-in-the-browser/).

## Company

### Handbook

The most important change inside the organization is the introduction of a company Handbook.
The company is distributed and operates among different timezones.
Per the nature of our operation, and at the pace we are growing, we needed an effective and efficient way to share the organizing processes and culture.
Per our transparency value, all the sections of the Handbook that don't contain sensitive information are [publicly available](https://www.notion.so/Handbook-f086d47e10794d5e839aef9dc67f324b).

This Handbook is the single **source of truth**. It's meant to be updated by anyone, to say in sync with how we do things.

### Growth between Q4 2020 and Q1 2021

- 📦 From 6.4M to 8.6M downloads per month on npm.<br />
  It seems that React keeps taking market shares inside the frontend ecosystem.
  For instance, it's growing faster than Vue or Angular.
  All the indicators points to it: [StackOverflow questions](https://insights.stackoverflow.com/trends?tags=vue.js%2Creactjs%2Cangular), [stars](https://bestofjs.org/projects?sort=monthly), [downloads](https://npm-stat.com/charts.html?package=react-dom,@angular/core,vue), [Traffic on the documentation](https://www.similarweb.com/website/reactjs.org).
  Our strategy to focus on React only seems to pay off.

- ⭐️ From 63.8k to 67.2k stars, leave us yours [🌟](https://github.com/mui-org/material-ui).
  We have seen a significant influx of more stars than usual this quarter.
- 👨‍👩‍👧‍👦 From 2,052 to 2,141 contributors on GitHub. We add on average one new contributor every day.
- 💰 Grew gross monthly revenue by 68% (+4% weekly growth rate). We have never grown this fast.
- 🏢 We have welcomed one new member to Material-UI: [Matheus](/blog/matheus-wichman-joining/).

## Our roadmap intent for Q2 2021

We'll do our best, no guarantee!

### Company

We have signed with **four** new people to join the company this quarter (waiting for the notice period).
We will welcome our first designer and cross the ten people milestone in the coming weeks.

Objectives:

- Finish the implementation of the rebranding. A preview, the [about](https://next.material-ui.com/branding/about/) and [pricing](https://next.material-ui.com/branding/pricing/) pages.
- Onboard the new members and scale our processes as we double the size of the organization this quarter.

### Design system

- 🚀 Get v5 out! The development of this new version almost started a year ago. It's time to aim for the stable release.
- 📅 Start handling the issues reported by developers on the date picker.
- 🗓 Execute on all the items of the [public roadmap](https://github.com/mui-org/material-ui/projects/25).
- ❓ Please upvote [GitHub issues](https://github.com/mui-org/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Advanced components

- ✍️ Release the Data Grid cell edit feature we have been working on for the last two months.
- 📅 Start dedicating time to the date range picker.
- 🗓 Execute on all the items in the [public roadmap](https://github.com/mui-org/material-ui-x/projects/1).
- ❓ Please upvote [GitHub issues](https://github.com/mui-org/material-ui-x/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Design kits

- Release an update with the new Material Design icons on Figma, Sketch, Adobe XD.
- Adobe XD, improve the performance of the kit.
- Collect more users' feedback to identify the biggest improvement opportunities.
