# Introductory tutorial

<p class="description">Learn how to import and style Joy UI components to build a simple login page.</p>

This tutorial will walk you through how to set up the user interface for a basic login page using Joy UI.

By the end, you should understand how to:

1. import Joy UI components into your React app
2. add styles to Joy UI components
3. create a button to toggle light and dark modes

## Prerequisites

This tutorial assumes that you've already:

- set up a React app—try [Create React App](https://create-react-app.dev/) if you need a boilerplate
- installed Joy UI in your app—see [Installation](/joy-ui/getting-started/installation/) for instructions

## Import the Sheet component for structure

To create the structure for the login page, we'll use the `Sheet` component, which is simply an HTML div that supports the global variant feature.

Try playing around with different variant values to see how they look like.
You can use `solid`, `soft`, `outlined`, or `plain`.

```jsx
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

function App() {
  return (
    <CssVarsProvider>
      <Sheet variant="outlined">Welcome!</Sheet>
    </CssVarsProvider>
  );
}

export default App;
```

:::info
**Don't forget:** always render Joy UI components inside the `<CssVarsProvider/>` component.
:::

### Add styles with the sx prop

Every Joy UI component accepts the `sx` prop, which allows a shorthand syntax for writing CSS.
It's great for creating one-off customizations or rapidly experimenting with different styles.

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

Don't worry if you're confused about the `sx` prop's syntax at this moment.
You'll get the hang of it as you use it more.
Check the [MUI System's documentation](/system/getting-started/the-sx-prop/) to learn more about its foundation.

## Add text with the Typography component

The `Typography` component supports the `level` prop, allowing you to choose between a pre-defined scale of typography values.
Joy UI provides 13 typography levels out of the box: `display 1 | display 2 | h1 | h2 | h3 | h4 | h5 | h6 | body1 | body2 | body3 | body4 | body5`.

You can also change which HTML tag gets rendered in each `Typography` component using the `component` prop.

```jsx
// ...other imports
import Typography from '@mui/joy/Typography';

<Sheet
  sx={...}
>
  <div>
    <Typography level="h4" component="h1">
      <b>Welcome!</b>
    </Typography>
    <Typography level="body2">Sign in to continue</Typography>
  </div>
</Sheet>;
```

## Add TextField for user inputs

The `TextField` component is made of the `FormLabel`, `Input` and `FormHelperText` components.

```jsx
// ...other imports
import TextField from '@mui/joy/TextField';

<Sheet
  sx={
    {
      // ...
    }
  }
>
  ...typography
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
</Sheet>;
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