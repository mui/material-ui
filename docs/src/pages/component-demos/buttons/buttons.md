---
components: Button, IconButton, ButtonBase
---

# Buttons

[Buttons](https://material.google.com/components/buttons.html) communicate the action that will occur when the user touches them.

Material buttons trigger an ink reaction on press.
They may display text, imagery, or both.
Flat buttons and raised buttons are the most commonly used types.

## Flat Buttons

Flat buttons are text-only buttons.
They may be used in dialogs, toolbars, or inline.
They do not lift, but fill with color on press.

{{demo='pages/component-demos/buttons/FlatButtons.js'}}

## Raised Buttons

Raised buttons are rectangular-shaped buttons.
They may be used inline. They lift and display ink reactions on press.

{{demo='pages/component-demos/buttons/RaisedButtons.js'}}

## Floating Action Buttons

A floating action button represents the primary action in an application.
Shaped like a circled icon floating above the UI, it has an ink wash upon focus and lifts upon selection.
When pressed, it may contain more related actions.

Only one floating action button is recommended per screen to represent the most common action.

{{demo='pages/component-demos/buttons/FloatingActionButtons.js'}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{demo='pages/component-demos/buttons/IconButtons.js'}}

## Complex Buttons

The Flat Buttons, Raised Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`.
You can take advantage of this lower level component to build custom interactions.

{{demo='pages/component-demos/buttons/ButtonBases.js'}}
