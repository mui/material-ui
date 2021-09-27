import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Stack from '@mui/material/Stack';
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

const InternalText = (props) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    setCount((c) => c + 1);
  }, [setCount]);
  return <div {...props}>I render {count} times</div>;
};

const Text = styled(InternalText)(({ theme }) => ({
  color: theme.vars['palette-text'],
  fontFamily: 'IBM Plex Sans',
}));

const Content = () => {
  const { allModes, mode, setMode } = useModeToggle();
  return (
    <Button
      onClick={() => {
        const index = allModes.indexOf(mode);
        const nextMode = allModes[index + 1 > allModes.length - 1 ? 0 : index + 1];
        setMode(nextMode);
      }}
    >
      This is &apos;{mode}&apos; mode, click to switch
    </Button>
  );
};

export default function CssVars() {
  return (
    <React.Fragment>
      <CssVarsProvider
        themes={{
          light: {
            palette: {
              primary: {
                main: '#ff5252',
                contrastText: '#fff',
              },
              text: grey[900],
              background: grey[100],
            },
          },
          dark: {
            palette: {
              primary: {
                main: '#8a2121',
                contrastText: '#fff',
              },
              text: grey[200],
              background: grey[900],
            },
          },
          blue: {
            palette: {
              primary: {
                main: '#007FFF',
                contrastText: '#fff',
              },
              text: '#C2E0FF',
              background: '#003A75',
            },
          },
          trueDark: {
            palette: {
              primary: {
                main: '#46505A',
                contrastText: '#F0F7FF',
              },
              text: '#e5e5e5',
              background: '#000',
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
        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
          <Text sx={{ mb: 2 }} />
          <Content />
        </Stack>
      </CssVarsProvider>
    </React.Fragment>
  );
}
