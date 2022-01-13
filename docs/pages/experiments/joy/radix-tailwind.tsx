import * as React from 'react';
import { GlobalStyles, experimental_sx as sx } from '@mui/system';
import { CssVarsProvider, createGetCssVar, styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

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

const MenuItem = styled('button')(({ theme }) => [
  sx({ py: 0.5, px: 1 }),
  {
    borderRadius: theme.vars.radius.sm,
    cursor: 'pointer',
    textAlign: 'initial',
    backgroundColor: 'initial',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid',
    },
  },
  theme.variants.text.neutral,
  theme.variants.outlinedHover.neutral,
  theme.variants.outlinedActive.neutral,
]);

const Menu = () => (
  <Box
    component="ul"
    sx={{
      width: 256,
      p: 1,
      listStyle: 'none',
      boxShadow: (theme) => theme.shadow.lg,
      borderRadius: (theme) => theme.vars.radius.sm,
      backgroundColor: (theme) => theme.vars.palette.background.level1,
    }}
  >
    <li>
      <MenuItem>
        <Typography>Back</Typography>
      </MenuItem>
    </li>
    <li>
      <MenuItem>
        <Typography>Forward</Typography>
      </MenuItem>
    </li>
    <Box
      role="none"
      sx={{
        borderBottom: '1px solid',
        borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
        borderRadius: 1,
        my: 1,
      }}
    />
    <li>
      <MenuItem>
        <Typography>Assign</Typography>
      </MenuItem>
    </li>
    <li>
      <MenuItem>
        <Typography>Priority</Typography>
      </MenuItem>
    </li>
    <li>
      <MenuItem>
        <Typography>Move to Project</Typography>
      </MenuItem>
    </li>
    <li>
      <MenuItem>
        <Typography>Duplicate</Typography>
      </MenuItem>
    </li>
    <Box
      role="none"
      sx={{
        borderBottom: '1px solid',
        borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
        borderRadius: 1,
        my: 1,
      }}
    />
    <li>
      <MenuItem>
        <Typography>Delete</Typography>
      </MenuItem>
    </li>
  </Box>
);

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
              },
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
              },
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
              // @ts-ignore
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
          gridAutoRows: '300px',
          '& > div': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
        <Box>3</Box>
        <Box>4</Box>
      </Box>
    </CssVarsProvider>
  );
}
