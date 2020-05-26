---
filename: /packages/material-ui/src/Unstable_TrapFocus/TrapFocus.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TrapFocus API

<p class="description">The API documentation of the TrapFocus React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TrapFocus from '@material-ui/core/Unstable_TrapFocus/TrapFocus.js/TrapFocus';
// or
import { TrapFocus } from '@material-ui/core/Unstable_TrapFocus/TrapFocus.js';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Utility component that locks focus inside the component.



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">element</span> |  | A single child content element. |
| <span class="prop-name">disableAutoFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not automatically shift focus to itself when it opens, and replace it to the last focused element when it closes. This also works correctly with any modal children that have the `disableAutoFocus` prop.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableEnforceFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not prevent focus from leaving the modal while open.<br>Generally this should never be set to `true` as it makes the modal less accessible to assistive technologies, like screen readers. |
| <span class="prop-name">disableRestoreFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the modal will not restore focus to previously focused element once modal is hidden. |
| <span class="prop-name required">getDoc&nbsp;*</span> | <span class="prop-type">func</span> |  | Return the document to consider. We use it to implement the restore focus between different browser documents. |
| <span class="prop-name required">isEnabled&nbsp;*</span> | <span class="prop-type">func</span> |  | Do we still want to enforce the focus? This prop helps nesting TrapFocus elements. |
| <span class="prop-name required">open&nbsp;*</span> | <span class="prop-type">bool</span> |  | If `true`, the modal is open. |

The component cannot hold a ref.

Any other props supplied will be provided to the root element (native element).

