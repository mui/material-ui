---
productId: material-ui
title: React Badge component
components: Badge
githubLabel: 'scope: badge'
githubSource: packages/mui-material/src/Badge
---

# Badge

<p class="description">Badge generates a small badge to the top-right of its child(ren).</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic badge

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"component": "../data/material/components/badges/demos/simple/index.ts"}}

## Color

Use `color` prop to apply theme palette to component.

{{"component": "../data/material/components/badges/demos/color/index.ts"}}

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "../data/material/components/badges/demos/customized/index.ts"}}

## Badge visibility

The visibility of badges can be controlled using the `invisible` prop.

{{"component": "../data/material/components/badges/demos/visibility/index.ts"}}

The badge hides automatically when `badgeContent` is zero. You can override this with the `showZero` prop.

{{"component": "../data/material/components/badges/demos/show-zero/index.ts"}}

## Maximum value

You can use the `max` prop to cap the value of the badge content.

{{"component": "../data/material/components/badges/demos/max/index.ts"}}

## Dot badge

The `dot` prop changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"component": "../data/material/components/badges/demos/dot/index.ts"}}

## Badge overlap

You can use the `overlap` prop to place the badge relative to the corner of the wrapped element.

{{"component": "../data/material/components/badges/demos/overlap/index.ts"}}

## Badge alignment

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"component": "../data/material/components/badges/demos/alignment/index.ts", "hideToolbar": true}}

## Accessibility

You can't rely on the content of the badge to be announced correctly.
You should provide a full description, for instance, with `aria-label`:

{{"component": "../data/material/components/badges/demos/accessible/index.ts"}}
