---
components: Tabs, Tab
---

# Tabs

[Tabs](https://material.google.com/components/tabs.html) make it easy to explore and switch between different views.

## Basic Tabs

A simple example with no frills.

{{demo='pages/component-demos/tabs/BasicTabs.js'}}

## Fixed Tabs

Fixed tabs should be used with a limited number of tabs and when consistent placement will aid muscle memory.

### Full width

The `fullWidth` property should be used for smaller views.
This demo also uses [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) to animate the Tab transition, and allowing tabs to be swiped on touch devices.

{{demo='pages/component-demos/tabs/FullWidthTabs.js'}}

### Centered

The `centered` property should be used for larger views.

{{demo='pages/component-demos/tabs/CenteredTabs.js'}}

## Icon Tabs

Tab labels may be either all icons or all text.

{{demo='pages/component-demos/tabs/IconTabs.js'}}
{{demo='pages/component-demos/tabs/IconLabelTabs.js'}}

## Disabled Tab

Tab may be disabled by setting `disabled` property.

{{demo='pages/component-demos/tabs/DisabledTabs.js'}}
