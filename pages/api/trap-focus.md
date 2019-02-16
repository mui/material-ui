---
filename: /packages/material-ui/src/Modal/TrapFocus.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TrapFocus API

<p class="description">The API documentation of the TrapFocus React component. Learn more about the properties and the CSS customization points.</p>

```js
import TrapFocus from '@material-ui/core/Modal/TrapFocus';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">element</span> |   | A single child content element. |
| <span class="prop-name">disableAutoFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. This also works correctly with any modal children that have the `disableAutoFocus` prop.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableEnforceFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not prevent focus from leaving the modal while open.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableRestoreFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not restore focus to previously focused element once modal is hidden. |
| <span class="prop-name required">isEnabled *</span> | <span class="prop-type">func</span> |   | Do we still want to enforce the focus? This property helps nesting TrapFocus elements. |
| <span class="prop-name required">open *</span> | <span class="prop-type">bool</span> |   | If `true`, the modal is open. |

Any other properties supplied will be spread to the root element (native element).

