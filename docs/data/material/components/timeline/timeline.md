---
product: material-ui
title: React Timeline component
components: Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent
githubLabel: 'component: timeline'
packageName: '@mui/lab'
---

# Timeline

<p class="description">The timeline displays a list of events in chronological order.</p>

:::info
This component is not documented in the [Material Design guidelines](https://m2.material.io/), but it is available in Material UI.
:::

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic timeline

A basic timeline showing list of events.

{{"demo": "BasicTimeline.js"}}

## Left-positioned timeline

The main content of the timeline can be positioned on the left side relative to the time axis.

{{"demo": "LeftPositionedTimeline.js"}}

## Alternating timeline

The timeline can display the events on alternating sides.

{{"demo": "AlternateTimeline.js"}}

## Reverse Alternating timeline

The timeline can display the events on alternating sides in reverse order.

{{"demo": "AlternateReverseTimeline.js"}}

## Color

The `TimelineDot` can appear in different colors from theme palette.

{{"demo": "ColorsTimeline.js"}}

## Outlined

{{"demo": "OutlinedTimeline.js"}}

## Opposite content

The timeline can display content on opposite sides.

{{"demo": "OppositeContentTimeline.js"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedTimeline.js"}}

## Alignment

There are different ways in which a Timeline can be placed within the container.

You can do it by overriding the styles.

A Timeline centers itself in the container by default.

The demos below show how to adjust the relative width of the left and right sides of a Timeline:

### Left-aligned

{{"demo": "LeftAlignedTimeline.js"}}

### Right-aligned

{{"demo": "RightAlignedTimeline.js"}}

### Left-aligned with no opposite content

{{"demo": "NoOppositeContent.js"}}
