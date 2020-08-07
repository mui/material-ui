---
filename: /packages/material-ui/src/RootRef/RootRef.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# RootRef API

<p class="description">The API documentation of the RootRef React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import RootRef from '@material-ui/core/RootRef';
// or
import { RootRef } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

⚠️⚠️⚠️
If you want the DOM element of a Material-UI component check out
[FAQ: How can I access the DOM element?](/getting-started/faq/#how-can-i-access-the-dom-element)
first.

This component uses `findDOMNode` which is deprecated in React.StrictMode.

Helper component to allow attaching a ref to a
wrapped element to access the underlying DOM element.

It's highly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
For example:
```jsx
import React from 'react';
import RootRef from '@material-ui/core/RootRef';

function MyComponent() {
  const domRef = React.useRef();

  React.useEffect(() => {
    console.log(domRef.current); // DOM node
  }, []);

  return (
    <RootRef rootRef={domRef}>
      <SomeChildComponent />
    </RootRef>
  );
}
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">element</span> |  | The wrapped element. |
| <span class="prop-name required">rootRef<abbr title="required">*</abbr></span> | <span class="prop-type">refType.isRequired</span> |  | A ref that points to the first DOM node of the wrapped element. |

The component cannot hold a ref.


