import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Drawer from '@mui/joy/Drawer';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import MarkAsUnreadRoundedIcon from '@mui/icons-material/MarkAsUnreadRounded';
import MenuIcon from '@mui/icons-material/Menu';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

// custom
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Mails from './components/Mails';
import EmailContent from './components/EmailContent';
import WriteEmail from './components/WriteEmail';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function EmailExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="soft"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <MailRoundedIcon />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Email
            </Typography>
          </Box>
          <Input
            size="sm"
            variant="outlined"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton
                variant="outlined"
                color="neutral"
                sx={{ bgcolor: 'background.level1' }}
              >
                <Typography fontWeight="lg" fontSize="sm" textColor="text.icon">
                  ⌘ + k
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: '500px',
              display: {
                xs: 'none',
                sm: 'flex',
              },
              boxShadow: 'sm',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              <SearchRoundedIcon />
            </IconButton>

            <IconButton
              size="sm"
              variant="soft"
              color="neutral"
              component="a"
              href="/blog/first-look-at-joy/"
            >
              <BookRoundedIcon />
            </IconButton>
            <Dropdown>
              <MenuButton
                size="sm"
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'soft', color: 'neutral' } }}
              >
                <GridViewRoundedIcon />
              </MenuButton>
              <Menu size="sm" sx={{ zIndex: '999999' }}>
                <MenuItem selected>
                  <ListItemButton
                    selected
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/email/"
                  >
                    <ListItemContent>
                      <Typography level="title-sm">Email</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </MenuItem>
                <MenuItem>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/team/"
                  >
                    <ListItemContent>
                      <Typography level="title-sm">Team</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </MenuItem>
                <MenuItem>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/files/"
                  >
                    <ListItemContent>
                      <Typography level="title-sm">Files</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </MenuItem>
              </Menu>
            </Dropdown>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography level="title-lg" textColor="text.secondary">
                My inbox
              </Typography>
              <Typography level="title-sm" textColor="text.tertiary">
                5 emails
              </Typography>
            </Box>
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(true)}
            >
              Compose email
            </Button>
            <Drawer
              hideBackdrop
              size="lg"
              variant="plain"
              anchor="bottom"
              open={open}
              onClose={() => setOpen(false)}
              slotProps={{
                content: {
                  sx: {
                    p: { md: 3, sm: 0 },
                    boxShadow: 'none',
                    background: 'transparent',
                  },
                },
              }}
            >
              <WriteEmail />
            </Drawer>
          </Box>
          <Mails />
        </Layout.SidePane>
        <Layout.Main>
          <EmailContent />
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
