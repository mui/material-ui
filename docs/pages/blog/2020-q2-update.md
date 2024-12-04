---
title: Q2 2020 Update
description: An update on our mission for Q2 2020.
date: 2020-07-17T00:00:00.000Z
authors: ['oliviertassinari']
tags: ['Company']
manualCard: true
---

This update covers our progress over the last three months, and what we aim to achieve in the coming months.

## Product

Here are the most significant improvements since March 2020:

- 🚧 Work has started on [the next major version: v5](https://github.com/mui/material-ui/issues/20012).<br />
  The last 14 months have been spent focusing on improving the library under the v4.x development branch, while not introducing any breaking changes. During this period we have identified several important areas for improvement. While the absence of breaking changes is a significant time-saver for developers, it also limits the scope of the problems that can be solved and the quality of the solutions. We're excited about what comes next!<br /><br />
  You can find the documentation for the next version at https://mui.com/. The next 6-8 months will see weekly releases as always, following [the roadmap](https://github.com/mui/material-ui/issues/20012) and [milestone](https://github.com/mui/material-ui/milestone/35).

- 📍 The icons package has been updated with changes made by Google, leading to [200+ new icons](https://mui.com/material-ui/material-icons/).

  <img src="/static/blog/2020-q2-update/icons.png" alt="icons" style="width: 615px; margin-bottom: 24px;" />

- 🎨 [Figma assets](https://mui.com/store/items/figma-react/) for Material UI extend the support for design tools beyond Sketch.

  <a href="https://mui.com/store/items/figma-react/"><img src="/static/blog/2020-q1-update/figma.png" alt="figma" style="width: 160px; margin-bottom: 24px;" /></a>

  Adobe XD and Framer support are also up for consideration if they attract a significant audience, but not until we've polished the Sketch and Figma assets.

- 🔄 `LoadingButton` – [a new component in the lab](https://mui.com/material-ui/react-button/#loading-button). This work is influenced by the [concurrent UI patterns](https://17.reactjs.org/docs/concurrent-mode-patterns.html) presented by the React team.

  <img src="/static/blog/2020-q2-update/loading.gif" alt="loading" style="margin-bottom: 24px;" />

- ⚛️ We have made **all** component props available in IntelliSense. This is complementary to the `propTypes` and API pages in the documentation.

  ![props](/static/blog/2020-q1-update/props.png)

- ⏰ A new [`Timeline` component](/material-ui/react-timeline/) joins the lab.

  <img src="/static/blog/2020-q2-update/timeline.png" alt="timeline" style="width: 244px; margin-bottom: 24px;" />

- 📣 We have analyzed and published the results of the "Material UI Developer Survey 2020". If you haven't read it yet, you can follow this link to [read it in detail](/blog/2020-developer-survey-results/). It contains a lot of interesting insights that will shape the future of the library and company. Thanks for the contributions! ❤️
- 🇨🇳🇧🇷 The non-API documentation has been fully translated to Chinese and Brazilian, thanks to the collaboration of [Danica Shen](https://github.com/DDDDDanica), [Yan Lee](https://github.com/AGDholo), and [Jairon Alves Lima](https://github.com/jaironalves), native speakers from the community 🙏.

  <img src="/static/blog/2020-q2-update/chinese.png" alt="chinese" style="width: 146px; padding-right: 3px; box-sizing: content-box;" />

  <img src="/static/blog/2020-q2-update/brazilian.png" alt="brazilian" style="width: 152px; margin-bottom: 24px;" />

  After English, Chinese, and Brazilian, the languages that would benefit the most from translation are **Russian** and **Spanish**.<br />
  Feel free to [get stuck into](https://crowdin.com/project/material-ui-docs) if you are a native speaker and able to give a hand with either of these two languages.

- 🗂 A new extension of the Tab API [in the lab](/material-ui/react-tabs/#experimental-api) implements accessible tabs following [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) authoring practices.

```jsx
<TabContext value={value}>
  <TabList onChange={handleChange} aria-label="simple tabs example">
    <Tab label="Item One" value="1" />
    <Tab label="Item Two" value="2" />
    <Tab label="Item Three" value="3" />
  </TabList>
  <TabPanel value="1">Item One</TabPanel>
  <TabPanel value="2">Item Two</TabPanel>
  <TabPanel value="3">Item Three</TabPanel>
</TabContext>
```

- 📆 On the [date picker](https://mui.com/x/react-date-pickers/):

  - A new `renderInput` API which matches that of the autocomplete component has been added.
  - The input mask UX has been improved.
  - Support for `value={null}` has been added.
  - Desktop vs mobile detection has been improved by using the pointer capabilities instead of the screen dimension.
  - Accessibility has been improved.
  - Consistency between the date pickers and the other components of the library has been improved.

## Company

### Growth between Q1 2020 and Q2 2020

- 📦 From 4.8M to 5.1M downloads per month on npm.
- ⭐️ From 56.2k to 59.0k stars, leave us yours 🌟.
- 👨‍👩‍👧‍👦 From 1,720 to 1,825 contributors on GitHub.
- 💰 Grew monthly financial support by 46%.
- 🏢 Headcount remains the same.

## Our roadmap intent for Q3 2020

We'll do our best, no guarantee!

- ⚙️ To make significant progress with the v5 roadmap.

- 🌏 Translate the API pages, for instance, the [Alert API](https://mui.com/api/alert/) can only be consumed in English.

- 📆 Migrate the date picker components to the main repository to ensure high consistency with the core components. Keep investing in the component to make it part of the v5 release schedule.

- 👩‍🎨 We will work with a design agency to do the branding of the company, redo the homepage, do the marketing pages of the enterprise version of the library, improve the documentation, introduce new themes (as alternatives to Material Design).

- ❓ Please upvote [GitHub issues](https://github.com/mui/material-ui/issues) if you want something specific. The number of 👍 helps us to prioritize.

### Company

These are objectives, no guarantees:

- 🏢 We will [hire](/careers/) 3 full-time roles in the team.

  - One person on the open-source side to focus on the design system problem (unstyled, theming, styling, etc.): ✅ starting in two months.
  - One person on the enterprise side to consolidate the development of the advanced components: 🚧 Work in progress.
  - One person on a role yet to defined: 🚧 Work in progress.

- 🏝 We will run a company-wide team retreat if COVID-19 allows it.
- 📈 We will put structures internally to prepare the next step of growth.

### Enterprise components

- ⌗ Make available a first alpha version of our advanced data grid component as part of the enterprise bundle.
  You can already play with an early version.
- 📆 Make available a first alpha version of the date range picker as part of the enterprise bundle.
  You can already play with an early version.
