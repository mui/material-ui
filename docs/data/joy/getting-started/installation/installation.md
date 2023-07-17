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

## Inter font

Joy UI is designed to use the [Inter](https://fonts.google.com/specimen/Inter)
font by default.
You may add it to your project with npm or yarn via [Fontsource](https://fontsource.org/), or with the Google Fonts CDN.

<codeblock storageKey="package-manager">

```bash
npm install @fontsource/inter
```

```bash
yarn add @fontsource/inter
```

</codeblock>

Then you can import it in your entry point like this:

```tsx
import '@fontsource/inter';
```

### Google Web Fonts

To install the Inter font in your project using the Google Web Fonts CDN, add the following code snippet inside your project's `<head />` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Inter:wght@300;400;500;600;700&display=swap"
/>
```
