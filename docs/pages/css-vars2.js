import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { styled } from '@mui/system';
import CssVarsProvider, { useModeToggle } from 'docs/src/cssVars/CssVarsProvider';

const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  200: '#E5E8EC',
  300: '#D7DCE1',
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#7F8E9D',
  700: '#46505A', // contrast 8.21:1
  800: '#2F3A45', // contrast 11.58:1
  900: '#20262D',
};

const Button = styled('button')(({ theme }) => ({
  padding: '8px 12px',
  border: 0,
  backgroundColor: theme.vars['palette-primary-main'],
  color: theme.vars['palette-primary-contrastText'],
  fontSize: theme.vars['typography-button-fontSize'],
  cursor: 'pointer',
}));

const Content = () => {
  const { allModes, mode, setMode } = useModeToggle();
  return (
    <div>
      <Button
        onClick={() => {
          const index = allModes.indexOf(mode);
          const nextMode = allModes[index + 1 > allModes.length - 1 ? 0 : index + 1];
          setMode(nextMode);
        }}
      >
        Switch mode
      </Button>
    </div>
  );
};

export default function CssVars() {
  return (
    <CssVarsProvider
      preferSystem
      themes={{
        light: {
          palette: {
            primary: {
              main: '#ff5252',
              contrastText: '#fff',
            },
            background: grey[100],
          },
          typography: {
            button: {
              fontSize: 16,
            },
          },
        },
        dark: {
          palette: {
            primary: {
              main: '#8a2121',
              contrastText: '#fff',
            },
            background: grey[900],
          },
          typography: {
            button: {
              fontSize: 16,
            },
          },
        },
        blue: {
          palette: {
            primary: {
              main: '#8a2121',
              contrastText: '#fff',
            },
            background: grey[900],
          },
          typography: {
            button: {
              fontFamily: '',
              fontSize: 16,
            },
          },
        },
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          body: {
            backgroundColor: theme.vars['palette-background'],
          },
        })}
      />
      <Content />
    </CssVarsProvider>
  );
}
