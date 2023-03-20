# Installation

<p class="description">Install Material UI, the world's most popular React UI framework.</p>

## Default installation

Run one of the following commands to add Material UI to your project:

### npm

```sh
npm install @mui/material @emotion/react @emotion/styled
```

### yarn

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

## With styled-components

Material UI uses [Emotion](https://emotion.sh/) as its default styling engine.
If you want to use [styled-components](https://styled-components.com/) instead, run one of the following commands:

### npm

```sh
npm install @mui/material @mui/styled-engine-sc styled-components
```

### yarn

```sh
yarn add @mui/material @mui/styled-engine-sc styled-components
```

:::warning
Visit the [Styled engine guide](/material-ui/guides/styled-engine/) for more information about how to configure styled-components.
:::

## Peer dependencies

<!-- #react-peer-version -->

[`react`](https://www.npmjs.com/package/react) >= 17.0.0 and [`react-dom`](https://www.npmjs.com/package/react-dom) >= 17.0.0 are peer dependencies.

## Roboto font

Material UI is designed to use the [Roboto](https://fonts.google.com/specimen/Roboto)
font by default.
You may add it to your project with npm or yarn via [Fontsource](https://fontsource.org/), or with the Google Fonts CDN.

### npm

```sh
npm install @fontsource/roboto
```

### yarn

```sh
yarn add @fontsource/roboto
```

Then you can import it in your entry point like this:

```tsx
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

:::info
Fontsource can be configured to load specific subsets, weights and styles. Material UI's default typography configuration relies only on the 300, 400, 500, and 700 font weights.
:::

### Google Web Fonts

To install the Roboto font in your project using the Google Web Fonts CDN, add the following code snippet inside your project's `<head />` tag:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

## Icons

To use the [font Icon component](/material-ui/icons/#icon-font-icons) or the prebuilt SVG Material Icons (such as those found in the [icon demos](/material-ui/icons/)), you must first install the [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) font.
You can do so with npm or yarn, or with the Google Web Fonts CDN.

### npm

```sh
npm install @mui/icons-material
```

### yarn

```sh
yarn add @mui/icons-material
```

### Google Web Fonts

To install the Material Icons font in your project using the Google Web Fonts CDN, add the following code snippet inside your project's `<head />` tag:

To use the font `Icon` component, you must first add the [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) font.
Here are [some instructions](/material-ui/icons/#icon-font-icons)
on how to do so.
For instance, via Google Web Fonts:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

## CDN

You can start using Material UI right away with minimal front-end infrastructure by installing it via CDN, which is a great option for rapid prototyping.
Follow [this CDN example](https://github.com/mui/material-ui/tree/master/examples/material-via-cdn) to get started.

:::error
We do _not_ recommend using this approach in production.
It requires the client to download the entire library—regardless of which components are actually used—which negatively impacts performance and bandwidth utilization.
:::

Two Universal Module Definition (UMD) files are provided:

- one for development: https://unpkg.com/@mui/material@latest/umd/material-ui.development.js
- one for production: https://unpkg.com/@mui/material@latest/umd/material-ui.production.min.js

:::warning
The UMD links use the `latest` tag to point to the latest version of the library.
This pointer is _unstable_ and subject to change as we release new versions.
You should consider pointing to a specific version, such as [v5.0.0](https://unpkg.com/@mui/material@5.0.0/umd/material-ui.development.js).
:::
