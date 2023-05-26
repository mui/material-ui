---
product: joy-ui
title: React Button Group component
components: Button, IconButton, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Button Group

<p class="description">The ButtonGroup component can be used to group related buttons.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Introduction

The ButtonGroup combine a set of related buttons to visually communicate to users that they are a group of related actions.

{{"demo": "ButtonGroupUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

`ButtonGroup` can wrap [`Button`](/joy-ui/react-button/) and [`IconButton`](/joy-ui/react-button/#icon-button).

{{"demo": "BasicButtonGroup.js"}}

### Variants

The ButtonGroup component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `outlined` (default), `solid`, `soft`, and `plain`.

{{"demo": "VariantButtonGroup.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors with different variants.

{{"demo": "ButtonGroupColors.js"}}

### Sizes

The ButtonGroup component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "GroupSizesColors.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Disabled

Use the `disabled` prop to disable all the buttons. Note that if you explicitly specify the `disabled` prop on the buttons directly, it will override the ButtonGroup.

{{"demo": "DisabledButtonGroup.js"}}

## Vertical group

The button group can be displayed vertically using the `orientation="horizontal"` prop. Note that this prop has no effect on `IconButton` component.

{{"demo": "GroupOrientation.js"}}

## Stretching buttons

Use `stretch` prop to make the buttons fill the available space of the ButtonGroup.

{{"demo": "FlexButtonGroup.js"}}

### Minimum width

For large container, you can control the default width of the buttons by providing a valid [CSS `flex`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) value to the `stretch` prop.

{{"demo": "MinWidthButtonGroup.js"}}

## Split button

`ButtonGroup` can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"demo": "SplitButton.js"}}

## Separator color

When ButtonGroup's variant is <b>not</b> `outlined`, separators are created between buttons. To control the color of the separator, override the CSS variable `--ButtonGroup-separatorColor` via `sx` prop.

{{"demo": "SeparatorButtonGroup.js"}}

## Using with Tooltip

ButtonGroup supports arbitrary children that wrap the buttons by preserving the same appearance.

{{"demo": "TooltipButtonGroup.js"}}

## Common examples

### Pill button group

Use CSS variable `--ButtonGroup-radius` to control the radius of the start and end buttons.

{{"demo": "RadiusButtonGroup.js"}}
