---
filename: /packages/material-ui/src/RootRef/RootRef.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# RootRef API

<p class="description">The API documentation of the RootRef React component. Learn more about the properties and the CSS customization points.</p>

```js
import RootRef from '@material-ui/core/RootRef';
```

⚠️⚠️⚠️
If you want the DOM element of a Material-UI component check out
[/getting-started/faq/#how-can-i-access-the-dom-element](FAQ: How can I access the DOM element?)
first.

This component uses `findDOMNode` which is deprecated in React.StrictMode.

Helper component to allow attaching a ref to a
wrapped element to access the underlying DOM element.

It's highly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
For example:
```jsx
import React from 'react';
import RootRef from '@material-ui/core/RootRef';

class MyComponent extends React.Component {
  constructor() {
    super();
    this.domRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.domRef.current); // DOM node
  }

  render() {
    return (
      <RootRef rootRef={this.domRef}>
        <SomeChildComponent />
      </RootRef>
    );
  }
}
```

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">element</span> |  | The wrapped element. |
| <span class="prop-name required">rootRef&nbsp;*</span> | <span class="prop-type">union:&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> |  | Provide a way to access the DOM node of the wrapped element. You can provide a callback ref or a `React.createRef()` ref. |

The component cannot hold a ref.


## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

