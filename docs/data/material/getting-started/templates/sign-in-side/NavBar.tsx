import * as React from 'react';
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  styled,
} from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ToggleColorMode from './ToggleColorMode';
import getSignInSideTheme from './theme/getSignInSideTheme';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  backgroundImage: 'none',
  padding: 4,
}));

interface NavBarProps {
  showCustomTheme: boolean;
  toggleCustomTheme: (theme: boolean) => void;
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function NavBar({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
}: NavBarProps) {
  const handleChange = (event: SelectChangeEvent) => {
    toggleCustomTheme(event.target.value === 'custom');
  };
  const signSideInTheme = createTheme(getSignInSideTheme(mode));

  return (
    <ThemeProvider theme={signSideInTheme}>
      <StyledAppBar>
        <Container maxWidth="lg">
          <Toolbar
            variant="dense"
            disableGutters
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              variant="text"
              size="small"
              aria-label="Back to templates"
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/material-ui/getting-started/templates/"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Back to templates
            </Button>
            <IconButton
              size="small"
              aria-label="Back to templates"
              component="a"
              href="/material-ui/getting-started/templates/"
              sx={{ display: { xs: 'auto', sm: 'none' } }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <FormControl variant="outlined" sx={{ minWidth: 180 }}>
                <Select
                  size="small"
                  labelId="theme-select-label"
                  id="theme-select"
                  value={showCustomTheme ? 'custom' : 'material'}
                  onChange={handleChange}
                  label="Design Language"
                >
                  <MenuItem value="custom">Custom Theme</MenuItem>
                  <MenuItem value="material">Material Design 2</MenuItem>
                </Select>
              </FormControl>
              <ToggleColorMode
                data-screenshot="toggle-mode"
                mode={mode}
                toggleColorMode={toggleColorMode}
              />
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </ThemeProvider>
  );
}
