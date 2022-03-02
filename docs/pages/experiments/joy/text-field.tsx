import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { GlobalStyles } from '@mui/system';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Key from '@mui/icons-material/Key';
import Info from '@mui/icons-material/InfoRounded';
import Verified from '@mui/icons-material/VerifiedRounded';

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
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function JoyTypography() {
  return (
    <CssVarsProvider
      theme={{
        components: {
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'xl',
            },
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: theme.vars.fontSize[ownerState.fontSize],
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' && {
                    color: theme.vars.palette[ownerState.color].textColor,
                  }),
              }),
            },
          },
        },
      }}
    >
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 2 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 2,
            p: 2,
            alignItems: 'center',
          }}
        >
          <FormControl>
            <FormLabel htmlFor="textfield0" endDecorator={<Info fontSize="md" color="neutral" />}>
              Label
            </FormLabel>
            <Input id="textfield0" placeholder="Placeholder" />
            <FormHelperText>Helper text</FormHelperText>
          </FormControl>
          <FormControl color="warning">
            <FormLabel
              htmlFor="textfield1"
              endDecorator={
                <Typography component="span" level="body3" sx={{ ml: 'auto' }}>
                  0 / 50
                </Typography>
              }
            >
              Label
            </FormLabel>
            <Input id="textfield1" placeholder="Placeholder" />
            <FormHelperText>Helper text</FormHelperText>
          </FormControl>
          <FormControl variant="light" color="primary">
            <FormLabel
              htmlFor="textfield2"
              endDecorator={
                <Typography level="body3" sx={{ fontWeight: 400 }}>
                  {' '}
                  • Optional
                </Typography>
              }
            >
              Label
            </FormLabel>
            <Input id="textfield2" placeholder="Placeholder" />
            <FormHelperText>
              <Info fontSize="md" />
              Helper text
            </FormHelperText>
          </FormControl>
          <FormControl required error>
            <FormLabel
              htmlFor="textfield3"
              endDecorator={
                <Typography component="span" level="body3" sx={{ width: '100%' }}>
                  Basic helper text if case you need me.
                </Typography>
              }
            >
              Label
            </FormLabel>
            <Input id="textfield3" placeholder="Placeholder" endAdornment={<Info />} />
            <FormHelperText>Helper text</FormHelperText>
          </FormControl>
          <FormControl disabled>
            <FormLabel htmlFor="textfield4">Label</FormLabel>
            <Input id="textfield4" placeholder="Placeholder" />
            <FormHelperText>Helper text</FormHelperText>
          </FormControl>
          <FormControl color="primary" disabled>
            <FormLabel htmlFor="textfield4">Label</FormLabel>
            <Input id="textfield4" placeholder="Placeholder" />
            <FormHelperText>Helper text</FormHelperText>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 2,
            p: 2,
            alignItems: 'center',
          }}
        >
          <TextField
            label="Label"
            required
            placeholder="Placeholder"
            defaultValue="Hello world"
            helperText="This is a helper text."
            FormLabelProps={{
              endDecorator: (
                <Typography component="span" level="body3" sx={{ ml: 'auto' }}>
                  0 / 50
                </Typography>
              ),
            }}
          />
          <TextField
            label="Label"
            required
            error
            variant="light"
            size="sm"
            placeholder="Placeholder"
            defaultValue="Hello world"
            helperText="This is a helper text."
            FormLabelProps={{
              endDecorator: (
                <Typography component="span" level="body3" sx={{ width: '100%' }}>
                  Basic helper text if case you need me.
                </Typography>
              ),
            }}
          />
          <TextField
            label="Label"
            required
            color="success"
            size="lg"
            placeholder="Placeholder"
            helperText="This is a helper text."
            InputProps={{
              startAdornment: <Key fontSize="lg" />,
              endAdornment: <Verified fontSize="lg" />,
            }}
            FormLabelProps={{
              endDecorator: (
                <Typography component="span" level="body3" sx={{ width: '100%' }}>
                  Basic helper text if case you need me.
                </Typography>
              ),
            }}
          />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
