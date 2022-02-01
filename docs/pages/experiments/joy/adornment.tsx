import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Adornment from '@mui/joy/Adornment';
import Typography from '@mui/joy/Typography';
import { List, ListItem, ListItemButton } from 'docs/src/_experiment/joy/List';
import Input from 'docs/src/_experiment/joy/Input';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Extension from '@mui/icons-material/Extension';
import Visibility from '@mui/icons-material/Visibility';
import Mail from '@mui/icons-material/Mail';

export default function AdornmentExperiment() {
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
        }}
      >
        <List>
          <ListItemButton variant="light" startIcon={(<Extension />) as any}>
            Extensions
          </ListItemButton>
          <ListItemButton variant="light" endIcon={(<KeyboardArrowRight />) as any}>
            Extensions
          </ListItemButton>
        </List>
        <ul>
          <ListItem>
            <Adornment>
              <Extension fontSize="lg" />
            </Adornment>
            Extensions
          </ListItem>
          <ListItem>
            <Adornment>
              <KeyboardArrowRight fontSize="lg" />
            </Adornment>
            Extensions
          </ListItem>
        </ul>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Adornment>
            <Extension />
          </Adornment>
          <Typography>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
            industries for previewing layouts and visual mockups.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Lorem ipsum</Typography>
          <Adornment end>
            <KeyboardArrowRight fontSize="lg" />
          </Adornment>
        </Box>
        <Input
          placeholder="Placeholder"
          endAdornment={
            (
              <Button
                variant="text"
                color="neutral"
                size="sm"
                sx={{ pointerEvents: 'visible', p: '0.25rem', width: 'var(--Button-minHeight)' }}
              >
                <Visibility fontSize="lg" />
              </Button>
            ) as any
          }
        />
        <Input placeholder="Placeholder" startAdornment={(<Mail fontSize="lg" />) as any} />
      </Box>
    </CssVarsProvider>
  );
}
