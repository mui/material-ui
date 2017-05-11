# Overrides

We have identified four different types of customization needs as components evolve in different contexts.
Going from the **most specific** to the **most generic** one:

1. [Specific variation for a one-time situation](#1-specific-variation-for-a-one-time-situation)
2. [Specific variation of a component](#2-specific-variation-of-a-component) **made by a user** used in different contexts
4. [Material Design variations](#3-material-design-variations) like with the buttons
3. [User global theme variation](#4-user-global-theme-variation)

## 1. Specific variation for a one-time situation

You might need to change the style of the components in some very specific situation.
For those situations, you have two solutions available.

### Overriding with class names

The first way to override the style of the components is to use the **class names**.
Every component provides a `className` property.
Those properties are always applied to the root element.

The CSS inject by Material-UI to style the components has the lowest specificity possible (the `link` are injected at the top).

{{demo='pages/customization/OverridesClassNames.js'}}

### Overriding with inline-style

The second way to override the style of the components is to use the **inline-style** approach.
Every component provides a `style` property.
Those properties are always applied to the root element.

You don't have to worry about CSS specificity as the inline-style takes precedence over the regular CSS.

{{demo='pages/customization/OverridesInlineStyle.js'}}

## 2. Specific variation of a component

You might need to create a variation of a component and use it in different contexts,
for instance a colorful button on your product page.
But you want to keep the code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
Who to do it?

We advise users to follow the option 1 and to take advantage of the composition power of React. Simply export your customized component and use it everywhere you need to.

{{demo='pages/customization/OverridesComponent.js'}}

## 3. Material Design variations

Of course, the Material Design is already well documenting a variety of different variations of the components. For instance the buttons came in different shapes: [flat](https://material.io/guidelines/components/buttons.html#buttons-flat-buttons), [raised](https://material.io/guidelines/components/buttons.html#buttons-raised-buttons), [floating](https://material.io/guidelines/components/buttons-floating-action-button.html) and more.

We try to implement all of those variations. You can refer to the [Supported Components](/getting-started/supported-components) section to learn more about it.

## 4. User global theme variation

In order to promote consistency and think the interface as a whole, we provide a mechanism to apply global changes.
You can tweak the [configuration variables](/customization/themes#configuration-variables) as well as [customizing all instances of a component type](/customization/themes#customizing-all-instances-of-a-component-type).
