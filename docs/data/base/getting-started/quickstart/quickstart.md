# Quickstart

<p class="description">Get started with Base UI, a library of headless ("unstyled") React UI components and low-level hooks.</p>

## Installation

`@mui/base` is completely standalone – run one of the following commands to add Base UI to your React project:

### With npm

```sh
npm install @mui/base
```

### With yarn

```sh
yarn add @mui/base
```

### With pnpm

```sh
pnpm add @mui/base
```

### Peer dependencies

<!-- #react-peer-version -->

[`react`](https://www.npmjs.com/package/react) >= 17.0.0 and [`react-dom`](https://www.npmjs.com/package/react-dom) >= 17.0.0 are peer dependencies.

## Implementing a Button

This is a quick tutorial that goes through the basics of using and styling Base UI components by replicating a button from GitHub's UI, using their [Primer design system](https://primer.style) as a reference.
Base UI components help you abstract away low-level UI implementation details such as accessibility patterns, cross-browser compatibility, event handling etc while remaining unopinionated about styling, giving you complete control over your app's CSS.

{{"demo": "Tutorial.js", "defaultCodeOpen": false, "hideToolbar": true}}

### Components and hooks

Base UI provides an Unstyled Button component and a `useButton` hook.
Both can be used to build a button, and each has its own benefits and trade-offs — see [Components vs. hooks](/base/getting-started/usage/#components-vs-hooks) for details.

The code snippets below demonstrate the basic implementation of each:

#### Unstyled Button component

```tsx
import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

export default function App() {
  return (
    <ButtonUnstyled>ButtonUnstyled</ButtonUnstyled>
  );
}
```

#### useButton hook

```tsx
import * as React from 'react';
import useButton from '@mui/base/useButton';

export default function App() {
  const { getRootProps } = useButton();
  return (
    <button type="button" {...getRootProps()}>
      useButton
    </button>
  );
}
```

Base UI comes with no styles or styling solution - here's what the Unstyled Button looks like out of the box:

{{"demo": "BaseButton.js", "defaultCodeOpen": false}}

You can use any styling method of your choice to make fully customizable components for your app. See [Customization](/base/getting-started/customization/) for more details on customization strategies.

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

<ButtonUnstyled className="btn">Create Repository</ButtonUnstyled>
```

Base UI components like the Unstyled Button come with a classes object (e.g. `buttonUnstyledClasses`) that provides class hooks for styling a particular state.

```css
/* To style the disabled state: */

.${buttonUnstyledClasses.disabled} { /* ".MuiButton-disabled" */
  cursor: not-allowed;
}
```

The demo below shows how to create the Primer button using plain CSS with Base UI's Unstyled Button and `useButton` hook:

{{"demo": "BaseButtonPlainCss.js", "defaultCodeOpen": false}}

### Styling with Tailwind CSS

After installing Tailwind CSS, its utility classes to `className`, as shown below:

```tsx
<ButtonUnstyled className="bg-green-600 rounded-md py-1 px-4...">
  Create Repository
</ButtonUnstyled>
```

The demo below shows how to build the Primer button using Tailwind CSS:

{{"demo": "BaseButtonTailwind.js", "hideToolbar": true}}

### Styling with MUI System

[MUI System](/system/getting-started/overview/) is a small set of CSS utilties that provide a styled-components-like API for building out designs that adhere to a theme.

MUI System's core utility is a [`styled` function](/system/styled/) that's equivalent to the `styled()` function in emotion and styled-components.
Interpolations or arguments that are functions called by `styled` receive the `theme` from an upper `ThemeProvider`.

```tsx
import * as React from 'react';
import { ThemeProvider } from '@emotion/react';
import { styled } from '@mui/system';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

const theme = {
  colors: {
    primary: 'green',
  },
};

const GithubButton = styled(ButtonUnstyled)(
  ({ theme }) => `
    background-color: ${theme.colors.primary /* => 'green' */};
  `,
);

render(
  <ThemeProvider theme={theme}>
    <GithubButton>Create Repository</GithubButton>
  </ThemeProvider>,
);
```

Most of the demos in the Base UI docs are styled with MUI System in this way.
You can inspect the `theme` object used on this site in your browser console, or explore the default structure in the Material UI [Default theme](/material-ui/customization/default-theme/) documentation.

The demos below show how to create the Primer button using MUI System:

#### Unstyled Button with MUI System

```tsx
import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const GithubButton = styled(ButtonUnstyled)(
  ({ theme }) => `
    background-color: ${theme.palette.mode === 'dark' ? '#238636' : '#1f883d'};
    ${/* ... the rest of the styles */}
  `,
);

export default function App() {
  return (
    <div>
      <GithubButton>Create Repository</GithubButton>
    </div>
  );
}
```

#### useButton hook with MUI System

```tsx
import * as React from 'react';
import useButton from '@mui/base/useButton';
import { styled } from '@mui/system';

const GithubButton = styled('button')(
  ({ theme }) => `
    background-color: ${theme.palette.mode === 'dark' ? '#238636' : '#1f883d'};
    ${/* ... the rest of the styles */}
  `,
);

export default function App() {
  const { getRootProps } = useButton(/* props*/);

  return (
    <div>
      <GithubButton type="button" {...getRootProps()}>
        Create Repository
      </GithubButton>
    </div>
  );
}
```

### Using the sx prop

MUI System supports the [`sx` prop](/system/getting-started/the-sx-prop/), which provides a quick way to apply ad-hoc styles using theme-aware values to any component created with `styled`.

```tsx
const GithubButton = styled(ButtonUnstyled)(
  ({ theme }) => `
    background-color: ${theme.palette.mode === 'dark' ? '#238636' : '#1f883d'};
    margin: 0;
  `,
);

export default function App() {
  return (
    <div>
      <GithubButton sx={{ m: 2 /* => margin: 16px */ }}>
        Create Repository
      </GithubButton>
    </div>
  );
}
```

The demo below shows how to build the Primer button using MUI System along with the `sx` prop:

{{"demo": "BaseButtonMuiSystem.js", "defaultCodeOpen": false}}

Read the [MUI System Usage](/system/getting-started/usage/) doc for further details.
