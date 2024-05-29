import * as React from 'react';
import { styled } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import OptionsMenu from './OptionsMenu';

interface NavBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const Toolbar = styled(MuiToolbar)({
  maxWidth: 1538,
  width: '100%',
  padding: '16px 16px 0 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  '& .MuiTabs-flexContainer': {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

function a11yProps(index: number, selectedIndex: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    'aria-selected': selectedIndex === index,
    role: 'tab',
  };
}

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {/* This would be replaced when the content content of other tabs is added */}
      {value === index && <div />}
    </div>
  );
}

export default function Navbar({ mode, toggleColorMode }: NavBarProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
      })}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          justifyContent={{ xs: 'flex-end', md: 'space-between' }}
          flexGrow={1}
          sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }}
        >
          <NavbarBreadcrumbs />
          <Stack direction="row" gap={1}>
            <MenuButton showBadge ariaLabel="Notification menu button">
              <NotificationsRoundedIcon />
            </MenuButton>
            <OptionsMenu />
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexGrow={1}
          sx={{ width: '100%', display: { sm: 'flex', md: 'none' } }}
        >
          <NavbarBreadcrumbs />
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>
          <SideNav
            open={open}
            toggleDrawer={toggleDrawer}
            mode={mode}
            toggleColorMode={toggleColorMode}
          />
        </Stack>
        <Tabs value={value} onChange={handleChange} aria-label="navbar tabs">
          <Tab label="Home" {...a11yProps(0, value)} />
          <Tab label="Analytics" {...a11yProps(1, value)} />
          <Tab label="Clients" {...a11yProps(2, value)} />
        </Tabs>
      </Toolbar>
      <TabPanel value={value} index={0}>
        Home Content
      </TabPanel>
      <TabPanel value={value} index={1}>
        Analytics Content
      </TabPanel>
      <TabPanel value={value} index={2}>
        Clients Content
      </TabPanel>
    </AppBar>
  );
}
