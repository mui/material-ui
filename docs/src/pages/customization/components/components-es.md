# Sobreponer

<p class="description">As components can be used in different contexts, Material-UI supports different types of customization requirements going from the most specific to the most generic.</p>

1. [Variación específica para una situación única](#1-specific-variation-for-a-one-time-situation)
2. [Dynamic variation for a one-time situation](#2-dynamic-variation-for-a-one-time-situation)
3. [Specific variation of a component](#3-specific-variation-of-a-component) re-used in different contexts
4. [Material Design variations](#4-material-design-variations) such as with the button component
5. [Variación global del tema](#5-global-theme-variation)

## 1. Variación específica para una situación única

You might need to change the style of a component for a specific implementation, for which you have the following solutions available:

### Reemplazando con los nombres de clase

The first way to override the style of a component is to use **class names**. Every component provides a `className` property which is always applied to the root element.

This example uses the [`withStyles()`](/css-in-js/basics/#higher-order-component-api) higher-order component to inject custom styles into the DOM, and to pass the class name to the `ClassNames` component via its `classes` property. You can choose [any other styling solution](/guides/interoperability/), or even plain CSS to create the styles, but be sure to consider the [CSS injection order](/css-in-js/advanced/#css-injection-order), as the CSS injected into the DOM by Material-UI to style a component has the highest specificity possible, since the `<link>` is injected at the bottom of the `<head />` to ensure the components always render correctly.

{{"demo": "pages/customization/overrides/ClassNames.js"}}

### Overriding with classes

When the `className` property isn't enough, and you need to access deeper elements, you can take advantage of the `classes` object property to customize all the CSS injected by Material-UI for a given component. La lista de clases para cada componente se documenta en la sección **API de Component**. Por ejemplo, puedes echar un vistazo a la [API CSS de Button](/api/button/#css). Como alternativa, puedes utilizar las [herramientas de desarrollo del navegador](#using-the-dev-tools).

This example also uses `withStyles()` (see above), but here, `ClassesNesting` is using `Button`'s `classes` prop to provide an object that maps the **names of classes to override** (style rules) to the **CSS class names to apply** (values). The component's existing classes will continue to be injected, so it is only necessary to provide the specific styles you wish to add or override.

Notice that in addition to the button styling, the button label's capitalization has been changed:

{{"demo": "pages/customization/overrides/ClassesNesting.js"}}

### Usando las herramientas de dev

Las herramientas de desarrollo del navegador pueden ahorrarte mucho tiempo. Material-UI's class names [follow a simple pattern](/css-in-js/advanced/#class-names) in development mode: `Mui[component name]-[style rule name]-[UUID]`.

Volvamos a la demo anterior. ¿Cómo puedes reemplazar la etiqueta del botón?

![herramientas de desarrollo](/static/images/customization/dev-tools.png)

Using the dev tools, you know that you need to target the `Button` component and the `label` style rule:

```jsx
<Button classes={{ label: 'my-class-name' }} />
```

### Shorthand

The above code example can be condensed by using **the same CSS API** as the child component. In this example, the `withStyles()` higher-order component is injecting a `classes` property that is used by the [`Button` component](/api/button/#css).

```jsx
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);
```

{{"demo": "pages/customization/overrides/ClassesShorthand.js"}}

### Estados internos

The components internal states, like *hover*, *focus*, *disabled* and *selected*, are styled with a higher CSS specificity. [Specificity is a weight](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) that is applied to a given CSS declaration.

In order to override the components internal states, **you need to increase specificity**. Here is an example with the *disable* state and the button component using a **pseudo-class** (`:disabled`):

```css
.MuiButton {
  color: black;
}
/* We increase the specificity */
.MuiButton:disabled {
  color: white;
}
```

```jsx
<Button disabled className="MuiButton">
```

A veces, no puedes usar **pseudo-class** ya que el estado no existe en la plataforma. Let's take the menu item component and the *selected* state as an example. Aside from accessing nested elements, the `classes` property can be used to customize the internal states of Material-UI components:

```css
.MuiMenuItem {
  color: black;
}
/* We increase the specificity */
.MuiMenuItem.selected {
  color: blue;
}
```

```jsx
<MenuItem selected classes={{ root: 'MuiMenuItem', selected: 'selected' }}>
```

#### Why do I need to increase specificity to override one component state?

By design, the CSS specification makes the pseudo-classes increase the specificity. For consistency, Material-UI increases the specificity of its custom states. This has one important advantage, it's allowing you to cherry-pick the state you want to customize.

### Use `$ruleName` to reference a local rule within the same style sheet

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

⚠️ You need to apply the two generated class names (`root` & `disabled`) to the DOM to make it work.

```jsx
<Button
  disabled
  classes={{
    root: classes.root, // class name, e.g. `root-x`
    disabled: classes.disabled, // class name, e.g. `disabled-x`
  } }
>
```

{{"demo": "pages/customization/overrides/ClassesState.js"}}

### Overriding with inline-style

The second way to override the style of a component is to use the **inline-style** approach. Every component provides a `style` property. These properties are always applied to the root element.

You don't have to worry about CSS specificity as the inline-style takes precedence over the regular CSS.

{{"demo": "pages/customization/overrides/InlineStyle.js"}}

[When should I use inline-style vs classes?](/getting-started/faq/#when-should-i-use-inline-style-vs-classes)

## 2. Dynamic variation for a one-time situation

You have learned how to override the style of the Material-UI components in the previous sections. Now, let's see how we can make these overrides dynamic. We demonstrate 5 alternatives, each has it's pros and cons.

### Dynamic CSS

{{"demo": "pages/customization/overrides/DynamicCSS.js"}}

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

The Material Design specification documents different variations of certain components, such as how buttons come in different shapes: [text](https://material.io/design/components/buttons.html#text-button) (formerly "flat"), [contained](https://material.io/design/components/buttons.html#contained-button) (formerly "raised"), [FAB](https://material.io/design/components/buttons-floating-action-button.html) and more.

Material-UI attempts to implement all of these variations. Please refer to the [Supported Components](/getting-started/supported-components/) documentation to find out the current status of all supported Material Design components.

## 5. Variación global del tema

### Theme variables

In order to promote consistency between components, and manage the user interface appearance as a whole, Material-UI provides a mechanism to apply global changes by adjusting the [theme configuration variables](/customization/themes/#theme-configuration-variables).

### Global CSS override

You can also customize all instances of a component with CSS. We expose [global class names](/css-in-js/advanced/#with-material-ui-core) to do so. It's very similar to how you would customize Bootstrap.

### Global theme override

You can take advantage of the `overrides` key of the `theme` to potentially change every single style injected by Material-UI into the DOM. Learn more about it in the [themes section](/customization/themes/#customizing-all-instances-of-a-component-type) of the documentation.