# Focus visible

<p class="description">Apply an outline keyboard focus across Material�UI components with a single theme option.</p>

Starting from v9.x, Material UI provides built-in support for enabling a basic keyboard focus indicator through CSS.

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

These components render the focus indicator from the inside to avoid `overflow`-clipped container or overlapping with other elements:

- `Tab`
- `MenuItem`
- `ListItemButton`
- `CardActionArea`
- `BottomNavigationAction`
- `Checkbox`
- `Radio`

This is handled automatically; no extra configuration is needed.

## Customization

The `focusVisible` can be customized by passing a CSS object to merge with the default styles, here are some common scenarios:

### Changing the outline color

To customize the outline, for example changing the color, pass an object with specified outline color to the `focusVisible` node to merge with the default outline styles:

```js
// Recolor only; width and offset stay at the curated 2px.
createTheme({ focusVisible: { outlineColor: '#9c27b0' } });
```

### Use box-shadow as a second layer

A `boxShadow` can be **additive** on top of the outline. This is useful for a two-color ring (WCAG technique [C40](https://www.w3.org/WAI/WCAG21/Techniques/css/C40)) that stays visible on any background.

To make the `boxShadow` flip for the inner focus indicator components, use `focusVisibleVars.behavior` from the styles:

```js
import { focusVisibleVars } from '@mui/material/styles';

createTheme({ focusVisible: { boxShadow: `${focusVisibleVars.behavior} 0 0 0 4px rgba(0, 0, 0, 0.4)` } });
```

:::info
The `focusVisible` node will override the component's default focus visible styles, for example, the Button elevation when focus visible will be replaced by the box-shadow specified above.
:::

### Replace outline with box-shadow

To replace the outline entirely with box-shadow indicator, set `outline: 'none'`:

```js
import { focusVisibleVars } from '@mui/material/styles';

createTheme({
  focusVisible: { outline: 'none', boxShadow: `${focusVisible.behavior} 0 0 0 3px #1976d2` },
});
```

{{"demo": "FocusVisibleCustomization.js"}}

## API



