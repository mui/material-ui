import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ToggleColorMode from './ToggleColorMode';
import getSignUpTheme from './theme/getSignUpTheme';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

function TemplateFrame({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
}) {
  const handleChange = (event) => {
    toggleCustomTheme(event.target.value === 'custom');
  };
  const signUpTheme = createTheme(getSignUpTheme(mode));

  return (
    <ThemeProvider theme={signUpTheme}>
      <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              p: '8px 12px',
            }}
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
        </StyledAppBar>
        <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default TemplateFrame;
