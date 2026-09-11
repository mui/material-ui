# Density

<p class="description">Apply consistent, adjustable sizing across Material UI components.</p>

Material UI's default sizes follow the Material Design guidelines, which are comfortable by design. Data-dense interfaces—dashboards, admin consoles, design tools—usually need something more compact, and some products need something more spacious.

Each component also sets its own sizes instead of following a shared scale. There's no single way to change the density of the whole library, and controls that should be the same height often aren't.

Starting from v9.5, Material UI provides `enhanceDensity`, an opt-in theme enhancer that maps every component onto one shared spacing scale. Same-size controls end up on the same box, and one scale controls the whole set.

## Usage

Apply `enhanceDensity` to a theme and pass the result to `ThemeProvider`, components under the provider will start using the new scale:

```js
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';

const theme = enhanceDensity(createTheme());

function App() {
  return <ThemeProvider theme={theme}>{/* ... */}</ThemeProvider>;
}
```

The demo below demonstrates the effect of `enhanceDensity` on a Button between sizes.

With the enhancer, the Button's CSS implementation switches from raw pixel values to the new spacing scale and the `touchTarget` size.

{{"demo": "EnhanceDensityDemo.js"}}

The enhancer also modernizes components like Button that use the margin-based spacing between children to use the `gap` property instead. This makes the component more resilient and easier to customize.

:::info
`enhanceDensity` is fully opt-in: themes that skip the enhancer render exactly as they did before.
:::

## Benefits

### Consistent sizing

The enhancer lets you set 2 target sizes:

- `touchTarget`: applied to every interactive control to create consistent sizing across the library.
- `iconSize`: applied to the `SvgIcon` component.

```ts
const theme = enhanceDensity(createTheme(), {
  touchTarget: 40,
  iconSize: 20,
});
```

{{"demo": "TouchTargetDemo.js"}}

### Spacing scale

Every component draws its spacing and sizing from one fixed set of steps, so nothing is sized on its own terms and values that should match do match:

| Step      | Default value | Typical use                           |
| :-------- | :------------ | :------------------------------------ |
| `xxSmall` | 4px           | Icon-to-label gaps, tight insets      |
| `xSmall`  | 8px           | Compact padding, small control insets |
| `small`   | 12px          | Default inline padding                |
| `medium`  | 16px          | Container padding                     |
| `large`   | 24px          | Section spacing, small control height |
| `xLarge`  | 32px          | Large control height                  |
| `xxLarge` | 48px          | Large surfaces                        |

The scale rides the spacing API you already use—there's no new function to learn and no new theme node. [`theme.spacing()`](/material-ui/customization/spacing/) resolves step names alongside the numbers and raw CSS values it already accepts, and a leading dash negates a step:

```js
const theme = enhanceDensity(createTheme());

theme.spacing('small'); // '12px'
theme.spacing('-xSmall'); // '-8px'

<Box sx={{ p: 'small', gap: 'xSmall' }} />;
// .Box-hashed-class { padding: 12px; gap: 8px; }
```

:::warning
Put your own `styleOverrides` in the theme **before** calling `enhanceDensity` — your overrides stay the winning layer. Composing them afterwards with `createTheme(enhancedTheme, { components: ... })` replaces each overridden slot wholesale (array values are not merged), silently dropping that slot's density emission.
:::

To use the scale in your theme component overrides, write a callback that receives the theme and calls `theme.spacing(<scale>)`:

```js
const customTheme = enhanceDensity(
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

### CSS variables support

On a theme created with [CSS theme variables](/material-ui/customization/css-theme-variables/overview/), the steps also ship as global CSS variables, and `theme.spacing()` returns a reference to them, with the computed value as a fallback:

```js
const theme = enhanceDensity(createTheme({ cssVariables: true }));

theme.spacing('small'); // 'var(--mui-spacing-small, calc(1.5 * var(--mui-spacing, 8px)))'

// A step given an explicit value falls back to that length:
const dense = enhanceDensity(createTheme({ cssVariables: true }), { small: 8 });

dense.spacing('small'); // 'var(--mui-spacing-small, 8px)'
```

This means the scale can be read—and overridden—from plain CSS, including for one region of the page:

```css
.dense-region {
  --mui-spacing-medium: 12px;
}
```

Only the ladder steps ship as CSS variables. The sizing constants (`touchTarget`, `iconSize`) are emitted as literal px, so control boxes don't follow a CSS-only override — moving them requires the `scale` argument.

## All components

`enhanceDensity` applies to all components. Select a component in the demo below to see how its dimensions map to the spacing scale: the padding ring, the gap between children, and the height the control settles at, each measured off the rendered element and named back to the step that produced it.

{{"demo": "AllComponentsDemo.js"}}

## Customizing the scale

To override the default steps, pass a second argument to `enhanceDensity`. If the object is a partial scale, the missing steps keep their default values.

Below is an example of a full scale overrides for a very dense application:

```js
const theme = enhanceDensity(createTheme(), {
  xxSmall: 2,
  xSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  xLarge: 24,
  xxLarge: 32,
  touchTarget: 24,
  iconSize: 14,
});
```

The scale is a closed set of seven steps, plus the two targets. The values must be numbers, which are interpreted as pixels.

:::warning
The enhancer does not support a custom scale that adds new steps or removes existing ones. The seven steps and two targets are fixed.
:::

## Density recipes

This recipe demonstrates a design system that needs multiple densities to support various context of applications. The densities are defined as low/medium/high, each with its own set of spacing values and target sizes — everything else stays on the default theme.

Use the density select at the top to see the differences between each density. To see the actual values of each density, click the "Show code" and find the `./densityRecipes.ts` file.

{{"demo": "DensityRecipesDemo.js"}}
