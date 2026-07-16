# Material UI CSS build tools

`@mui/material-css-tools` contains build-time adapters for the Material UI package variant
whose components import their own CSS Modules. Use this package when an application needs
Material UI component media queries to follow custom theme breakpoints.

These tools are not required when using the default breakpoint values. For that path, import
the precompiled aggregate stylesheet once:

```tsx
import '@mui/material/styles.css';
```

## Choose a setup

| Requirement                                             | Setup                                                                               |
| :------------------------------------------------------ | :---------------------------------------------------------------------------------- |
| Default MUI breakpoints and minimal build configuration | Import `@mui/material/styles.css`                                                   |
| Custom breakpoints with Vite and Lightning CSS          | Use `muiMaterialCssModules()` and the Vite `muiCustomMedia()` adapter               |
| Custom breakpoints with PostCSS                         | Use `muiMaterialCssModules()` and the PostCSS adapter before `postcss-custom-media` |
| Custom bundler integration                              | Use `generateBreakpointCustomMedia()` or `getBreakpointCustomMediaDefinitions()`    |

Do not import `@mui/material/styles.css` when using the CSS Modules package variant. The
aggregate file contains the same component styles and would duplicate them.

## Breakpoint theme

The adapters receive a Material UI theme during the application build. Use the same
breakpoint options for this theme and for the theme used by the application:

```ts
import { createTheme } from '@mui/material/styles';

const breakpointOptions = {
  values: { xs: 0, sm: 720, md: 900, lg: 1200, xl: 1536 },
};

export const theme = createTheme({ breakpoints: breakpointOptions });
```

For an Emotion or runtime `CssThemeProvider` application, pass the same options to its runtime
theme. For a statically generated theme, use the same options when generating the theme CSS.

Breakpoint media queries are compiled during the application build. One set of breakpoint
values applies to the whole CSS build, so nested themes cannot use different breakpoint
values. Nested palette, typography, and other CSS variable overrides are unaffected.

## Vite with Lightning CSS

Use this setup for Vite applications that process CSS with Lightning CSS:

```ts
import { defineConfig } from 'vite';
import { Features } from 'lightningcss';
import { muiCustomMedia, muiMaterialCssModules } from '@mui/material-css-tools/vite';
import { theme } from './src/theme';

export default defineConfig({
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: { customMedia: true },
      include: Features.CustomMediaQueries,
    },
  },
  plugins: [muiMaterialCssModules(), muiCustomMedia({ theme })],
});
```

`muiMaterialCssModules()` maps normal imports such as `@mui/material/Slider` to the parallel
`@mui/material/css-modules/Slider` export. The Vite `muiCustomMedia()` adapter injects the
theme's custom-media declarations before Lightning CSS resolves them.

Applications that do not want the resolver can import the parallel entry explicitly:

```tsx
import Slider from '@mui/material/css-modules/Slider';
```

## Vite with PostCSS

Install and configure `postcss-custom-media`, then place the MUI adapter before it:

```ts
import { defineConfig } from 'vite';
import postcssCustomMedia from 'postcss-custom-media';
import muiCustomMedia from '@mui/material-css-tools/postcss';
import { muiMaterialCssModules } from '@mui/material-css-tools/vite';
import { theme } from './src/theme';

export default defineConfig({
  css: {
    postcss: {
      plugins: [muiCustomMedia({ theme }), postcssCustomMedia()],
    },
  },
  plugins: [muiMaterialCssModules()],
});
```

The PostCSS adapter adds only the aliases referenced by each independently processed CSS
file. This matters because declarations in one CSS Module are not automatically visible to
another CSS Module.

The PostCSS adapter is bundler-independent. With another bundler, configure it in that
bundler's PostCSS pipeline and select the `@mui/material/css-modules/*` entries through
explicit imports or an equivalent package alias.

## Lower-level helpers

### `generateBreakpointCustomMedia(theme, options?)`

Returns a CSS string containing all `@custom-media` declarations for the theme:

```ts
import { generateBreakpointCustomMedia } from '@mui/material-css-tools';

const css = generateBreakpointCustomMedia(theme);
```

Use this when a custom CSS pipeline combines definitions and component CSS before resolving
custom media, or when the processor supports importing shared custom-media definitions. For
independently processed CSS Modules, prefer the adapters because they inject declarations in
the correct compilation context.

### `getBreakpointCustomMediaDefinitions(theme, options?)`

Returns structured `{ name, query }` objects. This is intended for adapter and bundler plugin
authors that need to inject declarations through an API instead of generating a CSS string.

Both helpers accept an optional `prefix`. Material UI component CSS uses the default
`--mui-breakpoint` prefix, so application integrations should normally leave it unchanged.

## Tailwind CSS

The package also translates a Material UI theme into the configuration format expected by
Tailwind. Create the theme with `@mui/material/styles`, then pass it to the adapter matching your
Tailwind version. This keeps Material UI component breakpoints and Tailwind responsive utilities
aligned.

### Tailwind v3

Use the generated object as a preset in `tailwind.config.*`:

```js
const { createTailwindPreset } = require('@mui/material-css-tools');
const { createTheme } = require('@mui/material/styles');

const theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 720, md: 900, lg: 1200, xl: 1536 } },
});

module.exports = {
  presets: [createTailwindPreset(theme)],
};
```

### Tailwind v4

Generate CSS containing `@theme` tokens, utilities, and MUI state variants:

```ts
import { generateTailwindThemeCss } from '@mui/material-css-tools';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 720, md: 900, lg: 1200, xl: 1536 } },
});

const tailwindThemeCss = generateTailwindThemeCss(theme);
```

Write the returned string to a CSS file included by the Tailwind build. These helpers run during
configuration or build time; they are not required in the browser bundle.

## Post-PoC

Potential follow-up work includes a standalone Lightning CSS adapter and package-resolution
adapters for bundlers other than Vite. A processor-independent API could expose the internal
custom-media preparation step so other integrations can inject only the breakpoint aliases used
by each CSS file. CSS processing and selection of the `@mui/material/css-modules/*` package
variant should remain separate concerns.
