---
title: The date pickers are now part of the Advanced components
description: XXXX
date: 2022-04-03T00:00:00.000Z
authors: ['flaviendelangle']
tags: ['MUI X', 'News']
---

After more than 18 months in our experimental lab, the date picker components have found a new home as part of MUI X.

This means we'll be dedicating even more time and effort to these complex components, to better meet the needs of both you and your users.

## What is a date picker?

A date picker is an interface control that enables the user to select a date from a menu.

Common design patterns include text inputs, dropdown lists, calendars, timelines, and scrolling pickers on mobile devices.

The user may need to select an individual date, or a range of dates.

## What is MUI X?

MUI X is a collection of advanced components built for complex use cases.

As opposed to our Core library, which leans on the open-source community for support, MUI X components require several full-time developers dedicated to engineering and ongoing maintenance.

MUI X components are available under two licenses:

- MUI X—MIT license; free to use
- MUI X Pro—commercial license; includes the most advanced features

## Why have the date pickers been moved to MUI X?

Date picker UI elements appear simple enough on the surface, but they are surprisingly complicated to engineer.

When our date picker components were ready to leave our experimental lab, we had a choice to make: would they live in the MUI Core library, or should they become a part of MUI X?

Given the complex nature of these components, we decided that they would benefit most from the dedicated attention that they would receive from the X team.

And by offering an even more advanced component package through our commercial license, we can continue to grow our team to better serve your needs.

Our date picker components are now available in two packages:

- `@mui/x-date-pickers` which contains all the MIT licensed components
- `@mui/x-date-pickers-pro` which contains all the MIT and commercially licensed components

## Which components are only available in the Pro package?

The date range components can only be used with a commercial license.

All other date picker components are available in `mui/x-date-pickers` and will remain MIT licensed and free forever.

## How do I purchase a commercial license?

Visit [the MUI Store](https://mui.com/store/items/material-ui-pro/) to purchase a commercial license.

## How do I migrate?

To migrate, update the package name and change from a default export to a named export:

```ts
// before
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { DatePicker, DateRangePicker } from '@mui/lab';

// after
import DatePicker from '@mui/x-pickers/DatePicker';
import DateRangePicker from '@mui/x-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-pickers'; // DatePicker is also available in `@mui/x-pickers-pro`
import { DateRangePicker } from '@mui/x-pickers-pro';
```

We have prepared a codemod to help you migrate your codebase from `@mui/lab` to `@mui/x-date-pickers` or `@mui/x-date-pickers-pro`.

```shell
npx @mui/codemod v5.0.0/date-pickers-moved-to-x <path>
```

## Where is the date picker documentation?

You can find documentation on the date picker components in the [MUI X docs](https://mui.com/x/react-date-pickers/).

## What's next for the date pickers?

For now, `@mui/x-pickers` and `@mui/x-pickers-pro` are in alpha.
Our next goal is to work on the stability and API consistency of these components to prepare a stable release.
