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
import SvgIcon from '@mui/material/SvgIcon';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import codeSandbox from 'docs/src/modules/sandbox/CodeSandbox';
import sourceMaterialTemplates from 'docs/src/modules/joy/sourceMaterialTemplates';

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
  const materialTemplates = sourceMaterialTemplates();
  const item = materialTemplates.map.get('sign-in');
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
              <Button
                variant="outlined"
                startIcon={
                  <SvgIcon viewBox="0 0 1080 1080">
                    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                  </SvgIcon>
                }
                aria-label="CodeSandbox playground"
                data-ga-event-category="material-ui-template"
                data-ga-event-label="sign-in"
                data-ga-event-action="codesandbox"
                onClick={() =>
                  codeSandbox
                    .createMaterialTemplate({
                      ...item,
                      title: `Sign in Template - Material UI`,
                      githubLocation: `${process.env.SOURCE_CODE_REPO}/blob/v${
                        process.env.LIB_VERSION
                      }/docs/data/material/templates/sign-in/App.${
                        item.codeVariant === 'TS' ? 'tsx' : 'js'
                      }`,
                    })
                    .openSandbox()
                }
                sx={{ fontFamily: 'IBM Plex Sans' }}
              >
                CodeSandbox
              </Button>
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
