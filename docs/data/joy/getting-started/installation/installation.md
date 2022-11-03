# Installation

<p class="description">Install Joy UI, a library of beautifully designed React UI components.</p>

Run one of the following commands to add Joy UI to your project:

## npm

```sh
npm install @mui/joy @emotion/react @emotion/styled
```

## yarn

```sh
yarn add @mui/joy @emotion/react @emotion/styled
```

## Peer dependencies

<!-- #react-peer-version -->

[`react`](https://www.npmjs.com/package/react) >= 17.0.0 and [`react-dom`](https://www.npmjs.com/package/react-dom) >= 17.0.0 are peer dependencies.

## Public Sans font

Joy UI is designed to use the [Public Sans](https://fonts.google.com/specimen/Public+Sans)
font by default.
You may add it to your project with npm or yarn via [Fontsource](https://fontsource.org/), or with the Google Fonts CDN.

### npm

```sh
npm install @fontsource/public-sans
```

### yarn

```sh
yarn add @fontsource/public-sans
```

Then you can import it in your entry point like this:

```tsx
import '@fontsource/public-sans';
```

### Google Web Fonts

To install the Public Sans font in your project using the Google Web Fonts CDN, add the following code snippet inside your project's `<head />` tag:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
/>
```
