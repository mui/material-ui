# Quickstart

<p class="description">Get started with Base UI, a library of headless ("unstyled") React UI components and low-level hooks.</p>

:::info
If you're using Next.js 13.4 or later, check out the [Next.js App Router guide](/base-ui/guides/next-js-app-router/).
:::

## Installation

`@mui/base` is completely standalone – run one of the following commands to add Base UI to your React project:

:::info
The `next` tag is used to download the latest <b>pre-release</b>, v6 version. Remove it to get the current stable version.
:::

<!-- #default-branch-switch -->

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/base@next
```

```bash pnpm
pnpm add @mui/base@next
```

```bash yarn
yarn add @mui/base@next
```

</codeblock>

### Peer dependencies

<!-- #react-peer-version -->

Please note that [react](https://www.npmjs.com/package/react) and [react-dom](https://www.npmjs.com/package/react-dom) are peer dependencies, meaning you should ensure they are installed before installing Base UI.

```json
"peerDependencies": {
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0"
},
```

## Implementing a Button

This is a quick tutorial that goes through the basics of using and styling Base UI components by replicating a button from GitHub's UI, using their [Primer design system](https://primer.style/components/button/) as a reference.

{{"demo": "Tutorial.js", "defaultCodeOpen": false, "hideToolbar": true}}

### Components and hooks

Base UI provides a `<Button />` component and a `useButton` hook.
Both can be used to build a button, and each has its own benefits and trade-offs—see [Components vs. hooks](/base-ui/getting-started/usage/#components-vs-hooks) for details.

The code snippets below demonstrate the basic implementation of each:

#### Button component

```tsx
import * as React from 'react';
import { Button } from '@mui/base/Button';

export default function App() {
  return <Button>Click Me</Button>;
}
```

#### useButton hook

```tsx
import * as React from 'react';
import { useButton } from '@mui/base/useButton';

export default function App() {
  const { getRootProps } = useButton();
  return (
    <button type="button" {...getRootProps()}>
      Click Me
    </button>
  );
}
```

Base UI comes with no styles or styling solution—here's what the Button component looks like out of the box:

{{"demo": "BaseButton.js", "defaultCodeOpen": false}}

You can use any styling method of your choice to make fully customizable components for your app. See [Customization](/base-ui/getting-started/customization/) for more details on customization strategies.

Here are some styling examples:

### Styling with CSS

Pass a `className` prop and use it as a styling hook:

```css
/* styles.css */

.btn {
  background-color: #1f883d;
  /* the rest of the styles */
}
```

```tsx
/* App.js */

<Button className="btn">Create Repository</Button>
```

Base UI components like the Button come with a classes object (for example `buttonClasses`) that provides class hooks for styling a particular state.

```css
/* To style the disabled state: */

.${buttonClasses.disabled} { /* ".base-Button-disabled" */
  cursor: not-allowed;
}
```

The demo below shows how to create the Primer button using plain CSS with Base UI's Button component and `useButton` hook:

{{"demo": "BaseButtonPlainCss.js", "defaultCodeOpen": false}}

### Styling with Tailwind CSS

After installing Tailwind CSS, pass its utility classes to `className`, as shown below:

```tsx
<Button className="bg-green-600 rounded-md py-1 px-4...">Create Repository</Button>
```

The demo below shows how to build the Primer button using Tailwind CSS:

{{"demo": "BaseButtonTailwind.js", "hideToolbar": true, "bg": "inline"}}

### Styling with MUI System

[MUI System](/system/getting-started/) is a small set of CSS utilities that provide a styled-components-like API for building out designs that adhere to a theme.

MUI System's core utility is a [`styled` function](/system/styled/) that's equivalent to the `styled()` function in emotion and styled-components.
Interpolations or arguments that are functions called by `styled` receive the `theme` from an upper `ThemeProvider`.

```tsx
import * as React from 'react';
import { ThemeProvider } from '@emotion/react';
import { styled } from '@mui/system';
import { Button } from '@mui/base/Button';

const theme = {
  palette: {
    primary: 'green',
    text: '#fff',
  },
};

const GitHubButton = styled(Button)(
  ({ theme }) => `
    background-color: ${theme.palette.primary /* => 'green' */};
    ${/* ... the rest of the styles */}
  `,
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GitHubButton>Create Repository</GitHubButton>
    </ThemeProvider>
  );
}

```

Most of the demos in the Base UI docs are styled with MUI System in this way.
You can inspect the `theme` object used on this site in your browser console, or explore the default structure in the Material UI [Default theme](/material-ui/customization/default-theme/) documentation.

The demos below show how to create the Primer button using MUI System:

#### Button Component with MUI System

```tsx
import * as React from 'react';
import { Button } from '@mui/base/Button';
import { styled } from '@mui/system';

const GitHubButton = styled(Button)(
  ({ theme }) => `
    background-color: ${theme.palette.mode === 'dark' ? '#238636' : '#1f883d'};
    ${/* ... the rest of the styles */}
  `,
);

export default function App() {
  return (
    <GitHubButton>Create Repository</GitHubButton>
  );
}
```

#### useButton hook with MUI System

```tsx
import * as React from 'react';
import { useButton } from '@mui/base/useButton';
import { styled } from '@mui/system';

const GitHubButton = styled('button')(
  ({ theme }) => `
    background-color: ${theme.palette.mode === 'dark' ? '#238636' : '#1f883d'};
    ${/* ... the rest of the styles */}
  `,
);

export default function App() {
  const { getRootProps } = useButton(/* props*/);

  return (
    <GitHubButton type="button" {...getRootProps()}>
      Create Repository
    </GitHubButton>
  );
}
```

### Using the sx prop

MUI System supports the [`sx` prop](/system/getting-started/the-sx-prop/), which provides a quick way to apply ad-hoc styles using theme-aware values to any component created with `styled`.

```tsx
const GitHubButton = styled(Button)(
  ({ theme }) => `
    background-color: ${theme.palette.mode === 'dark' ? '#238636' : '#1f883d'};
    margin: 0;
  `,
);

export default function App() {
  return (
    <GitHubButton sx={{ m: 2 /* => margin: 16px */ }}>
      Create Repository
    </GitHubButton>
  );
}
```

The demo below shows how to build the Primer button using MUI System along with the `sx` prop:

{{"demo": "BaseButtonMuiSystem.js", "defaultCodeOpen": false}}

Read the [MUI System Usage](/system/getting-started/usage/) doc for further details.
