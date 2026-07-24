# Focus visible

<p class="description">Configure a theme option to apply an outline keyboard focus across Material UI components.</p>

Starting from v9.x, Material UI provides built-in support for visual keyboard focus indicator through CSS. The demos on this page opt out of the ripple to show only the focus visible indicator.

## Usage

Set `focusVisible: true` on the theme to render a default focus indicator on every [ButtonBase](/material-ui/api/button-base/)-derived component when it receives **keyboard** focus:

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({ focusVisible: true });
```

The default focus indicator is a two-pixel solid outline with `palette.primary.main` color, offset by two pixels:

{{"demo": "FocusVisibleDefault.js"}}

:::info

Why an outline

CSS `outline` is the most common indicator found in the web standard that works in most environment including high-contrast color mode.
:::

### Inner focus indicator

Some components, for example `Tab`, render the focus indicator from the inside to avoid `overflow`-clipped container or overlapping with other elements.

{{"demo": "FocusVisibleInner.js"}}

To see the full list of components that show inner focus indicator, check out the [full demo](#full-focus-visible-demo) below.

## Customization

The `focusVisible` can be customized by passing a CSS object to merge with the default styles.

### Changing the outline color

To customize the outline, for example changing the color, pass an object with specified outline color to the `focusVisible` node to merge with the default outline styles:

```js
// Recolor only; width and offset stay at the curated 2px.
createTheme({ focusVisible: { outlineColor: '#9c27b0' } });
```

{{"demo": "FocusVisibleRecolor.js"}}

### Use box-shadow as a second layer

A `boxShadow` can be **additive** on top of the outline. This is useful for a two-color ring (WCAG technique [C40](https://www.w3.org/WAI/WCAG21/Techniques/css/C40)) that stays visible on any background. Material UI insets the box-shadow automatically on the inner focus indicator components, so a plain value works everywhere:

```js
createTheme({
  focusVisible: {
    boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.4)',
  },
});
```

:::info
The `focusVisible` node will override the component's default focus visible styles, for example, the Button elevation when focus visible will be replaced by the box-shadow specified above.
:::

{{"demo": "FocusVisibleBoxShadow.js"}}

### Replace outline with box-shadow

To replace the outline entirely with box-shadow indicator, set `outline: 'none'`:

```js
createTheme({
  focusVisible: {
    outline: 'none',
    boxShadow: '0 0 0 3px #1976d2',
  },
});
```

## Full focus visible demo

The complete set of components that render the focus indicator when `focusVisible` is enabled. Use the keyboard (<kbd>Tab</kbd> and arrow keys) to move focus and reveal the ring.

{{"demo": "FullFocusVisibleDemo.js"}}
