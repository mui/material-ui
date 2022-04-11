import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import TextField from '@mui/joy/TextField';
import Switch from '@mui/joy/Switch';
import fluentTheme from 'docs/src/_experiment/fluent/theme';

import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import MoreVert from '@mui/icons-material/MoreVert';
import Search from '@mui/icons-material/Search';
import Close from '@mui/icons-material/Close';

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
      variant="outlined"
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

export default function Strapi() {
  return (
    <CssVarsProvider theme={fluentTheme}>
      <Head>
        <link href="http://fonts.cdnfonts.com/css/segoe-ui-variable" rel="stylesheet" />
      </Head>
      <GlobalStyles
        styles={{
          body: { margin: 0, backgroundColor: 'var(--joy-palette-background-level1)' },
          '*': { boxSizing: 'border-box' },
        }}
      />
      <Box sx={{ p: 2, maxWidth: 1200, mx: 'auto' }}>
        <ColorSchemePicker />
      </Box>
      <Box sx={{ px: 2, maxWidth: 1200, mx: 'auto' }}>
        <Box
          sx={{
            '& > div': {
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 2,
              my: 2,
            },
          }}
        >
          <div>
            <Button>Rest</Button>
            <Button disabled>Rest</Button>
            <Button startIcon={<RadioButtonUnchecked />}>Rest</Button>
            <Button endIcon={<KeyboardArrowDown />}>Rest</Button>
            <Button variant="outlined" color="neutral">
              Rest
            </Button>
            <Button variant="outlined" color="neutral" disabled>
              Rest
            </Button>
            <Button variant="outlined" color="neutral" startIcon={<RadioButtonUnchecked />}>
              Rest
            </Button>
            <Button variant="outlined" color="neutral" endIcon={<KeyboardArrowDown />}>
              Rest
            </Button>
            <Button variant="light" color="neutral">
              Rest
            </Button>
            <Button variant="light" color="neutral" disabled>
              Rest
            </Button>
            <Button variant="light" color="neutral" startIcon={<RadioButtonUnchecked />}>
              Rest
            </Button>
            <Button variant="light" color="neutral" endIcon={<KeyboardArrowDown />}>
              Rest
            </Button>
            <Button variant="text" color="neutral">
              Rest
            </Button>
            <Button variant="text" color="neutral" disabled>
              Rest
            </Button>
            <Button variant="text" color="neutral" startIcon={<RadioButtonUnchecked />}>
              Rest
            </Button>
            <Button variant="text" color="neutral" endIcon={<KeyboardArrowDown />}>
              Rest
            </Button>
          </div>
          <div>
            <IconButton>
              <RadioButtonUnchecked />
            </IconButton>
            <IconButton>
              <RadioButtonUnchecked />
              <KeyboardArrowDown />
            </IconButton>
            <IconButton size="lg" color="neutral">
              <MoreVert />
            </IconButton>
            <IconButton size="lg" color="neutral" disabled>
              <MoreVert />
            </IconButton>

            <Link href="#blank">Rest</Link>
            <Link href="#blank" disabled>
              Rest
            </Link>
          </div>
          <div>
            <Input placeholder="Search" startDecorator={<Search />} />
            <Input
              placeholder="Search"
              endDecorator={
                <IconButton variant="text" color="neutral" sx={{ '--IconButton-size': '30px' }}>
                  <Close />
                </IconButton>
              }
            />
            <Input placeholder="Search" disabled startDecorator={<Search />} />
          </div>
          <div>
            <TextField placeholder="Placeholder" label="Label" />
            <TextField placeholder="Placeholder" label="Label" disabled />
            <TextField placeholder="Placeholder" label="Label" helperText="Error message" error />
            <TextField
              placeholder="Placeholder"
              label="Label"
              startDecorator={
                <Box
                  sx={{
                    bgcolor: 'grey.20',
                    color: 'grey.130',
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    borderTopLeftRadius: 1,
                    borderBottomLeftRadius: 1,
                  }}
                >
                  https://
                </Box>
              }
              componentsProps={{
                input: {
                  sx: {
                    '--Input-decorator-offset': '12px',
                    '& [class$="-startDecorator"]': {
                      alignSelf: 'stretch',
                    },
                  },
                },
              }}
            />
            <TextField
              placeholder="Placeholder"
              label="Label"
              endDecorator={
                <Box
                  sx={{
                    bgcolor: 'grey.20',
                    color: 'grey.130',
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    borderTopLeftRadius: 1,
                    borderBottomLeftRadius: 1,
                  }}
                >
                  .com
                </Box>
              }
              componentsProps={{
                input: {
                  sx: {
                    '--Input-decorator-offset': '12px',
                    '& [class$="-endDecorator"]': {
                      alignSelf: 'stretch',
                    },
                  },
                },
              }}
            />
            <TextField
              placeholder="Placeholder"
              label="Label"
              disabled
              startDecorator={
                <Box
                  sx={{
                    bgcolor: 'grey.30',
                    color: 'grey.90',
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    borderTopLeftRadius: 1,
                    borderBottomLeftRadius: 1,
                  }}
                >
                  https://
                </Box>
              }
              componentsProps={{
                input: {
                  sx: {
                    '--Input-decorator-offset': '12px',
                    '& [class$="-startDecorator"]': {
                      alignSelf: 'stretch',
                    },
                  },
                },
              }}
            />
            <TextField
              placeholder="Placeholder"
              label="Label"
              helperText="Error message"
              error
              startDecorator={
                <Box
                  sx={{
                    bgcolor: 'grey.20',
                    color: 'grey.130',
                    display: 'flex',
                    alignItems: 'center',
                    px: 1,
                    borderTopLeftRadius: 1,
                    borderBottomLeftRadius: 1,
                  }}
                >
                  https://
                </Box>
              }
              componentsProps={{
                input: {
                  sx: {
                    '--Input-decorator-offset': '12px',
                    '& [class$="-startDecorator"]': {
                      alignSelf: 'stretch',
                    },
                  },
                },
              }}
            />
          </div>
          <div>
            <Switch />
            <Switch defaultChecked />
            <Switch endDecorator="On" />
            <Switch defaultChecked />
            <Switch disabled />
            <Switch defaultChecked disabled />
          </div>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
