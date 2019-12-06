---
filename: /packages/material-ui-lab/src/AvatarGroup/AvatarGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# AvatarGroup API

<p class="description">The API documentation of the AvatarGroup React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import AvatarGroup from '@material-ui/lab/AvatarGroup';
// or
import { AvatarGroup } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The avatars to stack. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiAvatarGroup`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiAvatarGroup-root</span> | Styles applied to the root element.
| <span class="prop-name">avatar</span> | <span class="prop-name">.MuiAvatarGroup-avatar</span> | Styles applied to the avatar elements.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/AvatarGroup/AvatarGroup.js) for more detail.

## Demos

- [Avatars](/components/avatars/)

