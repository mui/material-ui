---
title: The date pickers are now part of the Advanced components
description: XXXX
date: 2022-04-03T00:00:00.000Z
authors: ['flaviendelangle']
tags: ['MUI X', 'News']
---

We're excited to announce that, after more than 18 month in the lab, the date picker components are now part of the X packages.

## What is MUI X ?

Since its creation, MUI have always kept at heart to provide great components for free.
However, some _Advanced components_ such as date pickers require several full-time developers and can not be sustainable relying only on open-source income.
To be able to keep improving the library and add _Advanced components_ without compromise on code quality, we decided in 2020 to launch MUI X, a new set of components available under two licenses:

- MUI X: the MIT licensed, free to use version
- MUI X Pro: the commercially licensed version with the most advanced features

The Advanced component launched by our team have been the Data Grid, with the `@mui/x-data-grid` and `@mui/x-data-grid-pro` packages.
More than one year later, this new source of income has allowed our company to hire several new developers and to increase the amount of work achieved, even on the open-source team.

## Why move the date pickers to MUI X

When the date pickers components have moved to the lab, it was already clear that some of their features would eventually be part of the commercially licensed packages.

We just released two new packages:

- `@mui/x-date-pickers` which contains all the MIT licensed components
- `@mui/x-date-pickers-pro` which contains all the MIT and commercially licensed components

> ⚠️The only components that we are moving to a commercial license are the date range components.
> Those had a clear warning on the doc stating that they were intended for MUI X Pro.
> All the rest of the components are available in `@mui/x-date-pickers` and will stay MIT and free forever.

## How do I migrate ?

We tried to keep this migration as easy as possible.
The only changes are the name of the package and a migration from default export to named export.

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

## What's next for the date pickers ?

For now, `@mui/x-pickers` and `@mui/x-pickers-pro` are in alpha.
Our next goal is to work on the stability and api consistency of those components, in order to prepare a stable release.
