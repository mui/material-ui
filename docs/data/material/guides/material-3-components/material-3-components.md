# Material 3 components

<p class="description">Try out Material UI's implementation of MD3 and learn how to contribute to the project.</p>

## Material 3

Material 3 (MD3), also referred to as [Material You](https://m3.material.io), is the latest version of Google's design system.
The primary Material UI package (`@mui/material`) currently implements Material 2.
MD3 implementation is a work in progress, targeted for completion in late 2024.
You can try out Material UI's MD3 components as they're developed using the `@mui/material-next` package.

## Supported components

Visit the [All Components page](/material-ui/all-components/) to see which components support MD3—look for the green MD3 indicator.
All components that have MD3 versions have a corresponding playground on their page.
For example, here's the [MD3 Button playground](/material-ui/react-button/#material-you-version).

## Getting started with MD3 components

The MD3 components are included in the `@mui/material-next` package.
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

After this, the steps are the same as for the `@mui/material` package.
You should follow the Material UI installation guide from the [Peer dependencies section](/material-ui/getting-started/installation/#peer-dependencies) forward.

### Usage

After [installation](/material-ui/guides/material-3-components/#installation), you can import any component from `@mui/material-next` just as you would do with the stable Material UI package.

{{"demo": "MD3ButtonUsage.js", "defaultCodeOpen": true}}

:::warning
If your application uses the `ThemeProvider` from `@mui/material`, you must include `CssVarsProvider` from `@mui/material-next` in the tree above the MD3 components.
:::

### Theming

Use the `extendTheme` function to modify the default theme.
The theme structure follows [MD3 specifications](https://m3.material.io/styles/color/system/overview).
For example, if you wanted to modify the primary color, you would provide the [color tones](https://m3.material.io/styles/color/system/how-the-system-works#e1e92a3b-8702-46b6-8132-58321aa600bd) via `ref.palette.primary`:

{{"demo": "MD3Theming.js", "defaultCodeOpen": true}}

:::success
You can use Material's [**Figma MD3 Theme Builder**](https://www.figma.com/community/plugin/1034969338659738588/material-theme-builder) plugin to generate the palette tones.
:::

## Stable release

The stable release of the MD3 components is tentatively targeted for Q4 2024 in Material UI v7. 
To follow the progress or contribute to the project, check out the [Material 3 GitHub issue](https://github.com/mui/material-ui/issues/29345).

:::warning
The MD3 components are currently in alpha and subject to change.
:::
