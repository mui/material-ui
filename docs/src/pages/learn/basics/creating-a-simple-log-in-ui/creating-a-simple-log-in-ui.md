# Creating a simple log-in UI

<p class="description">To show how easy MUI is to use lets create a simple log-in UI.</p>

## Include all the needed components

First up, include all the components we are going to be using at the top of your `jsx` file.

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

Create a function that will be used an an entry point for the log-in screen.

```jsx
export default function LogInScreen() {
  return ();
}
```

## Create the log-in container

By using `Container` and `Paper` components we can quicly build the outer container for our log-in form. Use the `Typography` to set a nice header text.

```jsx
<Container mt={10} maxWidth="xs" component={Box}>
  <Paper p={2} component={Box}>
    <Typography variant="h6" component="h1">
      Log In
    </Typography>
  </Paper>
</Container>
```

By setting the `component={Box}` prop we can then add spacing to those elements.

## Add the email, password and Log In button

Building the form is easy - just use the `TextField` and `Button`.

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
          Log In
        </Button>
      </Box>
    </Box>
  </Paper>
</Container>
```

## Include the `Create account` and `Forgot password?` links

Final step is to add links to the `Create account` and `Forgot password?` pages.

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
```

## Summary

And we are all done. You can check the full code below.

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
      <Paper p={2} variant="outlined" component={Box}>
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

---

Next, [Navigating the MUI documentation >](/learn/basics/navigating-the-documentation/)
