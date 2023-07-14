---
title: Introducing MUI X v6.0.0
description: Introducing the new major version of the advanced components.
date: 2023-03-06T00:00:00.000Z
authors: ['josefreitas']
card: true
tags: ['MUI X', 'News']
---

<img src="/static/blog/mui-x-v6/card.png" alt="" style="margin-bottom: 16px;" width="2400" height="559" />

Since the first v6 stable release, we have continuously rolled out new major features, so it’s time to delve into the most recent additions to MUI X v6, and why you should get the latest version now.

## Table of contents

- [Date Pickers](#date-pickers)
  - [Support for Time Zones](#support-for-time-zones)
  - [Digital Clock](#digital-clock)
- [Data Grid](#data-grid)
  - [Copy and Paste (Premium)](#copy-and-paste-premium)
  - [Filter on Column Headers (Pro)](#filter-on-column-headers-pro)
  - [Performance Enhancements: Smoother Scrolling and Expanding Rows](#performance-enhancements-smoother-scrolling-and-expanding-rows)
- [Charts - Alpha Version](#charts---alpha-version)
- [What's next](#whats-next)

## Date pickers

### Support for time zones

No more hassle displaying dates on the time zones of your choice. 🌎

You can effortlessly display and select dates and times in different time zones, without worrying about the conversion logic and keeping the stored value consistent with your backend.

**[live demo showcasing stored date and toggle between system/UTC/timezone]**

Use adapters to control the original value and set the `timezone` prop to define in which timezone the Date, Time, or DateTime should be displayed.

```tsx
<TimePicker
  value={value} // Can be in any timezone of your choice
  onChange={setValue}
  timezone="Pacific/Honolulu"
  label={'Rendered in "Pacific/Honolulu"'}
/>
```

Please check the [full instructions](https://deploy-preview-8261--material-ui-x.netlify.app/x/react-date-pickers/timezone/) for more information on using this feature in your application.

### Digital clock

This feature is an alternative to the analog clock on time pickers; the original proposal was mainly focused on mobile devices, whereas the new interface is designed for a desktop experience or better time precision. This new addition makes our date pickers even more versatile and user-friendly and is available as the default variant for desktops on both [TimePicker](https://mui.com/x/react-date-pickers/time-picker/) and [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/).

**[timepicker-ui-video]**

Check out all the possibilities in [documentation](https://mui.com/x/react-date-pickers/digital-clock/), and let us know your thoughts!

## Data Grid

### Copy and Paste [premium]

After setting the prop `experimentalFeatures={{ clipboardPaste: true }}` you can copy and paste data directly from and to your Data Grid.

This new feature is extremely versatile, and you can exchange data from other fields, other grids, and even directly from and to Microsoft Excel.

**[showcase video]**

This feature is integrated with the editing API, so pasted data can be persisted using the `processRowUpdate` prop to update your data source through your usual editing validation process. Furthermore, the callbacks `clipboardPasteStart` and `clipboardPasteEnd` are fired during the clipboard paste operation, which can be useful for extra customizations around the event.

For more details on how to use Clipboard copy and paste, check out the feature’s page.

### Filter on column headers [pro]

This feature allows users to quickly filter the data without needing any additional menu and can be activated using the `unstable_headerFilters` prop.

**[live demo or showcase video]**

The new filter fields are displayed below the headers and are synchronized with the filter panel, but for those seeking more simplicity, disable the default filter panel using `disableColumnFilter` prop and set filters to use only the default operator. You can also customize the header filter cell for a specific column using the `renderHeaderFilter` method of `GridColDef`

For more details on how to use and customize the filters, check out [link].

### **Performance Enhancements: Smoother Scrolling and Expanding Rows**

The Data Grid received significant performance improvements in MUI X v6, particularly concerning the data grid's scrolling efficiency and the expansion of children's rows.

These performance upgrades are part of our ongoing commitment to provide end-users with a superior experience. We always strive to ensure that MUI X remains performant and efficient, particularly when dealing with large and complex data.

## Charts - alpha version 🎁

And last but not least, we're delighted to announce the upcoming expansion of MUI X– a brand-new suite of components specifically designed for building and easily customizing appealing charts. A solution that’s ready to match the style of your application and offers an intuitive API for building simple and complex visualizations.
And it ships with a couple of rad palettes, specially crafted by our designers!

**[video showcasing different chart visualizations]**

As we progress toward the stable version, we're committed to enhancing the overall experience for developers and users, so your feedback is fundamental!

We will also steadily expand our portfolio with new chart types; the Pie Chart is next on our list for the first stable version. However, if there's a specific chart visualization you'd like us to prioritize, we encourage you to upvote the respective issue on [GitHub](https://github.com/mui/mui-x/issues?q=is%3Aissue+is%3Aopen+label%3A%22component%3A+charts%22+label%3A%22waiting+for+%F0%9F%91%8D%22). Your input can directly influence our development schedule, so don't hesitate to let us know what matters most to you!

[Get started now!](https://mui.com/x/react-charts/)

## What's next

We'll soon announce what's coming for v7, for now one of our major milestones is moving the [TreeView component](https://mui.com/material-ui/react-tree-view/) from the lab to a stable release.
You can find additional information about other future developments in our [public roadmap](https://github.com/mui/mui-x/projects/1).

## Feedback

We are always happy to get feedback, so if you'd like to share your pain points and use cases, please [leave your contact](https://forms.gle/vsBv6CLPz9h57xg8A) info.
As usual, you're welcome to join the discussion by requesting or commenting on new features, or reporting bugs in our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose).

Cheers!
