---
components: Tabs, Tab
---

# Tabs

[Tabs](https://material.google.com/components/tabs.html) make it easy to explore and switch between different views.

## Basic Tabs

A simple example with no frills.

{{demo='pages/demos/tabs/BasicTabs.js'}}

### Wrapped Labels

Long labels will automatically wrap on tabs. If the label is too long for the tab, it will overflow and the text will not be visible.

{{demo='pages/demos/tabs/BasicTabsWrappedLabel.js'}}

## Fixed Tabs

Fixed tabs should be used with a limited number of tabs and when consistent placement will aid muscle memory.

### Full width

The `fullWidth` property should be used for smaller views.
This demo also uses [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) to animate the Tab transition, and allowing tabs to be swiped on touch devices.

{{demo='pages/demos/tabs/FullWidthTabs.js'}}

### Centered

The `centered` property should be used for larger views.

{{demo='pages/demos/tabs/CenteredTabs.js'}}

## Scrollable Tabs

### Automatic Scroll Buttons

Left and right scroll buttons will automatically be presented on desktop and hidden on mobile. (based on viewport width)

{{demo='pages/demos/tabs/ScrollableTabsButtonAuto.js'}}

### Forced Scroll Buttons

Left and right scroll buttons will be presented regardless of the viewport width.

{{demo='pages/demos/tabs/ScrollableTabsButtonForce.js'}}

### Prevent Scroll Buttons

Left and right scroll buttons will never be presented.  All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)

{{demo='pages/demos/tabs/ScrollableTabsButtonPrevent.js'}}

## Icon Tabs

Tab labels may be either all icons or all text.

{{demo='pages/demos/tabs/IconTabs.js'}}
{{demo='pages/demos/tabs/IconLabelTabs.js'}}

## Disabled Tab

Tab may be disabled by setting `disabled` property.

{{demo='pages/demos/tabs/DisabledTabs.js'}}
