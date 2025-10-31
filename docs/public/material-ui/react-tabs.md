---
productId: material-ui
title: React Tabs component
components: Tabs, Tab, TabScrollButton, TabContext, TabList, TabPanel
githubLabel: 'scope: tabs'
materialDesign: https://m2.material.io/components/tabs
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
githubSource: packages/mui-material/src/Tabs
---

# Tabs

Tabs make it easy to explore and switch between different views.

Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.

## Introduction

Tabs are implemented using a collection of related components:

- `<Tab />` - the tab element itself. Clicking on a tab displays its corresponding panel.
- `<Tabs />` - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
```

## Basics

```jsx
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
```

## Experimental API

`@mui/lab` offers utility components that inject props to implement accessible tabs
following [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):

- `<TabList />` - the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.
- `<TabPanel />` - the card that hosts the content associated with a tab.
- `<TabContext />` - the top-level component that wraps the Tab List and Tab Panel components.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
```

## Wrapped labels

Long labels will automatically wrap on tabs.
If the label is too long for the tab, it will overflow, and the text will not be visible.

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabsWrappedLabel() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab
          value="one"
          label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
          wrapped
        />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
}
```

## Colored tab

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
}
```

## Disabled tab

A tab can be disabled by setting the `disabled` prop.

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function DisabledTabs() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
      <Tab label="Active" />
      <Tab label="Disabled" disabled />
      <Tab label="Active" />
    </Tabs>
  );
}
```

## Fixed tabs

Fixed tabs should be used with a limited number of tabs, and when a consistent placement will aid muscle memory.

### Full width

The `variant="fullWidth"` prop should be used for smaller views.

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item Three
      </TabPanel>
    </Box>
  );
}
```

### Centered

The `centered` prop should be used for larger views.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Box>
  );
}
```

## Scrollable tabs

### Automatic scroll buttons

Use the `variant="scrollable"` and `scrollButtons="auto"` props to display left and right scroll buttons on desktop that are hidden on mobile:

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
  );
}
```

### Forced scroll buttons

Apply `scrollButtons={true}` and the `allowScrollButtonsMobile` prop to display the left and right scroll buttons on all viewports:

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonForce() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
  );
}
```

If you want to make sure the buttons are always visible, you should customize the opacity.

```css
.MuiTabs-scrollButtons.Mui-disabled {
  opacity: 0.3;
}
```

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function ScrollableTabsButtonVisible() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: { xs: 320, sm: 480 },
        bgcolor: 'background.paper',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
  );
}
```

### Prevent scroll buttons

Left and right scroll buttons are never be presented with `scrollButtons={false}`.
All scrolling must be initiated through user agent scrolling mechanisms (for example left/right swipe, shift mouse wheel, etc.)

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonPrevent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
  );
}
```

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: '#fff' }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Tab 1" />
          <AntTab label="Tab 2" />
          <AntTab label="Tab 3" />
        </AntTabs>
        <Box sx={{ p: 3 }} />
      </Box>
      <Box sx={{ bgcolor: '#2e1534' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Workflows" />
          <StyledTab label="Datasets" />
          <StyledTab label="Connections" />
        </StyledTabs>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
}
```

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/?path=/docs/tabs-introduction--docs).

## Vertical tabs

To make vertical tabs instead of default horizontal ones, there is `orientation="vertical"`:

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
```

Note that you can restore the scrollbar with `visibleScrollbar`.

## Nav tabs

By default, tabs use a `button` element, but you can provide your custom tag or component. Here's an example of implementing tabbed navigation:

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <LinkTab label="Page One" href="/drafts" />
        <LinkTab label="Page Two" href="/trash" />
        <LinkTab label="Page Three" href="/spam" />
      </Tabs>
    </Box>
  );
}
```

### Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server.
The `Tab` component provides the `component` prop to handle this use case.
Here is a [more detailed guide](/material-ui/integrations/routing/#tabs).

## Icon tabs

Tab labels may be either all icons or all text.

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
      <Tab icon={<PhoneIcon />} aria-label="phone" />
      <Tab icon={<FavoriteIcon />} aria-label="favorite" />
      <Tab icon={<PersonPinIcon />} aria-label="person" />
    </Tabs>
  );
}
```

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
      <Tab icon={<PhoneIcon />} label="RECENTS" />
      <Tab icon={<FavoriteIcon />} label="FAVORITES" />
      <Tab icon={<PersonPinIcon />} label="NEARBY" />
    </Tabs>
  );
}
```

## Icon position

By default, the icon is positioned at the `top` of a tab. Other supported positions are `start`, `end`, `bottom`.

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';

export default function IconPositionTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
    >
      <Tab icon={<PhoneIcon />} label="top" />
      <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="start" />
      <Tab icon={<FavoriteIcon />} iconPosition="end" label="end" />
      <Tab icon={<PersonPinIcon />} iconPosition="bottom" label="bottom" />
    </Tabs>
  );
}
```

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

The following steps are needed in order to provide necessary information for assistive technologies:

1. Label `Tabs` via `aria-label` or `aria-labelledby`.
2. `Tab`s need to be connected to their
   corresponding `[role="tabpanel"]` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

An example for the current implementation can be found in the demos on this page. We've also published [an experimental API](#experimental-api) in `@mui/lab` that does not require
extra work.

### Keyboard navigation

The components implement keyboard navigation using the "manual activation" behavior.
If you want to switch to the "selection automatically follows focus" behavior you have to pass `selectionFollowsFocus` to the `Tabs` component.
The WAI-ARIA authoring practices have a detailed guide on [how to decide when to make selection automatically follow focus](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#x6-4-deciding-when-to-make-selection-automatically-follow-focus).

#### Demo

The following two demos only differ in their keyboard navigation behavior.
Focus a tab and navigate with arrow keys to notice the difference, for example <kbd class="key">Arrow Left</kbd>.

```jsx
/* Tabs where selection follows focus */
<Tabs selectionFollowsFocus />
```

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function AccessibleTabs1() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Box>
  );
}
```

```jsx
/* Tabs where each tab needs to be selected manually */
<Tabs />
```

```tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function AccessibleTabs2() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Box>
  );
}
```

# Tab API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Tabs](https://mui.com/material-ui/react-tabs/)

## Import

```jsx
import Tab from '@mui/material/Tab';
// or
import { Tab } from '@mui/material';
```

## Props

| Name               | Type                                              | Default | Required | Description                                                                             |
| ------------------ | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children           | `unsupportedProp`                                 | -       | No       |                                                                                         |
| classes            | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| disabled           | `bool`                                            | `false` | No       |                                                                                         |
| disableFocusRipple | `bool`                                            | `false` | No       |                                                                                         |
| disableRipple      | `bool`                                            | `false` | No       |                                                                                         |
| icon               | `element \| string`                               | -       | No       |                                                                                         |
| iconPosition       | `'bottom' \| 'end' \| 'start' \| 'top'`           | `'top'` | No       |                                                                                         |
| label              | `node`                                            | -       | No       |                                                                                         |
| sx                 | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| value              | `any`                                             | -       | No       |                                                                                         |
| wrapped            | `bool`                                            | `false` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on Tab.

## Theme default props

You can use `MuiTab` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class    | Rule name          | Description                                                                                                    |
| --------------- | ------------------ | -------------------------------------------------------------------------------------------------------------- |
| `.Mui-disabled` | -                  | State class applied to the root element if `disabled={true}` (controlled by the Tabs component).               |
| -               | fullWidth          | Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component).                   |
| -               | icon               | Styles applied to the `icon` HTML element if both `icon` and `label` are provided.                             |
| -               | iconWrapper        | Styles applied to the `icon` HTML element if both `icon` and `label` are provided.                             |
| -               | labelIcon          | Styles applied to the root element if both `icon` and `label` are provided.                                    |
| -               | root               | Styles applied to the root element.                                                                            |
| `.Mui-selected` | -                  | State class applied to the root element if `selected={true}` (controlled by the Tabs component).               |
| -               | textColorInherit   | Styles applied to the root element if the parent [`Tabs`](/material-ui/api/tabs/) has `textColor="inherit"`.   |
| -               | textColorPrimary   | Styles applied to the root element if the parent [`Tabs`](/material-ui/api/tabs/) has `textColor="primary"`.   |
| -               | textColorSecondary | Styles applied to the root element if the parent [`Tabs`](/material-ui/api/tabs/) has `textColor="secondary"`. |
| -               | wrapped            | Styles applied to the root element if `wrapped={true}`.                                                        |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Tab/Tab.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Tab/Tab.js)

