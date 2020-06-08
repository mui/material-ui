---
filename: /packages/material-ui/src/Unstable_TrapFocus/Unstable_TrapFocus.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Unstable_TrapFocus API

<p class="description">The API documentation of the Unstable_TrapFocus React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Unstable_TrapFocus from '@material-ui/core/Unstable_TrapFocus';
// or
import { Unstable_TrapFocus } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Utility component that locks focus inside the component.



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | A single child content element. |
| <span class="prop-name">disableAutoFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the trap focus will not automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. This also works correctly with any trap focus children that have the `disableAutoFocus` prop.<br>Generally this should never be set to `true` as it makes the trap focus less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableEnforceFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the trap focus will not prevent focus from leaving the trap focus while open.<br>Generally this should never be set to `true` as it makes the trap focus less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableRestoreFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the trap focus will not restore focus to previously focused element once trap focus is hidden. |
| <span class="prop-name required">getDoc<abbr title="required">*</abbr></span> | <span class="prop-type">func</span> |  | Return the document to consider. We use it to implement the restore focus between different browser documents. |
| <span class="prop-name required">isEnabled<abbr title="required">*</abbr></span> | <span class="prop-type">func</span> |  | Do we still want to enforce the focus? This prop helps nesting TrapFocus elements. |
| <span class="prop-name required">open<abbr title="required">*</abbr></span> | <span class="prop-type">bool</span> |  | If `true`, focus will be locked. |

The component cannot hold a ref.


