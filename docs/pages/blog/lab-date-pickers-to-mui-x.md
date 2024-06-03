---
title: Date and Time Pickers are moving to MUI X
description: Migrate to the new package to start building with our powerful Date and Time Pickers, now part of MUI X. Previously released MIT components will stay MIT.
date: 2022-04-03T00:00:00.000Z
authors: ['flaviendelangle']
tags: ['MUI X', 'Product']
manualCard: true
---

After more than 18 months in the lab, the Date and Time Picker components have found a new home as part of MUI X.
This means we'll be dedicating even more time and effort to these complex components, to better meet the needs of both you and your users.

## TL;DR

- The Date and Time Pickers are one step closer to a stable release.
- **No surprise licenses changes**. We are staying true to [our promises](https://mui-org.notion.site/Stewardship-542a2226043d4f4a96dfb429d16cf5bd). What's MIT stays MIT, and we're going forward with our [plan announced over a year ago](https://v5-0-6.mui.com/components/date-range-picker/) to move the date range picker to the commercial license.
- Follow the [migration steps](/x/migration/migration-pickers-lab/)

## What are Date and Time Pickers?

Date and Time Pickers are interface controls that enable the user to select a date (or time) from a menu.

<img src="/static/blog/lab-date-pickers-to-mui-x/date-time-picker.png" style="width: 796px; margin-top: 16px;" alt="Date and Time Picker component" />

<p class="blog-description">Date and Time Pickers using the default Material UI design</p>

Common design patterns include text inputs, dropdown lists, calendars, timelines, and scrolling pickers on mobile devices.

The user may need to select an individual date/time, or a range.

## What is MUI X?

[MUI X](/x/) is a collection of advanced components built for complex use cases.

As opposed to the MUI Core library, which leans on the open-source community for support, MUI X components require several full-time developers dedicated to engineering and ongoing maintenance.

MUI X components are available under two licenses:

- MUI X is MIT licensed, so free to use.
- MUI X Pro includes the most advanced features, and is commercially licensed.

## Why have the Date and Time Pickers been moved to MUI X?

Date and Time Picker UI elements appear simple enough on the surface, but they are surprisingly complicated to engineer.

When the Date and Time Picker components were ready to leave the lab, we had a choice to make: would they live in the MUI Core library, or should they become a part of MUI X?

Given the complex nature of these components, we decided that they would benefit most from the dedicated attention that they would receive from the X team.

And by offering an even more advanced component package through our commercial license, we can continue to grow our team to better serve your needs.

The Date and Time Picker components are now available in two packages:

- `@mui/x-date-pickers` has a [MIT license](https://unpkg.com/browse/@mui/x-date-pickers/LICENSE), it contains all the open-source components
- `@mui/x-date-pickers-pro` has a [commercial license](https://unpkg.com/browse/@mui/x-date-pickers-pro/LICENSE), it contains all the MIT and commercially licensed components

## Which components are only available in the Pro package?

The date range components can only be used with a commercial license.

All other Date and Time Picker components are available in `mui/x-date-pickers` and will remain MIT licensed and free forever.

## How do I purchase a commercial license?

Visit [the MUI Store](https://mui.com/store/items/mui-x-pro/) to purchase a commercial license.

## How do I migrate?

Follow the [migration steps](/x/migration/migration-pickers-lab/) by updating the package name and change from a default export to a named export:

```diff
-import DatePicker from '@mui/lab/DatePicker';
+import { DatePicker } from '@mui/x-date-pickers/DatePicker';

-import DateRangePicker from '@mui/lab/DateRangePicker';
+import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

-import { DatePicker, DateRangePicker } from '@mui/lab';
+import { DatePicker } from '@mui/x-date-pickers';
+import { DateRangePicker } from '@mui/x-date-pickers-pro';
 // DatePicker is also available in `@mui/x-date-pickers-pro`
```

We have prepared a codemod to help you migrate your codebase from `@mui/lab` to `@mui/x-date-pickers` or `@mui/x-date-pickers-pro`:

```bash
npx @mui/codemod@latest v5.0.0/date-pickers-moved-to-x <path>
```

## Where is the Date and Time Picker documentation?

You can find the documentation for the picker components in the [MUI X docs](/x/react-date-pickers/getting-started/).

## What's next for the Date and Time Pickers?

For now, `@mui/x-date-pickers` and `@mui/x-date-pickers-pro` are in alpha.
Our next goal is to work on the stability and API consistency of these components to prepare a stable release.
