# Installation

<p class="description">Install Joy UI, a library of beautifully designed React UI components.</p>

## Default installation

Run one of the following commands to add Joy UI to your project:

:::info
The `next` tag is used to download the latest <b>pre-release</b>, v6 version. Remove it to get the current stable version.
:::

<!-- #default-branch-switch -->

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/joy@next @emotion/react @emotion/styled
```

```bash pnpm
pnpm add @mui/joy@next @emotion/react @emotion/styled
```

```bash yarn
yarn add @mui/joy@next @emotion/react @emotion/styled
```

</codeblock>

### Peer dependencies

<!-- #react-peer-version -->

Please note that [react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom) are peer dependencies, meaning you should ensure they are installed before installing Joy UI.

```json
"peerDependencies": {
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0"
},
```

## Inter font

Joy UI uses the [Inter](https://rsms.me/inter/)
font by default.
Add it to your project via [Fontsource](https://fontsource.org/), or with the Google Fonts CDN.

### Fontsource

Run one of the following commands to add Inter through Fontsource to your Joy UI project:

<codeblock storageKey="package-manager">

```bash npm
npm install @fontsource/inter
```

```bash pnpm
pnpm add @fontsource/inter
```

```bash yarn
yarn add @fontsource/inter
```

</codeblock>

Then you can import it in your entry point like this:

```tsx
import '@fontsource/inter';
```

### Google Web Fonts

To install Inter through the Google Web Fonts CDN, add the following code inside your project's `<head />` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
/>
```
