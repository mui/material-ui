---
title: A fresh approach for date and time inputs
description: Check out what's new with the next-gen pickers in earlier v6 versions.
date: 2022-12-20T00:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'News']
---

There's a lot of exciting news in MUI X v6, but there's hardly anything comparable to the revamp we're delivering for the [Date and Time Pickers](https://next.mui.com/x/react-date-pickers/getting-started/).

This is the result of our ongoing efforts to improve the usability and customizability of these components.
We kept the best aspects of the previous versions, and we're fleshing out the package with several improvements and one fundamental change: a new input type to replace the masked text fields.

## The new date and time fields

These new input components are called [Fields](https://next.mui.com/x/react-date-pickers/fields/), and they provide massive improvements to the user experience of editing the value with a keyboard.

The previous generation of pickers, whose input editing was based on a [mask approach](https://www.npmjs.com/package/rifm), are often cumbersome, particularly when modifying dates.

For example, watch what happens when the month is edited on this masked input:

<video style="max-width:608px " autoplay muted loop playsinline >
  <source src="/static/blog/nextgen-pickers/masked-input-bad-ux.mp4" type="video/mp4" />
</video>

As you can notice, the day and year leak to the previous sections of the date, presenting a serious challenge to usability.

In contrast, the new fields are specialized in editing date and time values.
They recognize the values on the input (day, month, year, etc.) and respond accordingly.

<video style="max-width:608px " autoplay muted loop playsinline >
  <source src="/static/blog/nextgen-pickers/basic-date-field.mp4" type="video/mp4" />
</video>


The Fields are included in the pickers, but they're available as standalone components too. 
You can import them from the latest v6 package.

```jsx
import { DateField } from '@mui/x-date-pickers/DateField';

<DateField label="My first field" />;
```

They're also included by default with the new Pickers.

```jsx
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

<DatePicker label="My first v6 picker" />;
```

## Enhanced keyboard usability

With the new Fields, the keyboard interaction is a first-class experience. Not only can you type the date as text, but you can also use your arrow keys to navigate and edit date and time values.

<video style="margin-bottom:5px; max-width:608px" autoplay muted loop playsinline >
  <source src="/static/blog/nextgen-pickers/date-field-navigation.mp4" type="video/mp4" />
</video>

Moreover, notice on the following example that as we increase the month, the component automatically watches for valid values throughout each piece of your date input, like you're navigating in a calendar.

<video style="margin-bottom:5px; max-width:608px" autoplay muted loop playsinline >
  <source src="/static/blog/nextgen-pickers/smart-field.mp4" type="video/mp4" />
</video>

For a quick comparison, let's check out how the old and new approaches behave in typical scenarios.

<video style="margin-bottom:24px" autoplay muted loop playsinline >
  <source src="/static/blog/nextgen-pickers/quick-comparison-fields.mp4" type="video/mp4" />
</video>

Please, try it out for yourself in the live demo below:

<iframe
  src="https://codesandbox.io/embed/date-field-demo-pb87v0?fontsize=12&hidenavigation=1&module=%2F"
  style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### Fields roadmap

The Fields are still in alpha, and there are many improvements on the way. The following list describes some of the most notable features planned.

- **Smart pasting**

  Date strings pasted in Fields will be parsed and matched with the sections of the date.

- **Support days of the week**

  Users will be able to select a day in the week just like the can select a month.

We'd love to hear your [feedback](https://github.com/mui/mui-x/issues/new/choose) to help us improve these components even further.

## Other significant improvements

Now that you've seen what's fundamentally changed with the Pickers, let's briefly review some other noteworthy improvements.

- **Customization of layout and internal components**

  Combining the concept of slots with the grid layout, you now can rearrange, extend, and customize most of the components used internally by the Pickers' views.

- **Default render input**

  You don't need to provide the usual `TextField` on `renderInput` anymore unless you need it customized.
  In which case you can do it by:

  1. Customizing through props via `field` and `input` slots ([codebox example](https://codesandbox.io/s/customizing-fields-with-props-o66r1c?file=/demo.tsx)).
  2. Build a new field component using the Field's headless API (documentation coming soon).
  3. Use an entirely [custom text field](https://next.mui.com/x/react-date-pickers/date-picker/#custom-input-component) to suit your use case.

- **Drag to edit**

  Editing a date range is even easier now with the new drag-and-drop interface. Change `start` and `end` dates at will.

<video style="margin-bottom: 24px;" autoplay muted loop playsinline >
  <source src="/static/blog/nextgen-pickers/edit-drag.mp4" type="video/mp4" />
</video>

- **Range shortcuts**

  Add quick and customizable shortcuts for your users. Choose to display them on the left, right, bottom or top.

<img src="/static/blog/nextgen-pickers/date-range-shortcuts.png" style="width: 692px; margin-bottom: 24px;" loading="lazy" alt="Date Range shortcuts." />

## Should we retire the masked inputs?

We believe that after using the date fields, you'll have no reason to come back to the masked input approach.
It has a few irreparable usability issues, and it sets some hard limits on what we can do with the input.

However, they are still available during the pre-release, and in the documentation they now have the term "Legacy" appended to their names.

Our plan is to replace them entirely in the stable release of v6, but if that will prove to be a serious problem for you, then you still have a chance to influence our roadmap.

If you want to voice your opinions or get involved, please consider scheduling a [user interview](https://forms.gle/vsBv6CLPz9h57xg8A) with us.

As always, you can get in touch by opening new bug reports or feature requests in our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose).
