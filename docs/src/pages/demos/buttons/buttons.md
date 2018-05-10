---
components: Button, IconButton, ButtonBase, Zoom
---

# Buttons

[Buttons](https://material.io/guidelines/components/buttons.html) communicate the action that will occur when the user touches them.

Material buttons trigger an ink reaction on press.
They may display text, imagery, or both.
Flat buttons and raised buttons are the most commonly used types.

## Flat Buttons

Flat buttons are text-only buttons.
They may be used in dialogs, toolbars, or inline.
They do not lift, but fill with color on press.

{{"demo": "pages/demos/buttons/FlatButtons.js"}}

## Raised Buttons

Raised buttons are rectangular-shaped buttons.
They may be used inline. They lift and display ink reactions on press.

{{"demo": "pages/demos/buttons/RaisedButtons.js"}}

## Floating Action Buttons

A floating action button represents the primary action in an application.
Shaped like a circled icon floating above the UI, it has an ink wash upon focus and lifts upon selection.
When pressed, it may contain more related actions.

Only one floating action button is recommended per screen to represent the most common action.

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

The floating action button animates onto the screen as an expanding piece of material, by default.

A floating action button that spans multiple lateral screens (such as tabbed screens) should briefly disappear,
then reappear if its action changes.

The Zoom transition can be used to achieve this. Note that since both the exiting and entering
animations are triggered at the same time, we use `enterDelay` to allow the outgoing Floating Action Button's
animation to finish before the new one enters.

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## Sizes

Fancy larger or smaller buttons? Use the `size` or the `mini` property.

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or
deselected, such as adding or removing a star to an item.

{{"demo": "pages/demos/buttons/IconButtons.js"}}

### Buttons with icons and label

Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## Customized Buttons

If you have been reading the [overrides documentation page](/customization/overrides)
but you are not confident jumping in, here's an example of how you can change the main color of a Button.

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## Complex Buttons

The Flat Buttons, Raised Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`.
You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## Third-party routing library

One common use case is to use the button to trigger a navigation to a new page.
The `ButtonBase` component provides a property to handle this use case: `component`.
Given that a lot of our interactive components rely on `ButtonBase`, you should be
able to take advantage of it everywhere:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  Link
</Button>
```

or if you want to avoid properties collisions:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  Link
</Button>
```

*Note: Creating `MyLink` is necessary to prevent unexpected unmounting. You can read more about it [here](/guides/composition#component-property).*
