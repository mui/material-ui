import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
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

export default function JoySheet() {
  const SheetProps = {
    variant: ['text', 'outlined', 'light', 'contained'],
    color: ['primary', 'neutral', 'danger', 'info', 'success', 'warning'],
    elevation: ['xs', 'sm', 'md', 'lg', 'xl'],
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
          {Object.entries(SheetProps).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography level="body2" sx={{ fontWeight: 'bold' }}>
                {propName}
              </Typography>
              {propValue.map((value) => (
                <Box key={value}>
                  <Sheet
                    {...{ [propName]: value }}
                    sx={{
                      width: 250,
                      height: 150,
                    }}
                  />
                  <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                    {value || 'default'}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {Object.entries(SheetProps).map(([propName, propValue], index) =>
            Object.entries(SheetProps).map(([propName2, propValue2], index2) => {
              return index < index2 ? (
                <Box
                  key={propName}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                    p: 2,
                    alignItems: 'center',
                  }}
                >
                  <Typography level="body2" sx={{ fontWeight: 'bold' }}>
                    {`${propName} && ${propName2}`}
                  </Typography>
                  {propValue.map((value) => {
                    return propValue2.map((value2) => (
                      <Box key={value}>
                        <Sheet
                          {...{ [propName]: value, [propName2]: value2 }}
                          sx={{
                            width: 250,
                            height: 150,
                            textAlign: 'center',
                          }}>{`${value} && ${value2}` || 'default'}</Sheet>
                      </Box>
                    ));
                  })}
                </Box>
              ) : null;
            }),
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
