import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, createGetCssVar } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import PersonRounded from '@mui/icons-material/PersonRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import DeleteForeverRounded from '@mui/icons-material/DeleteForeverRounded';
import KeyboardCommandKey from '@mui/icons-material/KeyboardCommandKey';

const getCssVar = createGetCssVar();

const Dialog = () => {
  return (
    <Box
      sx={{
        mx: 'auto',
        p: 2,
        boxShadow: (theme) => theme.shadow.lg,
        maxWidth: '72%',
        borderRadius: (theme) => theme.vars.radius.sm,
        backgroundColor: (theme) => theme.vars.palette.background.level1,
      }}
    >
      <Typography
        gutterBottom
        component="h1"
        sx={{ fontWeight: (theme) => theme.vars.fontWeight.lg }}
      >
        Are you absolutely sure?
      </Typography>
      <Typography sx={{ color: getCssVar('palette-text-secondary') }}>
        This action cannot be undone. This will permanently delete your account and remove your data
        from our servers.
      </Typography>
      <Box sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" color="neutral">
          Cancel
        </Button>
        <Button variant="contained">Yes, Delete Account</Button>
      </Box>
    </Box>
  );
};

const Menu = () => (
  <Sheet sx={{ boxShadow: 'md', borderRadius: 'sm', width: 256 }}>
    <List
      role="menu"
      sx={(theme) => ({
        '--List-radius': '8px',
        '--List-item-radius': '8px',
        '--List-item-minHeight': '32px',
        '--List-padding': '8px',
        '--List-gap': '0px',
        '--List-divider-gap': '8px',
        '--List-item-paddingLeft': '6px',
        '--List-item-paddingRight': '6px',
        '--List-item-paddingY': '4px',
        '--List-decorator-width': '1.75rem',
        '--Icon-fontSize': '1.125rem',
        '& > .MuiListItemButton-root': {
          border: '1px solid transparent',
          ...theme.variants.outlinedHover.neutral,
          ...theme.variants.outlinedActive.neutral,
        },
      })}
    >
      <ListItemButton role="menuitem">
        <ListItemDecorator>
          <ArrowForwardRounded />
        </ListItemDecorator>
        <Typography>Back</Typography>
        <KeyboardCommandKey sx={{ ml: 'auto', color: 'text.tertiary' }} />
        <ArrowForwardRounded sx={{ color: 'text.tertiary' }} />
      </ListItemButton>
      <ListItemButton role="menuitem">
        <ListItemDecorator>
          <ArrowBackRounded />
        </ListItemDecorator>
        <Typography>Forward</Typography>
        <KeyboardCommandKey sx={{ ml: 'auto', color: 'text.tertiary' }} />
        <ArrowBackRounded sx={{ color: 'text.tertiary' }} />
      </ListItemButton>
      <ListDivider inset="gutter" />
      <ListItemButton role="menuitem">
        <ListItemDecorator>
          <PersonRounded />
        </ListItemDecorator>
        <Typography>Assign</Typography>
      </ListItemButton>
      <ListItemButton role="menuitem">
        <ListItemDecorator>
          <BarChartRounded />
        </ListItemDecorator>
        <Typography>Priority</Typography>
      </ListItemButton>
      <ListItemButton role="menuitem">
        <ListItemDecorator>
          <ArrowForwardRounded />
        </ListItemDecorator>
        <Typography>Move to Project</Typography>
      </ListItemButton>
      <ListItemButton role="menuitem">
        <ListItemDecorator>
          <ContentCopyRounded />
        </ListItemDecorator>
        <Typography>Duplicate</Typography>
      </ListItemButton>
      <ListDivider inset="gutter" />
      <ListItemButton role="menuitem">
        <ListItemDecorator>
          <DeleteForeverRounded />
        </ListItemDecorator>
        <Typography>Delete</Typography>
      </ListItemButton>
    </List>
  </Sheet>
);

