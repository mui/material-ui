# Introductory tutorial

<p class="description">Learn how to import and style Joy UI components to build a simple login page with light and dark modes.</p>

This tutorial will walk you through how to assemble the UI for a basic login page using Joy UI.
You'll be introduced to several common components as well as some of the props you can use to control their styles.
You'll also encounter key features of Joy UI such as global variants, the `sx` prop, and the `useColorScheme` hook.

By the end, you should understand how to:

1. import and customize Joy UI components
2. add styles to Joy UI components with `sx`
3. override default HTML elements with `component`
4. toggle light and dark mode with `useColorScheme`

## Interactive demo

Here's what the final product looks like—click on the "Show code" button underneath the demo to see the full source code:

{{"demo": "LoginFinal.js", "iframe": true, "height": 500, "bg": "outlined"}}

## Prerequisites

This tutorial assumes that you've already:

- set up a React app—try [Create React App](https://create-react-app.dev/) if you need a boilerplate
- installed Joy UI in your app—see [Installation](/joy-ui/getting-started/installation/) for instructions

## Import the Sheet component for structure

The [Sheet](/joy-ui/react-sheet/) component is a `<div>` container that supports Joy UI's [global variants feature](/joy-ui/main-features/global-variants/), helping to ensure consistency across your app.

Import Sheet and add it to your app as shown below.
(If you're using Create React App, for example, all of this code should go in `App.js`.)

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
In addition to `outlined`, you can also use `solid`, `soft`, or `plain`—these are Joy UI's [global variants](/joy-ui/main-features/global-variants/), and they're available on all components.
:::

### Add styles with the sx prop

All Joy UI components accept [the `sx` prop](/system/getting-started/the-sx-prop/), which gives you access to a shorthand syntax for writing CSS.
It's great for creating one-off customizations or rapidly experimenting with different styles.

Replace your basic Sheet from the previous step with the following `sx`-styled Sheet:

```jsx
<Sheet
  sx={{
    width: 300,
    mx: 'auto', // margin left & right
    my: 4, // margin top & bottom
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
To go deeper, read about the `sx` prop in the [MUI System documentation](/system/getting-started/the-sx-prop/).
:::

## Add text with the Typography component

The [Typography](/joy-ui/react-typography/) component replaces HTML header, paragraph, and span tags to help maintain a consistent hierarchy of text on the page.

The `level` prop gives you access to a pre-defined scale of typographic values.
Joy UI provides 11 typographic levels out of the box.

- Four heading levels: `'h1' | 'h2' | 'h3' | 'h4'`
- Three title levels: `'title-lg' | 'title-md' | 'title-sm'`
- Four body levels: `'body-lg' | 'body-md' | 'body-sm' | 'body-xs'`

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
  <Typography level="body-sm">Sign in to continue.</Typography>
</div>
```

:::success
Try changing the values for the `level` and `component` props to see how they affect the typographic values and the elements rendered.
(Note that while `level` only accepts the 11 values listed above, you can pass any HTML tag to `component`, as well as custom React components.)
:::

## Add text field for user inputs

The Form Control, Form Label, and Input components can be used together to provide you with a sophisticated field for user input.

Add imports for Form Control, Form Label, and Input with the rest of your imports:

```jsx
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
```

Insert these two text fields below the `<div>` from the previous step, inside the Sheet:

```jsx
<FormControl>
  <FormLabel>Email</FormLabel>
  <Input
    // html input attribute
    name="email"
    type="email"
    placeholder="johndoe@email.com"
  />
</FormControl>
<FormControl>
  <FormLabel>Password</FormLabel>
  <Input
    name="password"
    type="password"
    placeholder="password"
  />
</FormControl>
```

## Import Button and Link for user actions

The [Button](/joy-ui/react-button/) and [Link](/joy-ui/react-link/) components replace the HTML `<button>` and `<a>` tags, respectively, giving you access to global variants, the `sx` and `component` props, and more.

Add the following imports with the rest in your app:

```jsx
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
```

Add the following Button, Typography, and Link components after the text fields from the previous step, still nested inside the Sheet.
Notice that the Link is appended to the Typography inside of [the `endDecorator` prop](/joy-ui/react-typography/#decorators):

```jsx
<Button sx={{ mt: 1 /* margin top */ }}>
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

## 🎁 Bonus: Build a toggle for light and dark mode

The `useColorScheme` hook aids in the implementation of a toggle button for switching between light and dark mode in an app.
It also enables Joy UI to ensure that the user-selected mode (which is stored in `localStorage` by default) stays in sync across browser tabs.

Add `useColorScheme` to your import from `@mui/joy/styles`:

```jsx
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
```

Next, create a light/dark mode switcher by adding the following code snippet in between your imports and your `App()`:

```jsx
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function ModeToggle() {
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
    <Select
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}
```

Finally, add your newly built `<ModeToggle />` button above `<Sheet />`:

```diff
 export default function App() {
   return (
     <CssVarsProvider>
+      <ModeToggle />
       <Sheet>...</Sheet>
     </CssVarsProvider>
   );
 }
```

Your app should now look like the [interactive demo](#interactive-demo) at the top of the page.
Great job making it all the way to the end!

## Summary

Here's a recap of the components used:

- [Sheet](/joy-ui/react-sheet/)
- [Typography](/joy-ui/react-typography/)
- [Button](/joy-ui/react-button/)
- [Link](/joy-ui/react-link/)

Here are some of the major features introduced:

- [global variants](/joy-ui/main-features/global-variants/)
- [the `sx` prop](/system/getting-started/the-sx-prop/)
- [dark mode](/joy-ui/customization/dark-mode/)

## Next steps

This tutorial does not cover theming or general component customization.
Learn more about [different customization approaches](/joy-ui/customization/approaches/) and when to apply them.

To see some more sophisticated examples of Joy UI in action, check out our [collection of templates](/joy-ui/getting-started/templates/).

Are you migrating from Material UI?
Learn how to work with [Joy UI and Material UI together in one app](/joy-ui/integrations/material-ui/).
