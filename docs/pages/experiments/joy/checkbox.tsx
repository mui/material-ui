import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';

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
  color: ['primary', 'danger', 'info', 'success', 'warning'],
  variant: ['outlined', 'light', 'contained'],
} as const;

export default function JoyCheckbox() {
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5,
            '& > div': {
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              p: 2,
              alignItems: 'center',
            },
          }}
        >
          {Object.entries(props).map(([propName, propValue]) => (
            <Box key={propName}>
              <Typography sx={{ textDecoration: 'underline' }}>{propName}</Typography>
              {propValue.map((value) => (
                <Box key={value}>
                  <Checkbox {...{ [propName]: value }} />
                  {value && (
                    <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                      {value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
          <Box>
            <Box>
              <Checkbox indeterminate />
              <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                indeterminate
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Checkbox uncheckedIcon={<Close />} />
                <Checkbox
                  uncheckedIcon={<Done />}
                  sx={{
                    '&:not(.Mui-checked)': {
                      '& svg': { opacity: 0 },
                      '&:hover svg': { opacity: 1 },
                    },
                  }}
                />
              </Box>
              <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                unchecked
              </Typography>
            </Box>
            <Box>
              <Typography id="sandwich-group" sx={{ color: 'primary.500', mb: 1 }}>
                Sandwich Condiments
              </Typography>
              <Box role="group" aria-labelledby="sandwich-group">
                <List size="sm">
                  <ListItem>
                    <Checkbox label="Label" size="lg" />
                  </ListItem>
                  <ListItem>
                    <Checkbox label="Label" />
                  </ListItem>
                  <ListItem>
                    <Checkbox label="Label" size="sm" disabled />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
          <Box sx={{ maxWidth: 300 }}>
            <Checkbox
              label={
                <React.Fragment>
                  By clicking this checkbox, you accept our terms and agreements.
                </React.Fragment>
              }
            />
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
