---
filename: /packages/material-ui-lab/src/Alert/Alert.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Alert API

<p class="description">The API documentation of the Alert React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Alert from '@material-ui/lab/Alert';
// or
import { Alert } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">action</span> | <span class="prop-type">node</span> |  | The action to display. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'error'<br>&#124;&nbsp;'info'<br>&#124;&nbsp;'success'<br>&#124;&nbsp;'warning'</span> | <span class="prop-default">'success'</span> | Main color for the Alert, picked from theme palette. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon element placed before the children. |
| <span class="prop-name">iconMapping</span> | <span class="prop-type">{ error?: node, info?: node, success?: node, warning?: node }</span> | <span class="prop-default">{  success: &lt;SuccessOutlinedIcon fontSize="inherit" />,  warning: &lt;ReportProblemOutlinedIcon fontSize="inherit" />,  error: &lt;ErrorOutlinedIcon fontSize="inherit" />,  info: &lt;InfoOutlinedIcon fontSize="inherit" />,}</span> | The component maps the color prop to a range of different icons. For instance, success to `<SuccessOutlined>`. If you wish to change that mapping, you can provide your own. Alternatively, you can use the `icon` prop. |
| <span class="prop-name">role</span> | <span class="prop-type">string</span> | <span class="prop-default">'alert'</span> | The role attribute of the element. |
| <span class="prop-name">variant</span> | <span class="prop-type">'filled'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'text'</span> | <span class="prop-default">'text'</span> | The variant of the Alert. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

- Style sheet name: `MuiAlert`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiAlert-root</span> | Styles applied to the root element.
| <span class="prop-name">textSuccess</span> | <span class="prop-name">.MuiAlert-textSuccess</span> | Styles applied to the root element if `variant="text"` and `color="success"`.
| <span class="prop-name">textInfo</span> | <span class="prop-name">.MuiAlert-textInfo</span> | Styles applied to the root element if `variant="text"` and `color="info"`.
| <span class="prop-name">textWarning</span> | <span class="prop-name">.MuiAlert-textWarning</span> | Styles applied to the root element if `variant="text"` and `color="warning"`.
| <span class="prop-name">textError</span> | <span class="prop-name">.MuiAlert-textError</span> | Styles applied to the root element if `variant="text"` and `color="error"`.
| <span class="prop-name">outlinedSuccess</span> | <span class="prop-name">.MuiAlert-outlinedSuccess</span> | Styles applied to the root element if `variant="outlined"` and `color="success"`.
| <span class="prop-name">outlinedInfo</span> | <span class="prop-name">.MuiAlert-outlinedInfo</span> | Styles applied to the root element if `variant="outlined"` and `color="info"`.
| <span class="prop-name">outlinedWarning</span> | <span class="prop-name">.MuiAlert-outlinedWarning</span> | Styles applied to the root element if `variant="outlined"` and `color="warning"`.
| <span class="prop-name">outlinedError</span> | <span class="prop-name">.MuiAlert-outlinedError</span> | Styles applied to the root element if `variant="outlined"` and `color="error"`.
| <span class="prop-name">filledSuccess</span> | <span class="prop-name">.MuiAlert-filledSuccess</span> | Styles applied to the root element if `variant="filled"` and `color="success"`.
| <span class="prop-name">filledInfo</span> | <span class="prop-name">.MuiAlert-filledInfo</span> | Styles applied to the root element if `variant="filled"` and `color="info"`.
| <span class="prop-name">filledWarning</span> | <span class="prop-name">.MuiAlert-filledWarning</span> | Styles applied to the root element if `variant="filled"` and `color="warning"`.
| <span class="prop-name">filledError</span> | <span class="prop-name">.MuiAlert-filledError</span> | Styles applied to the root element if `variant="filled"` and `color="error"`.
| <span class="prop-name">icon</span> | <span class="prop-name">.MuiAlert-icon</span> | Styles applied to the icon wrapper element.
| <span class="prop-name">message</span> | <span class="prop-name">.MuiAlert-message</span> | Styles applied to the message wrapper element.
| <span class="prop-name">action</span> | <span class="prop-name">.MuiAlert-action</span> | Styles applied to the action wrapper element if `action` is provided.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Alert/Alert.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Alert](/components/alert/)

