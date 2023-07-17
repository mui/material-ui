# Installation

<p class="description">Install Joy UI, a library of beautifully designed React UI components.</p>

Run one of the following commands to add Joy UI to your project:

<codeblock storageKey="package-manager">
```bash npm
npm install @mui/joy @emotion/react @emotion/styled
```

```bash yarn
yarn add @mui/joy @emotion/react @emotion/styled
```

</codeblock>

## Peer dependencies

<!-- #react-peer-version -->

Please note that [react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom) are peer dependencies too:

```json
"peerDependencies": {
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0"
},
```

## Public Sans font

Joy UI is designed to use the [Public Sans](https://fonts.google.com/specimen/Public+Sans)
font by default.
You may add it to your project with npm or yarn via [Fontsource](https://fontsource.org/), or with the Google Fonts CDN.

<codeblock storageKey="package-manager">

```bash npm
npm install @fontsource/public-sans
```

```bash yarn
yarn add @fontsource/public-sans
```

</codeblock>

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
