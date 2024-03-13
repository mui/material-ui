# Codeblock

<p class="description">Installation component.</p>

## Tabs

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/material @emotion/react @emotion/styled
# `@emotion/react` and `@emotion/styled` are peer dependencies
```

```bash yarn
yarn add @mui/material @emotion/react @emotion/styled
# `@emotion/react` and `@emotion/styled` are peer dependencies
```

```bash pnpm
pnpm add @mui/material @emotion/react @emotion/styled
# `@emotion/react` and `@emotion/styled` are peer dependencies
```

</codeblock>

<codeblock storageKey="license">

```bash MIT
npm install @mui/data-grid
```

```bash Pro
npm install @mui/data-grid-pro
```

```bash Premium
npm install @mui/data-grid-premium
```

</codeblock>

## Component

{{"component": "modules/components/HighlightedCodeWithTabs", "tabs": [{"tab":"JS", "code":"<div>Hello</div>", "language": "jsx"}, {"tab": "TS", "code": "type A = {}"}]}}

## With header path

<div class="codeblock-with-header">
  <p class="header">PlainCssSliderDeep1.js</p>

```jsx
import * as React from 'react';
import Slider from '@mui/material/Slider';
import './PlainCssSliderDeep1.css';

export default function PlainCssSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```

</div>
