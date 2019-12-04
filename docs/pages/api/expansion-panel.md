---
filename: /packages/material-ui/src/ExpansionPanel/ExpansionPanel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ExpansionPanel API

<p class="description">The API documentation of the ExpansionPanel React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// or
import { ExpansionPanel } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">node</span> |  | The content of the expansion panel. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--defaultExpanded"></a><a href="#props--defaultExpanded" title="link to the prop on this page" class="prop-name">defaultExpanded</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, expands the panel by default. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the panel will be displayed in a disabled state. |
| <a class="anchor-link" id="props--expanded"></a><a href="#props--expanded" title="link to the prop on this page" class="prop-name">expanded</a> | <span class="prop-type">bool</span> |  | If `true`, expands the panel, otherwise collapse it. Setting this prop enables control over the panel. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" title="link to the prop on this page" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the expand/collapse state is changed.<br><br>**Signature:**<br>`function(event: object, expanded: boolean) => void`<br>*event:* The event source of the callback.<br>*expanded:* The `expanded` state of the panel. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" title="link to the prop on this page" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Collapse</span> | The component used for the collapse effect. |
| <a class="anchor-link" id="props--TransitionProps"></a><a href="#props--TransitionProps" title="link to the prop on this page" class="prop-name">TransitionProps</a> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

- Style sheet name: `MuiExpansionPanel`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiExpansionPanel-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--rounded"></a><a href="#css--rounded" class="prop-name">rounded</a> | <span class="prop-name">.MuiExpansionPanel-rounded</span> | Styles applied to the root element if `square={false}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--expanded"></a><a href="#css--expanded" class="prop-name">expanded</a> | <span class="prop-name">.Mui-expanded</span> | Styles applied to the root element if `expanded={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Styles applied to the root element if `disabled={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ExpansionPanel/ExpansionPanel.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Expansion Panels](/components/expansion-panels/)

