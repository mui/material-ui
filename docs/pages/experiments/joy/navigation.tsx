import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Sheet from '@mui/joy/Sheet';
import Settings from '@mui/icons-material/Settings';
import HomeRounded from '@mui/icons-material/HomeRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import TodayRounded from '@mui/icons-material/TodayRounded';
import InboxRounded from '@mui/icons-material/InboxRounded';
import AnalyticsRounded from '@mui/icons-material/AnalyticsRounded';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      variant="light"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </IconButton>
  );
};

export default function Navigation() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                50: '#eef2ff',
                100: '#e0e7ff',
                200: '#c7d2fe',
                300: '#a5b4fc',
                400: '#818cf8',
                500: '#6366f1',
                600: '#4f46e5',
                700: '#4338ca',
                800: '#3730a3',
                900: '#312e81',
              },
              neutral: {
                50: '#f8fafc',
                100: '#f1f5f9',
                200: '#e2e8f0',
                300: '#cbd5e1',
                400: '#94a3b8',
                500: '#64748b',
                600: '#475569',
                700: '#334155',
                800: '#1e293b',
                900: '#0f172a',
                containedBg: 'var(--joy-palette-neutral-700)',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                50: '#eef2ff',
                100: '#e0e7ff',
                200: '#c7d2fe',
                300: '#a5b4fc',
                400: '#818cf8',
                500: '#6366f1',
                600: '#4f46e5',
                700: '#4338ca',
                800: '#3730a3',
                900: '#312e81',
              },
              neutral: {
                50: '#f8fafc',
                100: '#f1f5f9',
                200: '#e2e8f0',
                300: '#cbd5e1',
                400: '#94a3b8',
                500: '#64748b',
                600: '#475569',
                700: '#334155',
                800: '#1e293b',
                900: '#0f172a',
              },
            },
          },
        },
        variants: {
          containedOverride: {
            neutral: {
              '--variant-lightBg': 'var(--joy-palette-neutral-800)',
            },
          },
        },
        components: {
          MuiChip: {
            defaultProps: {
              color: 'neutral',
            },
          },
          MuiIconButton: {
            defaultProps: {
              color: 'neutral',
            },
          },
        },
      }}
    >
      <GlobalStyles
        styles={{ body: { margin: 0, backgroundColor: 'var(--joy-palette-background-level1)' } }}
      />
      <Box sx={{ position: 'fixed', top: '1rem', left: '1rem' }}>
        <ColorSchemePicker />
      </Box>
      <Button
        size="sm"
        variant="light"
        color="neutral"
        component="a"
        href="https://dribbble.com/shots/10907005-Sidebar-navigation"
        target="_blank"
        rel="noreferrer noopener"
        sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
      >
        Design source
      </Button>
      <Box
        sx={{
          maxWidth: { md: 1152, xl: 1536 },
          py: 3,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 300px)',
          gap: 2,
        }}
      >
        {(
          [
            {},
            { enableVariantOverride: true, variant: 'contained', color: 'neutral' },
            { enableVariantOverride: true, variant: 'contained', color: 'primary' },
          ] as const
        ).map((item, index) => (
          <Sheet
            key={index}
            {...item}
            sx={{
              boxShadow: 'md',
              borderRadius: 'sm',
              p: 1.5,
              minHeight: 700,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <List sx={{ '--List-item-radius': '6px', flexGrow: 1 }}>
              <ListItem>
                <ListItemButton variant="light" selected>
                  <ListItemDecorator>
                    <HomeRounded />
                  </ListItemDecorator>
                  Dashboard
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <GroupsRounded />
                  </ListItemDecorator>
                  Team
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <TodayRounded />
                  </ListItemDecorator>
                  <ListItemContent>Calendar</ListItemContent>
                  <Chip variant="light" size="sm">
                    4
                  </Chip>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <InboxRounded />
                  </ListItemDecorator>
                  <ListItemContent>Documents</ListItemContent>
                  <Chip variant="light" size="sm">
                    5
                  </Chip>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <AnalyticsRounded />
                  </ListItemDecorator>
                  Reports
                </ListItemButton>
              </ListItem>
              <ListItem nested>
                <Typography
                  level="body3"
                  fontWeight="md"
                  textTransform="uppercase"
                  letterSpacing="md"
                  mt={2}
                >
                  Projects
                </Typography>
                <List>
                  <ListItem>
                    <ListItemButton>Website redesign</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>GraphQL API</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Customer migration guides</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Profit sharing program</ListItemButton>
                  </ListItem>
                </List>
              </ListItem>
            </List>
            <List component="nav" sx={{ flexGrow: 0, mx: -1, '--List-decorator-width': '3.5rem' }}>
              <ListItem>
                <ListItemDecorator>
                  <Avatar src="/static/images/avatar/1.jpg" alt="Dianne Robertson" />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography fontSize="sm" fontWeight="md">
                    Dianne Robertson
                  </Typography>
                  <Link variant="text" href="#unknown" level="body2">
                    View profile
                  </Link>
                </ListItemContent>
                <IconButton variant="text">
                  <Settings />
                </IconButton>
              </ListItem>
            </List>
          </Sheet>
        ))}
      </Box>
    </CssVarsProvider>
  );
}
