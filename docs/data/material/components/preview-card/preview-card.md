---
productId: material-ui
title: React Preview Card component
components: PreviewCard, PreviewCardTrigger, PreviewCardPopup
githubLabel: 'scope: preview card'
githubSource: packages/mui-material/src/PreviewCard
---

# Preview Card

<p class="description">A preview card shows a preview of a link's destination when users hover over or focus the link.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

The preview card is built on the [Base UI Preview Card](https://base-ui.com/react/components/preview-card).
Base UI handles opening, closing, and positioning; Material UI handles the styles.

## Basic preview card

Wrap the trigger and the popup in `PreviewCard`.
The trigger renders the element you pass to its `render` prop, usually a `Link`.

{{"component": "file://./demos/basic/index.ts"}}

## Positioning

Use `side` and `align` to place the popup relative to the trigger.
`sideOffset` sets the distance from the trigger: 8px by default, where Base UI defaults to 0.
`alignOffset` shifts the popup along the trigger's edge.
The popup flips to the other side when there is not enough space.

{{"component": "file://./demos/positioning/index.ts"}}

## Delay

The popup opens 600ms after the pointer enters the trigger and closes 300ms after it leaves.
Change these values with the `delay` and `closeDelay` props on `PreviewCardTrigger`.

{{"component": "file://./demos/delay/index.ts"}}

## Controlled

Use the `open` and `onOpenChange` props to control the open state.
`onOpenChange` receives the new state and the event details, including the `reason` for the change.

A press outside the popup closes it with the `outside-press` reason, and that press can land on your own control.
In this demo, pressing the switch would close the card, and the switch's change would open it again.
To avoid this, ignore an `outside-press` change whose event target is inside the control.

{{"component": "file://./demos/controlled/index.ts"}}

## Detached triggers

A trigger can live outside of `PreviewCard`.
Create a handle with `createPreviewCardHandle()` and pass it to the `handle` prop of `PreviewCard` and of each trigger.
Each trigger can pass a `payload`, which `PreviewCard` receives when its children is a function.

{{"component": "file://./demos/detached-triggers/index.ts"}}

## Accessibility

The preview is a visual enhancement for sighted mouse and keyboard users.
Screen readers announce only the link, and the popup content can't be reached by touch, keyboard, or screen reader.
Touch input never opens the popup.

- Render the trigger as a link to the page that the popup previews.
- Keep the popup content supplementary: make every piece of information in it available on the linked page too.
- Don't put interactive elements, such as buttons, links, or form fields, in the popup.

## Anatomy

```text
PreviewCard
├── PreviewCardTrigger
└── PreviewCardPopup
```

`PreviewCardPopup` renders the following elements, each one a slot:

```text
portal
└── positioner
    └── transition (Grow)
        └── root (Paper)
```

## Animation

The popup grows from the trigger with the `Grow` transition.
Use `transitionDuration` to change the duration.
To run code after the transition ends, use the `onOpenChangeComplete` prop on `PreviewCard`.

Set `slots.transition` to `null` to render the popup without a Material UI transition.
You can then animate it with CSS on the `data-starting-style` and `data-ending-style` attributes.

## Customization

### Render a different element

Use the `render` prop on `PreviewCardPopup` to change the rendered element.
The popup keeps its Material UI styles.
A render function receives the props and the Base UI state, such as `state.open` and `state.side`.

### Slots

Use `slots` and `slotProps` to replace or configure each element that `PreviewCardPopup` renders: `root`, `transition`, `positioner`, and `portal`.

{{"component": "file://./demos/slots/index.ts"}}

### Theme

Use the `MuiPreviewCard`, `MuiPreviewCardTrigger`, and `MuiPreviewCardPopup` keys to set default props, and the `MuiPreviewCardPopup` key to add style overrides and variants.
Theme `variants` match props only.
To style the live state, target the utility classes and the data attributes in `styleOverrides`:

{{"component": "file://./demos/theme/index.ts"}}

### Utility classes

`PreviewCardPopup` adds these classes, exported as `previewCardPopupClasses`:

- `.MuiPreviewCardPopup-root`: the popup surface.
- `.Mui-open`: the popup surface while the popup is open.
- `.MuiPreviewCardPopup-positioner`: the positioner element.
- `.MuiPreviewCardPopup-portal`: the portal element.

### Data attributes

Base UI sets data attributes on each element.
Import them as constants from the matching Material UI part, for example `PreviewCardPopupDataAttributes.side`.

`PreviewCardTriggerDataAttributes` (from `@mui/material/PreviewCardTrigger`):

- `data-popup-open`: present when the preview card is open.

`PreviewCardPopupDataAttributes` (from `@mui/material/PreviewCardPopup`):

- `data-open`: present when the preview card is open.
- `data-closed`: present when the preview card is closed.
- `data-starting-style`: present when the preview card begins animating in.
- `data-ending-style`: present when the preview card is animating out.
- `data-side`: which side of the trigger the popup is placed on: `top`, `bottom`, `left`, `right`, `inline-end`, or `inline-start`.
- `data-align`: how the popup is aligned relative to the side: `start`, `center`, or `end`.

`PreviewCardPositionerDataAttributes` (from `@mui/material/PreviewCardPopup`):

- `data-open`: present when the preview card is open.
- `data-closed`: present when the preview card is closed.
- `data-anchor-hidden`: present when the anchor is hidden.
- `data-side`: which side of the trigger the popup is placed on.
- `data-align`: how the popup is aligned relative to the side.

The positioner also sets CSS variables, exported as `PreviewCardPositionerCssVariables`, such as `--available-height` and `--transform-origin`.
