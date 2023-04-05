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

This is a quick tutorial that goes through the basics of using and styling Base components by replicating a button from Github's UI, using their [style guide](https://primer.style) as a reference.

{{"demo": "Tutorial.js", "defaultCodeOpen": false, "hideToolbar": true}}

### Components & Hooks

Base UI provides a ButtonUnstyled component and a useButton hook, both of which can be used to build a button, each with its own [benefits and trade-offs](/base/getting-started/usage/#components-vs-hooks).

#### ButtonUnstyled Component

```tsx
import * as React from 'react';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

export default function App() {
  return (
    <div>
      <ButtonUnstyled>ButtonUnstyled</ButtonUnstyled>
    </div>
  );
}
```

#### useButton Hook

```tsx
import * as React from 'react';
import useButton from '@mui/base/useButton';

export default function App() {
  const buttonRef = React.useRef();

  const { getRootProps } = useButton({
    ref: buttonRef,
  });
  return (
    <div>
      <button type="button" {...getRootProps()}>
        useButton
      </button>
    </div>
  );
}
```

Base UI comes with no styles or styling solution, and looks like this out-of-the-box:

{{"demo": "BaseButton.js", "defaultCodeOpen": false}}

You are free to integrate with any styling method of your choice to make fully customizable components for your application or library. Read more about customization strategies [here](/base/getting-started/customization/).

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

Base UI components like ButtonUnstyled come with a classes object (e.g. `buttonUnstyledClasses`) that provide class hooks for styling a particular state.

```css
/* To style the disabled state: */

.${buttonUnstyledClasses.disabled} { /* ".MuiButton-disabled" */
  cursor: not-allowed;
}
```

Here's a complete demo of using ButtonUnstyled and useButton with plain CSS:

{{"demo": "BaseButtonPlainCss.js", "defaultCodeOpen": false}}

### Styling with Tailwind CSS

After installing Tailwind, simply pass Tailwind's utility classes to `className`.

```tsx
<ButtonUnstyled className="bg-green-600 rounded-md py-1 px-4...">
  Create Repository
</ButtonUnstyled>
```

Here's a complete demo of the same button styled with Tailwind instead:

{{"demo": "BaseButtonTailwind.js", "hideToolbar": true}}

### Styling with MUI System

[MUI System](/system/getting-started/overview/) is a small set of CSS utilties that provide a styled-components-like API for building out designs that adhere to a theme.

MUI System's core utility is a [`styled` function](/system/styled/) that is equivalent to emotion's or styled-components' styled(). Interpolations or arguments that are functions called by `styled` receive the `theme` from an upper `ThemeProvider`.

```tsx
import * as React from 'react';
import { ThemeProvider } from '@emotion/react';
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

Most of the demos and examples in the Base UI documentation are styled with MUI system in this way. You can inspect the `theme` object used on this site in your browser console, or explore the default structure [here](/material-ui/customization/default-theme/).

#### Styling ButtonUnstyled with MUI System

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

#### Styling useButton with MUI System

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

#### Using the sx prop

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

Here's a complete demo of styling ButtonUnstyled and useButton with MUI System:

{{"demo": "BaseButtonMuiSystem.js", "defaultCodeOpen": false}}

Read more about working with MUI System and its utilities [here](/system/getting-started/usage/).
