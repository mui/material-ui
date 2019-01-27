---
title: Button React Komponente
components: Button, Fab, IconButton, ButtonBase, Zoom
---
# Buttons

<p class="description">Mit den Schaltflächen können Benutzer mit einem einzigen Tastendruck Aktionen ausführen und Entscheidungen treffen.</p>

[Buttons](https://material.io/design/components/buttons.html) kommunizieren Aktionen, die Benutzer ausführen können. Sie werden normalerweise in der gesamten Benutzeroberfläche platziert, beispielsweise an folgenden Orten:

- Dialogs
- Modal windows
- Forms
- Cards
- Toolbars

## Contained Buttons

[Contained buttons](https://material.io/design/components/buttons.html#contained-button) sind hervorgehoben und unterscheiden sich durch die Verwendung von Höhe und Füllung. Sie enthalten Aktionen, die für Ihre App vorrangig sind.

Das letzte Beispiel dieser Demo zeigt, wie Sie eine Schaltfläche zum Hochladen verwenden.

{{"demo": "pages/demos/buttons/ContainedButtons.js"}}

## Text Buttons

[Text buttons](https://material.io/design/components/buttons.html#text-button) werden normalerweise für weniger ausgeprägte Aktionen verwendet, darunter auch solche, die Folgendes enthalten:

- In dialogs
- In cards

In cards, text buttons help maintain an emphasis on card content.

{{"demo": "pages/demos/buttons/TextButtons.js"}}

## Outlined Buttons

[Outlined buttons](https://material.io/design/components/buttons.html#outlined-button) are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.

### Alternatives

Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons.

{{"demo": "pages/demos/buttons/OutlinedButtons.js"}}

## Floating Action Buttons

A [floating action button](https://material.io/design/components/buttons-floating-action-button.html) (FAB) performs the primary, or most common, action on a screen. It appears in front of all screen content, typically as a circular shape with an icon in its center. FABs come in two types: regular, and extended.

Only use a FAB if it is the most suitable way to present a screen’s primary action.

Only one floating action button is recommended per screen to represent the most common action.

{{"demo": "pages/demos/buttons/FloatingActionButtons.js"}}

The floating action button animates onto the screen as an expanding piece of material, by default.

A floating action button that spans multiple lateral screens (such as tabbed screens) should briefly disappear, then reappear if its action changes.

The Zoom transition can be used to achieve this. Note that since both the exiting and entering animations are triggered at the same time, we use `enterDelay` to allow the outgoing Floating Action Button's animation to finish before the new one enters.

{{"demo": "pages/demos/buttons/FloatingActionButtonZoom.js"}}

## Sizes

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/demos/buttons/ButtonSizes.js"}}

## Buttons with icons and label

Sometimes you might want to have icons for certain button to enhance the UX of the application as we recognize logos more easily than plain text. For example, if you have a delete button you can label it with a dustbin icon.

{{"demo": "pages/demos/buttons/IconLabelButtons.js"}}

## Icon Buttons

Icon buttons are commonly found in app bars and toolbars.

Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.

{{"demo": "pages/demos/buttons/IconButtons.js"}}

## Customized Buttons

If you have been reading the [overrides documentation page](/customization/overrides/) but you are not confident jumping in, here are examples of how you can change the main color of a Button using classes, and using a theme; and of a Bootstrap style Button.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/buttons/CustomizedButtons.js"}}

## Complex Buttons

The Text Buttons, Contained Buttons, Floating Action Buttons and Icon Buttons are built on top of the same component: the `ButtonBase`. You can take advantage of this lower level component to build custom interactions.

{{"demo": "pages/demos/buttons/ButtonBases.js"}}

## Third-party routing library

One common use case is to use the button to trigger a navigation to a new page. The `ButtonBase` component provides a property to handle this use case: `component`. Given that a lot of our interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button component={Link} to="/open-collective">
  Link
</Button>
```

or if you want to avoid properties collision:

```jsx
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const MyLink = props => <Link to="/open-collective" {...props} />

<Button component={MyLink}>
  Link
</Button>
```

*Note: Creating `MyLink` is necessary to prevent unexpected unmounting. You can read more about it in our [component property guide](/guides/composition/#component-property).*