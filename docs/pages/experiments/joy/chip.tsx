import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import ThumbUp from '@mui/icons-material/ThumbUp';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
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
  disabled: [true, false],
  clickable: [true, false],
} as const;

export default function JoyChip() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3 }}>
          <ColorSchemePicker />
        </Box>
        {/* Examples */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 5, mt: 5 }}>
          <Chip endDecorator={<ChipDelete />}>Benny</Chip>
          <Chip variant="light" startDecorator={<ChipDelete />}>
            Benny
          </Chip>
          <Chip
            variant="contained"
            color="success"
            size="sm"
            startDecorator={
              <Avatar
                size="sm"
                src={`/static/images/avatar/1.jpg`}
                sx={{ ml: '-4px', my: '-4px', '--Avatar-size': '28px' }}
              />
            }
            endDecorator={<CheckIcon />}
          >
            Benny
          </Chip>
          <Chip
            variant="outlined"
            color="neutral"
            size="lg"
            startDecorator={<Avatar size="sm" src={`/static/images/avatar/1.jpg`} />}
            endDecorator={<CheckIcon fontSize="md" sx={{ mr: 0.25 }} />}
            sx={{ '--Chip-radius': '8px' }}
          >
            Benny
          </Chip>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {/* Without decorators */}
          {Object.entries(props).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value) => (
                <Box
                  key={`${value}-without-decorator`}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <Chip {...{ [propName]: value }}>{`${propName}: ${value}`}</Chip>
                  {value !== undefined && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {`${value}`}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
          {/* With decorators */}
          {Object.entries(props).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value) => (
                <Box
                  key={`${value}-with-decorator`}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <Chip endDecorator={<ArrowDropDown />} {...{ [propName]: value }}>
                    <ThumbUp sx={{ mr: 'var(--Chip-gap)' }} />
                    {`${propName}: ${value}`}
                  </Chip>
                  {value !== undefined && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {`${value}`}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
