# Introductory tutorial

<p class="description">Learn how to import and style Joy UI components to build a simple login page.</p>

This tutorial will walk you through how to set up a user interface for a basic login page using Joy UI.

By the end, you should understand how to:

1. import Joy UI components into your React app
2. add styles to Joy UI components
3. create a button to toggle light and dark modes

## Prerequisites

This tutorial assumes that you've already:

- set up a React app—try [Create React App](https://create-react-app.dev/) if you need a boilerplate
- installed Joy UI in your app—see [Installation](/joy-ui/getting-started/installation/) for instructions

## Import the Sheet component for structure

The [Sheet](/joy-ui/react-sheet/) component is a `<div>` container that supports Joy UI's [global variants feature](/joy-ui/main-features/global-variants/), helping to ensure consistency across your app.

Import Sheet and add it to your app as shown below.
Notice that Joy UI components must be nested within `<CssVarsProvider />`:

```jsx
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
Try changing some of the values for the CSS properties above based on the patterns you observe to see how `sx` works.
To go deeper, read about the `sx` prop in the [MUI System documentation](/system/getting-started/the-sx-prop/).
:::

## Add text with the Typography component

The [Typography](/joy-ui/react-typography/) component replaces HTML header, paragraph, and span tags to help maintain a consistent hierarchy of text on the page.

:::info
The `level` prop gives you access to a pre-defined scale of typographic values.
Joy UI provides 13 typography levels out of the box:

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
  <Typography level="body2">Sign in to continue</Typography>
</div>
```

:::success
Try changing the values for the `level` and `component` props to see how they affect the typographic values and the elements rendered.
(In the example above, the first Typography component renders an `<h1>` with the typographic values of an `<h4>`.)
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

The `Button` component has `solid` and `primary` as its default variant and color, respectively.
Play around with changing their values to see how each variant differs from one another.
Try `plain`, `outlined`, or `soft`.

We'll also use a `Link` component inside the `endDecorator` prop of the `Typography` component to pull off the sign up anchor link.

```jsx
// ...other imports
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

<Sheet
  sx={
    {
      // ...
    }
  }
>
  ...typography and text-fields
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
</Sheet>;
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

Congratulations 🎉! You've built your first good looking UI with Joy UI!

:::info
This tutorial does _not_ cover theming and general component customization.
Learn more about [different customization approaches](/joy-ui/customization/approaches/) when you're ready to go deeper on this topic.
:::
