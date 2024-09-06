/* eslint-disable react/prop-types */
/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import { useRouter } from 'next/router';
import { BrandingProvider } from '@mui/docs/branding';
import { createTheme, ThemeProvider, styled, useColorScheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio, { radioClasses } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SvgIcon from '@mui/material/SvgIcon';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PaletteIcon from '@mui/icons-material/Palette';
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
    colorSchemeSelector: 'data',
  },
  colorSchemes: { light: true, dark: true },
});

function System() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function DarkMode() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function LightMode() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1" />
      <path d="M12 20v1" />
      <path d="M3 12h1" />
      <path d="M20 12h1" />
      <path d="m18.364 5.636-.707.707" />
      <path d="m6.343 17.657-.707.707" />
      <path d="m5.636 5.636.707.707" />
      <path d="m17.657 17.657.707.707" />
    </svg>
  );
}

export function ColorSchemeControls() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return (
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          height: '40px',
          gap: 0.5,
          opacity: 0.5,
          gridTemplateColumns: 'repeat(3, 40px)',
          placeItems: 'center',
          color: 'text.primary',
          '& > div': { lineHeight: 0 },
          '& svg': { transform: 'scale(0.8)' },
        }}
      >
        <div>
          <LightMode />
        </div>
        <div>
          <System />
        </div>
        <div>
          <DarkMode />
        </div>
      </Box>
    );
  }
  return (
    <RadioGroup
      row
      aria-label="Color scheme"
      name="color-scheme-segmented-control"
      sx={{
        display: 'flex',
        gap: 0.5,
        marginRight: { xs: 'auto', sm: 'initial' },
        '& svg': { transform: 'scale(0.8)', transition: '0.2s' },
        [`& .${radioClasses.checked} svg`]: { transform: 'scale(1)' },
        [`& .${radioClasses.root}`]: {
          width: 40,
          height: 40,
          border: '1px solid transparent',
          borderRadius: '8px',
          [`&.${radioClasses.checked}`]: {
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
          },
        },
        '& label': { margin: 0 },
      }}
      value={mode}
      onChange={(event) => {
        setMode(event.target.value);
      }}
    >
      <FormControlLabel
        value="light"
        control={
          <Radio
            color="default"
            disableTouchRipple
            checkedIcon={<LightMode />}
            icon={<LightMode />}
          />
        }
        label=""
      />
      <FormControlLabel
        value="system"
        control={
          <Radio color="default" disableTouchRipple checkedIcon={<System />} icon={<System />} />
        }
        label=""
      />
      <FormControlLabel
        value="dark"
        control={
          <Radio
            color="default"
            disableTouchRipple
            checkedIcon={<DarkMode />}
            icon={<DarkMode />}
          />
        }
        label=""
      />
    </RadioGroup>
  );
}

export function ThemeSelector({ value, onChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMode = (newValue) => () => {
    onChange(newValue);
    handleClose();
  };
  return (
    <React.Fragment>
      <Tooltip title="Switch theme">
        <IconButton
          onClick={handleClick}
          sx={{ alignSelf: 'center' }}
          aria-controls={open ? 'color-scheme-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            variant: 'outlined',
            sx: {
              my: '4px',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem selected={value === 'custom'} onClick={handleMode('custom')}>
          Custom Theme
        </MenuItem>
        <MenuItem selected={value === 'material2'} onClick={handleMode('material2')}>
          Material Design 2
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

function ThemeBridge({ children }) {
  const { mode, systemMode } = useColorScheme();
  return <BrandingProvider mode={systemMode || mode || 'light'}>{children}</BrandingProvider>;
}

function TemplateFrame({ children }) {
  const router = useRouter();
  const templateId = router.pathname.split('/').pop();
  const templateName = pascalCase(templateId);
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
        <ThemeBridge>
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
              <ColorSchemeControls />
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
                    sx={{ alignSelf: 'center' }}
                  >
                    <SvgIcon viewBox="0 0 1080 1080">
                      <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Open Template via StackBlitz">
                  <IconButton
                    aria-label="StackBlitz playground"
                    data-ga-event-category="material-ui-template"
                    data-ga-event-label={templateId}
                    data-ga-event-action="codesandbox"
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
                    sx={{ alignSelf: 'center' }}
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
              </Box>
            </Toolbar>
          </StyledAppBar>
        </ThemeBridge>
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
