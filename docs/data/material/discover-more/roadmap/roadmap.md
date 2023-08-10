# Roadmap

<p class="description">The roadmap is a living document, the priorities will likely change, but the list below should give some indication of our plans for the next releases.</p>

## Methodology

MUI is community-driven—issues that resonate most with the community get the most attention.
Please **upvote** (👍) on GitHub the issues you are most interested in.
Thank you for participating [in the developer survey](/blog/2021-developer-survey-results/).

## Quarterly roadmap

Our GitHub project's roadmap is where you can learn about what features we're working on, what stage they're at, and when we expect to bring them to you:

- [MUI Core](https://github.com/orgs/mui/projects/18/views/1).
  This repository focuses on empowering the creation of great design systems with React, as well as providing two ready to use themes (Material Design so far, another one coming in the near future).
- [MUI X](https://github.com/mui/mui-x/projects/1).
  This repository focuses on providing advanced React components.
  Some of the features are MIT licensed, others are available under a commercial license.
- [MUI Design kits](https://github.com/mui/mui-design-kits/projects/1)
  This repository focuses on providing the components for designers on Figma and other design tools.
  It's a great place to leave feedback, feature requests, and ask questions.

## Priorities

Here are the top priorities:

- **More components**. 🧰 We have to strictly prioritize as developing a fully-fledged component takes a considerable amount of time.
  We apply the following strategy:
  - Identify frequently needed components. There are many resources we leverage for this: the developer survey answers, GitHub issue upvotes, Algolia search volume, Google search volume, documentation usage, npm downloads, etc.
  - Prioritize the creation of frequently needed components.
  - Encourage the usage of third-party components if they already exist and are well maintained.
- **Design.** 🎀 We are relatively up-to-date, but the Material Design guidelines [are evolving](https://material.io/blog/). So should we. We also plan to implement [a second design](https://github.com/mui/material-ui/issues/22485).
- **Better customization.** 💅 We want to make component customization intuitive, no matter if you are using global CSS or styled-components:
- **Better documentation.** 📚 No solution is complete without great documentation.
- **Performance.** 🚀 React abstraction has a cost. The more components you render, the slower your page will be. You will notice stark differences when rendering a large table or list.
- **Bundle size.** 📦 You can follow our progress [with bundlephobia.com report](https://bundlephobia.com/package/@mui/material). Please pay special attention to the cost of the individual modules under "Exports Analysis".
- **TypeScript.** 📏 We are continuously improving the definitions. The codebase is mostly written in JavaScript with manually authored `.d.ts` definitions. While we do not plan a migration effort as a standalone effort, new modules are written in TypeScript.
- **Accessibility.** ♿️ We have relatively [few accessibility issues](https://darekkay.com/blog/accessible-ui-frameworks/), but we are eager to address them all. We would appreciate the help of accessibility experts.

## New components

Here are the components we will work on being supported in the MUI ecosystem:

- ✅ Released as stable
- 🧪 Not too far from becoming stable, already released as unstable
- 🛠 Work in progress, will be or already released as unstable
- ⏳ Planning to build

| Name                                                                     | Product  | Status |
| :----------------------------------------------------------------------- | :------- | :----- |
| Advanced Layout                                                          | MUI X    | ⏳     |
| Carousel                                                                 | MUI X    | ⏳     |
| [Charts](https://mui.com/x/react-charts/)                                | MUI X    | 🧪     |
| [Data Grid](/x/react-data-grid/)                                         | MUI X    | ✅     |
| [Date Picker](/x/react-date-pickers/date-picker/)                        | MUI X    | ✅     |
| [Time Picker](/x/react-date-pickers/time-picker/)                        | MUI X    | ✅     |
| [Date Time Picker](/x/react-date-pickers/date-time-picker/)              | MUI X    | ✅     |
| [Date Range Picker](/x/react-date-pickers/date-range-picker/)            | MUI X    | ✅     |
| Time Range Picker                                                        | MUI X    | ⏳     |
| Date Time Range Picker                                                   | MUI X    | ⏳     |
| Dropdown                                                                 | MUI Core | ⏳     |
| Dropzone                                                                 | MUI X    | ⏳     |
| File Upload                                                              | MUI X    | ⏳     |
| Gantt Chart                                                              | MUI X    | ⏳     |
| Gauge                                                                    | MUI X    | ⏳     |
| Image                                                                    | MUI Core | ⏳     |
| [Masonry](/material-ui/react-masonry/)                                   | MUI Core | 🧪     |
| Navbar                                                                   | MUI Core | ⏳     |
| Nested Menu                                                              | MUI X    | ⏳     |
| NProgress                                                                | MUI Core | ⏳     |
| Numeric Input                                                            | MUI Core | ⏳     |
| Rich Text Editor                                                         | MUI X    | ⏳     |
| Scheduler                                                                | MUI X    | ⏳     |
| Scrollspy                                                                | MUI Core | ⏳     |
| Sparkline                                                                | MUI X    | ⏳     |
| [Timeline](/material-ui/react-timeline/)                                 | MUI Core | 🧪     |
| Tree select                                                              | MUI X    | ⏳     |
| [Tree View](/material-ui/react-tree-view/)                               | MUI X    | 🧪     |
| Tree View - Checkbox                                                     | MUI X    | ⏳     |
| Tree View - Drag & Drop                                                  | MUI X    | ⏳     |
| [Tree View - Multiselect](/material-ui/react-tree-view/#multi-selection) | MUI X    | 🧪     |
| Tree View - Virtualization                                               | MUI X    | ⏳     |
| Window Splitter                                                          | MUI X    | ⏳     |

:::warning
**Disclaimer**: We operate in a dynamic environment, and things are subject to change. The information provided is intended to outline the general framework direction, for informational purposes only. We may decide to add or remove new items at any time, depending on our capability to deliver while meeting our quality standards. The development, releases, and timing of any features or functionality remains at the sole discretion of MUI. The roadmap does not represent a commitment, obligation, or promise to deliver at any time.
:::
