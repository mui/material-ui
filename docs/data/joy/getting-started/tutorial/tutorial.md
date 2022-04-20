# Tutorial

<p class="description">This tutorial gives you an overview of how to use Joy components by building a log in page.</p>

## What you'll learn?

1. Importing components.
2. Building a log in page using Joy components.
3. What global variants look like.
4. Toggling dark mode

## What's not covered?

- Theme & component customization.
- Features explanation.

## Prerequisites

- A project which has Joy UI installed (follow the [quick start](/joy-ui/getting-started/quick-start/) if you don't have one).

## Building the login page

### 1. Use `Sheet` to create layout

The `Sheet` component is simply a html div tag that applies Joy's global variant. It is a very useful building block to create various layout styles.

Open `src/App.js`, and renders a sheet on the screen.

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

### 2. Use `sx` prop to customize style

All Joy components accept `sx` prop, so you can specify the styles with short-hand syntax (accessible to the theme) directly to the component.

It is very useful for creating one-off style per location of the component because you don't have to come up with a class name and create another file for writing CSS.

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

### 3. Use `Typography` to create welcome text

The `Typography` component is handy when you need to render headings and/or paragraphs.

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

Typography lets you change the scale of each instance by using `level` prop (you can control the semantic HTML output by specifying a `component` prop with a proper html tag).

Joy provides 9 built-in typography scale: `h1 | h2 | h3 | h4 | h5 | h6 | body1 | body2 | body3`. Try playing around with these values to see what they looks like.

### 4. Use `TextField` to create username and password input

The `TextField` component is composed of `FormLabel`, `Input` and `FormHelperText`. It is perfect for common use case that does not need customization.

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

### 5. Use `Button` and `Link` for actions

We will render a log in button and a sign up link to navigate to a different page.

The default `Button` comes with the `contained` variant and theme `primary` color.

The `Box` is used to create a flexbox container so that the Typography and the Link are aligned.

The `Link` renders an anchor tag which we will have to provide a `href` attribute.

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

Try changing the button's variant between `'text' | 'outlined' | 'light' | 'contained'` and goes with the one that you like!

<!-- TODO: Add last step image -->

## 🎁 Bonus: Dark mode

Joy provides an effortless way to toggle dark mode by calling `setMode` from the react hook `useColorScheme`. All you need to do is creating a component that use the hook and renders under the `CssVarsProvider`.

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

> 💡 By using `useColorScheme` hook, Joy ensures that the user selected mode (stored in localStorage by default) is in sync across the browser tabs.

Congratulations! you have completed the turorial.

## What's next?

- 💎 Check out all the features of Joy
- 💅 Learn more about customization
- 📖 Read the Joy's principles to find out why it exists.
