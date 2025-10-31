---
productId: material-ui
title: React Breadcrumbs component
components: Breadcrumbs, Link, Typography
githubLabel: 'scope: breadcrumbs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
githubSource: packages/mui-material/src/Breadcrumbs
---

# Breadcrumbs

A breadcrumbs is a list of links that help visualize a page's location within a site's hierarchical structure, it allows navigation up to any of the ancestors.

## Basic breadcrumbs

```tsx
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
}
```

## Active last breadcrumb

Keep the last breadcrumb interactive.

```tsx
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ActiveLastBreadcrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link>
      </Breadcrumbs>
    </div>
  );
}
```

## Custom separator

In the following examples, we are using two string separators and an SVG icon.

```tsx
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomSeparator() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Core
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Breadcrumb
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
```

## Breadcrumbs with icons

```tsx
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          MUI
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
```

## Collapsed breadcrumbs

```tsx
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CollapsedBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Catalog
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Accessories
        </Link>
        <Link underline="hover" color="inherit" href="#">
          New Collection
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Belts</Typography>
      </Breadcrumbs>
    </div>
  );
}
```

## Condensed with menu

As an alternative, consider adding a Menu component to display the condensed links in a dropdown list:

```tsx
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function CondensedWithMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="with-menu-demo-breadcrumbs"
      >
        <MenuItem onClick={handleClose}>Breadcrumb 2</MenuItem>
        <MenuItem onClick={handleClose}>Breadcrumb 3</MenuItem>
        <MenuItem onClick={handleClose}>Breadcrumb 4</MenuItem>
      </Menu>
      <Breadcrumbs aria-label="breadcrumbs">
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 1
        </Link>
        <IconButton color="primary" size="small" onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 5
        </Link>
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 6
        </Link>
      </Breadcrumbs>
    </React.Fragment>
  );
}
```

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: (theme.vars || theme).palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette.grey[100], 0.06),
      ...theme.applyStyles('dark', {
        backgroundColor: emphasize(theme.palette.grey[800], 0.06),
      }),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[100], 0.12),
      ...theme.applyStyles('dark', {
        backgroundColor: emphasize(theme.palette.grey[800], 0.12),
      }),
    },
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomizedBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Catalog" />
        <StyledBreadcrumb
          label="Accessories"
          deleteIcon={<ExpandMoreIcon />}
          onDelete={handleClick}
        />
      </Breadcrumbs>
    </div>
  );
}
```

## Integration with react-router

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Link, { LinkProps } from '@mui/material/Link';
import { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from 'react-router';

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItemButton component={RouterLink as any} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItemButton>
    </li>
  );
}

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

function Page() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography key={to} sx={{ color: 'text.primary' }}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default function RouterBreadcrumbs() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 360 }}>
        <Routes>
          <Route path="*" element={<Page />} />
        </Routes>
        <Box
          sx={{ bgcolor: 'background.paper', mt: 1 }}
          component="nav"
          aria-label="mailbox folders"
        >
          <List>
            <ListItemLink to="/inbox" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
              </List>
            </Collapse>
            <ListItemLink to="/trash" />
            <ListItemLink to="/spam" />
          </List>
        </Box>
      </Box>
    </MemoryRouter>
  );
}
```

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

Be sure to add a `aria-label` description on the `Breadcrumbs` component.

The accessibility of this component relies on:

- The set of links is structured using an ordered list (`<ol>` element).
- To prevent screen reader announcement of the visual separators between links, they are hidden with `aria-hidden`.
- A nav element labeled with `aria-label` identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate.

# Breadcrumbs API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Breadcrumbs](https://mui.com/material-ui/react-breadcrumbs/)

## Import

```jsx
import Breadcrumbs from '@mui/material/Breadcrumbs';
// or
import { Breadcrumbs } from '@mui/material';
```

## Props

