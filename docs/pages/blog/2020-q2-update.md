---
description: An update on our mission for Q2 2020.
---

# Q2 2020 Update

Olivier Tassinari. July 17, 2020.

This is an update on our mission. It covers what happens over the last 3 months and what we aim to achieve in the 3 coming months.

## Product

Here are the most significant improvements since March 2020:

- 🔥 We have started to work on the [next major version: v5](https://github.com/mui-org/material-ui/issues/20012).<br />
We have spent the last 14 months focusing on improving the library under the v4.x development branch while limiting ourselves to not introduce any breaking changes. During this period we have been meticulously identifying important areas of improvement. While the absence of breaking changes is a significant time-saver for developers, it also limits the scope of the problems we can solve and the quality of our solutions. The core team is excited about what comes next!<br /><br />
You can find the documentation for the next version at http://next.material-ui.com/. We plan to spend the next 6-8 months on it, with weekly releases as always, following our [roadmap](https://github.com/mui-org/material-ui/issues/20012) and [milestone](https://github.com/mui-org/material-ui/milestone/35).

- 📍 We have synchronized the icons with Google leading to 200+ [new icons](https://next.material-ui.com/components/material-icons/).

  <img src="/static/blog/2020-q2-update/icons.png" alt="icons" style="max-width: 615px; margin-bottom: 24px;" />

- 🎨 We have released [Figma assets](https://material-ui.com/store/items/figma-react/) for Material-UI. This was the logical next step after Sketch.

  <a href="https://material-ui.com/store/items/figma-react/"><img src="/static/blog/2020-q1-update/figma.png" alt="figma" style="max-width: 160px; margin-bottom: 24px;" /></a>

  We will consider bringing Adobe XD and Framer in Q4 2020 or Q1 2021, but not until we had enough time to polish the Sketch and Figma assets.

- 🔄 We have introduced a new `LoadingButton` component [in the lab](https://next.material-ui.com/components/buttons/#loading-buttons). This work influenced by the [concurrent UI patterns](https://reactjs.org/docs/concurrent-mode-patterns.html) presented by the React team.

  <img src="/static/blog/2020-q2-update/loading.gif" alt="loading" style="margin-bottom: 24px;" />

- ⏰ We have introduced a new `Timeline` component [in the lab](/components/timeline/).

  <img src="/static/blog/2020-q2-update/timeline.png" alt="timeline" style="max-width: 244px; margin-bottom: 24px;" />

- 📣 We have analyzed and publish the results of the "Material-UI Developer Survey 2020". If you haven't read it yet, you can follow this link to [read it in detail](/blog/2020-developer-survey-results/). It contains a lot of interesting insights that will shape the future of the library and company. Thanks for the contributions! ❤️
- 🇨🇳🇧🇷 We have translated 100% of the documentation to Chinese thanks to the collaboration of [Danica Shen](https://github.com/DDDDDanica) and [Yan Lee](https://github.com/AGDholo), two native speakers from the community 🙏.

  <img src="/static/blog/2020-q2-update/chinese.png" alt="chinese" style="max-width: 146px; padding-right: 3px; box-sizing: content-box;" />

  <img src="/static/blog/2020-q2-update/brazilian.png" alt="brazilian" style="max-width: 152px; margin-bottom: 24px;" />

  After English, Chinese, and Brazilian, the next languages that would benefit the most from the translations of the community are **Russian** and **Spanish**.<br />
  Feel free to [contact us](translations@material-ui.com) if you are a native speaker and interested in giving a hand in one of these two languages 🇷🇺🇪🇸.

- 🗂 We have introduced a new extension of the Tab API [in the lab](/components/tabs/#experimental-api). These new components inject props to implement accessible tabs following [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices/#tabpanel) authoring practices.

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

- 📆 On the [date picker](https://next.material-ui-pickers.dev/):

  - We have introduced a new `renderInput` API to match the autocomplete component.
  - We have improved the input mask UX.
  - We have added support for `value={null}`.
  - Improve the desktop vs mobile detection by using the pointer capabilities instead of the screen dimension.
  - We have improved the accessibility of the component.
  - We have worked on consistency between the date pickers and the other components of the library.

## Company

### Growth between Q1 2020 and Q2 2020

- 📦 From 4.8M to 5.1M downloads per month on npm.
- ⭐️ From 56.2k to 59.0k stars, leave us yours 🌟.
- 👨‍👩‍👧‍👦 From 1,720 to 1,825 contributors on GitHub.
- 💰 Grew monthly financial support by 46%.
- 🏢 Same headcounts

## Our roadmap intent for Q3 2020

We'll do our best, no guarantee!

- ⚙️ We will make significant progress with the v5 roadmap.

- ⚛️ We will make **all** the props of the components available into IntelliSense. Luckily, we have already migrated most of them. If you want to give us a hand, you can check this [pull request](https://github.com/mui-org/material-ui/pull/21655) as a starting point.

  ![props](/static/blog/2020-q1-update/props.png)

- 🌏 We will translate the API pages, for instance, the [Alert API](https://material-ui.com/api/alert/) can only be consumed in English. The effort will start from.

- 📆 We will migrate the date picker components in the main repository to ensure high consistency with the other components. We will keep investing in the component to make it part of the v5 release schedule.

- 👩‍🎨 We will work with a design agency to do the branding of the company, redo the homepage, do the marketing pages of the enterprise version of the library, improve the documentation, introduce new themes (as alternatives to Material Design).

- ❓ Please upvote our [GitHub issues](https://github.com/mui-org/material-ui/issues) if you want something specific. The number of 👍 helps us to prioritize.

### Company

These are objectives, no guarantees:

- 🏢 We will [hire](/company/jobs/) 3 full-time roles in the team.
  - One person on the open-source side to focus on the design system problem (unstyled, theming, styling, etc.): ✅ starting in two months.
  - One person on the enterprise side to consolidate the development of the advanced components: 🚧 Work in progress.
  - One person on a role yet to defined: 🚧 Work in progress.

- 🏝 We will run a company-wide team retreat if COVID-19 allows it.
- 📈 We will put structures internally to prepare the next step of growth.

### Enterprise components

- ⌗ We will make available a first alpha version of our advanced data grid component as part of the enterprise bundle.
You can already [play with an early version](https://muix-preview.netlify.app/#/grid).
- 📆 We will make available a first alpha version of the date range picker as part of the enterprise bundle.
You can already [play with an early version](https://next.material-ui-pickers.dev/demo/daterangepicker).
