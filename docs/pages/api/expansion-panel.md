---
filename: /packages/material-ui/src/ExpansionPanel/ExpansionPanel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ExpansionPanel API

<p class="description">The API documentation of the ExpansionPanel React component. Learn more about the properties and the CSS customization points.</p>

```js
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the expansion panel. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">defaultExpanded</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, expands the panel by default. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the panel will be displayed in a disabled state. |
| <span class="prop-name">expanded</span> | <span class="prop-type">bool</span> |  | If `true`, expands the panel, otherwise collapse it. Setting this prop enables control over the panel. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the expand/collapse state is changed.<br><br>**Signature:**<br>`function(event: object, expanded: boolean) => void`<br>*event:* The event source of the callback<br>*expanded:* The `expanded` state of the panel |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Collapse</span> | The component used for the collapse effect. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object</span> |  | Properties applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">rounded</span> | Styles applied to the root element if `square={false}`.
| <span class="prop-name">expanded</span> | Styles applied to the root element if `expanded={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ExpansionPanel/ExpansionPanel.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiExpansionPanel`.

## Inheritance

The properties of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Expansion Panels](/components/expansion-panels/)

