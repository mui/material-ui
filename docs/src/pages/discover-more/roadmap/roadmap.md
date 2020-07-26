# Roadmap

<p class="description">The roadmap is a living document, and it is likely that priorities will change, but the list below should give some indication of our plans for the next major release, and for the future.</p>

## Methodology

Material-UI is community driven – issues that resonate most with the community get the most attention.
Please **upvote** (👍) on GitHub the issues you are most interested in.
Thank you for participating [in the developer survey](https://material-ui.com/blog/2020-developer-survey-results/).

## Priorities

Here are the top priorities:

- 1.0 - **More components**. 🧰 This is challenging to address, as developing a fully-fledged component takes a considerable amount of time.
  We apply the following strategy:
  - Identify frequently needed components. There are many resources we leverage for this: the developer survey answers, GitHub issue upvotes, Algolia search volume, Google search volume, documentation usage, npm downloads, etc.
  - Prioritize the creation of frequently needed components.
  - Encourage the usage of third-party components if they already exist and are well maintained.
- 0.5 - **Better customization.** 💅 We want to make our component customization intuitive, no matter if you are using global CSS or styled-components:
  - Use styled-components by default: [#6115](https://github.com/mui-org/material-ui/issues/6115).
  - Allow the use of the Box props in all the core components: [#15561](https://github.com/mui-org/material-ui/issues/15561).
  - Allow the usage of dynamic theme variants and colors: [#15573](https://github.com/mui-org/material-ui/issues/15573) & [#13875](https://github.com/mui-org/material-ui/issues/13875).
  - Allow the use of the components without any styles: [#6218](https://github.com/mui-org/material-ui/issues/6218).
  - Improve the support of custom breakpoints: [#11649](https://github.com/mui-org/material-ui/issues/11649)
  - Explore the integration with theme-specification, by @jxnblk.
- 0.3 - **Better documentation.** 📚 This is a broad topic. The focus is on the following areas:
  - Page documentation rating 🥇🥈🥉. We will integrate a rating module in all our documentation pages. This way, we can collect high-quality data points and prioritize the pages that need the most to be improved.
  - Templates. They get people started really quickly, we need more of them!
  - Beginner tutorials & Video lessons.
- 0.2 - **Performance.** 🚀 React abstraction has a cost. The more components you render, the slower your page will be. You will notice stark differences when rendering a large table or list.
  Performance is all about doing less work. We can leverage the following:
  - Make the core faster.
  - Avoid re-rendering. It's the responsibility of the user to prune the React rendering tree efficiently,
    as most of our APIs are too low level to implement efficient memoization (React.useMemo, React.memo).
    If you find a good opportunity for it, let us know, and we will be happy to work with you on the problem.
  - Avoid rendering. We have documented [how to implement virtualization](/components/tables/#virtualized-table) for the Table components. It's important to consider it above 100 items.
- 0.2 - **Bundle size.** 📦 You can keep track of our progress [following bundlephobia.com report](https://bundlephobia.com/result?p=@material-ui/core).
  It's a continuous effort – v4 was [18% smaller](https://bundlephobia.com/result?p=@material-ui/core@3.9.2) than v3, while adding new features.
  We are eager to find new bundle size reduction opportunities. We hope we can leverage these two in the future:
- 0.2 - **TypeScript.** 📏 There are two dimensions to this problem:
  - The definitions. We are **continuously** improving them. For instance, we are working on moving the props descriptions to TypeScript, so you can access them directly from your IDE.
    The codebase is written in JavaScript, we don't plan on migrating it to TypeScript in the near future. Upvote [#15984](https://github.com/mui-org/material-ui/issues/15984) if you want us to rewrite the core in a future version.
- 0.2 - **Accessibility.** ♿️ We have relatively [few accessibility issues](https://darekkay.com/blog/accessible-ui-frameworks/), but we are eager to address them all. We would appreciate the help of accessibility experts.
- 0.2 - **Material Design Update.** 🎀 We are relatively up-to-date but the material design specification [is evolving](https://material.io/whats-new/), so should we.

## New components

Here are the components we will work on being supported in the Material-UI ecosystem, no matter if they are part of the [community edition](https://github.com/mui-org/material-ui) (MIT license) or [Material-UI X](https://github.com/mui-org/material-ui-x), a paid extension for enterprises:

- 🧪 Close to becoming stable, already released as unstable
- 🛠 Work in progress, will be or already released as unstable
- ⏳ Planning to build
- ⭐️ We will make some of the features available in [Material-UI X](https://github.com/mui-org/material-ui-x) (non-MIT)

| Name                       | Status |
| :------------------------- | ------ |
| Rating                     | 🧪     |
| Skeleton                   | 🧪     |
| Speed Dial                 | 🧪     |
| Toggle Button              | 🧪     |
| Autocomplete               | 🧪     |
| Combo Box                  | 🧪     |
| Multiselect                | 🧪     |
| Alert                      | 🧪     |
| Pagination                 | 🧪     |
| Timeline                   | 🧪     |
| Date Picker                | 🛠      |
| Date Range Picker          | 🛠⭐    |
| Data Grid                  | 🛠⭐️   |
| Data Grid - Column pinning | ⏳⭐️  |
| Data Grid - Nested row     | ⏳⭐️  |
| Tree View                  | 🛠      |
| Tree View - Multiselect    | 🛠⭐️   |
| Tree View - Checkbox       | ⏳⭐️  |
| Tree View - Drag & Drop    | ⏳⭐️  |
| Tree View - Virtualization | ⏳⭐️  |
| Carousel                   | ⏳     |
| Dropdown                   | ⏳     |
| Dropzone                   | ⏳     |
| File Upload                | ⏳     |
| Image                      | ⏳     |
| Stack                      | ⏳     |
| Navbar                     | ⏳     |
| NProgress                  | ⏳     |
| Nested Menu                | ⏳     |
| Numeric Input              | ⏳     |
| Scrollspy                  | ⏳     |
| TopLayout                  | ⏳     |
| Splitter                   | ⏳⭐️  |
| Masonry                    | ⏳⭐️  |
| Pivot Grid                 | ⏳⭐️  |
| Big Calendar               | ⏳⭐️  |
| Sparkline                  | ⏳⭐️  |
| Gauge                      | ⏳⭐️  |
| Charts                     | ⏳⭐️  |
| TreeSelect                 | ⏳⭐️  |
| Rich Text Editor           | ⏳⭐️  |
| Gantt Chart                | ⏳⭐️  |
| Color Picker               | ⏳⭐️  |

> ⚠️ **Forward looking statement.** We operate in a dynamic environment, and things are subject to change. The information provided here is intended to outline the general framework direction. It's intended for informational purposes only. We may decide to add/remove new items at any time depending on our capability to deliver while meeting our quality standards. The development, releases and timing of any features or functionality of Material-UI remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation or promise to deliver at any time. You should not depend on the roadmap when making technology decisions.
