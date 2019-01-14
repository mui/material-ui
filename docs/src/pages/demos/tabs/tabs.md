---
title: Tabs React component
components: Tabs, Tab
---

# Tabs

<p class="description">Tabs make it easy to explore and switch between different views.</p>

[Tabs](https://material.io/design/components/tabs.html) organize and allow navigation between groups of content that are related and at the same level of hierarchy.

## Simple Tabs

A simple example with no frills.

{{"demo": "pages/demos/tabs/SimpleTabs.js"}}

### Wrapped Labels

Long labels will automatically wrap on tabs. If the label is too long for the tab, it will overflow and the text will not be visible.

{{"demo": "pages/demos/tabs/TabsWrappedLabel.js"}}

### Disabled Tab

A Tab can be disabled by setting `disabled` property.

{{"demo": "pages/demos/tabs/DisabledTabs.js"}}

## Fixed Tabs

Fixed tabs should be used with a limited number of tabs and when consistent placement will aid muscle memory.

### Full width

The `variant="fullWidth"` property should be used for smaller views.
This demo also uses [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) to animate the Tab transition, and allowing tabs to be swiped on touch devices.

{{"demo": "pages/demos/tabs/FullWidthTabs.js"}}

### Centered

The `centered` property should be used for larger views.

{{"demo": "pages/demos/tabs/CenteredTabs.js"}}

## Scrollable Tabs

### Automatic Scroll Buttons

Left and right scroll buttons will automatically be presented on desktop and hidden on mobile. (based on viewport width)

{{"demo": "pages/demos/tabs/ScrollableTabsButtonAuto.js"}}

### Forced Scroll Buttons

Left and right scroll buttons will be presented regardless of the viewport width.

{{"demo": "pages/demos/tabs/ScrollableTabsButtonForce.js"}}

### Prevent Scroll Buttons

Left and right scroll buttons will never be presented.  All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)

{{"demo": "pages/demos/tabs/ScrollableTabsButtonPrevent.js"}}

## Customized Tabs

If you have read the [overrides documentation page](/customization/overrides/)
but aren't confident jumping in, here's an example of how you can change the main color of the Tabs.

⚠️ While the material design specification encourages theming, this example is off the beaten path.

{{"demo": "pages/demos/tabs/CustomizedTabs.js"}}

## Nav Tabs

By default tabs use a `button` element, but you can provide your own custom tag or component. Here's an example of implementing tabbed navigation:

{{"demo": "pages/demos/tabs/NavTabs.js"}}

## Icon Tabs

Tab labels may be either all icons or all text.

{{"demo": "pages/demos/tabs/IconTabs.js"}}

{{"demo": "pages/demos/tabs/IconLabelTabs.js"}}
