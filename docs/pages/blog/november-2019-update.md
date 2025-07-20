---
title: November 2019 Update
description: Here are the most significant improvements in November.
date: 2019-12-12T00:00:00.000Z
authors: ['oliviertassinari']
tags: ['Company']
manualCard: true
---

Here are the most significant improvements in November:

- 🔍 We have polished the newly introduced Autocomplete component (October).
  We have handled more than [100 related issues](https://github.com/mui/material-ui/issues?utf8=%E2%9C%93&q=label%3A%22lab%3A+Autocomplete%22+) in a single month.

- 👤 We have improved the Avatar's loading experience ([#1871](https://github.com/mui/material-ui/pull/18711)).

  <video autoplay muted loop playsinline width="872" height="154">
    <source src="/static/blog/november-2019-update/loading-avatar-before.mp4" type="video/mp4" />
  </video>

  <p class="blog-description">Before</p>

  <video autoplay muted loop playsinline width="872" height="154">
    <source src="/static/blog/november-2019-update/loading-avatar-after.mp4" type="video/mp4" />
  </video>

  <p class="blog-description">After</p>

- 🌎 We have introduced [localization](/material-ui/guides/localization/) support.
  The framework supports [13 locales](/material-ui/guides/localization/#supported-locales), and growing. We would love to see your translation contribution ✨.

- 👨‍🎤 We have added Framer X support ([#17797](https://github.com/mui/material-ui/pull/17797)) (and now looking into Sketch, Figma and Adobe XD).

  <img src="/static/blog/november-2019-update/framer.jpg" alt="Framer X" width="300" />

- ⚛️ We have completed the migration of the demos to TypeScript. A big thanks to all the contributors that participated in [this effort](https://github.com/mui/material-ui/issues/14897). Around 10% of the audience on the documentation uses this version of the demos and growing.

  ![TypeScript demo](/static/blog/november-2019-update/typescript-demos.png)

- 🏷 We have added arrow and [hysteresis](https://github.com/mui/material-ui/pull/18458) support to the Tooltip.

  ![Tooltip arrow](/static/blog/november-2019-update/arrow.png)

But this summary is just scratching the surface. We have accepted 200 commits from 73 different contributors. We have changed 1,142 files with 27,923 additions and 13,852 deletions.

## Our roadmap intent for December

_(We'll do our best, no guarantee!)_

We have three major efforts undergoing, we will likely need a couple of months to make significant progress. Stay tuned.

- 📅 We continue to work on a [major upgrade](https://github.com/mui/material-ui-pickers/issues/1293) of the date/time picker components.

- 🧮 We continue to work on a data grid component.
  This is an effort [of our roadmap](/material-ui/discover-more/roadmap/) to better answer enterprise needs.
  The most advanced features will use a non-MIT license.
  To get a rough idea of what's coming, you can read [this blog post](https://uxdesign.cc/design-better-data-tables-4ecc99d23356).

- 💅 We might initiate an update of our styling solution.
  We want to cover styled-component [#6115](https://github.com/mui/material-ui/pull/#6115), MUI System [#15561](https://github.com/mui/material-ui/issues/15561), dynamic props [#15573](https://github.com/mui/material-ui/issues/15573) and an unstyled version [#6218](https://github.com/mui/material-ui/pull/6218).

❓ Please upvote our [GitHub issues](https://github.com/mui/material-ui/issues) if you want something specific. The number of 👍 helps us to prioritize.
