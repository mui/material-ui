# Default theme viewer

<p class="description">Here's what the theme object looks like with the default values.</p>

:::warning
This is a work in progress. We're still iterating on Joy UI's default theme.
:::

## Explore

Explore the default theme:

{{"demo": "JoyDefaultTheme.js", "hideToolbar": true, "bg": "inline"}}

## Preview

The tables below gives you a quick preview of the default theme properties that are involved in `light` and `dark` color schemes.

### Palette

The tokens are generated from `theme.colorSchemes.(light|dark).*` and attached to `theme.vars.*`.

{{"demo": "PaletteThemeViewer.js"}}

To customize the theme palette, see [theme tokens customization](/joy-ui/customization/theme-tokens/) page.

### Shadow

The tokens can be accessed from `theme.vars.shadow.{token}`.

{{"demo": "ShadowThemeViewer.js"}}

To customize the theme shadow, see [theme tokens customization](/joy-ui/customization/theme-tokens/) page.

### Typography

Joy UI provides 13 built-in typography levels that can be accessed from `theme.typography.{level}`.

You can hover on each cell to see the value preview.

{{"demo": "TypographyThemeViewer.js"}}

To customize the theme typography, see [theme typography customization](/joy-ui/customization/theme-typography/) page.
