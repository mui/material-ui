---
title: Q2 2021 Update
description: An update on our mission for Q2 2021.
date: 2021-07-12T00:00:00.000Z
authors: ['oliviertassinari']
card: true
---

This update covers our progress over the last three months and what we aim to achieve in the months ahead.

## Overview

- [Product](#product)
  - [Core components](#core-components)
  - [Advanced components](#advanced-components)
  - [Design kits](#design-kits)
- [Company](#company)
- [Our roadmap intent for Q3 2021](#our-roadmap-intent-for-q3-2021)

## Product

Here are the most significant improvements since March 2021.

### Core components

- 🔥 We have made enough progress to ship [v5.0.0-beta.0](https://github.com/mui-org/material-ui/releases/tag/v5.0.0-beta.0). A few statistics to give an idea of the effort that went into it:

  - [12 months](/blog/2020-q2-update/#product) of dedicated focus. Early on, we have stopped efforts on v4.
  - 3,475 pull requests
  - 5,092 commits (the extra commits came from the merge with [material-ui-pickers](https://github.com/mui-org/material-ui-pickers))
  - 398 contributors
  - The equivalence of, on average, four full-time developers working on it (core team + community).

- 👩‍🎤 We have rolled out the new **styling engine** to all the components.
  The community has provided invaluable assistance. In v5, we have standardized on the `styled()` API as the styling foundation we build on top of, e.g. [the `sx` prop](https://next.material-ui.com/system/the-sx-prop/). This API is loved by the community and implemented by a number of styling libraries: styled-components, emotion, stitches, goober, etc. It allows us to support them all, with [adapters](https://next.material-ui.com/guides/styled-engine/#how-to-switch-to-styled-components).

- ⚒️ We added a [codemod CLI](https://github.com/mui-org/material-ui/tree/HEAD/packages/material-ui-codemod) and 17 transformations to automatically migrate codebases from v4 to v5.
  If you are not familiar with what a codemod is, you can follow [this presentation](https://www.youtube.com/watch?v=H9qtLutnT_g).

- 💄 We have [updated](https://next.material-ui.com/components/slider/#sizes) the style of the Slider to better match the Material Design guidelines, and kept a similar style as before under `size="small"`:

  <img loading="lazy" src="/static/blog/2021-q2-update/slider.png" alt="" style="width: 838px; margin-bottom: 16px;" />

- ✨ The new style engine has unlocked problems we couldn't solve before on the Grid component with JSS.

  We have added support for [row & column](https://next.material-ui.com/components/grid/#row-amp-column-spacing) spacing:

  ```jsx
  <Grid container rowSpacing={1} columnSpacing={2} />
  ```

  We have added support for [responsive values](https://next.material-ui.com/components/grid/#responsive-values) on all the props:

  ```jsx
  <Grid container spacing={{ xs: 2, md: 3 }} />
  ```

  We have added support for a different [number of columns](https://next.material-ui.com/components/grid/#columns) than 12:

  ```jsx
  <Grid container columns={16}>
  ```

  We have an alternative implementaton that uses [CSS grid](https://next.material-ui.com/components/grid/#css-grid-layout):

  ```jsx
  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
    <Box gridColumn="span 8">
      <Item>xs=8</Item>
    </Box>
    <Box gridColumn="span 4">
      <Item>xs=4</Item>
    </Box>
    <Box gridColumn="span 4">
      <Item>xs=4</Item>
    </Box>
    <Box gridColumn="span 8">
      <Item>xs=8</Item>
    </Box>
  </Box>
  ```

### Advanced components

We have primarily focused on the data grid components, fixing a lot of bugs.

#### Date Picker

The date picker is at the border between the advanced components and the design system realms.

- 🐛 We have fixed a couple of straightforward problems: visual bugs, usage of the `components` prop for customizability, etc.
- ⚙️ We have continued to focus on addressing the technical debt present in the picker components.

#### Data Grid

- 🚨 We have continued to work on breaking changes to reach a stable version. We think that the component is good enough for usage in production, but we want to get the public API right before committing to a stable release.
- ✍️ We have added support for the [cell edit mode](https://material-ui.com/components/data-grid/editing/).

  <img loading="lazy" src="/static/blog/2021-q2-update/cell-edit.gif" alt="" style="width: 842px; margin-bottom: 16px;" />

- 🐛 We have focused on fixing bugs and regressions to ensure early users have a great experience with the component. This was done instead of taking on new ambitious features.
  We want our users to be able to adopt new features as fast as we build them.
- 🔘 We have added support for a built-in [single select](/components/data-grid/columns/#column-types) column type:

  <img loading="lazy" src="/static/blog/2021-q2-update/single-select.png" alt="" style="width: 481px; margin-bottom: 16px;" />

  <p class="blog-description">the <a href="https://codesandbox.io/s/material-demo-forked-iuyo5?file=/demo.js">codesandbox</a></p>

  and the **boolean** column type.

- 🚀 We have improved the performance. For instance, client-side sorting and filtering are x2-3 faster on large data sets. We have improved the UX when scrolling. We have added a memo logic on the render cell's parent and work on its effectiveness to reduce the rendering of custom cells. We have identified more opportunities to improve the performance, but we won't prioritize them just yet.
- 📚 We have worked on providing more reference documentation. We are semi-automatically generating it from the TypeScript source definitions, with the descriptions.
  For instance, you can now find all the [properties available](/api/data-grid/grid-col-def/) of the `GridColDef`.
- ⚡️ We have fixed support for components that use portals, like Select and Autocomplete in the cell editing mode.
- 🌏 We have accepted many new built-in locales (+15) from the community, after the introduction of [the feature](/components/data-grid/localization/#supported-locales) in Q1.

### Design kits

#### Figma

Designers have a great sense of detail.
We have polished the kit, using all the feedback that we could get.
We have also introduced support of a [dark mode](https://www.figma.com/file/7M8OmZIv6WigOjbSV7Xxlg/2021-q2-update?node-id=4230%3A724)! We have worked on making the design kit close to the React components.
This reduces miscommunications between designers and developers.

#### Adobe XD

We have fixed performance issues and polished the kit.

#### Sketch

We have added support of a dark mode and polished the kit.

## Company

In the first quarter, we have focused on introducing a [handbook](https://material-ui.com/blog/2021-q1-update/#handbook) to share our culture and to solve the N(N-1)/2 communication channels problem that comes with a larger team.

### OKRs

This quarter, we took on a new initiative to help us solve three problems:

- create alignment on the goals
- improve how we measure success
- create space to take on large initiatives, away from the day-to-day PRs and issues management

After considering [different](https://basecamp.com/shapeup) [alternatives](https://coda.io/@shishir/rituals-for-hypergrowth-an-inside-look-at-how-youtube-scaled), we are going with the [OKRs methodology](https://www.whatmatters.com/resources/google-okr-playbook/).

### Growth between Q1 2021 and Q2 2021

- 📦 From 8.6M to 9.1M downloads per month on npm.
- ⭐️ From 67.2k to 69.1k stars, leave us yours [🌟](https://github.com/mui-org/material-ui).
- 👨‍👩‍👧‍👦 From 2,141 to 2,223 contributors on GitHub. We add on average one new contributor every day.

### New members

We have welcomed three new members to the company 🏢:

- [Michal](/blog/michal-dudak-joining/), he leads the initiative around the [unstyled version](https://github.com/mui-org/material-ui/issues/6218) of Material-UI (hooks).

  <img loading="lazy" src="/static/blog/2021-q2-update/michal.jpeg" alt="michal" style="max-width: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

- [Danilo](https://daniloleal.co/), a Lead designer to raise our design game.

  <img loading="lazy" src="/static/blog/2021-q2-update/danilo.jpeg" alt="danilo" style="max-width: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

- [Flavien](https://github.com/flaviendelangle), an engineer with previous experience building [design systems](https://habx.github.io/ui-core/) and a complex 2D JavaScript rendering engine. He will help us take on bolder problems on the advanced components (X team).

Also, we are **hiring** for various roles! If you're interested in joining us, check out our [jobs page](/company/careers/#open-roles).

## Our roadmap intent for Q3 2021

We'll do our best, no guarantee!

### Company

We have the following objectives:

- Continue to refine our processes to make sure we function well with over ten people in the company.
- Ship a rebranding. We have started this effort one year ago but failed to execute it. We were missing an owner with enough bandwidth to make it happen. With Danilo and Jun in the team to own the effort, we can finally make it happen.
- Open 4 roles: to strengthen the X team (advanced components) and to start the development of a bold new product vertical.

### Core components

- 🚀 Get v5 stable out! At this point, v5-alpha has about [1%](https://npm-stat.com/charts.html?package=%40material-ui%2Fstyled-engine&package=%40material-ui%2Fcore&from=2020-06-22&to=2021-06-22) of the downloads of v4. It's a lot of value accumulated and not delivered. We aim to migrate 25% of the community by the end of the quarter.
- ⚛️ Support React 18
- ♨️ Fix the frictions the community has during the upgrade.
- 🦴 Migrate more components to `@material-ui/unstyled`.
- 🌈 Do a POC on a second theme.
- 🗓 Execute on all the items of the [public roadmap](https://github.com/mui-org/material-ui/projects/25).
- ❓ Please upvote [GitHub issues](https://github.com/mui-org/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Advanced components

- 🚀 Make the first stable release of the Data Grid, with the core on v5.
- ✨ Resume work on the [key features](https://github.com/mui-org/material-ui-x/issues?q=is%3Aopen+label%3A%22linked+in+docs%22+sort%3Areactions-%2B1-desc), after a quarter focused on stability.
- 🗓 Execute on all the items in the [public roadmap](https://github.com/mui-org/material-ui-x/projects/1).
- ❓ Please upvote [GitHub issues](https://github.com/mui-org/material-ui-x/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Design kits

- Handle designers' pain and bug reports to polish the product.
- Run a survey on thousands of customers to identify important improvement opportunities. Should we build plugins to more easily switch the token variables between design and code? Should we add more in context examples? Should we focus on inconsistencies? etc.
