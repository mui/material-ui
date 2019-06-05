---
filename: /packages/material-ui/src/ListItemText/ListItemText.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemText API

<p class="description">The API documentation of the ListItemText React component. Learn more about the properties and the CSS customization points.</p>

```js
import ListItemText from '@material-ui/core/ListItemText';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | Alias for the `primary` property. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableTypography</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the children won't be wrapped by a Typography component. This can be useful to render an alternative Typography variant by wrapping the `children` (or `primary`) text, and optional `secondary` text with the Typography component. |
| <span class="prop-name">inset</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the children will be indented. This should be used if there is no left avatar or left icon. |
| <span class="prop-name">primary</span> | <span class="prop-type">node</span> |  | The main content element. |
| <span class="prop-name">primaryTypographyProps</span> | <span class="prop-type">object</span> |  | These props will be forwarded to the primary typography component (as long as disableTypography is not `true`). |
| <span class="prop-name">secondary</span> | <span class="prop-type">node</span> |  | The secondary content element. |
| <span class="prop-name">secondaryTypographyProps</span> | <span class="prop-type">object</span> |  | These props will be forwarded to the secondary typography component (as long as disableTypography is not `true`). |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">multiline</span> | Styles applied to the `Typography` components if primary and secondary are set.
| <span class="prop-name">dense</span> | Styles applied to the `Typography` components if dense.
| <span class="prop-name">inset</span> | Styles applied to the root element if `inset={true}`.
| <span class="prop-name">primary</span> | Styles applied to the primary `Typography` component.
| <span class="prop-name">secondary</span> | Styles applied to the secondary `Typography` component.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItemText/ListItemText.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiListItemText`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Lists](/components/lists/)

