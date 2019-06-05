---
filename: /packages/material-ui/src/IconButton/IconButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# IconButton API

<p class="description">The API documentation of the IconButton React component. Learn more about the properties and the CSS customization points.</p>

```js
import IconButton from '@material-ui/core/IconButton';
```

Refer to the [Icons](/components/icons/) section of the documentation
regarding the available icon options.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The icon element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'default'&nbsp;&#124;<br>&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'<br></span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the  keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">edge</span> | <span class="prop-type">enum:&nbsp;'start'&nbsp;&#124;<br>&nbsp;'end'&nbsp;&#124;<br>&nbsp;false<br></span> | <span class="prop-default">false</span> | If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape). |
| <span class="prop-name">size</span> | <span class="prop-type">enum:&nbsp;'small'&nbsp;&#124;<br>&nbsp;'medium'<br></span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([ButtonBase](/api/button-base/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">edgeStart</span> | Styles applied to the root element if `edge="start"`.
| <span class="prop-name">edgeEnd</span> | Styles applied to the root element if `edge="end"`.
| <span class="prop-name">colorInherit</span> | Styles applied to the root element if `color="inherit"`.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">label</span> | Styles applied to the children container element.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/IconButton/IconButton.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiIconButton`.

## Inheritance

The properties of the [ButtonBase](/api/button-base/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Buttons](/components/buttons/)
- [Grid List](/components/grid-list/)

