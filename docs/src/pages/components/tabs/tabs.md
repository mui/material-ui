---
title: Tabs React component
components: Tabs, Tab
---

# Tabs

<p class="description">Tabs make it easy to explore and switch between different views.</p>

[Tabs](https://material.io/design/components/tabs.html) organize and allow navigation between groups of content that are related and at the same level of hierarchy.

## Simple Tabs

A simple example with no frills.

{{"demo": "pages/components/tabs/SimpleTabs.js", "bg": true}}

### Wrapped Labels

Long labels will automatically wrap on tabs. If the label is too long for the tab, it will overflow and the text will not be visible.

{{"demo": "pages/components/tabs/TabsWrappedLabel.js", "bg": true}}

### Disabled Tab

A Tab can be disabled by setting `disabled` property.

{{"demo": "pages/components/tabs/DisabledTabs.js", "bg": true}}

## Fixed Tabs

Fixed tabs should be used with a limited number of tabs and when consistent placement will aid muscle memory.

### Full width

The `variant="fullWidth"` property should be used for smaller views.
This demo also uses [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) to animate the Tab transition, and allowing tabs to be swiped on touch devices.

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### Centered

The `centered` property should be used for larger views.

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## Scrollable Tabs

### Automatic Scroll Buttons

Left and right scroll buttons will automatically be presented on desktop and hidden on mobile. (based on viewport width)

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### Forced Scroll Buttons

Left and right scroll buttons will be presented regardless of the viewport width.

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

### Prevent Scroll Buttons

Left and right scroll buttons will never be presented.  All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## Customized tabs

Here is an example of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/components/).

{{"demo": "pages/components/tabs/CustomizedTabs.js", "bg": true}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/tabs).

## Vertical tabs

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

## Nav Tabs

By default tabs use a `button` element, but you can provide your own custom tag or component. Here's an example of implementing tabbed navigation:

{{"demo": "pages/components/tabs/NavTabs.js", "bg": true}}

## Icon Tabs

Tab labels may be either all icons or all text.

{{"demo": "pages/components/tabs/IconTabs.js", "bg": true}}

{{"demo": "pages/components/tabs/IconLabelTabs.js", "bg": true}}
