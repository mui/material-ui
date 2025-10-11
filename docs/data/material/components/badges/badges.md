---
productId: material-ui
title: React Badge component
components: Badge
githubLabel: 'scope: badge'
githubSource: packages/mui-material/src/Badge
---

# Badge

<p class="description">Badge displays small status or count information aligned to its wrapped element.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

> For full API and props, see [Badge API](/material-ui/api/badge/).

## Basic badge

Examples of badges containing text, using primary and secondary colors. The badge is applied to its children.

{{"demo": "SimpleBadge.js"}}

Use badges for lightweight status or counts. Avoid relying on the badge text alone to convey meaning.

## Color

Use `color` prop to apply theme palette to component.

{{"demo": "ColorBadge.js"}}

Pick colors that reflect semantic meaning (e.g., success/error/info) and ensure sufficient contrast.

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedBadges.js"}}

Target the badge element via `& .MuiBadge-badge` in `sx` or theme overrides to fine-tune size, color, and offsets.

## Badge visibility

The visibility of badges can be controlled using the `invisible` prop.

{{"demo": "BadgeVisibility.js"}}

The badge hides automatically when `badgeContent` is zero. You can override this with the `showZero` prop.

If “0” is meaningful in your UI (e.g., explicit emptiness), enable `showZero` so users aren’t confused.

{{"demo": "ShowZeroBadge.js"}}

## Maximum value

You can use the `max` prop to cap the value of the badge content.

{{"demo": "BadgeMax.js"}}

Cap large counts with `max` (e.g., 99+) to reduce cognitive load and avoid layout shifts.

## Dot badge

The `dot` prop changes a badge into a small dot. This can be used as a notification that something has changed without giving a count.

{{"demo": "DotBadge.js"}}

The `dot` variant signals attention without a number; pair it with descriptive text for assistive technologies.

## Badge overlap

You can use the `overlap` prop to place the badge relative to the corner of the wrapped element.

{{"demo": "BadgeOverlap.js"}}

Use `overlap="circular"` for round children (e.g., `Avatar`) and `overlap="rectangular"` for square/rectangular ones.

## Badge alignment

You can use the `anchorOrigin` prop to move the badge to any corner of the wrapped element.

{{"demo": "BadgeAlignment.js", "hideToolbar": true}}

Verify alignment visually when using non-standard child sizes (icons 20/24/28px may need different `anchorOrigin`).

## Best practices

- showZero: Enable when zero carries meaning (e.g., empty state clarity).
- max: Prefer compact display (e.g., 99+) to reduce cognitive load.
- Semantics: Badge supplements content; don’t rely on it as the only indicator.

## Composition tips

- With `IconButton` and `Avatar`, pick `overlap` that matches the child shape.
- Space multiple badges using `Stack` and `gap` to prevent visual crowding.

## Theming and customization

Customize the badge appearance via `sx` or theme overrides:
- Target the badge element with `& .MuiBadge-badge` for size, color, and offset tweaks.
- Align offsets to the child’s actual size (icons 20/24/28px may need different `anchorOrigin`).

## Accessibility

Screen readers may not announce `badgeContent` reliably. Provide a full description on the focusable parent, for instance with `aria-label` (e.g., `aria-label="3 unread notifications"`). For `variant="dot"`, always include a complementary text description.

{{"demo": "AccessibleBadges.js"}}
