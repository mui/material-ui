# Overrides

As components can be used in different contexts, Material-UI supports four different types of customization requirements going from **the most specific** to **the most generic**:

1. [Specific variation for a one-time situation](#1-specific-variation-for-a-one-time-situation)
2. [Specific variation of a component](#2-specific-variation-of-a-component) re-used in different contexts
4. [Material Design variations](#3-material-design-variations) such as with the button component
3. [Global theme variation](#4-global-theme-variation)

## 1. Specific variation for a one-time situation

You might need to change the style of a component in some very specific situation, for which you have the following solutions available:

### Overriding with class names

The first way to override the style of a component is to use **class names**.
Every component provides a `className` property which is always applied to the root element.

In this example, we are using the [`withStyles()`](/customization/css-in-js#withstyles-styles-options-higher-order-component) higher-order
component to inject custom styles into the DOM, and to pass the class name to the `OverridesClasseNames` component via
its `classes` prop. You can choose any other styling solution, or even plain CSS to create the styles, but be sure to
consider the [CSS injection order](/customization/css-in-js#css-injection-order), as the CSS injected into the DOM
by Material-UI to style a component has the highest specificity possible since the `<link>` is injected at the bottom
of the `<head />` to ensure the components always render correctly.

{{"demo": "pages/customization/OverridesClassNames.js"}}

### Overriding with classes

When the `className` property isn't enough, and you need to access deeper elements, you can take advantage of the `classes` property to customize all the CSS injected by Material-UI for a given component.
The list of  classes for each
component is documented in the **Component API** section.
For instance, you can have a look at the [Button CSS API](/api/button#css-api).
Alternatively, you can always look at the [implementation details](https://github.com/mui-org/material-ui/blob/v1-beta/src/Button/Button.js).

This example also uses `withStyles()` (see above), but here, `OverridesClasses` is using `Button`'s `classes` prop to
provide an object that maps the **names of classes to override** (keys) to the **CSS class names to apply** (values).
The component's existing classes will continue to be injected, so it is only necessary to provide the specific styles
you wish to add or override.

Notice that in addition to the button styling, the button label's capitalization has been changed:

{{"demo": "pages/customization/OverridesClasses.js"}}

### Overriding with inline-style

The second way to override the style of a component is to use the **inline-style** approach.
Every component provides a `style` property.
These properties are always applied to the root element.

You don't have to worry about CSS specificity as the inline-style takes precedence over the regular CSS.

{{"demo": "pages/customization/OverridesInlineStyle.js"}}

## 2. Specific variation of a component

You might need to create a variation of a component and use it in different contexts, for instance a colorful button on your product page, however you probably want to keep your code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

The best approach is to follow option 1 and then take advantage of the composition power of React by exporting your customized component to use wherever you need it.

{{"demo": "pages/customization/OverridesComponent.js", "hideEditButton": true}}

## 3. Material Design variations

The Material Design specification documents different variations of certain components, such as how buttons come in different shapes: [flat](https://material.io/guidelines/components/buttons.html#buttons-flat-buttons), [raised](https://material.io/guidelines/components/buttons.html#buttons-raised-buttons), [floating](https://material.io/guidelines/components/buttons-floating-action-button.html) and more.

Material-UI attempts to implement all of these variations. Please refer to the [Supported Components](/getting-started/supported-components) documentation to find out the current status of all supported Material Design components.

## 4. Global theme variation

### Theme variables

In order to promote consistency between components, and manage the user interface appearance as a whole, Material-UI provides a mechanism to apply global changes by adjusting the [theme configuration variables](/customization/themes#theme-configuration-variables).

### Global theme override

Do you want to customize **all the instances** of a component type?

When the configuration variables aren't powerful enough,
you can take advantage of the `overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM.
Learn more about it in the [themes section](/customization/themes#customizing-all-instances-of-a-component-type) of the documentation.

### Global CSS override

You can also customize all instances of a component with CSS.
We expose a `dangerouslyUseGlobalCSS` option to do so.
Learn more about it in the [CSS in JS section](/customization/css-in-js#global-css) of the documentation. It's very similar to how you would customize Bootstrap.
