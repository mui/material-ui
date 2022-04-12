import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 2,
          }}
        >
          <Sheet sx={{ boxShadow: 'md', p: 2 }}>
            <Typography
              id="filter-status"
              sx={{
                textTransform: 'uppercase',
                fontSize: 'xs',
                letterSpacing: 'md',
                fontWeight: 'md',
                color: 'text.secondary',
                mb: 1,
              }}
            >
              Filter status
            </Typography>
            <Box role="group" aria-labelledby="filter-status">
              <List
                sx={{
                  '--List-item-radius': '4px',
                  '& .MuiCheckbox-root': { position: 'initial' },
                  '[data-mui-color-scheme="light"] &': {
                    '--joy-palette-neutral-lightBg': 'var(--joy-palette-neutral-50)',
                  },
                }}
              >
                <ListItem variant="light" color="danger">
                  <Checkbox label="Declined Payment" color="danger" checked />
                  <Typography color="inherit" sx={{ ml: 'auto' }}>
                    8
                  </Typography>
                </ListItem>
                <ListItem variant="light" color="warning">
                  <Checkbox label="Delivery Error" color="warning" checked />
                  <Typography color="inherit" sx={{ ml: 'auto' }}>
                    24
                  </Typography>
                </ListItem>
                <ListItem variant="light">
                  <Checkbox label="Wrong Amount" color="neutral" />
                </ListItem>
                <ListItem variant="light">
                  <Checkbox label="Wrong Address" color="neutral" />
                </ListItem>
                <ListItem variant="light">
                  <Checkbox label="Wrong UX Solution" color="neutral" />
                </ListItem>
              </List>
            </Box>
            <Button variant="text" color="warning" size="sm" sx={{ px: 1.5, mt: 1 }}>
              Clear All
            </Button>
          </Sheet>
          <Sheet variant="outlined" sx={{ boxShadow: 'sm', p: 2, borderRadius: '8px' }}>
            <Typography
              id="member"
              sx={{
                textTransform: 'uppercase',
                fontSize: 'xs',
                letterSpacing: 'md',
                fontWeight: 'md',
                color: 'text.secondary',
                mb: 1,
              }}
            >
              Team members
            </Typography>
            <Box role="group" aria-labelledby="member">
              <List
                sx={{
                  '--List-item-radius': '4px',
                  '& .MuiCheckbox-root': {
                    position: 'initial',
                    mr: 'auto',
                    alignItems: 'center',
                    '--Checkbox-gap': '12px',
                  },
                  '[data-mui-color-scheme="light"] &': {
                    '--joy-palette-neutral-lightBg': 'var(--joy-palette-neutral-50)',
                  },
                }}
              >
                <ListItem>
                  <Checkbox label="Friedrich Oberbrunner" />
                  <Avatar aria-hidden="true" src="/static/images/avatar/1.jpg" />
                </ListItem>
                <ListItem variant="light" color="primary">
                  <Checkbox
                    label={
                      <React.Fragment>
                        Adeline O&apos;Reilly
                        <Box
                          component="span"
                          aria-hidden="true"
                          sx={{ display: 'block', fontSize: 'sm', color: 'primary.500' }}
                        >
                          This user was picked
                        </Box>
                      </React.Fragment>
                    }
                    checked
                  />
                  <Avatar aria-hidden="true" src="/static/images/avatar/2.jpg" />
                </ListItem>
                <ListItem>
                  <Checkbox label="Fernando Pidrillio" color="neutral" />
                  <Avatar aria-hidden="true" src="/static/images/avatar/3.jpg" />
                </ListItem>
                <ListItem>
                  <Checkbox label="Anonymous User" color="neutral" />
                  <Avatar aria-hidden="true" variant="contained">
                    AU
                  </Avatar>
                </ListItem>
              </List>
            </Box>
          </Sheet>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
