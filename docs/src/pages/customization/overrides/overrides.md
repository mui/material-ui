# Overrides

As components can be used in different contexts, Material-UI supports four different types of customization requirements going from **the most specific** to **the most generic**:

1. [Specific variation for a one-time situation](#1-specific-variation-for-a-one-time-situation)
1. [Dynamic variation for a one-time situation](#2-dynamic-variation-for-a-one-time-situation)
1. [Specific variation of a component](#3-specific-variation-of-a-component) re-used in different contexts
1. [Material Design variations](#4-material-design-variations) such as with the button component
1. [Global theme variation](#5-global-theme-variation)

## 1. Specific variation for a one-time situation

You might need to change the style of a component in some very specific situation, for which you have the following solutions available:

### Overriding with class names

The first way to override the style of a component is to use **class names**.
Every component provides a `className` property which is always applied to the root element.

In this example, we are using the [`withStyles()`](/customization/css-in-js#withstyles-styles-options-higher-order-component) higher-order
component to inject custom styles into the DOM, and to pass the class name to the `ClassNames` component via
its `classes` prop. You can choose any other styling solution, or even plain CSS to create the styles, but be sure to
consider the [CSS injection order](/customization/css-in-js#css-injection-order), as the CSS injected into the DOM
by Material-UI to style a component has the highest specificity possible since the `<link>` is injected at the bottom
of the `<head />` to ensure the components always render correctly.

{{"demo": "pages/customization/overrides/ClassNames.js"}}

### Overriding with classes

When the `className` property isn't enough, and you need to access deeper elements, you can take advantage of the `classes` property to customize all the CSS injected by Material-UI for a given component.
The list of  classes for each
component is documented in the **Component API** section.
For instance, you can have a look at the [Button CSS API](/api/button#css-api).
Alternatively, you can always look at the [implementation details](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js).

This example also uses `withStyles()` (see above), but here, `ClassesNesting` is using `Button`'s `classes` prop to
provide an object that maps the **names of classes to override** (keys) to the **CSS class names to apply** (values).
The component's existing classes will continue to be injected, so it is only necessary to provide the specific styles
you wish to add or override.

Notice that in addition to the button styling, the button label's capitalization has been changed:

{{"demo": "pages/customization/overrides/ClassesNesting.js"}}

#### Internal states

Aside from accessing nested elements, the `classes` property can be used to customize the internal states of Material-UI components.
The components internal states, like `:hover`, `:focus`, `disabled` and `selected`, are styled with a higher CSS specificity.
[Specificity is a weight](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) that is applied to a given CSS declaration.
In order to override the components internal states, **you need to increase specificity**.
Here is an example with the `disable` state and the button component:

```css
.classes-state-root {
  /* ... */
}
.classes-state-root.disabled {
  color: white;
}
```

```jsx

<Button
  disabled
  classes={{
    root: 'classes-state-root',
    disabled: 'disabled', }
  }
>

```

#### Use `$ruleName` to reference a local rule within the same style sheet

The [jss-nested](https://github.com/cssinjs/jss-nested) plugin (available by default) can make the process of increasing specificity easier.

```js
const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
```

compiles to:

```css
.root-x.disable-x {
  color: white;
}
```

{{"demo": "pages/customization/overrides/ClassesState.js"}}

### Overriding with inline-style

The second way to override the style of a component is to use the **inline-style** approach.
Every component provides a `style` property.
These properties are always applied to the root element.

You don't have to worry about CSS specificity as the inline-style takes precedence over the regular CSS.

{{"demo": "pages/customization/overrides/InlineStyle.js"}}

[When should I use inline-style vs classes?](/getting-started/faq#when-should-i-use-inline-style-vs-classes-)

## 2. Dynamic variation for a one-time situation

You have learn how to override the style of the Material-UI components in the previous sections.
Now, let's see how we can make these overrides dynamic.
We demonstrate 5 alternatives, each has it's pros and cons.

### withStyles property support

```jsx
const styles = {
  button: {
    background: props => props.color,
  },
};
```

This feature isn't ready yet.
It will come with: [#7633](https://github.com/mui-org/material-ui/issues/7633).

### Class name branch

{{"demo": "pages/customization/overrides/DynamicClassName.js"}}

### CSS variables

{{"demo": "pages/customization/overrides/DynamicCSSVariables.js"}}

### Inline-style

{{"demo": "pages/customization/overrides/DynamicInlineStyle.js"}}

### Theme nesting

{{"demo": "pages/customization/overrides/DynamicThemeNesting.js"}}

## 3. Specific variation of a component

You might need to create a variation of a component and use it in different contexts, for instance a colorful button on your product page, however you probably want to keep your code [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

The best approach is to follow option 1 and then take advantage of the composition power of React by exporting your customized component to use wherever you need it.

{{"demo": "pages/customization/overrides/Component.js", "hideEditButton": true}}

## 4. Material Design variations

The Material Design specification documents different variations of certain components, such as how buttons come in different shapes: [text](https://material.io/design/components/buttons.html#text-button) (AKA "flat"), [contained](https://material.io/design/components/buttons.html#contained-button) (AKA "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) and more.

Material-UI attempts to implement all of these variations. Please refer to the [Supported Components](/getting-started/supported-components) documentation to find out the current status of all supported Material Design components.

## 5. Global theme variation

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
