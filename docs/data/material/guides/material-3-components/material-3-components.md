# Material Design 3 Components

<p class="description">Try out Material UI's implementation of M3 and learn how to contribute to the project.</p>

## Material UI and M3

Material Design 3 (M3), also referred to as [Material You](https://m3.material.io), is the latest version of Google's design system.
The primary Material UI package (`@mui/material`) currently implements Material Design 2.
M3 implementation is a work in progress, targeted for completion in late 2024.
You can try out Material UI's M3 components as they're developed using the `@mui/material-next` package.

:::warning
The M3 components are currently in alpha and subject to change.
:::

## Supported components

Visit the [All Components page](/material-ui/all-components/) to see which components support M3—look for the green M3 indicator.
All components that have M3 versions have a corresponding playground on their page.
For example, here's the [M3 Button playground](/material-ui/react-button/#material-design-3).

## Getting started with M3 components

The M3 components are included in the `@mui/material-next` package.
The following guide explains how to get started using them.

### Installation

Run one of the following commands to add `@mui/material-next` to your project:

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/material-next @emotion/react @emotion/styled
```

```bash yarn
yarn add @mui/material-next @emotion/react @emotion/styled
```

```bash pnpm
pnpm add @mui/material-next @emotion/react @emotion/styled
```

</codeblock>

#### Peer dependencies

<!-- #react-peer-version -->

Please note that [react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom) are peer dependencies, meaning you should ensure they are installed before installing the Material UI Next package.

```json
"peerDependencies": {
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0"
},
```

#### Roboto font

Material UI uses the [Roboto](https://fonts.google.com/specimen/Roboto) font by default.
Add it to your project via Fontsource, or with the Google Fonts CDN.

<codeblock storageKey="package-manager">

```bash npm
npm install @fontsource/roboto
```

```bash yarn
yarn add @fontsource/roboto
```

```bash pnpm
pnpm add @fontsource/roboto
```

</codeblock>

Then you can import it in your entry point like this:

```tsx
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

:::info
Fontsource can be configured to load specific subsets, weights and styles. Material UI's default typography configuration relies only on the 300, 400, 500, and 700 font weights.
:::

To install Roboto through the Google Web Fonts CDN, add the following code inside your project's <head /> tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>
```

### Usage

After [installation](/material-ui/guides/material-3-components/#installation), you can import any component from `@mui/material-next` just as you would do with the stable Material UI package.

{{"demo": "MD3ButtonUsage.js"}}

:::warning
If your application uses the `ThemeProvider` from `@mui/material`, you must include `CssVarsProvider` from `@mui/material-next` in the tree above the M3 components.
The following example shows how to do this.
:::

{{"demo": "MD3AndV5Usage.js", "defaultCodeOpen": false}}

### Theming

Use the `extendTheme` function to modify the default theme.
The theme structure follows [M3 specifications](https://m3.material.io/styles/color/system/overview).
For example, if you wanted to modify the primary color, you would provide the [color tones](https://m3.material.io/styles/color/system/how-the-system-works#e1e92a3b-8702-46b6-8132-58321aa600bd) via `ref.palette.primary`:

{{"demo": "MD3Theming.js"}}

:::success
You can use Material Design's [Figma Material Theme Builder](https://www.figma.com/community/plugin/1034969338659738588/material-theme-builder) plugin to generate palette tones.
:::

## Stable release

The stable release of the M3 components is tentatively targeted for Q4 2024 in Material UI v7.
To follow the progress or contribute to the project, check out [the M3 GitHub issue](https://github.com/mui/material-ui/issues/29345).
