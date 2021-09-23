# Creating a simple sign-in UI

<p class="description">To showcase how easy it is to quickly set up an app with MUI, let's create a simple sign-in UI, which is used in almost all apps out there. </p>

<img src="/static/learn/overview.png">

## Importing the needed components

The first step is scanning what components are being used so we import them to your project.

<img src="/static/learn/component-link.png">

To import your components, you just need to use `@mui/material/[component]` at the top of your `tsx` file. The final result is:

```jsx
import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
```

## Create the component entry point

Create a function that will be used as an entry point for the sign-in screen.

```jsx
export default function LogInScreen() {
  return ();
}
```

## Creating the sign-in container

If we look at our design, we see that most of the components are bounded within a box that is centered on the screen. To create it, we'll use the `Container` and `Paper` components we imported.

To have them look exactly like the design, we need to add some props to the components. Each one of them has its own list of props that allow for built-in customizations. The `Container`, for instance, has a prop called `maxWidth` which controls the component width. If we go to the component API documentation, we see that this prop receives size values, such as xs, sm, md, and lg. For this design, we can use `sm` because we don't want the container to be very big. The code, with some more other props, should be looking like this:

```jsx
<Container mt={10} maxWidth="xs" component={Box}></Container>
```

## Adding the rest of the components

To continue building the UI, we'll need to add the rest of the components. As the step before, we're going to add some props to each component that will make it look exactly as the design specification. You can always customize the values so they get the way you want.

We should have by now a bigger piece of code:

```jsx
<Container mt={10} maxWidth="xs" component={Box}>
  <Paper p={2} component={Box}>
    <Typography variant="h6" component="h1">
      Log In
    </Typography>

    <Box component="form" noValidate autoComplete="off">
      <Box mt={2}>
        <TextField type="email" label="Email" fullWidth margin="dense" />
        <TextField type="password" label="Password" fullWidth margin="dense" />
      </Box>

      <Box mt={3}>
        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
      </Box>
    </Box>
  </Paper>
</Container>
```

## Finishing the screen

So, in a brief recap, we have imported the components, added them to the page, and also added props for each of them. On this page, we used a bunch of interesting and powerful components such as `Text Field` and `Grid`. MUI contains +40 components to build any type of user interface, so in the next section, we'll go through how to navigate the MUI documentation so you know how to look for the component and its structure whenever you're trying to achieve a given design.

Our whole screen code should be looking like this:

```jsx
import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

export default function LogInScreen() {
  return (
    <Container mt={10} maxWidth="xs" component={Box}>
      <Paper p={2} component={Box}>
        <Typography variant="h6" component="h1">
          Log In
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Box mt={2}>
            <TextField
              variant="filled"
              type="email"
              label="Email"
              fullWidth
              margin="dense"
            />
            <TextField
              variant="filled"
              type="password"
              label="Password"
              fullWidth
              margin="dense"
            />
          </Box>
          <Box mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Log In
            </Button>
          </Box>
        </Box>
        <Grid
          container
          justifyContent="space-between"
          alignItems="flex-start"
          mt={3}
          maxWidth="xs"
          component={Box}
        >
          <Grid item xs>
            <Link href="#" variant="body2">
              Create account
            </Link>
          </Grid>
          <Grid container justifyContent="flex-end" xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
```

You should see the following: [demo-chapter2.tsx](/learn/basics/demo-chapter2/).
