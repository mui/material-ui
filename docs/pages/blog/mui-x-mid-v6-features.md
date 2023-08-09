---
title: Exciting MUI X improvements: v6.11.0
description: Support for time zones, Charts in alpha, Data Grid filtering, and more.
date: 2023-08-07T00:00:00.000Z
authors: ['richbustos', 'josefreitas']
card: true
tags: ['MUI X', 'News']
---

<img src="/static/blog/mui-x-mid-v6-features/intro.png" alt="" width="2400" height="600" style="margin-bottom: 16px;" />

Since the first v6 stable release, we've continuously rolled out new major features.
Now that we've reached [MUI X v6.11.x](https://github.com/mui/mui-x/releases), it's time to delve into the most recent additions to MUI X v6, and why you should get the latest version now.

## Table of contents

- [Table of contents](#table-of-contents)
- [Date Pickers](#date-pickers)
  - [Support for time zones](#support-for-time-zones)
  - [Digital clock](#digital-clock)
- [Data Grid](#data-grid)
  - [Copy and paste](#copy-and-paste)
  - [Filter on column headers](#filter-on-column-headers)
  - [Performance enhancements: smoother scrolling and expanding rows](#performance-enhancements-smoother-scrolling-and-expanding-rows)
- [Charts - alpha version 🎁](#charts-alpha-version)
- [What's next](#whats-next)
- [Feedback](#feedback)

## Date Pickers

### Support for time zones

No more hassle displaying dates in the time zones of your choice. 🌎

You can effortlessly display and select dates and times in different time zones, without worrying about conversion logic or maintaining consistency with your backend.

<video preload="metadata" style="margin-bottom: 16px;" autoplay muted loop controls>
  <source src="/static/blog/mui-x-mid-v6-features/timezone.mp4" type="video/mp4">
</video>

Set the `timezone` prop to define which time zone the Date, Time, or DateTime should be displayed in.

```tsx
<TimePicker
  value={value}
  onChange={setValue}
  timezone="Pacific/Honolulu" // Can be in any timezone of your choice
  label={'Rendered in "Pacific/Honolulu"'}
/>
```

Check the [full instructions](https://mui.com/x/react-date-pickers/timezone/) for more information on using this feature in your application.

### Digital clock

The digital clock is an alternative to the Time Pickers' analog clock.
The original proposal was mainly focused on mobile devices, whereas the new interface is designed for a desktop experience for better time precision.
This new addition makes our Date Pickers even more versatile and user-friendly than before.
It's available as the default variant for desktops on both the [Time Picker](https://mui.com/x/react-date-pickers/time-picker/) and the [Date Time Picker](https://mui.com/x/react-date-pickers/date-time-picker/).

<video preload="metadata" style="margin-bottom: 16px;" autoplay muted loop controls>
  <source src="/static/blog/mui-x-mid-v6-features/timepicker.mp4" type="video/mp4">
</video>

Check out all the possibilities in the [Date Pickers—Digital clock documentation](https://mui.com/x/react-date-pickers/digital-clock/), and let us know your thoughts!

## Data Grid

### Copy and paste[<span class="plan-premium"></span>](/x/introduction/licensing/#premium-plan)

After setting the `experimentalFeatures={{ clipboardPaste: true }}` prop, you can copy and paste data directly to and from your Data Grid.

This new feature is extremely versatile, and you can exchange data from other fields, other grids, and even directly to and from the spreadsheet tool of your choice.

<video preload="metadata" style="margin-bottom: 16px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/mui-x-mid-v6-features/copy_paste.mov" type="video/mp4">
</video>

This feature is integrated with the editing API, so pasted data can be persisted using the `processRowUpdate` prop to update your data source through your usual editing validation process.
The callbacks `clipboardPasteStart` and `clipboardPasteEnd` are fired during the clipboard paste operation, which can be useful for extra customizations around the event.

For more details on how to use clipboard copy and paste, check out the [Data Grid—Clipboard documentation](https://mui.com/x/react-data-grid/clipboard/).

### Filter on column headers[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan)

Filtering on column headers gives users the ability to quickly filter data without any additional menu.
Use the the `unstable_headerFilters` prop to activate this feature.

The new filter fields are displayed below the headers, and are synchronized with the filter panel.
If you prefer more simplicity, you can disable the default filter panel using the `disableColumnFilter` prop, and set filters to use only the default operator.

<video preload="metadata" style="margin-bottom: 16px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/mui-x-mid-v6-features/header_filter.mp4" type="video/mp4">
</video>

For more details on how to use and customize the filters, check out its [documentation page](https://mui.com/x/react-data-grid/filtering/header-filters/).

### Performance enhancements: smoother scrolling and expanding rows

The Data Grid received significant performance improvements in MUI X v6, particularly concerning its scrolling efficiency and the expansion of child rows.

These performance upgrades are part of our ongoing commitment to provide end users with a superior experience.
We always strive to ensure that MUI X remains performant and efficient, particularly when dealing with large and complex data.

## Charts - alpha version 🎁

We are delighted to announce the upcoming expansion of MUI X: a brand-new suite of components for building and customizing charts.

With MUI X Charts, you can choose from a wide range of chart types, including line charts, bar charts, pie charts, area charts, scatter plots, and more. 
Each chart type is thoughtfully crafted with attention to detail, ensuring that the visual representations are not only aesthetically pleasing, but also highly effective in conveying complex data.

And it ships with gorgeous palettes that were specially crafted by our designers!

Check out the video below, highlighting some of our Charts:

<video preload="metadata" autoplay muted loop playsinline controls>
  <source src="/static/blog/mui-x-mid-v6-features/charts_final_v1.mov" type="video/mp4">
</video>

As we progress toward the stable version, we're committed to enhancing the overall experience for developers and users, so your feedback is fundamental!

We will also steadily expand our portfolio with new chart types such as [Heat Map](https://mui.com/x/react-charts/heat-map/),[Funnel](https://mui.com/x/react-charts/funnel/), [Gantt](https://mui.com/x/react-charts/gantt/), and more.
If there's a specific chart visualization you'd like us to prioritize, we encourage you to upvote the respective [issue on GitHub](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+charts%22+label%3A%22waiting+for+%F0%9F%91%8D%22). 
Your input can directly influence our development schedule, so don't hesitate to let us know what matters most to you!

[Get started with charts now!](https://mui.com/x/react-charts/)

## What's next

We'll follow up soon to announce what's coming for v7, but for now one of our major goals is to move the [Tree View component](https://mui.com/material-ui/react-tree-view/) from the lab to a stable release.
You can find additional information about other future developments in our [public roadmap](https://github.com/mui/mui-x/projects/1).

## Feedback

We are always happy to get feedback, so if you'd like to share your pain points and use cases, please leave your contact info with us through [this Google Form](https://forms.gle/vsBv6CLPz9h57xg8A).
As usual, you're welcome to join the discussion by requesting or commenting on new features, or reporting bugs in our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose).

Cheers!
