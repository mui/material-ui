# Density

<p class="description">Apply consistent, adjustable sizing across Material UI components.</p>

Material UI's default sizes follow the Material Design guidelines, which are comfortable by design. Data-dense interfaces—dashboards, admin consoles, design tools—usually need something tighter, and some products need something roomier.

At the defaults, sizes are also set per component rather than from a shared scale, so controls of the same size don't line up: a medium Button is 36.5px tall next to a 40px IconButton, a 42px Checkbox, a 48px ToggleButton, and a 56px outlined TextField.

Starting from v9.5, Material UI provides `enhanceDensity`, an opt-in theme enhancer that maps every component onto one shared spacing scale. Same-size controls end up on the same box, and one scale controls the whole set.

## Usage

Apply `enhanceDensity` to a theme and pass the result to `ThemeProvider`:

```js
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';

const theme = enhanceDensity(createTheme());

function App() {
  return <ThemeProvider theme={theme}>{/* ... */}</ThemeProvider>;
}
```

Each annotation names the value behind that dimension. Turn the enhancer off to see the same button on its own built-in numbers:

{{"demo": "EnhanceDensityDemo.js"}}

Every component's spacing and sizing now comes from the scale, and medium-size controls share a touch-target size. Components with a `size` prop keep their small and large options; those sizes move to neighboring steps of the same scale, so they stay coherent with each other.

Spacing between children moves to the container as well: wherever the layout allows, per-child margins are cleared in favor of a `gap` on the parent—the button above sets one `gap` instead of the margin pair its icon carries by default. That leaves one value to override, and it holds up when you change the padding around it or when a child doesn't render.

:::info
`enhanceDensity` changes nothing until you call it. A theme that doesn't go through the enhancer renders exactly as it does today.
:::

## The spacing scale

The scale is a set of named steps. `enhanceDensity` adds them to the theme's spacing surface—there's no new theme node to learn:

| Step       | Default value | Typical use                           |
| :--------- | :------------ | :------------------------------------ |
| `xx-small` | 4px           | Icon-to-label gaps, tight insets      |
| `x-small`  | 8px           | Compact padding, small control insets |
| `small`    | 12px          | Default inline padding                |
| `medium`   | 16px          | Container padding                     |
| `large`    | 24px          | Section spacing, small control height |
| `x-large`  | 32px          | Large control height                  |
| `xx-large` | 48px          | Large surfaces                        |

One more value sits outside the ladder: **`touch-target`**, the 32px box that medium-size interactive controls converge on. It sizes controls rather than spacing them, so it is emitted as a plain length—it is not a spacing step, has no CSS variable, and `theme.spacing()` doesn't resolve it. It is still yours to move, through the same override object described below: raise it for touch-first products, lower it for data tools.

### Augmented `theme.spacing()`

`enhanceDensity` augments [`theme.spacing()`](/material-ui/customization/spacing/) so it resolves step names in addition to the numbers and raw CSS values it already accepts:

```js
const theme = enhanceDensity(createTheme());

theme.spacing(2); // '16px' — unchanged
theme.spacing('small'); // '12px'
theme.spacing('-x-small'); // '-8px' — a leading dash negates the step
theme.spacing('small', 'medium'); // '12px 16px' — steps work in every argument
```

The step names surface in TypeScript autocompletion. Numbers and raw CSS strings keep their current output, so existing `theme.spacing()` calls, `sx` spacing props, and `gap` values are unaffected.

### CSS variables

On a theme created with [CSS theme variables](/material-ui/customization/css-theme-variables/overview/), the steps also ship as CSS variables, and `theme.spacing()` returns a reference to them:

```js
const theme = enhanceDensity(createTheme({ cssVariables: true }));

theme.spacing('small'); // 'var(--mui-spacing-small)'
```

This means the scale can be read—and overridden—from plain CSS:

```css
.dense-region {
  --mui-spacing-medium: 12px;
}
```

## Customizing the scale

Pass an object as the second argument to override any step. Each step is a number of pixels:

```js
const theme = enhanceDensity(createTheme(), { 'touch-target': 40 });
```

Steps you don't list keep their default value, and every component that uses the overridden step reflows with it.

### Density recipes

There are no built-in density modes. A denser or roomier product overrides the whole scale, which keeps the steps proportional to each other. Copy one of these recipes and adjust it:

