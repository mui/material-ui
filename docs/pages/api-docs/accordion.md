---
filename: /packages/material-ui/src/Accordion/Accordion.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Accordion API

<p class="description">The API documentation of the Accordion React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Accordion from '@material-ui/core/Accordion';
// or
import { Accordion } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiAccordion` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">node</span> |  | The content of the accordion. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">defaultExpanded</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, expands the accordion by default. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the accordion will be displayed in a disabled state. |
| <span class="prop-name">expanded</span> | <span class="prop-type">bool</span> |  | If `true`, expands the accordion, otherwise collapse it. Setting this prop enables control over the accordion. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the expand/collapse state is changed.<br><br>**Signature:**<br>`function(event: object, expanded: boolean) => void`<br>*event:* The event source of the callback.<br>*expanded:* The `expanded` state of the accordion. |
| <span class="prop-name">square</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, rounded corners are disabled. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Collapse</span> | The component used for the collapse effect. [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiAccordion-root</span> | Styles applied to the root element.
| <span class="prop-name">rounded</span> | <span class="prop-name">.MuiAccordion-rounded</span> | Styles applied to the root element if `square={false}`.
| <span class="prop-name">expanded</span> | <span class="prop-name">.Mui-expanded</span> | Styles applied to the root element if `expanded={true}`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Styles applied to the root element if `disabled={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Accordion/Accordion.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Accordion](/components/accordion/)