const Progress = () => (
  <Box
    sx={(theme) => ({
      width: 232,
      height: 12,
      position: 'relative',
      borderRadius: '12px',
      backgroundColor: theme.vars.palette.background.body,
    })}
  >
    <Box
      sx={(theme) => ({
        position: 'absolute',
        width: '60%',
        top: 0,
        bottom: 0,
        left: 0,
        borderRadius: '12px',
        // @ts-ignore
        backgroundColor: theme.vars.palette.bar,
      })}
    />
  </Box>
);

declare module '@mui/joy/styles' {
  interface Palette {
    bar: string;
  }
}

export default function RadixTailwind() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                50: '#fdf2f8',
                100: '#fce7f3',
                200: '#fbcfe8',
                300: '#f9a8d4',
                400: '#f472b6',
                500: '#ec4899',
                600: '#db2777',
                700: '#be185d',
                800: '#9d174d',
                900: '#831843',
              },
              neutral: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
              },
              text: {
                primary: getCssVar('palette-neutral-900'),
                secondary: getCssVar('palette-neutral-500'),
                tertiary: getCssVar('palette-neutral-400'),
              },
              // @ts-ignore
              bar: getCssVar('palette-primary-500'),
            },
          },
          dark: {
            palette: {
              primary: {
                50: '#fdf2f8',
                100: '#fce7f3',
                200: '#fbcfe8',
                300: '#f9a8d4',
                400: '#f472b6',
                500: '#ec4899',
                600: '#db2777',
                700: '#be185d',
                800: '#9d174d',
                900: '#831843',
              },
              neutral: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
                outlinedHoverBg: getCssVar('palette-neutral-700'),
              },
              text: {
                primary: getCssVar('palette-neutral-50'),
                secondary: getCssVar('palette-neutral-400'),
                tertiary: getCssVar('palette-neutral-500'),
              },
              // @ts-ignore
              bar: '#fff',
            },
          },
        },
        fontWeight: {
          lg: 600,
        },
        shadow: {
          xs: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
          sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
          md: '0px 1px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
          lg: '0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
          xl: '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
        variants: {
          outlinedActive: {
            neutral: {
              '&:active': {
                // This is how to remove default theme style
                // backgroundColor: null, // or undefined
              },
            },
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.size === 'md' && {
                  paddingLeft: '0.75rem',
                  paddingRight: '0.75rem',
                }),
                '[data-mui-color-scheme="dark"] &': {
                  '--joy-palette-neutral-outlinedBg': getCssVar('palette-neutral-700'),
                  '--joy-palette-neutral-outlinedHoverBg': getCssVar('palette-neutral-700'),
                  '--joy-palette-neutral-outlinedActiveBg': getCssVar('palette-neutral-800'),
                },
              }),
            },
          },
          MuiSwitch: {
            styleOverrides: {
              root: {
                '--Switch-track-width': '44px',
                '--Switch-thumb-size': '20px',
                color: getCssVar('palette-neutral-lightHoverBg'),
                '&:hover': {
                  color: getCssVar('palette-neutral-lightActiveBg'),
                },
              },
            },
          },
        },
      }}
    >
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
          },
        }}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(300px, 1fr))',
          '& > div': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            gap: 2,
          },
          '& > div:nth-child(even)': {
            backgroundColor: (theme) => theme.vars.palette.primary[900],
          },
          '& > div:nth-child(odd)': {
            backgroundColor: (theme) => theme.vars.palette.primary[50],
          },
        }}
      >
        <Box>
          <Dialog />
        </Box>
        <Box data-mui-color-scheme="dark">
          <Dialog />
        </Box>
        <Box>
          <Menu />
        </Box>
        <Box data-mui-color-scheme="dark">
          <Menu />
        </Box>
        <Box>
          <Switch />
          <Switch defaultChecked />
        </Box>
        <Box data-mui-color-scheme="dark">
          <Switch />
          <Switch defaultChecked />
        </Box>
        <Box>
          <Progress />
        </Box>
        <Box data-mui-color-scheme="dark">
          <Progress />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