```js
// Compact — for data-dense interfaces.
const compact = {
  'xx-small': 2,
  'x-small': 4,
  small: 8,
  medium: 12,
  large: 16,
  'x-large': 24,
  'xx-large': 32,
  'touch-target': 24,
};

const theme = enhanceDensity(createTheme(), compact);
```

```js
// Comfortable — for touch-first interfaces.
const comfortable = {
  'xx-small': 8,
  'x-small': 12,
  small: 16,
  medium: 24,
  large: 32,
  'x-large': 48,
  'xx-large': 64,
  'touch-target': 44,
};

const theme = enhanceDensity(createTheme(), comfortable);
```

:::success
Keep the recipe in its own module and import it wherever the values are needed. Sibling packages that read the same scale—and your own components—stay in sync with the theme when they share one object.
:::

## Using the scale in your own styles

The spacing props of the [`sx` prop](/material-ui/customization/how-to-customize/#the-sx-prop) accept the step names directly, so custom layout matches the built-in components:

```jsx
<Box sx={{ p: 'small', gap: 'x-small' }} />
```

This covers every spacing prop—`p`, `m`, their per-side and axis forms, and `gap`—including responsive values. A leading dash negates the step:

```jsx
<Box sx={{ px: { xs: 'small', md: 'large' }, mt: '-x-small' }} />
```

Numbers keep their current meaning as multipliers of the spacing unit, and any other string is still passed through as raw CSS:

```jsx
<Box sx={{ p: 2, m: 'auto', width: '50%' }} />
```

Only the spacing props read the step names. Every other CSS property takes them through `theme.spacing()`, which works anywhere and offers the names in autocompletion:

```jsx
<Box
  sx={(theme) => ({
    height: theme.spacing('x-large'),
    top: theme.spacing('small'),
  })}
/>
```

The steps are also available in theme component overrides:

```js
const theme = enhanceDensity(
  createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({ padding: theme.spacing('medium') }),
        },
      },
    },
  }),
);
```

Because `styleOverrides` callbacks resolve at render time, they read the enhanced theme even though they're declared in the `createTheme()` call that runs first.

## Density with component props

Several components accept props that reduce their size individually. This was the only built-in approach before `enhanceDensity`, and it remains available:

- `size="small"` on [Button](/material-ui/api/button/), [Fab](/material-ui/api/fab/), [IconButton](/material-ui/api/icon-button/), and [Table](/material-ui/api/table/)
- `margin="dense"` on [FilledInput](/material-ui/api/filled-input/), [FormControl](/material-ui/api/form-control/), [FormHelperText](/material-ui/api/form-helper-text/), [InputBase](/material-ui/api/input-base/), [InputLabel](/material-ui/api/input-label/), [OutlinedInput](/material-ui/api/outlined-input/), and [TextField](/material-ui/api/text-field/)
- `dense` on [ListItem](/material-ui/api/list-item/)
- `variant="dense"` on [Toolbar](/material-ui/api/toolbar/)

Setting these as `defaultProps` applies them across an application, but it covers only these components, offers a single step in one direction, and leaves the rest of the library at its default sizes.

The tool below applies that approach to the documentation so you can see how far it goes:

{{"demo": "DensityTool.js", "hideToolbar": true}}

:::warning
The theme this tool applies is for demonstration only. The Material Design guidelines have a [comprehensive guide](https://m2.material.io/design/layout/applying-density.html) on when density is and isn't appropriate.
:::

## Caveats

### Apply the enhancer last

`enhanceDensity` reads the finished theme, so it must run after everything else is composed. Theme-level typography, `shape.borderRadius`, and the spacing base are ordinary `createTheme()` inputs, and they belong in the call that the enhancer receives:

```js
// ✅ the enhancer runs on the composed theme
const theme = enhanceDensity(
  createTheme({ cssVariables: true, palette: { mode: 'dark' } }),
);

// ❌ a later createTheme() call rebuilds the theme and drops the scale
const broken = createTheme({ ...theme, palette: { mode: 'dark' } });
```

To change a theme after enhancing it, recompose the original options and enhance again.

### Custom sizes keep their own values

The scale covers each component's built-in sizes. Sizes added through the theme—custom `variants` with their own dimensions—keep whatever values they declare.
