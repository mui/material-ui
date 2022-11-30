# Color inversion

<p class="description">Joy UI components can invert their colors to match with the parent's variant.</p>

## Motivation

The [global variants](/joy-ui/main-features/global-variants/) feature lets you control the hierarchy of importance by using a consistent `variant` prop that exists on most Joy UI components. It works great for a flat layer of components, however, it produces issues when you have multiple layers of components that use the global variants.

The example below shows the problem when the interface has more than one layer that applies the global variants:

{{"demo": "ColorInversionMotivation.js"}}

On the **left**, the `Button`'s variant is `solid` which has the highest emphasis level among other components.

On the **right**, the problem arises when the container's variant changes to `solid`. The variant on the button loss its meaning because the button's background blends with the container which is less emphasized than the chip component. Moreover, the text and icon button don't have enough contrast to the parent's background.

The color inversion feature is created to solve this issue because we believe that these scenarios are common in web design and development.

## Overview

When color inversion is enabled on the parent, the children invert their styles to match the background by keeping the same hierarchy of importance based on their variants.

{{"demo": "ColorInversionOverview.js"}}

## Usage

To enable the feature, set `invertedColors` to true on the surface component either `Sheet` or `Card`.

```js
<Card variant="solid" color="primary" invertedColors>
  ...Joy UI components
</Card>
<Sheet variant="soft" color="info" invertedColors>
  ...Joy UI components
</Sheet>
```

## Common examples

Here are some examples that apply the color inversion feature.

### Header

{{"demo": "ColorInversionHeader.js"}}

### Footer

{{"demo": "ColorInversionFooter.js"}}

### Side navigation

{{"demo": "ColorInversionNavigation.js"}}

### Marketing section

{{"demo": "ColorInversionMarketing.js"}}

## How it works

## Trade-offs

### Benefits

### Disadvantages
