---
title: A fresh approach for date and time inputs
description: Check out what's new with the next-gen pickers in earlier v6 versions.
date: 2022-12-20T00:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'News']
---

There's a lot of exciting news in MUI X v6, but there's hardly anything comparable to the revamp we're delivering for the [Date and Time Pickers](https://next.mui.com/x/react-date-pickers/getting-started/).

It's the result of our research and effort to improve these inputs' usability and overall customizability.
We kept the best aspects of the previous versions, and we're fleshing out the package with several improvements and one fundamental change: a new input type to replace the masked text fields.

## The new date and time fields

This new input type we're talking about is a set of components shortly named [Fields](https://next.mui.com/x/react-date-pickers/fields/).
They are the base for the new pickers and a revolution in terms of keyboard usability.

In contrast with the masked inputs that only display simple text behind a formatting mask, and were often cumbersome, especially when editing dates, the new fields are smart and specialized in editing date and time numbers.
It can recognize what's a month, day, or whatever piece of the date you are currently editing and act accordingly.

For example, watch what happens when you edit the month with arrow keys.

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/nextgen-pickers/intelligent-field.mp4" type="video/mp4" />
</video>

As you increase the month, the component automatically watches for valid values throughout each piece of your date input, like you're navigating in a calendar.

The Fields are a perfect match to the calendar view, but they are available as stand-alone components, and you can import them from the latest v6 package.

```jsx
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';

<DateField label="My first field" />;
```

They are also included by default on the new pickers.

```jsx
import { Unstable_NextDatePicker as NextDatePicker } from '@mui/x-date-pickers/NextDatePicker';

<NextDatePicker label="My first v6 picker" />;
```

## Enhanced keyboard usability

With the new fields, not only can you type the date as a text, but you can use your arrow keys to quickly navigate through each piece of date and time values.
You can edit them atomically, without, for instance, leaking the year into the month, a common occurrence with masked inputs.

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/nextgen-pickers/keyboard-nav.mp4" type="video/mp4" />
</video>

For a quick comparison, let's check out, for instance, how the two different approaches behave on the most typical scenarios.

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

## Other Significant improvements

Now that you've seen what's fundamentally different with the pickers, let us brief you on some other noteworthy refinements the components are getting.

- **Customization of layout and internal components**

Combining the concept of slots and grid layout, you now can rearrange, extend, and customize most of the components used internally by the pickers views, and make them perfectly suited to your use cases.

- **Default render input**

You don't need to provide the usual `TextField` on `renderInput` anymore unless you need it customized.
In which case you can do it by:

1. Customizing through props via `field` and `input` slots ([codebox example](https://codesandbox.io/s/customizing-fields-with-props-o66r1c?file=/demo.tsx)).
2. Build a new field component using the Field's headless API (documentation coming soon).
3. Use an entirely [custom text field](https://next.mui.com/x/react-date-pickers/date-picker/#custom-input-component) to suit your use cases.

- **Drag to edit**

Editing a date range is even easier now with the new interface using drag and drop. Change `start` and `end` dates at will.

<video style="margin-bottom: 24px;" autoplay muted loop playsinline controls>
  <source src="/static/blog/nextgen-pickers/edit-drag.mp4" type="video/mp4" />
</video>

- **Range shortcuts**

Add quick and customizable shortcuts to your users. Choose to display them on left, right, bottom or top.

<img src="/static/blog/nextgen-pickers/date-range-shortcuts.png" style="width: 692px; margin-bottom: 24px;" loading="lazy" alt="Date Range shortcuts." />

## Should we retire the masked inputs?

We believe that after using the date fields, you'll have no reason to come back to the masked input approach.
It has a few irreparable usability issues, and it sets some hard limits on what we can do with the input.

However, they are still available during the pre-release, and you can find their documentation under the documentation pages prefixed with 'Legacy'.

The plan is to replace them entirely on the v6 stable release. But in the end, it's all up to you, and we'd love to listen to what you think.

If you want to voice your opinions or get involved, please consider giving us a [user interview](https://forms.gle/vsBv6CLPz9h57xg8A).

You can also, and always, get in touch by opening new bug reports or feature requests in our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose).
