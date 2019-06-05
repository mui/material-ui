---
filename: /packages/material-ui/src/NoSsr/NoSsr.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# NoSsr API

<p class="description">The API documentation of the NoSsr React component. Learn more about the properties and the CSS customization points.</p>

```js
import NoSsr from '@material-ui/core/NoSsr';
```

NoSsr purposely removes components from the subject of Server Side Rendering (SSR).

This component can be useful in a variety of situations:
- Escape hatch for broken dependencies not supporting SSR.
- Improve the time-to-first paint on the client by only rendering above the fold.
- Reduce the rendering time on the server.
- Under too heavy server load, you can turn on service degradation.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | You can wrap a node. |
| <span class="prop-name">defer</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component will not only prevent server-side rendering. It will also defer the rendering of the children into a different screen frame. |
| <span class="prop-name">fallback</span> | <span class="prop-type">node</span> | <span class="prop-default">null</span> | The fallback content to display. |

The component cannot hold a ref.


## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [No Ssr](/components/no-ssr/)

