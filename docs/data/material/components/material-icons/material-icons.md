---
productId: material-ui
components: Icon, SvgIcon
materialDesign: https://m2.material.io/design/iconography/system-icons.html
packageName: '@mui/icons-material'
githubLabel: 'package: icons'
---

# Material Icons

<p class="description">2,100+ ready-to-use React Material Icons.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Introduction

The [`@mui/icons-material`](https://www.npmjs.com/package/@mui/icons-material) package includes the 2,100+ official [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) converted to [`SvgIcon`](/material-ui/icons/#svgicon/) components.
It depends on `@mui/material`, which requires Emotion packages.
Use one of the following commands to install it:

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
```

```bash yarn
yarn add @mui/icons-material @mui/material @emotion/styled @emotion/react
```

```bash pnpm
pnpm add @mui/icons-material @mui/material @emotion/styled @emotion/react
```

</codeblock>

See the [Installation](/material-ui/getting-started/installation/) page for additional docs about how to make sure everything is set up correctly.

## Basics

Material Icons use the Material UI [SVG Icon](/material-ui/icons/#svgicon/) component under the hood, so they render without any customization, and feature several props for quickly customizing styles.

{{"demo": "BasicMaterialIcon.js"}}

:::info
Visit [the SVG Icon component section in the Icon doc](/material-ui/icons/#svgicon/) for further information about its other props, as well as how to use it with other icon libraries.
:::

### Size

Use the `fontSize` prop to toggle between small, medium (default, 24x24px), or large icon sizes.
You can also use the `sx` prop to pick arbitrary values that are outside of this built-in scale.

{{"demo": "SizeMaterialIcon.js"}}

### Color

Use the `color` prop to choose a palette key from the theme.
It defaults to the `main` value of its respective palette.

{{"demo": "ColorMaterialIcon.js"}}

## Browse the library

Browse through the icons below to find the one you need.
The search field supports synonyms—for example, try searching for "hamburger" or "logout."

{{"demo": "SearchIcons.js", "hideToolbar": true, "bg": true}}
