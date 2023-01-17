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

This new input type we're talking about is a set of components shortly named [Fields](https://next.mui.com/x/react-date-pickers/fields/).
They are the base for the new pickers and a revolution in terms of keyboard usability.

In contrast with the masked inputs that only display simple text behind a formatting mask, and were often cumbersome, especially when editing dates, the new fields are smart and specialized in editing date and time numbers.
They're "smart" in the sense that they can recognize when a user is inputting any given piece of time data—a month, a day, a year—and respond accordingly.

For example, watch what happens when you edit the month using the arrow keys:

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/nextgen-pickers/intelligent-field.mp4" type="video/mp4" />
</video>

As you increase the month, the component automatically watches for valid values throughout each piece of your date input, like you're navigating in a calendar.

The Fields are a perfect match to the calendar view, but they are available as stand-alone components, and you can import them from the latest v6 package.

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

With the new Fields, not only can you type the date as text, but you can also use your arrow keys to quickly navigate through each date and time value.
You can edit them atomically—for instance, without leaking the year into the month, which is a common occurrence with masked inputs.

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/nextgen-pickers/keyboard-nav.mp4" type="video/mp4" />
</video>

For a quick comparison, let's check out how the two different approaches behave in some typical scenarios.

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/nextgen-pickers/fields-common-usecases.mp4" type="video/mp4" />
</video>

Try out the live demo of the `DateField` below.

<iframe
  src="https://codesandbox.io/embed/date-field-demo-pb87v0?fontsize=12&hidenavigation=1&module=%2F"
  style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### Fields roadmap

The Fields are still in alpha, and there are many improvements on the way. The following list describes some of the most notable features planned.

- **Auto section switching**

  So users don't need to manually navigate to the next section of the date after fulfilling the current one.

- **Smart pasting**

  Date strings pasted in Fields will be parsed and matched with the sections of the date.

- **Support days of the week**

  Support selecting a date by navigating days of the week with arrow keys, or text editing.

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

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
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
