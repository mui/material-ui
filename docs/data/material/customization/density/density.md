# Density

<p class="description">Apply consistent, adjustable sizing across Material UI components.</p>

Material UI's default sizes follow the Material Design guidelines, which are comfortable by design. Data-dense interfaces—dashboards, admin consoles, design tools—usually need something tighter, and some products need something roomier.

At the defaults, sizes are also set per component rather than from a shared scale, so controls of the same size don't line up: a medium Button is 36.5px tall next to a 40px IconButton, a 42px Checkbox, a 48px ToggleButton, and a 56px outlined TextField.

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

With the enhancer, the Button's CSS implementation switches from raw pixel values to the new spacing scale and the touch-target size.

{{"demo": "EnhanceDensityDemo.js"}}

The enhancer also modernizes components like Button that use the margin-based spacing between children to use the `gap` property instead. This makes the component more resilient and easier to customize.

:::info
`enhanceDensity` changes nothing until you call it. A theme that doesn't go through the enhancer renders exactly as it does today.
:::

## Benefits

### Consistent sizing

The enhancer lets you set 2 target sizes:

- the touch-target size: apply to every interactive control to create consistent sizing across the library.
- the icon-target size: apply to the `SvgIcon` component.

```ts
const theme = enhanceDensity(createTheme(), {
  'touch-target': 40,
  'icon-target': 20,
});
```

{{"demo": "TouchTargetDemo.js"}}

### Spacing scale

Every component draws its spacing and sizing from one fixed set of steps, so nothing is sized on its own terms and values that should match do match:

| Step       | Default value | Typical use                           |
| :--------- | :------------ | :------------------------------------ |
| `xx-small` | 4px           | Icon-to-label gaps, tight insets      |
| `x-small`  | 8px           | Compact padding, small control insets |
| `small`    | 12px          | Default inline padding                |
| `medium`   | 16px          | Container padding                     |
| `large`    | 24px          | Section spacing, small control height |
| `x-large`  | 32px          | Large control height                  |
| `xx-large` | 48px          | Large surfaces                        |

The scale rides the spacing API you already use—there's no new function to learn and no new theme node. [`theme.spacing()`](/material-ui/customization/spacing/) resolves step names alongside the numbers and raw CSS values it already accepts, and a leading dash negates a step:

```js
const theme = enhanceDensity(createTheme());

theme.spacing('small'); // '12px'
theme.spacing('-x-small'); // '-8px'

<Box sx={{ p: 'small', gap: 'x-small' }} />;
// .Box-hashed-class { padding: 12px; gap: 8px; }
```

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

On a theme created with [CSS theme variables](/material-ui/customization/css-theme-variables/overview/), the steps also ship as global CSS variables, and `theme.spacing()` returns a reference to them:

```js
const theme = enhanceDensity(createTheme({ cssVariables: true }));

theme.spacing('small'); // 'var(--mui-spacing-small)'
```

This means the scale can be read—and overridden—from plain CSS, including for one region of the page:

```css
.dense-region {
  --mui-spacing-medium: 12px;
}
```

## All components density

`enhanceDensity` is not a Button feature — one call maps every component in the library onto the same scale. Pick a component below to see the boxes it lands on: the padding ring, the gap between children, and the height the control settles at, each measured off the rendered element and named back to the step that produced it.

{{"demo": "AllComponentsDemo.js"}}

## Customizing the scale

To override the default steps, pass a second argument to `enhanceDensity`. If the object is a partial scale, the missing steps keep their default values.

Below is an example of a full scale overrides for a very dense application:

```js
const theme = enhanceDensity(createTheme(), {
  'xx-small': 2,
  'x-small': 4,
  small: 8,
  medium: 12,
  large: 16,
  'x-large': 24,
  'xx-large': 32,
  'touch-target': 24,
  'icon-target': 14,
});
```

The scale is a closed set of seven steps, plus the two targets. The values must be numbers, which are interpreted as pixels.

:::info
The enhancer does not support a custom scale that adds new steps or removes existing ones. The seven steps and two targets are fixed.
:::

## Density recipes

This recipe demonstrates a design system that needs multiple densities to support various context of applications. The densities are defined as low/medium/high, each with its own set of spacing values, typography scale, and border radius.

Switch between toggle buttons at the top to see the differences between each density. To see the actual values of each density, click the "Show code" and find the `./densityRecipes.ts` file.

{{"demo": "DensityRecipesDemo.js"}}
