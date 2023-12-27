# Material 3 components

<p class="description">Learn how to have early access to Material 3 components.</p>

## Material 3

Material 3 (MD3), also referred to as Material You, is Material Design's latest version.
The Material UI package (`@mui/material`) currently supports Material 2.
However, you can have early access to Material UI components that implement MD3 as they are developed.

## Supported components

You can review which components have MD3 support on the [All Components page](/material-ui/all-components/).
On that page, look for the MD3 indicator.
All components that have MD3 versions have a corresponding playground on their page.
For example, here's the [MD3 Button playground](/material-ui/react-button/#material-you-version).

## Using the components

The MD3 components are included in the `@mui/material-next` package.
Here's the guide on how to start using them.

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
You should follow the [Material UI installation](/material-ui/getting-started/installation/#peer-dependencies) guide from this point forward.

### Usage

After [installation](/material-ui/guides/material-3-components/#installation), you can import any component from `@mui/material-next` just as you would do with the stable Material UI package.

{{"demo": "MD3ButtonUsage.js", "defaultCodeOpen": true}}

:::warning
If your application uses `@mui/material`'s `ThemeProvider`, you must use `@mui/material-next`'s `CssVarsProvider` somewhere up in the tree above the MD3 components.
:::

### Theming

To modify the default theme you can use the `extendTheme` function.
The theme structure follows [MD3 specifications](https://m3.material.io/styles/color/system/overview).
For example, to modify the primary color you would have to provide the [color tones](https://m3.material.io/styles/color/system/how-the-system-works#e1e92a3b-8702-46b6-8132-58321aa600bd) via `ref.palette.primary`:

{{"demo": "MD3Theming.js", "defaultCodeOpen": true}}

:::success
You can use Material's [**Figma MD3 Theme Builder**](https://www.figma.com/community/plugin/1034969338659738588/material-theme-builder) plugin to generate the palette tones.
:::

## Stable release

The stable release of the MD3 components is tentatively targeted for Q4 2024, in Material UI v7. If you wish to follow the progress or contribute check out the [Material 3 Github issue](https://github.com/mui/material-ui/issues/29345).

:::warning
The MD3 components are currently in alpha and subject to change.
:::
