/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled, useColorScheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

const defaultTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data',
  },
  colorSchemes: { light: true, dark: true },
});

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <Select size="small" value={mode} onChange={(e) => setMode(e.target.value)}>
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}

function TemplateFrame({ children }) {
  const [selectedTheme, setSelectedTheme] = React.useState('custom');
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          '& [data-template-mode-trigger]': { display: 'none' },
        }}
      >
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
              <Select
                size="small"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
              >
                <MenuItem value="custom">Custom Theme</MenuItem>
                <MenuItem value="material">Material Design 2</MenuItem>
              </Select>
              <ColorSchemeToggle />
            </Box>
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ flex: '1 1', overflow: 'auto' }}>
          {React.isValidElement(children)
            ? React.cloneElement(children, { disableCustomTheme: selectedTheme === 'material' })
            : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
};

export default TemplateFrame;
