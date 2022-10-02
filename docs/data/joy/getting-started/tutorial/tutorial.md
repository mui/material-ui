# Introductory tutorial

<p class="description">Learn how to import and style Joy UI components to build a simple login page.</p>

This tutorial will walk you through how to assemble the UI for a basic login page using Joy UI.
You'll be introduced to several common components as well as some of the props you can use to control their styles.
You'll also encounter key features of Joy UI such as global variants, the `sx` prop, and the `useColorScheme` hook.

By the end, you should understand how to:

1. import Joy UI components into your React app
2. add styles to Joy UI components
3. toggle light and dark mode with `useColorScheme`

## Prerequisites

This tutorial assumes that you've already:

- set up a React app—try [Create React App](https://create-react-app.dev/) if you need a boilerplate
- installed Joy UI in your app—see [Installation](/joy-ui/getting-started/installation/) for instructions

## Import the Sheet component for structure

The [Sheet](/joy-ui/react-sheet/) component is a `<div>` container that supports Joy UI's [global variants feature](/joy-ui/main-features/global-variants/), helping to ensure consistency across your app.

Import Sheet and add it to your app as shown below.
Notice that Joy UI components must be nested within `<CssVarsProvider />`:

```jsx
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

export default function App() {
  return (
    <CssVarsProvider>
      <Sheet variant="outlined">Welcome!</Sheet>
    </CssVarsProvider>
  );
}
```

:::success
Try playing around with different `variant` values to see the available styles.
In addition to `outlined`, you can also use `solid`, `soft`, or `plain`—these are Joy UI's [global variants](/joy-ui/main-features/global-variants/), and they're available on all components.
:::

### Add styles with the sx prop

All Joy UI components accept [the `sx` prop](/system/getting-started/the-sx-prop/), which gives you access to a shorthand syntax for writing CSS.
It's great for creating one-off customizations or rapidly experimenting with different styles.

Replace your basic Sheet from the previous step with the following `sx`-styled Sheet:

```jsx
<Sheet
  sx={{
    maxWidth: 400,
    mx: 'auto', // margin left & right
    my: 4, // margin top & botom
    py: 3, // padding top & bottom
    px: 2, // padding left & right
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: 'sm',
    boxShadow: 'md',
  }}
>
  Welcome!
</Sheet>
```

:::success
Try changing some of the values for the CSS properties above based on the patterns you observe.
To go deeper, read about the `sx` prop in the [MUI System documentation](/system/getting-started/the-sx-prop/).
:::

## Add text with the Typography component

The [Typography](/joy-ui/react-typography/) component replaces HTML header, paragraph, and span tags to help maintain a consistent hierarchy of text on the page.

:::info
The `level` prop gives you access to a pre-defined scale of typographic values.
Joy UI provides 13 typographic levels out of the box:

`display1 | display2 | h1 | h2 | h3 | h4 | h5 | h6 | body1 | body2 | body3 | body4 | body5`

:::

Add an import for Typography with the rest of your imports:

```jsx
import Typography from '@mui/joy/Typography';
```

Replace `Welcome!` inside your Sheet component with this `<div>`:

```jsx
<div>
  <Typography level="h4" component="h1">
    Welcome!
  </Typography>
  <Typography level="body2">Sign in to continue.</Typography>
</div>
```

:::success
Try changing the values for the `level` and `component` props to see how they affect the typographic values and the elements rendered.
(Note that while `level` only accepts the 13 values listed above, you can pass any HTML tag to `component`, as well as custom React components.)
:::

## Add Text Field for user inputs

The Text Field component bundles together the Form Control, Form Label, Input, and Form Helper Text components to provide you with a sophisticated field for user input.

Add an import for Text Field with the rest of your imports:

```jsx
import TextField from '@mui/joy/TextField';
```

Insert these two Text Fields below the `<div>` from the previous step, inside the Sheet:

```jsx
<TextField
  // html input attribute
  name="email"
  type="email"
  placeholder="johndoe@email.com"
  // pass down to FormLabel as children
  label="Email"
/>
<TextField
  name="password"
  type="password"
  placeholder="password"
  label="Password"
/>
```

## Import Button and Link for user actions

The Button and Link components replace the HTML `<button>` and `<a>` tags, respectively, giving you access to global variants, the `sx` and `component` props, and more.

Add the following imports with the rest in your app:

```jsx
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
```

Add the following Button, Typography, and Link components after the Text Fields from the previous step, still nested inside the Sheet.
Notice that the Link is appended to the Typography inside of [the `endDecorator` prop](/joy-ui/react-typography/#decorators):

```jsx
<Button
  sx={{
    mt: 1, // margin top
  }}
>
  Log in
</Button>
<Typography
  endDecorator={<Link href="/sign-up">Sign up</Link>}
  fontSize="sm"
  sx={{ alignSelf: 'center' }}
>
  Don't have an account?
</Typography>
```

<!-- TODO: Add the result image -->

## 🎁 Bonus: Build a toggle for light and dark mode

Joy UI provides an effortless way to toggle between modes by using the React hook `useColorScheme`.
All you need to do is create a component that uses the hook and then render it under the `CssVarsProvider` component.

```jsx
import React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
// ...other imports

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
};

export default function App() {
  return (
    <CssVarsProvider>
      <ModeToggle />
      <Sheet>...</Sheet>
    </CssVarsProvider>
  );
}
```

:::info
💡 **Note:** With the `useColorScheme` hook, Joy UI ensures that the user selected mode (stored in localStorage by default) is in-sync across browser tabs.
:::

## Putting it all together

Your completed app should look like this:

```jsx
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
};

export default function App() {
  return (
    <CssVarsProvider>
      <ModeToggle />
      <Sheet
        sx={{
          maxWidth: 400,
          mx: 'auto', // margin left & right
          my: 4, // margin top & botom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body2">Sign in to continue.</Typography>
        </div>
        <TextField
          // html input attribute
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          // pass down to FormLabel as children
          label="Email"
        />
        <TextField
          name="password"
          type="password"
          placeholder="password"
          label="Password"
        />
        <Button
          sx={{
            mt: 1, // margin top
          }}
        >
          Log in
        </Button>
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don't have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
```

Congratulations 🎉! You've built your first good looking UI with Joy UI!

:::info
This tutorial does _not_ cover theming and general component customization.
Learn more about [different customization approaches](/joy-ui/customization/approaches/) when you're ready to go deeper on this topic.
:::
