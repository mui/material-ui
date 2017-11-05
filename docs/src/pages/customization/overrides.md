# Overrides

As components evolve in different contexts, Material-UI supports four different types of customization needs going from **the most specific** to **the most generic**:

1. [Specific variation for a one-time situation](#1-specific-variation-for-a-one-time-situation)
2. [Specific variation of a component](#2-specific-variation-of-a-component) re-used in different contexts
4. [Material Design variations](#3-material-design-variations) such as with the button component
3. [User global theme variation](#4-user-global-theme-variation)

## 1. Specific variation for a one-time situation

You might need to change the style of a component in some very specific situation.
For these situations you have the following solutions available:

### Overriding with class names

The first way to override the style of a component is to use **class names**.
Every component provides a `className` property.
These properties are always applied to the root element.

The CSS injected by Material-UI to style a component has the highest specificity possible as the `<link />` is injected at the bottom of the `<head />`.
This way, we ensure our components always render correctly.
You can learn more at the [CSS injection order
](/customization/css-in-js#css-injection-order) section of the documentation.

{{demo='pages/customization/OverridesClassNames.js'}}

### Overriding with classes

When the `className` property isn't enough and you need to access deeper elements, you can take advantage of the `classes` property to customize all the CSS injected by Material-UI for that given component.
The list of these classes is documented in the **Component API** section.
For instance, you can have a look at the [Button CSS API](/api/button#css-api).
Alternatively, you can always look at the [implementation details](https://github.com/callemall/material-ui/blob/v1-beta/src/Button/Button.js).

An example:

{{demo='pages/customization/OverridesClasses.js'}}

### Overriding with inline-style

The second way to override the style of a component is to use the **inline-style** approach.
Every component provides a `style` property.
These properties are always applied to the root element.

You don't have to worry about CSS specificity as the inline-style takes precedence over the regular CSS.

{{demo='pages/customization/OverridesInlineStyle.js'}}

## 2. Specific variation of a component

You might need to create a variation of a component and use it in different contexts, for instance a colorful button on your product page. However you probably want to keep your code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

The best approach is to follow option 1 and then take advantage of the composition power of React by exporting your customized component to use wherever you need it.

{{demo='pages/customization/OverridesComponent.js'}}

## 3. Material Design variations

Material Design documents different variations of certain components, such as how buttons come in different shapes: [flat](https://material.io/guidelines/components/buttons.html#buttons-flat-buttons), [raised](https://material.io/guidelines/components/buttons.html#buttons-raised-buttons), [floating](https://material.io/guidelines/components/buttons-floating-action-button.html) and more.

Material-UI attempts to implement all of these variations. Please refer to the [Supported Components](/getting-started/supported-components) documentation to find out the current status of all supported Material Design components.

## 4. User global theme variation

In order to promote consistency and manage the user interface as a whole, Material-UI provide mechanisms to apply global changes. You can tweak the [configuration variables](/customization/themes#configuration-variables).

### Customizing all instances of a component type

When the configuration variables aren't powerful enough, you can take advantage of the `overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM.
Learn more about it in [the theme section of the documentation](/customization/themes#customizing-all-instances-of-a-component-type).