# TabContext API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Tabs](https://mui.com/material-ui/react-tabs/)

## Import

```jsx
import TabContext from '@mui/lab/TabContext';
// or
import { TabContext } from '@mui/lab';
```

## Props

| Name     | Type               | Default | Required | Description |
| -------- | ------------------ | ------- | -------- | ----------- |
| value    | `number \| string` | -       | Yes      |             |
| children | `node`             | -       | No       |             |

> **Note**: The `ref` is forwarded to the root element.

> Any other props supplied will be provided to the root element (native element).

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TabContext/TabContext.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TabContext/TabContext.js)

# TabList API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Tabs](https://mui.com/material-ui/react-tabs/)

## Import

```jsx
import TabList from '@mui/lab/TabList';
// or
import { TabList } from '@mui/lab';
```

## Props

| Name     | Type   | Default | Required | Description |
| -------- | ------ | ------- | -------- | ----------- |
| children | `node` | -       | No       |             |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Tabs](https://mui.com/material-ui/api/tabs/)).

## Inheritance

While not explicitly documented above, the props of the [Tabs](https://mui.com/material-ui/api/tabs/) component are also available on TabList.

## CSS

### Rule name

| Global class | Rule name               | Description                                                                                     |
| ------------ | ----------------------- | ----------------------------------------------------------------------------------------------- |
| -            | centered                | Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`.    |
| -            | fixed                   | Styles applied to the tablist element if `!variant="scrollable"`.                               |
| -            | flexContainer           |                                                                                                 |
| -            | flexContainerVertical   |                                                                                                 |
| -            | hideScrollbar           | Styles applied to the tablist element if `variant="scrollable"` and `visibleScrollbar={false}`. |
| -            | indicator               | Styles applied to the TabIndicator component.                                                   |
| -            | list                    | Styles applied to the list element.                                                             |
| -            | root                    | Styles applied to the root element.                                                             |
| -            | scrollableX             | Styles applied to the tablist element if `variant="scrollable"` and `orientation="horizontal"`. |
| -            | scrollableY             | Styles applied to the tablist element if `variant="scrollable"` and `orientation="vertical"`.   |
| -            | scrollButtons           | Styles applied to the ScrollButtonComponent component.                                          |
| -            | scrollButtonsHideMobile | Styles applied to the ScrollButtonComponent component if `allowScrollButtonsMobile={true}`.     |
| -            | scroller                | Styles applied to the tablist element.                                                          |
| -            | vertical                | Styles applied to the root element if `orientation="vertical"`.                                 |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TabList/TabList.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TabList/TabList.js)

# TabPanel API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Tabs](https://mui.com/material-ui/react-tabs/)

## Import

```jsx
import TabPanel from '@mui/lab/TabPanel';
// or
import { TabPanel } from '@mui/lab';
```

## Props

| Name        | Type                                              | Default | Required | Description                                                                             |
| ----------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| value       | `number \| string`                                | -       | Yes      |                                                                                         |
| children    | `node`                                            | -       | No       |                                                                                         |
| classes     | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| keepMounted | `bool`                                            | `false` | No       |                                                                                         |
| sx          | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## CSS

### Rule name

| Global class | Rule name | Description                                                       |
| ------------ | --------- | ----------------------------------------------------------------- |
| -            | hidden    | State class applied to the root `div` element if `hidden={true}`. |
| -            | root      | Styles applied to the root element.                               |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TabPanel/TabPanel.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TabPanel/TabPanel.js)

# TabScrollButton API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Tabs](https://mui.com/material-ui/react-tabs/)

## Import

```jsx
import TabScrollButton from '@mui/material/TabScrollButton';
// or
import { TabScrollButton } from '@mui/material';
```

## Props

| Name        | Type                                                                               | Default | Required | Description                                                                             |
| ----------- | ---------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| direction   | `'left' \| 'right'`                                                                | -       | Yes      |                                                                                         |
| orientation | `'horizontal' \| 'vertical'`                                                       | -       | Yes      |                                                                                         |
| children    | `node`                                                                             | -       | No       |                                                                                         |
| classes     | `object`                                                                           | -       | No       | Override or extend the styles applied to the component.                                 |
| disabled    | `bool`                                                                             | `false` | No       |                                                                                         |
| slotProps   | `{ endScrollButtonIcon?: func \| object, startScrollButtonIcon?: func \| object }` | `{}`    | No       |                                                                                         |
| slots       | `{ EndScrollButtonIcon?: elementType, StartScrollButtonIcon?: elementType }`       | `{}`    | No       |                                                                                         |
| sx          | `Array<func \| object \| bool> \| func \| object`                                  | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTabScrollButton` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class    | Rule name | Description                                                     |
| --------------- | --------- | --------------------------------------------------------------- |
| `.Mui-disabled` | -         | State class applied to the root element if `disabled={true}`.   |
| -               | root      | Styles applied to the root element.                             |
| -               | vertical  | Styles applied to the root element if `orientation="vertical"`. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/TabScrollButton/TabScrollButton.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/TabScrollButton/TabScrollButton.js)

# Tabs API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Tabs](https://mui.com/material-ui/react-tabs/)

## Import

```jsx
import Tabs from '@mui/material/Tabs';
// or
import { Tabs } from '@mui/material';
```

## Props

| Name                               | Type                                                                                                                                                                                                                                                                                                | Default           | Required | Description                                                                                                                                                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action                             | `ref`                                                                                                                                                                                                                                                                                               | -                 | No       |                                                                                                                                                                                                                                       |
| allowScrollButtonsMobile           | `bool`                                                                                                                                                                                                                                                                                              | `false`           | No       |                                                                                                                                                                                                                                       |
| aria-label                         | `string`                                                                                                                                                                                                                                                                                            | -                 | No       |                                                                                                                                                                                                                                       |
| aria-labelledby                    | `string`                                                                                                                                                                                                                                                                                            | -                 | No       |                                                                                                                                                                                                                                       |
| centered                           | `bool`                                                                                                                                                                                                                                                                                              | `false`           | No       |                                                                                                                                                                                                                                       |
| children                           | `node`                                                                                                                                                                                                                                                                                              | -                 | No       |                                                                                                                                                                                                                                       |
| classes                            | `object`                                                                                                                                                                                                                                                                                            | -                 | No       | Override or extend the styles applied to the component.                                                                                                                                                                               |
| component                          | `elementType`                                                                                                                                                                                                                                                                                       | -                 | No       |                                                                                                                                                                                                                                       |
| indicatorColor                     | `'primary' \| 'secondary' \| string`                                                                                                                                                                                                                                                                | `'primary'`       | No       |                                                                                                                                                                                                                                       |
| onChange                           | `function(event: React.SyntheticEvent, value: any) => void`                                                                                                                                                                                                                                         | -                 | No       |                                                                                                                                                                                                                                       |
| orientation                        | `'horizontal' \| 'vertical'`                                                                                                                                                                                                                                                                        | `'horizontal'`    | No       |                                                                                                                                                                                                                                       |
| ScrollButtonComponent (deprecated) | `elementType`                                                                                                                                                                                                                                                                                       | `TabScrollButton` | No       | ⚠️ use the `slots.scrollButtons` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| scrollButtons                      | `'auto' \| false \| true`                                                                                                                                                                                                                                                                           | `'auto'`          | No       |                                                                                                                                                                                                                                       |
| selectionFollowsFocus              | `bool`                                                                                                                                                                                                                                                                                              | -                 | No       |                                                                                                                                                                                                                                       |
| slotProps                          | `{ endScrollButtonIcon?: func \| object, indicator?: func \| object, list?: func \| object, root?: func \| object, scrollbar?: func \| object, scrollButtons?: func \| object, scroller?: func \| object, startScrollButtonIcon?: func \| object }`                                                 | `{}`              | No       |                                                                                                                                                                                                                                       |
| slots                              | `{ endScrollButtonIcon?: elementType, EndScrollButtonIcon?: elementType, indicator?: elementType, list?: elementType, root?: elementType, scrollbar?: elementType, scrollButtons?: elementType, scroller?: elementType, startScrollButtonIcon?: elementType, StartScrollButtonIcon?: elementType }` | `{}`              | No       |                                                                                                                                                                                                                                       |
| sx                                 | `Array<func \| object \| bool> \| func \| object`                                                                                                                                                                                                                                                   | -                 | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                               |
| TabIndicatorProps (deprecated)     | `object`                                                                                                                                                                                                                                                                                            | `{}`              | No       | ⚠️ use the `slotProps.indicator` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| TabScrollButtonProps (deprecated)  | `object`                                                                                                                                                                                                                                                                                            | `{}`              | No       | ⚠️ use the `slotProps.scrollButtons` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| textColor                          | `'inherit' \| 'primary' \| 'secondary'`                                                                                                                                                                                                                                                             | `'primary'`       | No       |                                                                                                                                                                                                                                       |
| value                              | `any`                                                                                                                                                                                                                                                                                               | -                 | No       |                                                                                                                                                                                                                                       |
| variant                            | `'fullWidth' \| 'scrollable' \| 'standard'`                                                                                                                                                                                                                                                         | `'standard'`      | No       |                                                                                                                                                                                                                                       |
| visibleScrollbar                   | `bool`                                                                                                                                                                                                                                                                                              | `false`           | No       |                                                                                                                                                                                                                                       |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTabs` to change the default props of this component with the theme.

## Slots

| Name                  | Default              | Class                    | Description                                          |
| --------------------- | -------------------- | ------------------------ | ---------------------------------------------------- |
| root                  | `div`                | `.MuiTabs-root`          | The component used for the popper.                   |
| scroller              | `div`                | `.MuiTabs-scroller`      | The component used for the scroller.                 |
| list                  | `div`                | `.MuiTabs-list`          | The component used for the flex container.           |
| scrollbar             | `ScrollbarSize`      | -                        | The component used for the scroller.                 |
| indicator             | `span`               | `.MuiTabs-indicator`     | The component used for the tab indicator.            |
| scrollButtons         | `TabScrollButton`    | `.MuiTabs-scrollButtons` | The component used for the scroll button.            |
| startScrollButtonIcon | `KeyboardArrowLeft`  | -                        | The component used for the start scroll button icon. |
| endScrollButtonIcon   | `KeyboardArrowRight` | -                        | The component used for the end scroll button icon.   |

## CSS

### Rule name

| Global class | Rule name               | Description                                                                                     |
| ------------ | ----------------------- | ----------------------------------------------------------------------------------------------- |
| -            | centered                | Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`.    |
| -            | fixed                   | Styles applied to the tablist element if `!variant="scrollable"`.                               |
| -            | flexContainer           |                                                                                                 |
| -            | flexContainerVertical   |                                                                                                 |
| -            | hideScrollbar           | Styles applied to the tablist element if `variant="scrollable"` and `visibleScrollbar={false}`. |
| -            | scrollableX             | Styles applied to the tablist element if `variant="scrollable"` and `orientation="horizontal"`. |
| -            | scrollableY             | Styles applied to the tablist element if `variant="scrollable"` and `orientation="vertical"`.   |
| -            | scrollButtonsHideMobile | Styles applied to the ScrollButtonComponent component if `allowScrollButtonsMobile={true}`.     |
| -            | vertical                | Styles applied to the root element if `orientation="vertical"`.                                 |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Tabs/Tabs.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Tabs/Tabs.js)
