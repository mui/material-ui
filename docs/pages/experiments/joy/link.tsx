import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

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
      sx={{ '--Button-gutter': '0.25rem', minWidth: 'var(--Button-minHeight)' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function JoyButton() {
  const buttonProps = {
    variant: ['text', 'outlined', 'light', 'contained'],
    color: ['primary', 'neutral', 'danger', 'info', 'success', 'warning'],
    level: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'body3'],
    underline: ['hover', 'always', 'none'],
  } as const;
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
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {Object.entries(buttonProps).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography level="body2" sx={{ fontWeight: 'bold' }}>
                {propName}
              </Typography>
              {propValue.map((value) => (
                <Box
                  key={value}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Link {...{ [propName]: value }}>Link</Link>
                  <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                    {value || 'default'}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
