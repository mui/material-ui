---
title: Q3 2021 Update
description: An update on our mission for Q3 2021.
date: 2021-10-13T00:00:00.000Z
authors: ['oliviertassinari']
card: true
---

This update covers our progress over the last three months.
It also covers what we aim to achieve in the months ahead.

## Overview

- [Product](#product)
  - [MUI Core](#mui-core)
  - [MUI X](#mui-x)
  - [Design kits](#design-kits)
- [Company](#company)
- [Our roadmap intent for Q4 2021](#our-roadmap-intent-for-q4-2021)

## Product

Here are the most significant improvements since early July 2021.

### MUI Core

- 🔥 We have released a brand new major version: [v5.0.0](https://github.com/mui-org/material-ui/releases/tag/v5.0.0).
  We are excited about what it means for the future of the library! We hope you are going to enjoy the simplified customizations, the extra flexibility, and more.
  For context, it took us over a year to pull it off. With almost an exclusive focus on v5 (over v4).
  You can read the [release blog post](/blog/mui-core-v5/).
- ✨ We have also introduced a brand new [product page](/core/) this quarter to better present what the Core is about.
- 🔎 We have reworked the search experience on the documentation:

  - The component pages now rank before the API pages.
  - Instead of only displaying up to 5 results, you can scroll more results.
  - An icon illustrates the nature of the match. It can either be a page, a header, or a paragraph.
  - Your most recent searches are saved in local storage.

  <img loading="lazy" src="/static/blog/2021-q3-update/old-search.png" alt="" style="width: 596px;" />

  <p class="blog-description">Before</p>

  <img loading="lazy" src="/static/blog/2021-q3-update/new-search.png" alt="" style="width: 600px; margin-top: 32px;" />

  <p class="blog-description">After</p>

- [Masonry](/components/masonry/). We have introduced a new component for when using the `Grid` component leads to wasted space. It's frequently used in dashboards.

  <a href="/components/masonry/"><img loading="lazy" src="/static/blog/2021-q3-update/masonry.png" style="width: 700px; margin-bottom: 16px;" /></a>

- We have introduced a new [unstyled package](https://www.npmjs.com/package/@mui/core), setting the first stones for supporting multiple design systems with headless components.
  While balancing time between the release of v5 stable and pushing this effort forward was hard, we have still managed to introduce these first few components:

  - [Autocomplete](/components/autocomplete/#useautocomplete)

  ```jsx
  import { useAutocomplete } from '@mui/core/AutocompleteUnstyled';
  ```

  - [Button](/components/buttons/#unstyled)

  ```jsx
  import { useButton } from '@mui/core/ButtonUnstyled';
  ```

  - [Modal](/components/modal/#unstyled)

  ```jsx
  import ModalUnstyled from '@mui/core/ModalUnstyled';
  ```

  - [Slider](/components/slider/#unstyled)

  ```jsx
  import SliderUnstyled from '@mui/core/SliderUnstyled';
  ```

  - [Switch](/components/switches/#unstyled)

  ```jsx
  import { useSwitch } from '@mui/core/SwitchUnstyled';
  ```

  - [Portal](/components/portal/#unstyled)

  ```jsx
  import Portal from '@mui/core/Portal';
  ```

  - [TrapFocus](/components/trap-focus/#unstyled)

  ```jsx
  import TrapFocus from '@mui/core/Unstable_TrapFocus';
  ```

### MUI X

We have focused on the data grid components, aiming for a stable release.
We have also introduced a brand new [product page](/x/) this quarter to better present what X is about.

#### Date Picker

The date picker is at the border between the core component and advanced components realms.

- ❌ A few updates but no major ones worth sharing.
  With the release of v5 stable and our focus on the data grid, nobody in the team had the bandwidth to work on it.

#### Data Grid

- 🔥 We have released our first stable version: [v4.0.0](https://github.com/mui-org/material-ui-x/releases/tag/v4.0.0)!
  We have also released a v5-beta to support MUI Core v5.
  We will be working almost exclusively on the v5 release line going forward.

- 🔎 We have added a [quick filter demo](/components/data-grid/filtering/#quick-filter) to illustrate how it can be implemented.
  We will add a [built-in](https://github.com/mui-org/material-ui-x/issues/202) solution later on.

  <a href="/components/data-grid/filtering/#quick-filter"><img loading="lazy" src="/static/blog/2021-q3-update/quick-filter.png" style="width: 700px; margin-bottom: 16px;" /></a>

- 🐛 We have fixed several non React idiomatic patterns. For instance, we were not handling controllable props by the book, and as we do on MUI Core.

- 🚀 Introduce the [row editing](/components/data-grid/editing/#row-editing) feature.

  <img src="/static/blog/2021-q3-update/row-edit.gif" width="851" />

- 🦺 We have added a [`disableVirtualization`](/components/data-grid/virtualization/#disable-virtualization) prop to make it easier to test the data grid without a real browser environment, for instance in jsdom with Jest.
- 🚛 We have added a `onViewportRowsChange` prop as a first step toward being able to lazy load a large dataset.
- Last but not least, we have resumed the work on [key missing features](https://github.com/mui-org/material-ui-x/issues?q=is%3Aopen+label%3A%22linked+in+docs%22+sort%3Areactions-%2B1-desc).
  We have the print export and tree data in the pipeline.

### Design kits

We have introduced a brand new [product page](/design-kits/) this quarter to better present the design kits.

#### Figma

We have updated the kit to be up-to-date with MUI Core v5.
We have included the MUI X components, and as always, we have been fixing all the small polish issues raised by our users on the support channel.

#### Adobe XD

No updates.

#### Sketch

No updates.

## Company

### Retreat

We have run our first company team retreat 🏝.
For this first iteration, the team members that could travel and felt it was safe enough with COVID-19 have flown to Lisbon 🇵🇹.
We ended up being less than half the company but it was fun!
We have spent half the time doing a [Hackathon](https://twitter.com/olivtassinari/status/1441773885259583491) and the other half activities (Surf, Biking, Winery tour, sightseeing).

<img loading="lazy" src="/static/blog/2021-q3-update/retreat.jpeg" alt="" style="width: 596px; margin-bottom: 8px" />

<p class="blog-description">Sightseeing in Lisbon</p>

### Growth between Q2 2021 and Q3 2021

- 📦 From 9.1M to 9.9M downloads per month on npm. We have 22.36% of market share inside the React ecosystem
- ⭐️ From 69.1k to 72.1k stars. [Leave us yours 🌟](https://github.com/mui-org/material-ui)!
- 👨‍👩‍👧‍👦 From 2,223 to 2,316 contributors on GitHub. We add on average one new contributor every day.
- 💰 Grew financial support by x2.9 compared to [12 months ago](/blog/2020-q3-update/).

### New members

We have welcomed one new member to the company this quarter 🏢:

- Benny, he was our first intern and is now the first Junior on the MUI Core team.

  <img loading="lazy" src="/static/blog/2021-q3-update/benny.jpg" alt="Benny" style="width: 160px; height: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

### A new brand

We have released our [new brand](/blog/material-ui-is-now-mui/)!
We are excited about our new shorter name **MUI**.
We were already using it in the class names (`.MuiButton-root`), which embodies our next step beyond Material Design.

This project has been 12 months in the making.
We did a couple of early iterations with https://bb.agency/.
It's only after we got our hand on [mui.com](https://mui.com/) and [`@mui`](https://www.npmjs.com/org/mui) that we knew the new name would work.

## Our roadmap intent for Q4 2021

We'll do our best, no guarantee!

### MUI Core

- 🚀 We will double down on v5 before starting solving new large problems, e.g. a revamp of the select.
  We have done bold changes in this version compared to v4, but until recently, only a small percentage of the community was using v5.
  In the last few weeks, we saw a strong influx of feedback from the community.
  We have to make the best out of it, solve regressions, solve the lack of clear documentation for the new APIs, adjust the tradeoffs we took in the light of more information, and more.
- 🦴 Migrate more components to `@mui/core`. [Michał](https://github.com/michaldudak) has recently added support for the [Button](https://mui.com/components/buttons/#unstyled).
  You can follow our progress in the [umbrella issue](https://github.com/mui-org/material-ui/issues/27170).
- 🌈 Resume the work on our second design system.
  Some of our users (and potential users) dislike Material Design. We will try to make the second design system one that they love!
- 🗓 Execute on all of the items in the [public roadmap](https://github.com/mui-org/material-ui/projects/25).
- ❓ Please upvote [GitHub issues](https://github.com/mui-org/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### MUI X

#### Data Grid

- ✨ We will release the print export feature.
- ✨ We will release the tree data feature.
- ✨ We will revamp the virtualization to yield better rendering performance, fix its bugs, and unlock new features like column pinning and lazy loading.
- 🗓 Execute on all of the items in the [public roadmap](https://github.com/mui-org/material-ui-x/projects/1).
- ❓ Please upvote [GitHub issues](https://github.com/mui-org/material-ui-x/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

#### Date Picker

No plans. We can't sustain its development this quarter.

### Design kits

We will release a v5 for Sketch and Adobe XD, as we have done for Figma.
While the visual difference between MUI Core v4 and v5 is not major, we still need to sync the design components.

### Company

We have the following objectives:

- 📊 Run a new edition of the Developer Survey. The last one was done [15 months ago](https://mui.com/blog/2020-developer-survey-results/). It's time for the 2021 edition!
- 💫 Create a great onboarding experience for the three Software Engineers scheduled to start this quarter.
- Hire two new roles: a [product manager](/company/product-manager/) to focus on low-code and our first [developer advocate](/company/developer-advocate/).
