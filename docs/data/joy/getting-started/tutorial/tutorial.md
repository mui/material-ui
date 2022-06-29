# Tutorial

<p class="description">Quickly learn how to create a login UI using Joy components.</p>

## Topics covered

1. Importing Joy components.
2. Building the login page.
3. What global variants look like.
4. Toggling dark mode

## What's not covered?

- Theming and component customization.
- Features explanation.

## Prerequisites

- An app that has Joy UI installed. Follow the [usage](/joy-ui/getting-started/usage/) to learn how to quickly install it.

## Building the login page

### 1. Creating the basic layout

To create the structure for our login page layout, we'll use the `Sheet` component, which is simply an HTML div that supports the global variant feature.

Open your `App.js` file and use this snippet to render a sheet,

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

Try changing the sheet's variant between `plain`, `outlined`, `soft` or `solid` to see what they look like.

### 2. Using the `sx` prop for quick styling

Every Joy component accepts the `sx` prop, which allows a shorthand syntax for writing CSS. It's great for creating one-off customizations or quickly playing around with different styles.

```jsx
// the rest of the code is hidden for simplicity

<Sheet
  variant="outlined"
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
As you use it with more frequency, you'll get the hang of it. Check the [MUI System documentation](/system/the-sx-prop/) to learn the foundation for it.

### 3. Using `Typography` to create a welcome text

The `Typography` component has a `level` prop that allows you to choose between a pre-defined scale of typography values.
By default, Joy provides 9 typography levels: `h1 | h2 | h3 | h4 | h5 | h6 | body1 | body2 | body3`.

If you want to change what HTML tag the `Typography` component renders, you can use the `component` tag.

```jsx
// ...other imports
import Typography from '@mui/joy/Typography';

<Sheet
  variant="outlined"
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

### 4. Using `TextField` to create user name and password inputs

The `TextField` component is made of the `FormLabel`, `Input` and `FormHelperText` components.

```jsx
// ...other imports
import TextField from '@mui/joy/TextField';

<Sheet
  variant="outlined"
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

### 5. Using `Button` and `Link` for actions

The `Button` comes with `solid` and `primary` set as its default variant and color.
You can play around with changing their values to see how each variant differs from one another. Try `plain`, `outlined`, or `soft`.

We'll also use a `Link` component inside the `endDecorator` prop of the `Typography` component.

```jsx
// ...other imports
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

<Sheet
  variant="outlined"
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

## 🎁 Bonus: Setting up dark mode

Joy UI provides an effortless way to toggle between modes by using the react hook `useColorScheme`.
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
💡 With the `useColorScheme` hook, Joy UI ensures that the user selected mode (stored in localStorage by default) is in-sync across browser tabs.
:::

Congratulations 🎉! You have seamlessly built a simple yet good looking UI!
