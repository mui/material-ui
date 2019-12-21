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
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">closeIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;Close /></span> | Element placed before the children. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">startIcon</span> | <span class="prop-type">node</span> |  | Element placed before the children. |
| <span class="prop-name">type</span> | <span class="prop-type">'success'<br>&#124;&nbsp;'info'<br>&#124;&nbsp;'warning'<br>&#124;&nbsp;'error'</span> | <span class="prop-default">'info'</span> | The type of Alert |

The component cannot hold a ref.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiAlert`.
- Style sheet details:

- `root`
- `alertContent`
- `startIcon`
- `closeIcon`
- `success`
- `info`
- `warning`
- `error`

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Alert/Alert.js) for more detail.

## Demos

- [Alert](/components/alert/)

