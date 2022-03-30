import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
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
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const props = {
  size: ['sm', 'md', 'lg'],
  color: ['primary', 'danger', 'info', 'success', 'warning', 'neutral'],
  variant: ['contained', 'outlined', 'light'],
  invisible: [true, false],
} as const;

export default function JoyBadge() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3 }}>
          <ColorSchemePicker />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {Object.entries(props).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value, index) => (
                <Box
                  key={`${index}-${value}`}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <Badge badgeContent={1} {...{ [propName]: value }}>
                    <MailIcon />
                  </Badge>
                  {value !== undefined && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {`${value}`}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
          <Box
            key={'anchorOrigin'}
            sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
          >
            <Typography sx={{ textDecoration: 'underline' }}>{'anchorOrigin'}</Typography>
            {(
              [
                { vertical: 'top', horizontal: 'right' },
                { vertical: 'top', horizontal: 'left' },
                { vertical: 'bottom', horizontal: 'right' },
                { vertical: 'bottom', horizontal: 'left' },
              ] as const
            ).map((value, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Badge
                  badgeContent={1}
                  anchorOrigin={{ vertical: value.vertical, horizontal: value.horizontal }}
                >
                  <MailIcon />
                </Badge>
                {value !== undefined && (
                  <Typography level="body3" sx={{ textAlign: 'center', mt: '10px' }}>
                    {`vertical: ${value.vertical}, horizontal: ${value.horizontal}`}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
