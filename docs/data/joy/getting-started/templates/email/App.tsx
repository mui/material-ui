import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';

// Icons import
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

// custom
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Mails from './components/Mails';
import EmailContent from './components/EmailContent';
import WriteEmail from './components/WriteEmail';
import Header from './components/Header';

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
        <Layout.Header
          sx={{ backgroundColor: 'var(--joy-palette-background-surface)' }}
        >
          <Header />
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
              disableAutoFocus
              disableEnforceFocus
              disableScrollLock
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
