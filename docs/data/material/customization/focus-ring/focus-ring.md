# Focus ring

<p class="description">Apply a consistent keyboard focus ring across Material UI components with a single theme option.</p>

## Enabling the focus ring

Set `focusRing: true` on the theme to render a curated focus ring on every [ButtonBase](/material-ui/api/button-base/)-derived component when it receives **keyboard** focus (`:focus-visible`):

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({ focusRing: true });
```

The curated default is a two-pixel solid outline in the palette's primary color, offset by two pixels:

```js
{
  outlineStyle: 'solid',
  outlineColor: theme.palette.primary.main,
  outlineWidth: 2,
  outlineOffset: 2,
}
```

{{"demo": "FocusRingDefault.js"}}

The ring is **opt-in** and non-breaking: when `focusRing` is `undefined` or `false`, nothing changes.

## Why an outline

The ring uses the CSS `outline` property rather than `box-shadow` on purpose. Several components — notably contained `Button` and `Fab` — animate their own `box-shadow` on focus, so a shadow-based ring would collide with them. An outline is orthogonal to those styles, so the same ring renders consistently across the whole component set.

## Customizing the ring

Pass an object instead of `true`. It is **merged over** the curated default, so you only specify what changes — the geometry is kept unless you override it:

```js
// Recolor only; width and offset stay at the curated 2px.
createTheme({ focusRing: { outlineColor: '#9c27b0' } });
```

A `boxShadow` is **additive** on top of the outline. This is useful for a two-color ring (WCAG technique [C40](https://www.w3.org/WAI/WCAG21/Techniques/css/C40)) that stays visible on any background:

```js
createTheme({ focusRing: { boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.4)' } });
```

To remove the outline entirely and supply your own indicator, set `outlineColor: 'transparent'`:

```js
createTheme({
  focusRing: { outlineColor: 'transparent', boxShadow: '0 0 0 3px #1976d2' },
});
```

{{"demo": "FocusRingCustomization.js"}}

:::warning
A **box-shadow-only** ring (outline removed) is unreliable on `Button` and `Fab`: they manage their own focus `box-shadow`, which overrides yours. Keep the outline as the baseline on those components.
:::

## Components inside scrollable containers

Components that typically live inside a scrollable or `overflow`-clipped container — `Tab`, `MenuItem`, `ListItemButton`, `CardActionArea`, and `BottomNavigationAction` — draw the ring **inset** (a negative offset) so the container edge can't clip it. This is handled automatically; no extra configuration is needed.

## Dark mode

When CSS theme variables are enabled, the curated color resolves through the palette CSS variable, so the ring stays correct after a light/dark switch without re-rendering.

## API

- [`createTheme`](/material-ui/customization/theming/#createtheme-options-args-theme)
