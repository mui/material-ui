# Installation

<p class="description">Install MUI System, a collection of CSS utilities for rapidly laying out custom designs.</p>

## Default installation

Run one of the following commands to add MUI System to your project:

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/system @emotion/react @emotion/styled
```

```bash yarn
yarn add @mui/system @emotion/react @emotion/styled
```

```bash pnpm
pnpm add @mui/system @emotion/react @emotion/styled
```

</codeblock>

## With styled-components

MUI System uses [Emotion](https://emotion.sh/) as its default styling engine.
If you want to use [styled-components](https://styled-components.com/) instead, run one of the following commands:

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/system @mui/styled-engine-sc styled-components
```

```bash yarn
yarn add @mui/system @mui/styled-engine-sc styled-components
```

```bash pnpm
pnpm add @mui/system @mui/styled-engine-sc styled-components
```

</codeblock>

:::warning
Visit the [Styled engine guide](/material-ui/guides/styled-engine/) for more information about how to configure styled-components.
:::

## Peer dependencies

<!-- #react-peer-version -->

Please note that [react](https://www.npmjs.com/package/react) is a peer dependency too:

```json
"peerDependencies": {
  "react": "^17.0.0 || ^18.0.0"
},
```
