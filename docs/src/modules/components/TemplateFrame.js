/* eslint-disable react/prop-types */
/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import { useRouter } from 'next/router';
import { deepmerge } from '@mui/utils';
import { getDesignTokens, getThemedComponents } from '@mui/docs/branding';
import { createTheme, ThemeProvider, styled, useColorScheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SvgIcon from '@mui/material/SvgIcon';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import PaletteIcon from '@mui/icons-material/PaletteOutlined';
import codeSandbox from 'docs/src/modules/sandbox/CodeSandbox';
import stackBlitz from 'docs/src/modules/sandbox/StackBlitz';
import sourceMaterialTemplates from 'docs/src/modules/material/sourceMaterialTemplates';

function pascalCase(str) {
  return str
    .replace(/[^\w]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^(.)/, (_, chr) => chr.toUpperCase());
}

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
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

function ColorSchemeControls() {
  const { mode, systemMode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMode = (targetMode) => () => {
    setMode(targetMode);
    handleClose();
  };
  if (!mode) {
    return (
      <Box
        sx={(theme) => {
          // copy from OutlinedInput
          const borderColor =
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
          return {
            verticalAlign: 'bottom',
            display: 'inline-flex',
            width: 32,
            height: 32,
            borderRadius: (theme.vars || theme).shape.borderRadius,
            border: '1px solid',
            borderColor: theme.vars
              ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`
              : borderColor,
          };
        }}
      />
    );
  }
  const resolvedMode = systemMode || mode;
  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
  }[resolvedMode];
  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        color="primary"
        size="small"
        disableTouchRipple
        aria-controls={open ? 'color-scheme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            sx: {
              my: '4px',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem selected={mode === 'system'} onClick={handleMode('system')}>
          System
        </MenuItem>
        <MenuItem selected={mode === 'light'} onClick={handleMode('light')}>
          Light
        </MenuItem>
        <MenuItem selected={mode === 'dark'} onClick={handleMode('dark')}>
          Dark
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export function ThemeSelector({ value, onChange }) {
  return (
    <Select
      size="small"
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      startAdornment={
        <InputAdornment position="start">
          <PaletteIcon fontSize="small" color="primary" />
        </InputAdornment>
      }
    >
      <MenuItem value="custom">Custom Theme</MenuItem>
      <MenuItem value="material2">Material Design 2</MenuItem>
    </Select>
  );
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');

const brandingTheme = createTheme({
  cssVariables: {
    cssVarPrefix: 'muidocs',
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  ...designTokens,
  typography: deepmerge(typography, {
    h1: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-common-white)',
      },
    },
    h2: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-grey-100)',
      },
    },
    h5: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-primary-300)',
      },
    },
  }),
  ...getThemedComponents(),
});

function TemplateFrame({ children }) {
  const router = useRouter();
  const templateId = router.pathname.split('/').pop();
  const templateName = pascalCase(templateId);
  const [selectedTheme, setSelectedTheme] = React.useState('custom');
  const materialTemplates = sourceMaterialTemplates();
  const item = materialTemplates.map.get('sign-in');
  return (
    // This ThemeProvider acts as a state provider for the Toolbar and the Template, so no need to generate stylesheet.
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          '& [data-template-mode-trigger]': { display: 'none' },
        }}
      >
        <ThemeProvider theme={brandingTheme}>
          <StyledAppBar>
            <Toolbar
              variant="dense"
              disableGutters
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                p: '8px 12px',
                gap: 1,
              }}
            >
              <Box sx={{ width: { xs: 'auto', sm: 0 }, '& > *': { width: 'max-content' } }}>
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
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  width: { xs: 'auto', sm: 0 },
                  '& > *': { flexShrink: 0 },
                }}
              >
                <Tooltip title="Open Template via CodeSandbox">
                  <IconButton
                    color="primary"
                    size="small"
                    disableTouchRipple
                    aria-label="CodeSandbox playground"
                    data-ga-event-category="material-ui-template"
                    data-ga-event-label={templateId}
                    data-ga-event-action="codesandbox"
                    onClick={() =>
                      codeSandbox
                        .createMaterialTemplate({
                          ...item,
                          files: { ...item.files, ...materialTemplates.sharedTheme?.files },
                          title: `${templateName} Template - Material UI`,
                          githubLocation: `${process.env.SOURCE_CODE_REPO}/blob/v${
                            process.env.LIB_VERSION
                          }/docs/data/material/templates/${templateId}/${templateName}.${
                            item.codeVariant === 'TS' ? 'tsx' : 'js'
                          }`,
                        })
                        .editFile(
                          `${templateName}.${item.codeVariant === 'TS' ? 'tsx' : 'js'}`,
                          (content) => content.replace(/\.\.\/shared-theme\//g, './theme/'),
                        )
                        .editFile(`index.${item.codeVariant === 'TS' ? 'tsx' : 'js'}`, (content) =>
                          content.replace('./App', `./${templateName}`),
                        )
                        .openSandbox(`/${templateName}`)
                    }
                    sx={{ alignSelf: 'center', borderRadius: 1 }}
                  >
                    <SvgIcon viewBox="0 0 1080 1080">
                      <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Open Template via StackBlitz">
                  <IconButton
                    color="primary"
                    size="small"
                    disableTouchRipple
                    aria-label="StackBlitz playground"
                    data-ga-event-category="material-ui-template"
                    data-ga-event-label={templateId}
                    data-ga-event-action="stackblitz"
                    onClick={() =>
                      stackBlitz
                        .createMaterialTemplate({
                          ...item,
                          files: { ...item.files, ...materialTemplates.sharedTheme?.files },
                          title: `${templateName} Template - Material UI`,
                          githubLocation: `${process.env.SOURCE_CODE_REPO}/blob/v${
                            process.env.LIB_VERSION
                          }/docs/data/material/templates/${templateId}/${templateName}.${
                            item.codeVariant === 'TS' ? 'tsx' : 'js'
                          }`,
                        })
                        .editFile(
                          `${templateName}.${item.codeVariant === 'TS' ? 'tsx' : 'js'}`,
                          (content) => content.replace(/\.\.\/shared-theme\//g, './theme/'),
                        )
                        .editFile(`index.${item.codeVariant === 'TS' ? 'tsx' : 'js'}`, (content) =>
                          content.replace('./App', `./${templateName}`),
                        )
                        .openStackBlitz(`/${templateName}`)
                    }
                    sx={{ alignSelf: 'center', borderRadius: 1 }}
                  >
                    <SvgIcon viewBox="0 0 19 28">
                      <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
                <ThemeSelector
                  value={selectedTheme}
                  onChange={(newTheme) => setSelectedTheme(newTheme)}
                />
                <ColorSchemeControls />
              </Box>
            </Toolbar>
          </StyledAppBar>
        </ThemeProvider>
        <Box sx={{ flex: '1 1', overflow: 'auto' }}>
          {React.isValidElement(children)
            ? React.cloneElement(children, { disableCustomTheme: selectedTheme === 'material2' })
            : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default TemplateFrame;
