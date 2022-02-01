import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Adornment from '@mui/joy/Adornment';
import { List, ListItem, ListItemButton } from 'docs/src/_experiment/joy/List';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Extension from '@mui/icons-material/Extension';

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
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
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
      </Box>
    </CssVarsProvider>
  );
}