| Name                | Type                                              | Default       | Required | Description                                                                             |
| ------------------- | ------------------------------------------------- | ------------- | -------- | --------------------------------------------------------------------------------------- |
| children            | `node`                                            | -             | No       |                                                                                         |
| classes             | `object`                                          | -             | No       | Override or extend the styles applied to the component.                                 |
| component           | `elementType`                                     | -             | No       |                                                                                         |
| expandText          | `string`                                          | `'Show path'` | No       |                                                                                         |
| itemsAfterCollapse  | `integer`                                         | `1`           | No       |                                                                                         |
| itemsBeforeCollapse | `integer`                                         | `1`           | No       |                                                                                         |
| maxItems            | `integer`                                         | `8`           | No       |                                                                                         |
| separator           | `node`                                            | `'/'`         | No       |                                                                                         |
| slotProps           | `{ collapsedIcon?: func \| object }`              | `{}`          | No       |                                                                                         |
| slots               | `{ CollapsedIcon?: elementType }`                 | `{}`          | No       |                                                                                         |
| sx                  | `Array<func \| object \| bool> \| func \| object` | -             | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLElement).

> Any other props supplied will be provided to the root element ([Typography](https://mui.com/material-ui/api/typography/)).

## Inheritance

While not explicitly documented above, the props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available on Breadcrumbs.

## Theme default props

You can use `MuiBreadcrumbs` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                              |
| ------------ | --------- | ---------------------------------------- |
| -            | li        | Styles applied to the li element.        |
| -            | ol        | Styles applied to the ol element.        |
| -            | root      | Styles applied to the root element.      |
| -            | separator | Styles applied to the separator element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Breadcrumbs/Breadcrumbs.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Breadcrumbs/Breadcrumbs.js)

# Link API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Breadcrumbs](https://mui.com/material-ui/react-breadcrumbs/)
- [Links](https://mui.com/material-ui/react-link/)

## Import

```jsx
import Link from '@mui/material/Link';
// or
import { Link } from '@mui/material';
```

## Props

| Name              | Type                                                                                                                                                             | Default     | Required | Description                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------------------------- |
| children          | `node`                                                                                                                                                           | -           | No       |                                                                                         |
| classes           | `object`                                                                                                                                                         | -           | No       | Override or extend the styles applied to the component.                                 |
| color             | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning' \| 'textPrimary' \| 'textSecondary' \| 'textDisabled' \| string`                        | `'primary'` | No       |                                                                                         |
| component         | `element type`                                                                                                                                                   | -           | No       |                                                                                         |
| sx                | `Array<func \| object \| bool> \| func \| object`                                                                                                                | -           | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| TypographyClasses | `object`                                                                                                                                                         | -           | No       |                                                                                         |
| underline         | `'always' \| 'hover' \| 'none'`                                                                                                                                  | `'always'`  | No       |                                                                                         |
| variant           | `'body1' \| 'body2' \| 'button' \| 'caption' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'inherit' \| 'overline' \| 'subtitle1' \| 'subtitle2' \| string` | `'inherit'` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLAnchorElement).

> Any other props supplied will be provided to the root element ([Typography](https://mui.com/material-ui/api/typography/)).

## Inheritance

While not explicitly documented above, the props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available on Link.

## Theme default props

You can use `MuiLink` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class        | Rule name       | Description                                                              |
| ------------------- | --------------- | ------------------------------------------------------------------------ |
| -                   | button          | Styles applied to the root element if `component="button"`.              |
| `.Mui-focusVisible` | -               | State class applied to the root element if the link is keyboard focused. |
| -                   | root            | Styles applied to the root element.                                      |
| -                   | underlineAlways | Styles applied to the root element if `underline="always"`.              |
| -                   | underlineHover  | Styles applied to the root element if `underline="hover"`.               |
| -                   | underlineNone   | Styles applied to the root element if `underline="none"`.                |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Link/Link.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Link/Link.js)

# Typography API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Breadcrumbs](https://mui.com/material-ui/react-breadcrumbs/)
- [Typography](https://mui.com/material-ui/react-typography/)

## Import

```jsx
import Typography from '@mui/material/Typography';
// or
import { Typography } from '@mui/material';
```

## Props

| Name                   | Type                                                                                                                                                             | Default     | Required | Description                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| align                  | `'center' \| 'inherit' \| 'justify' \| 'left' \| 'right'`                                                                                                        | `'inherit'` | No       |                                                                                                                                                                                                                         |
| children               | `node`                                                                                                                                                           | -           | No       |                                                                                                                                                                                                                         |
| classes                | `object`                                                                                                                                                         | -           | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| color                  | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'info' \| 'warning' \| 'textPrimary' \| 'textSecondary' \| 'textDisabled' \| string`                        | -           | No       |                                                                                                                                                                                                                         |
| component              | `elementType`                                                                                                                                                    | -           | No       |                                                                                                                                                                                                                         |
| gutterBottom           | `bool`                                                                                                                                                           | `false`     | No       |                                                                                                                                                                                                                         |
| noWrap                 | `bool`                                                                                                                                                           | `false`     | No       |                                                                                                                                                                                                                         |
| paragraph (deprecated) | `bool`                                                                                                                                                           | `false`     | No       | ⚠️ Use the `component` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| sx                     | `Array<func \| object \| bool> \| func \| object`                                                                                                                | -           | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                 |
| variant                | `'body1' \| 'body2' \| 'button' \| 'caption' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'inherit' \| 'overline' \| 'subtitle1' \| 'subtitle2' \| string` | `'body1'`   | No       |                                                                                                                                                                                                                         |
| variantMapping         | `object`                                                                                                                                                         | `{          |

h1: 'h1',
h2: 'h2',
h3: 'h3',
h4: 'h4',
h5: 'h5',
h6: 'h6',
subtitle1: 'h6',
subtitle2: 'h6',
body1: 'p',
body2: 'p',
inherit: 'p',
}` | No | |

> **Note**: The `ref` is forwarded to the root element (HTMLParagraphElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTypography` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name    | Description                                                  |
| ------------ | ------------ | ------------------------------------------------------------ |
| -            | alignCenter  | Styles applied to the root element if `align="center"`.      |
| -            | alignJustify | Styles applied to the root element if `align="justify"`.     |
| -            | alignLeft    | Styles applied to the root element if `align="left"`.        |
| -            | alignRight   | Styles applied to the root element if `align="right"`.       |
| -            | body1        | Styles applied to the root element if `variant="body1"`.     |
| -            | body2        | Styles applied to the root element if `variant="body2"`.     |
| -            | button       | Styles applied to the root element if `variant="button"`.    |
| -            | caption      | Styles applied to the root element if `variant="caption"`.   |
| -            | gutterBottom | Styles applied to the root element if `gutterBottom={true}`. |
| -            | h1           | Styles applied to the root element if `variant="h1"`.        |
| -            | h2           | Styles applied to the root element if `variant="h2"`.        |
| -            | h3           | Styles applied to the root element if `variant="h3"`.        |
| -            | h4           | Styles applied to the root element if `variant="h4"`.        |
| -            | h5           | Styles applied to the root element if `variant="h5"`.        |
| -            | h6           | Styles applied to the root element if `variant="h6"`.        |
| -            | inherit      | Styles applied to the root element if `variant="inherit"`.   |
| -            | noWrap       | Styles applied to the root element if `nowrap={true}`.       |
| -            | overline     | Styles applied to the root element if `variant="overline"`.  |
| -            | paragraph    | Styles applied to the root element if `paragraph={true}`.    |
| -            | root         | Styles applied to the root element.                          |
| -            | subtitle1    | Styles applied to the root element if `variant="subtitle1"`. |
| -            | subtitle2    | Styles applied to the root element if `variant="subtitle2"`. |

> **Note**: As a CSS utility, the `Typography` component also supports all system properties. You can use them as props directly on the component.

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Typography/Typography.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Typography/Typography.js)
