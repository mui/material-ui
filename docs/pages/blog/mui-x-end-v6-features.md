---
title: MUI X v6.18.0 and the latest features before the next major
description: New components, polished features, better performance and more.
date: 2023-11-13T00:00:00.000Z
authors: ['josefreitas']
card: false
tags: ['MUI X', 'News']
---

<div style="max-width:680px;width: 100%; height: 170px; overflow: hidden; margin-bottom: 16px;">
  <a href="https://github.com/mui/mui-x/releases/tag/v6.18.0">
    <img src="/static/blog/mui-x-end-v6-features/intro.png" alt="open v6.18.0 release page" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
  </a>
</div>

We are happy to share the newest MUI X features, marking the release of [MUI X v6.18.0](https://github.com/mui/mui-x/releases/tag/v6.18.0) and sealing v6 with new components and solid functionalities.

As we gear up to develop the next major version, let's review the notable new features introduced since our last [blog post](/blog/mui-x-mid-v6-features/).

## Table of contents

- [New stable components 🎉](#new-stable-components)
  - [Charts](#charts)
  - [Tree view](#tree-view)
- [Date Pickers](#date-pickers)
  - [Smoothened animations](#smoothened-animations)
  - [Clearable Field](#clearable-field)
  - [Customization Playgrounds](#customization-playgrounds)
- [Data Grid](#data-grid)
  - [Column Autosizing](#column-autosizing) [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')
  - [New examples](#new-examples)
  - [Sparkline as a column type](#sparkline-as-a-column-type)
  - [Performance improvements](#performance-improvements)
- [What's next](#whats-next)
- [Feedback](#feedback)

## New stable components

### Charts

The stable version of MUI X charts supports the most commonly used chart plots you'll need in your day-to-day applications.

Featuring lines, areas, bars, pie charts and scatter plots, the latest versions also include:

- **Animations**

  Animations on bars, pie charts, and more to come.

  <video preload="metadata" style="margin-bottom: 16px;" autoplay muted loop playsinline width="680" height="306">
    <source src="/static/blog/mui-x-end-v6-features/bar-chart-animations.mp4" type="video/mp4">
  </video>

- **Horizontal Bar Chart Support**

  Recently added, the horizontal bars can broaden your data visualization spectrum, especially when you need to display long labels for multiple categories.
  Check out Bar's [layout documentation](/x/react-charts/bars/#layout) for more details.

- **Improved Text Customization**

  Customize the legend text to your heart's content, making your charts more readable and visually
  appealing.

Get started with charts [now](/x/react-charts/#getting-started)!

### Tree view

After an extensive period of development and refinement in the lab and pre-release packages, and with the invaluable feedback we've received from you, the community, we're happy to share that the package is now officially stable!

<video preload="metadata" style="margin-bottom: 10px;" autoplay muted loop playsinline width="680" height="400">
  <source src="/static/blog/mui-x-end-v6-features/tree-view-gmail.mp4" type="video/mp4">
</video>

Get started with tree view [now](/x/react-tree-view/getting-started/)!

## Date Pickers

### Smoothened animations

The animations have been smoothened, especially on Android devices, ensuring a more fluid user experience.

### Clearable Field

A much-anticipated feature, the date and time fields now allow users to clear a selected date with a single click.
You can learn how to use it at the [clearable behavior documentation](/x/react-date-pickers/fields/#clearable-behavior).

<video preload="metadata" style="margin-bottom: 10px;" autoplay muted loop playsinline width="680" height="128">
  <source src="/static/blog/mui-x-end-v6-features/clearable-fields.mp4" type="video/mp4">
</video>

### Customization Playgrounds

We're constantly improving our documentation and working to better communicate how to use our components effectively.
With the new customization playgrounds, you can now tailor the style of [Date Picker](/x/react-date-pickers/date-picker/#customization) and experiment with multiple combinations of [sub-components](/x/react-date-pickers/playground/) to achieve the look and feel you desire.

## Data Grid

### Column Autosizing [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan 'Pro plan')

The new autosizing feature automatically adjusts the column width to accommodate the content within.
You can include or exclude both headers and outliers from the calculation and expand to use the entire area of the grid.
Learn more details at [column autosizing section](/x/react-data-grid/column-dimensions/#autosizing).

<video preload="metadata" style="margin-bottom: 10px;" autoplay muted loop playsinline width="680" height="128">
  <source src="/static/blog/mui-x-end-v6-features/column-auto-sizing.mp4" type="video/mp4">
</video>

### New examples

We're continuously improving our docs, and we're starting to add more advanced examples like [bulk editing](/x/react-data-grid/recipes-editing/#bulk-editing) and [lazy loading for tree data](/x/react-data-grid/tree-data/#children-lazy-loading).

### Sparkline as a column type

Based on `@mui/x-charts` package, you can now add sparkline columns to your Data Grid.

<img src="/static/blog/mui-x-end-v6-features/sparkline-datagrid.png" alt="Sparkline on data grid" width="658" height="305" style="margin-bottom: 16px;" />

For more details on sparkline and other custom columns, please visit the [documentation page](/x/react-data-grid/custom-columns/#sparkline).

### Performance improvements

In our pursuit to enhance user experience, one of the most significant changes in latest v6 versions are related to performance boosts on filtering and scrolling.

To illustrate some of these improvements, the following table display a benchmark comparing the latest v5 (v5.17.26) with v6.18.0. The focus is to assess the raw filtering speed in a use case involving a one-column string filter over 100,000 rows.

<table border="0" style="text-align:center;width:100%;display:table">
  <tr>
    <th>Version</th>
    <th>N# of Tests</th>
    <th>Min time (ms)</th>
    <th>Max time (ms)</th>
    <th>Median (ms)</th>
    <th>Average (ms)</th>
    <th>Deviation</th>
  </tr>
  <tr>
    <td>v5.17.26</td>
    <td>22</td>
    <td>396</td>
    <td>409</td>
    <td>400</td>
    <td>400.7</td>
    <td>3.96</td>
  </tr>
  <tr>
    <td>v6.18.0</td>
    <td>20</td>
    <td>44</td>
    <td>66</td>
    <td>49.5</td>
    <td>50.4</td>
    <td>5.63</td>
  </tr>
</table>

As we can see, the current version operates 7.9 times faster; the average time has dropped from 400.7 milliseconds in the previous version to just 50.4 milliseconds in the current one.

:::info
Note that these results are based on raw filtering speed, and not end-to-end operation (which includes user typing, filtering and rerender).
:::

## What's next?

We're now working on the next MUI X major, v7, which will include many new features and improvements.

Most notably:

- DateTime and TimeRangePicker
- Improved accessibility on date and time fields
- New UI for column management for the [`DataGrid`](/x/react-data-grid/)
- Pivoting for the [`DataGridPremium`](/x/react-data-grid/#premium-plan)

For the new components, we will keep expanding our portfolio with new chart types such as [Heat map](/x/react-charts/heat-map/), [Funnel](/x/react-charts/funnel/), [Gantt](/x/react-charts/gantt/), and explore virtualization and other advanced use cases for Tree view.

We encourage you to upvote issues on GitHub to help us prioritize. Your input directly influences our development schedule, so don't hesitate to let us know what matters most to you!
You can use the following list for quick access to each components issues.

- [Charts](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+charts%22+label%3A%22waiting+for+%F0%9F%91%8D%22)
- [Tree View](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+treeview%22+label%3A%22waiting+for+%F0%9F%91%8D%22)
- [Data Grid](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+data+grid%22+label%3A%22waiting+for+%F0%9F%91%8D%22)
- [Date and Time pickers](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+pickers%22+label%3A%22waiting+for+%F0%9F%91%8D%22)

The next major release (v7) will be available through alpha and beta versions until March 2024, when it's planned for it to be officially promoted to the new stable version. At the same time, v6 will transition to [Long-Term Support](/versions/#long-term-support-lts), while support for v5 will be discontinued.

## Feedback

As usual, we are happy to hear from you and get your feedback, so if you'd like to share your pain points and use cases, please leave your contact info through [this Google Form](https://forms.gle/vsBv6CLPz9h57xg8A).

Naturally, you're welcome to request new features, report bugs, and join any discussion in MUI X [GitHub repository](https://github.com/mui/mui-x/issues); additionally, we're trying to establish a community in the [MUI Discord server](https://mui.com/r/discord/), and we'd love to see you there.

Cheers!
