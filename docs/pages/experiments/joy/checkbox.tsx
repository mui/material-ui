import * as React from 'react';
import Head from 'next/head';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
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
  variant: ['plain', 'outlined', 'soft', 'solid'],
} as const;

const Rank = () => {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <Box>
      <Typography id="rank" level="h2" fontSize="xl" sx={{ mb: 1 }}>
        Rank
      </Typography>
      <Box role="group" aria-labelledby="rank">
        <List
          row
          size="sm"
          sx={{
            '--List-gap': '0px',
            '--List-item-paddingLeft': '0.75rem',
            '--List-item-paddingRight': '1rem',
            '--List-item-radius': '20px',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {['Freshman', 'Sophomore', 'Junior', 'Senior'].map((item, index) => (
            <ListItem key={item}>
              {value.includes(item) && <Done sx={{ zIndex: 2, color: 'primary.500', mr: 1 }} />}
              <Checkbox
                disabled={index === 0}
                disableIcon
                overlay
                variant="outlined"
                label={item}
                checked={value.includes(item)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setValue((val) => [...val, item]);
                  } else {
                    setValue((val) => val.filter((text) => text !== item));
                  }
                }}
                sx={{
                  '&.Mui-checked': {
                    '& .MuiCheckbox-action': {
                      borderColor: 'primary.500',
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

const Pattern = () => {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <Box>
      <Typography id="rank" level="h2" fontSize="xl" sx={{ mb: 1 }}>
        Pattern
      </Typography>
      <Box role="group" aria-labelledby="rank">
        <List
          row
          size="sm"
          sx={{
            '--List-gap': '0px',
            '--List-item-paddingLeft': '0.75rem',
            '--List-item-paddingRight': '0.75rem',
            '--List-item-radius': '20px',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {['Colors', 'Shapes', 'Textures'].map((item, index) => (
            <ListItem key={item}>
              {value.includes(item) && <Done sx={{ zIndex: 2, color: '#fff', mr: 0.5 }} />}
              <Checkbox
                disabled={index === 0}
                size="sm"
                overlay
                disableIcon
                color="primary"
                variant={value.includes(item) ? 'solid' : 'soft'}
                label={item}
                checked={value.includes(item)}
                onChange={(event) => {
                  if (event.target.checked) {
                    setValue((val) => [...val, item]);
                  } else {
                    setValue((val) => val.filter((text) => text !== item));
                  }
                }}
                sx={{
                  fontWeight: 'md',
                  '&.Mui-checked': {
                    '& .MuiCheckbox-action': {
                      boxShadow: 'md',
                      borderColor: 'primary.500',
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default function JoyCheckbox() {
  return (
    <CssVarsProvider>
      <Head>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        />
        <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </Head>
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
            <Checkbox label="By clicking this checkbox, you accept our terms and agreements." />
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
                sx={(theme) => ({
                  '--List-item-radius': '4px',
                  [theme.getColorSchemeSelector('light')]: {
                    '--joy-palette-neutral-lightBg': 'var(--joy-palette-neutral-50)',
                  },
                })}
              >
                <ListItem variant="soft" color="danger">
                  <Checkbox label="Declined Payment" color="danger" checked overlay />
                  <Typography textColor="inherit" sx={{ ml: 'auto' }}>
                    8
                  </Typography>
                </ListItem>
                <ListItem variant="soft" color="warning">
                  <Checkbox label="Delivery Error" color="warning" checked overlay />
                  <Typography textColor="inherit" sx={{ ml: 'auto' }}>
                    24
                  </Typography>
                </ListItem>
                <ListItem variant="soft">
                  <Checkbox disabled label="Wrong Amount" color="neutral" overlay />
                </ListItem>
                <ListItem variant="soft">
                  <Checkbox label="Wrong Address" color="neutral" overlay />
                </ListItem>
                <ListItem variant="soft">
                  <Checkbox label="Wrong UX Solution" color="neutral" overlay />
                </ListItem>
              </List>
            </Box>
            <Button variant="plain" color="warning" size="sm" sx={{ px: 1.5, mt: 1 }}>
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
                sx={(theme) => ({
                  '--List-item-radius': '4px',
                  [`& .${checkboxClasses.root}`]: {
                    mr: 'auto',
                    alignItems: 'center',
                    '--Checkbox-gap': '12px',
                  },
                  [theme.getColorSchemeSelector('light')]: {
                    '--joy-palette-neutral-lightBg': 'var(--joy-palette-neutral-50)',
                  },
                })}
              >
                <ListItem>
                  <Checkbox disabled label="Friedrich Oberbrunner" overlay />
                  <Avatar aria-hidden="true" src="/static/images/avatar/1.jpg" />
                </ListItem>
                <ListItem variant="soft" color="primary">
                  <Checkbox
                    overlay
                    label={
                      <React.Fragment>
                        Adeline O&apos;Reilly
                        <Typography
                          aria-hidden="true"
                          sx={{ display: 'block', fontSize: 'sm', color: 'primary.500' }}
                        >
                          This user was picked
                        </Typography>
                      </React.Fragment>
                    }
                    checked
                  />
                  <Avatar aria-hidden="true" src="/static/images/avatar/2.jpg" />
                </ListItem>
                <ListItem>
                  <Checkbox label="Fernando Pidrillio" color="neutral" overlay />
                  <Avatar aria-hidden="true" src="/static/images/avatar/3.jpg" />
                </ListItem>
                <ListItem>
                  <Checkbox label="Anonymous User" color="neutral" overlay />
                  <Avatar aria-hidden="true" variant="solid">
                    AU
                  </Avatar>
                </ListItem>
              </List>
            </Box>
          </Sheet>
          <Box>
            <Typography id="ingredient" level="h2" fontSize="xl" sx={{ mb: 1 }}>
              Ingredient
            </Typography>
            <Box role="group" aria-labelledby="ingredient">
              <List
                row
                sx={{
                  '--List-gap': '0px',
                  '--List-item-radius': '20px',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                {[
                  'Avocado',
                  'Jalapenos',
                  'Habaneors',
                  'Mushrooms',
                  'Fried Egg',
                  'Caramelized Onions',
                  'Rillamook Cheddar',
                ].map((item, index) => (
                  <ListItem
                    key={item}
                    sx={{
                      boxShadow: 'md',
                      bgcolor: 'background.body',
                    }}
                  >
                    <Checkbox
                      disabled={index === 0}
                      label={item}
                      overlay
                      // @ts-ignore
                      checkedIcon={<ion-icon name="checkmark-outline" />}
                      sx={{
                        '--ionicon-stroke-width': '72px',
                        '& .MuiCheckbox-checkbox': {
                          fontSize: '12px',
                          borderRadius: '50%',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <Box>
            <Typography id="topping" level="h2" fontSize="xl" sx={{ mb: 1 }}>
              Pizza toppings
            </Typography>
            <Box role="group" aria-labelledby="topping">
              <List
                row
                sx={{
                  '--List-gap': '0px',
                  '--List-item-radius': '20px',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                {[
                  'Perpperoni',
                  'Cheese',
                  'Olives',
                  'Tomatoes',
                  'Fried Bacon',
                  'Spinach',
                  'Sausage',
                ].map((item, index) => (
                  <ListItem key={item}>
                    <Checkbox
                      disabled={index === 0}
                      overlay
                      disableIcon
                      variant="soft"
                      label={item}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <Rank />
          <Pattern />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
