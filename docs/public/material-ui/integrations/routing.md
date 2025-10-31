# Routing libraries

By default, the navigation is performed with a native &lt;a&gt; element. You can customize it, for instance, using Next.js's Link or react-router.

## Navigation components

There are two main components available to perform navigations.
The most common one is the [`Link`](/material-ui/react-link/) as its name might suggest.
It renders a native `<a>` element and applies the `href` as an attribute.

```tsx
import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function LinkDemo() {
  return (
    <Box sx={{ typography: 'body1' }}>
      <Link href="/">Link</Link>
    </Box>
  );
}
```

You can also make a button perform navigation actions.
If your component is extending [`ButtonBase`](/material-ui/api/button-base/), providing a `href` prop enables the link mode.
For instance, with a `Button` component:

```tsx
import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonDemo() {
  return (
    <Button href="/" variant="contained">
      Link
    </Button>
  );
}
```

## Global theme Link

In real-life applications, using a native `<a>` element is rarely enough.
You can improve the user experience by using an enhanced Link component systematically.
The Material UI theme lets you configure this component once.
For instance, with react-router:

```tsx
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router';
import { LinkProps } from '@mui/material/Link';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
```

```tsx
import * as React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
  StaticRouter,
} from 'react-router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link, { LinkProps } from '@mui/material/Link';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default function LinkRouterWithTheme() {
  return (
    <Stack spacing={1} sx={{ alignItems: 'center', typography: 'body1' }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Link href="/">Link</Link>
          <Button href="/" variant="contained">
            Link
          </Button>
        </Router>
      </ThemeProvider>
    </Stack>
  );
}
```

:::warning
This approach has limitations with TypeScript.
The `href` prop only accepts a string.
In the event you need to provide a richer structure, see the next section.
:::

## `component` prop

You can achieve the integration with third-party routing libraries with the `component` prop.
You can learn more about this prop in the **[composition guide](/material-ui/guides/composition/#component-prop)**.

## React Router examples

Here are a few demos with the [Link component](https://reactrouter.com/start/declarative/navigating#link) of [React Router](https://github.com/remix-run/react-router).
You can apply the same strategy with all the components: BottomNavigation, Card, etc.

### Link

```tsx
import * as React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
  StaticRouter,
} from 'react-router';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => (
    <RouterLink
      ref={ref}
      to="/material-ui/getting-started/installation/"
      {...props}
    />
  ),
);

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

export default function LinkRouter() {
  return (
    <Box sx={{ typography: 'body1' }}>
      <Router>
        <Link component={RouterLink} to="/">
          With prop forwarding
        </Link>
        <br />
        <Link component={LinkBehavior}>Without prop forwarding</Link>
      </Router>
    </Box>
  );
}
```

### Button

```tsx
import * as React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
  StaticRouter,
} from 'react-router';
import Button from '@mui/material/Button';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => <RouterLink ref={ref} to="/" {...props} role={undefined} />,
);

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

export default function ButtonRouter() {
  return (
    <div>
      <Router>
        <Button component={RouterLink} to="/">
          With prop forwarding
        </Button>
        <br />
        <Button component={LinkBehavior}>With inlining</Button>
      </Router>
    </div>
  );
}
```

**Note**: The button base component adds the `role="button"` attribute when it identifies the intent to render a button without a native `<button>` element.
This can create issues when rendering a link.
If you are not using one of the `href`, `to`, or `component="a"` props, you need to override the `role` attribute.
The above demo achieves this by setting `role={undefined}` **after** the spread props.

```jsx
const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} role={undefined} />
));
```

### Tabs

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  StaticRouter,
} from 'react-router';

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/inbox/:id', '/drafts', '/trash']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Inbox" value="/inbox/:id" to="/inbox/1" component={Link} />
      <Tab label="Drafts" value="/drafts" to="/drafts" component={Link} />
      <Tab label="Trash" value="/trash" to="/trash" component={Link} />
    </Tabs>
  );
}

function CurrentRoute() {
  const location = useLocation();

  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
      Current route: {location.pathname}
    </Typography>
  );
}

export default function TabsRouter() {
  return (
    <Router>
      <Box sx={{ width: '100%' }}>
        <Routes>
          <Route path="*" element={<CurrentRoute />} />
        </Routes>
        <MyTabs />
      </Box>
    </Router>
  );
}
```

### List

```tsx
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import {
  Link,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  StaticRouter,
} from 'react-router';

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

interface ListItemLinkProps {
  icon?: React.ReactElement<unknown>;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  return (
    <ListItemButton component={Link} to={to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

function Content() {
  const location = useLocation();
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
      Current route: {location.pathname}
    </Typography>
  );
}

export default function ListRouter() {
  return (
    <Router>
      <Box sx={{ width: 360 }}>
        <Routes>
          <Route path="*" element={<Content />} />
        </Routes>

        <Paper elevation={0}>
          <List aria-label="main mailbox folders">
            <ListItem disablePadding>
              <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
            </ListItem>
          </List>
          <Divider />
          <List aria-label="secondary mailbox folders">
            <ListItem disablePadding>
              <ListItemLink to="/trash" primary="Trash" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemLink to="/spam" primary="Spam" />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Router>
  );
}
```

## More examples

### Next.js Pages Router

The [example folder](https://github.com/mui/material-ui/tree/HEAD/examples/material-ui-nextjs-pages-router-ts) provides an adapter for the use of [Next.js's Link component](https://nextjs.org/docs/pages/api-reference/components/link) with Material UI.

- The first version of the adapter is the [`NextLinkComposed`](https://github.com/mui/material-ui/blob/-/examples/material-ui-nextjs-pages-router-ts/src/Link.tsx) component.
  This component is unstyled and only responsible for handling the navigation.
  The prop `href` was renamed `to` to avoid a naming conflict.
  This is similar to react-router's Link component.

  ```tsx
  import Button from '@mui/material/Button';
  import { NextLinkComposed } from '../src/Link';

  export default function Index() {
    return (
      <Button
        component={NextLinkComposed}
        to={{
          pathname: '/about',
          query: { name: 'test' },
        }}
      >
        Button link
      </Button>
    );
  }
  ```

- The second version of the adapter is the `Link` component.
  This component is styled.
  It uses the [Material UI Link component](/material-ui/react-link/) with `NextLinkComposed`.

  ```tsx
  import Link from '../src/Link';

  export default function Index() {
    return (
      <Link
        href={{
          pathname: '/about',
          query: { name: 'test' },
        }}
      >
        Link
      </Link>
    );
  }
  ```

### TanStack Router

TanStack Router supports custom links through its `createLink` helper function.
The snippet below shows the most basic implementation, wrapping a Material UI Link component.
See [TanStack Router—Custom Link](https://tanstack.com/router/latest/docs/framework/react/guide/custom-link) for more component integration examples.

```tsx
import { createLink } from '@tanstack/react-router';
import { Link as MUILink } from '@mui/material';

const CustomLink = createLink(MUILink);

function App() {
  return (
    <CustomLink underline="none" to="/about">
      Link to about page
    </CustomLink>
  );
}
```
