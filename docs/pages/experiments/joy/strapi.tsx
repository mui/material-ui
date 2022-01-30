import * as React from 'react';
import { GlobalStyles, CSSObject } from '@mui/system';
import {
  CssVarsProvider,
  createGetCssVar,
  useColorScheme,
  ColorPaletteProp,
} from '@mui/joy/styles';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Public from '@mui/icons-material/Public';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Info from '@mui/icons-material/InfoOutlined';
import Code from '@mui/icons-material/Code';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import OpenInNew from '@mui/icons-material/OpenInNew';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ViewCompact from '@mui/icons-material/ViewCompact';
import PermMedia from '@mui/icons-material/PermMedia';
import Extension from '@mui/icons-material/Extension';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Settings from '@mui/icons-material/Settings';
import Apps from '@mui/icons-material/Apps';
import VpnKey from '@mui/icons-material/VpnKey';
import Webhook from '@mui/icons-material/Webhook';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
// experiment components
import Badge from 'docs/src/_experiment/joy/Badge';
import { ToggleButton, ToggleButtonGroup } from 'docs/src/_experiment/joy/Toggle';
import Input from 'docs/src/_experiment/joy/Input';
import TextField from 'docs/src/_experiment/joy/TextField';
import SelectField from 'docs/src/_experiment/joy/SelectField';
import Checkbox from 'docs/src/_experiment/joy/Checkbox';
import { List, ListItemButton, ListSubheader } from 'docs/src/_experiment/joy/List';

// how to add more color and use with variants
const Tile = ({
  children,
  variant = 'light',
  color = 'primary',
  sx = [],
  ...props
}: {
  variant?: 'light' | 'contained';
  color?: ColorPaletteProp | 'secondary' | 'alternate';
} & Omit<BoxProps, 'color'>) => {
  return (
    <Box
      sx={[
        { display: 'inline-flex', p: 0.75, borderRadius: '4px' },
        (theme) => theme.variants[variant][color],
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

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

const getCssVar = createGetCssVar();

declare module '@mui/joy/styles' {
  interface PaletteRange {
    150: string;
    0: string;
  }

  interface Palette {
    outlinedFocusBorder: string;
  }

  interface TypographySystem {
    header1: React.CSSProperties;
    header2: React.CSSProperties;
    header3: React.CSSProperties;
    subtitle: React.CSSProperties;
    body: React.CSSProperties;
    bodyHighlight: React.CSSProperties;
    buttonText: React.CSSProperties;
    smallText: React.CSSProperties;
    smallButtonText: React.CSSProperties;
    tableLabel: React.CSSProperties;
  }

  interface VariantLight {
    secondary: CSSObject;
    alternate: CSSObject;
  }

  interface VariantContained {
    secondary: CSSObject;
    alternate: CSSObject;
  }
}

export default function Strapi() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                700: '#271FE0',
                600: '#4945FF',
                500: '#7B79FF',
                200: '#D9D8FF',
                100: '#F0F0FF',
                lightColor: getCssVar('palette-primary-600'),
                lightActiveBg: getCssVar('palette-primary-200'),
                containedHoverBg: getCssVar('palette-primary-500'),
                containedActiveBg: getCssVar('palette-primary-700'),
                outlinedColor: getCssVar('palette-primary-600'),
                outlinedBorder: getCssVar('palette-primary-200'),
                outlinedBg: getCssVar('palette-primary-100'),
                outlinedHoverBorder: getCssVar('palette-primary-200'),
                outlinedHoverBg: getCssVar('palette-neutral-0'),
                outlinedActiveColor: getCssVar('palette-primary-700'),
                outlinedActiveBg: getCssVar('palette-neutral-0'),
              },
              success: {
                700: '#2F6846',
                600: '#328048',
                500: '#5CB176',
                200: '#C6F0C2',
                100: '#EAFBE7',
                containedHoverBg: getCssVar('palette-success-500'),
                containedActiveBg: getCssVar('palette-success-700'),
                outlinedColor: getCssVar('palette-success-600'),
                outlinedBorder: getCssVar('palette-success-200'),
                outlinedBg: getCssVar('palette-success-100'),
                outlinedHoverBorder: getCssVar('palette-success-200'),
                outlinedHoverBg: getCssVar('palette-neutral-0'),
                outlinedActiveColor: getCssVar('palette-success-700'),
                outlinedActiveBg: getCssVar('palette-neutral-0'),
              },
              danger: {
                700: '#B72B1A',
                600: '#D02B20',
                500: '#EE5E52',
                200: '#F5C0B8',
                100: '#FCECEA',
                containedHoverBg: getCssVar('palette-danger-500'),
                containedActiveBg: getCssVar('palette-danger-700'),
                outlinedColor: getCssVar('palette-danger-600'),
                outlinedBorder: getCssVar('palette-danger-200'),
                outlinedBg: getCssVar('palette-danger-100'),
                outlinedHoverBorder: getCssVar('palette-danger-200'),
                outlinedHoverBg: getCssVar('palette-neutral-0'),
                outlinedActiveBg: getCssVar('palette-neutral-0'),
                outlinedActiveColor: getCssVar('palette-danger-700'),
              },
              warning: {
                700: '#BE5D01',
                600: '#D9822F',
                500: '#F29D41',
                200: '#FAE7B9',
                100: '#FDF4DC',
              },
              secondary: {
                700: '#006096',
                600: '#0C75AF',
                500: '#66B7F1',
                200: '#B8E1FF',
                100: '#EAF5FF',
                lightBg: 'var(--joy-palette-secondary-100)',
                lightColor: 'var(--joy-palette-secondary-700)',
                containedBg: 'var(--joy-palette-secondary-500)',
                containedColor: '#fff',
              },
              alternate: {
                700: '#8312D1',
                600: '#9736E8',
                500: '#AC73E6',
                200: '#E0C1F4',
                100: '#F6ECFC',
                lightBg: 'var(--joy-palette-alternate-100)',
                lightColor: 'var(--joy-palette-alternate-700)',
                containedBg: 'var(--joy-palette-alternate-500)',
                containedColor: '#fff',
              },
              neutral: {
                900: '#212134',
                800: '#32324D',
                700: '#4A4A6A',
                600: '#666687',
                500: '#8E8EA9',
                400: '#A5A5BA',
                300: '#C0C0CF',
                200: '#DCDCE4',
                150: '#EAEAEF',
                100: '#F6F6F9',
                0: '#FFFFFF',
                outlinedColor: getCssVar('palette-neutral-800'),
                outlinedBorder: getCssVar('palette-neutral-200'),
                outlinedHoverBg: getCssVar('palette-neutral-100'),
                outlinedActiveBg: getCssVar('palette-neutral-150'),
                outlinedDisabledColor: getCssVar('palette-neutral-600'),
                outlinedDisabledBorder: getCssVar('palette-neutral-300'),
                outlinedDisabledBg: getCssVar('palette-neutral-200'),
              },
              background: {
                level1: getCssVar('palette-neutral-100'),
                level2: getCssVar('palette-neutral-150'),
              },
              text: {
                primary: getCssVar('palette-neutral-800'),
              },
              outlinedFocusBorder: getCssVar('palette-neutral-0'),
            },
          },
        },
        focus: {
          default: {
            outline: '2px solid',
            outlineOffset: '2px',
            outlineColor: getCssVar('palette-primary-700'),
          },
        },
        variants: {
          outlinedActive: {
            primary: {
              '&:active': {
                borderColor: 'currentColor',
              },
            },
            success: {
              '&:active': {
                borderColor: 'currentColor',
              },
            },
            danger: {
              '&:active': {
                borderColor: 'currentColor',
              },
            },
          },
          light: {
            secondary: {
              color: 'var(--joy-palette-secondary-lightColor)',
              backgroundColor: 'var(--joy-palette-secondary-lightBg)',
            },
            alternate: {
              color: 'var(--joy-palette-alternate-lightColor)',
              backgroundColor: 'var(--joy-palette-alternate-lightBg)',
            },
          },
          contained: {
            secondary: {
              color: 'var(--joy-palette-secondary-containedColor)',
              backgroundColor: 'var(--joy-palette-secondary-containedBg)',
            },
            alternate: {
              color: 'var(--joy-palette-alternate-containedColor)',
              backgroundColor: 'var(--joy-palette-alternate-containedBg)',
            },
          },
        },
        typography: {
          header1: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: '2.5rem',
            color: getCssVar('palette-text-primary'),
          },
          header2: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: '1.375rem',
            color: getCssVar('palette-text-primary'),
          },
          header3: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: '1.25rem',
            color: getCssVar('palette-text-primary'),
          },
          subtitle: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: '1.5rem',
            color: getCssVar('palette-text-secondary'),
          },
          body: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: '1rem',
            color: getCssVar('palette-text-primary'),
          },
          bodyHighlight: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '1rem',
            color: getCssVar('palette-text-primary'),
          },
          buttonText: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: '1rem',
            // button should not contain color globally
            // color: getCssVar('palette-text-primary'),
          },
          smallText: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: '1rem',
            color: getCssVar('palette-text-secondary'),
          },
          smallButtonText: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '0.75rem',
            lineHeight: '1rem',
            // button should not contain color globally
            // color: getCssVar('palette-text-secondary'),
          },
          tableLabel: {
            fontFamily: getCssVar('fontFamily-body'),
            fontWeight: 600,
            fontSize: '0.7rem',
            lineHeight: '1rem',
            color: getCssVar('palette-text-primary'),
            textTransform: 'uppercase',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                ...(!ownerState.square && {
                  '--Button-gutter': '1rem',
                }),
                borderRadius: '4px',
                ...theme.typography.buttonText,
                ...(ownerState.size === 'sm' && {
                  minHeight: 32,
                  ...theme.typography.smallButtonText,
                }),
                ...(ownerState.size === 'md' && {
                  minHeight: 36,
                }),
                ...(ownerState.size === 'lg' && {
                  minHeight: 40,
                }),
                '&.Mui-focusVisible': {
                  ...(ownerState.variant === 'outlined' && {
                    // @ts-ignore This type error only occur in our repository due to multiple module augmentation
                    borderColor: theme.vars.palette.outlinedFocusBorder,
                  }),
                },
                '&.Mui-disabled': {
                  backgroundColor: theme.vars.palette.neutral[150],
                  color: theme.vars.palette.neutral[600],
                  border: '1px solid',
                  borderColor: theme.vars.palette.neutral[200],
                },
              }),
            },
          },
          MuiTypography: {
            defaultProps: {
              levelMapping: {
                header1: 'h1',
                header2: 'h2',
                header3: 'h3',
                subtitle: 'p',
                body: 'p',
                bodyHighlight: 'p',
                buttonText: 'p',
                smallText: 'p',
                smallButtonText: 'p',
                tableLabel: 'p',
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              root: {
                '--Switch-track-width': '40px',
                '--Switch-track-thumb': '16px',
                color: getCssVar('palette-danger-500'),
                '&:hover': {
                  color: getCssVar('palette-danger-600'),
                },
                '&.Mui-checked': {
                  color: getCssVar('palette-success-500'),
                  '&:hover': {
                    color: getCssVar('palette-success-600'),
                  },
                },
              },
            },
          },
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
      <GlobalStyles styles={{ body: { margin: 0 }, '*': { boxSizing: 'border-box' } }} />
      <Box sx={{ p: 2 }}>
        <ColorSchemePicker />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
          '& > div': {
            display: 'flex',
            flexWrap: 'wrap',
            py: 4,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            gap: 2,
          },
        }}
      >
        <Box>
          <Button size="sm">Text</Button>
          <Button>Text</Button>
          <Button size="lg">Text</Button>
          <Button disabled>Text</Button>

          <Button color="success" size="sm">
            Text
          </Button>
          <Button color="success">Text</Button>
          <Button color="success" size="lg">
            Text
          </Button>
          <Button color="success" disabled>
            Text
          </Button>

          <Button color="danger" size="sm">
            Text
          </Button>
          <Button color="danger">Text</Button>
          <Button color="danger" size="lg">
            Text
          </Button>
          <Button color="danger" disabled>
            Text
          </Button>
        </Box>
        <Box>
          <Button variant="outlined" size="sm">
            Text
          </Button>
          <Button variant="outlined">Text</Button>
          <Button variant="outlined" size="lg">
            Text
          </Button>
          <Button variant="outlined" disabled>
            Text
          </Button>

          <Button variant="outlined" color="success" size="sm">
            Text
          </Button>
          <Button variant="outlined" color="success">
            Text
          </Button>
          <Button variant="outlined" color="success" size="lg">
            Text
          </Button>
          <Button variant="outlined" color="success" disabled>
            Text
          </Button>

          <Button variant="outlined" color="danger" size="sm">
            Text
          </Button>
          <Button variant="outlined" color="danger">
            Text
          </Button>
          <Button variant="outlined" color="danger" size="lg">
            Text
          </Button>
          <Button variant="outlined" color="danger" disabled>
            Text
          </Button>
        </Box>
        <Box>
          <Button color="neutral" variant="outlined" size="sm">
            Text
          </Button>
          <Button color="neutral" variant="outlined">
            Text
          </Button>
          <Button color="neutral" variant="outlined" size="lg">
            Text
          </Button>
          <Button color="neutral" variant="outlined" disabled>
            Text
          </Button>
        </Box>
        <Box>
          <Switch defaultChecked />
          <Switch />
        </Box>
        <Box>
          <Badge color="neutral">Text</Badge>
          <Badge>Text</Badge>
        </Box>
        <Box>
          <div>
            <Typography
              level="smallButtonText"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}
            >
              Toggle field <Public fontSize="xs" color="neutral" />
            </Typography>
            <ToggleButtonGroup role="group">
              <ToggleButton color="danger" pressed>
                Off
              </ToggleButton>
              <ToggleButton>On</ToggleButton>
            </ToggleButtonGroup>
            <Typography level="smallText" sx={{ mt: 0.5, color: 'var(--joy-palette-neutral-600)' }}>
              Description line
            </Typography>
          </div>
          <ToggleButtonGroup>
            <ToggleButton>Off</ToggleButton>
            <ToggleButton pressed>On</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {(() => {
          const eye = (
            <Button
              square
              variant="text"
              color="neutral"
              size="sm"
              sx={{ pointerEvents: 'visible' }}
            >
              <Visibility fontSize="lg" />
            </Button>
          ) as any;
          const label = (
            <React.Fragment>
              Label <Public fontSize="xs" color="neutral" />
            </React.Fragment>
          );
          return (
            <Box>
              <Input placeholder="Placeholder" endAdornment={eye} />
              <TextField
                id="text-field1"
                label={label}
                placeholder="Placeholder"
                helperText="Description line"
                endAdornment={eye}
              />
              <TextField
                id="text-field2"
                label={label}
                error
                placeholder="Placeholder"
                helperText="Description line"
                endAdornment={eye}
              />
              <TextField
                id="text-field3"
                label={label}
                disabled
                placeholder="Placeholder"
                helperText="Description line"
                endAdornment={eye}
              />
              <TextField
                id="text-field4"
                label={label}
                disabled
                placeholder="Placeholder"
                helperText="Description line"
                startAdornment={<VisibilityOff fontSize="lg" />}
              />
            </Box>
          );
        })()}
        <Box>
          <SelectField
            id="select-field1"
            label={
              <React.Fragment>
                Label <Public fontSize="xs" color="neutral" />
              </React.Fragment>
            }
            placeholder="Placeholder"
            helperText="Description line"
          />
          <SelectField
            id="select-field1"
            error
            label={
              <React.Fragment>
                Label <Public fontSize="xs" color="neutral" />
              </React.Fragment>
            }
            placeholder="Placeholder"
            helperText="Description line"
          />
        </Box>
        <Box sx={{ flexDirection: 'column' }}>
          <Checkbox id="check1" />
          <Checkbox id="check2" label="Title" />
          <Checkbox checked id="check3" />
          <Checkbox checked id="check4" label="Title" />
          <Checkbox disabled />
          <Checkbox checked disabled />
        </Box>
        <Box>
          <Tile sx={{ p: 2 }}>
            <Tile variant="contained">
              <Info />
            </Tile>
          </Tile>
          <Tile sx={{ p: 2 }} color="warning">
            <Tile variant="contained" color="warning">
              <Code />
            </Tile>
          </Tile>
          <Tile sx={{ p: 2 }} color="secondary">
            <Tile variant="contained" color="secondary">
              <PlayArrow />
            </Tile>
          </Tile>
          <Tile sx={{ p: 2 }} color="alternate">
            <Tile variant="contained" color="alternate">
              <HistoryEdu />
            </Tile>
          </Tile>
        </Box>
      </Box>

      {/* Log in */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--joy-palette-background-level1)',
          pt: '100px',
          my: '5rem',
        }}
      >
        <Box
          sx={{
            width: 552,
            mx: 'auto',
            borderRadius: '4px',
            boxShadow: 'var(--joy-shadow-sm)',
            bgcolor: 'var(--joy-palette-background-body)',
            textAlign: 'center',
            px: '3.5rem',
            py: '3rem',
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
            sx={{
              borderRadius: '1rem',
              width: 72,
              height: 72,
              mx: 'auto',
              display: 'block',
            }}
          />
          <Typography level="h3" sx={{ mt: '1.5rem', mb: '0.375rem', fontWeight: 'bold' }}>
            Welcome back!
          </Typography>
          <Typography sx={{ color: 'var(--joy-palette-text-tertiary)', mb: '2rem' }}>
            Log in to your Strapi account
          </Typography>
          <TextField label="Email" id="email" placeholder="kaidoe@gmail.com" fullWidth />
          <Box sx={{ height: '1.5rem' }} />
          <TextField
            label="Password"
            id="password"
            fullWidth
            endAdornment={
              <Button
                square
                variant="text"
                color="neutral"
                size="sm"
                sx={{ pointerEvents: 'visible' }}
              >
                <Visibility fontSize="lg" />
              </Button>
            }
          />
          <Box sx={{ height: '1.5rem' }} />
          <Checkbox label="Remember me" />
          <Box sx={{ height: '1.5rem' }} />
          <Button fullWidth size="lg">
            Login
          </Button>
        </Box>
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <Button variant="text" sx={{ fontWeight: 'normal' }}>
            Forgot password?
          </Button>
        </Box>
      </Box>

      {/* Sign up */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--joy-palette-background-level1)',
          pt: '100px',
          my: '5rem',
        }}
      >
        <Box
          sx={{
            width: 552,
            mx: 'auto',
            borderRadius: '4px',
            boxShadow: 'var(--joy-shadow-sm)',
            bgcolor: 'var(--joy-palette-background-body)',
            textAlign: 'center',
            px: '3.5rem',
            py: '3rem',
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
            sx={{
              borderRadius: '1rem',
              width: 72,
              height: 72,
              mx: 'auto',
              display: 'block',
            }}
          />
          <Typography level="h3" sx={{ mt: '1.5rem', mb: '0.375rem', fontWeight: 'bold' }}>
            Welcome back!
          </Typography>
          <Typography sx={{ color: 'var(--joy-palette-text-tertiary)', mb: '2rem' }}>
            Your credentials are only used to authenticate yourself on the admin panel. All saved
            data will be stored in your own database.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, '& > *': { flexGrow: 1 } }}>
            <TextField label="First name" id="first-name" placeholder="Kai" fullWidth />
            <TextField label="Last name" id="last-name" placeholder="Doe" fullWidth />
          </Box>
          <Box sx={{ height: '1.5rem' }} />
          <TextField label="Email" id="email" placeholder="kaidoe@gmail.com" fullWidth />
          <Box sx={{ height: '1.5rem' }} />
          <TextField
            label="Password"
            id="password"
            fullWidth
            endAdornment={
              <Button
                square
                variant="text"
                color="neutral"
                size="sm"
                sx={{ pointerEvents: 'visible' }}
              >
                <Visibility fontSize="lg" />
              </Button>
            }
          />
          <Box sx={{ height: '1.5rem' }} />
          <TextField
            label="Password"
            id="password"
            fullWidth
            endAdornment={
              <Button
                square
                variant="text"
                color="neutral"
                size="sm"
                sx={{ pointerEvents: 'visible' }}
              >
                <Visibility fontSize="lg" />
              </Button>
            }
          />
          <Box sx={{ height: '1.5rem' }} />
          <Checkbox label="Keep me updated about the new features and upcoming improvements (by doing this you accept the terms and the privacy policy)." />
          <Box sx={{ height: '1.5rem' }} />
          <Button fullWidth size="lg">
            Let&apos;s start
          </Button>
        </Box>
      </Box>

      {/* Home */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--joy-palette-background-level1)',
          display: 'flex',
          my: '5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 225,
            flexShrink: 0,
            bgcolor: 'var(--joy-palette-background-body)',
            borderRight: '1px solid',
            borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, py: '1.25rem', px: '0.75rem' }}>
            <Box
              component="img"
              alt=""
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
              sx={{
                borderRadius: '4px',
                width: 32,
                height: 32,
                display: 'block',
              }}
            />
            <div>
              <Typography level="bodyHighlight" sx={{ fontWeight: 'bold' }}>
                Strapi Website
              </Typography>
              <Typography level="smallText">Workplace</Typography>
            </div>
          </Box>
          <Box
            sx={{
              borderBottom: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            }}
          />
          <Box sx={{ flexGrow: 1, minHeight: 0 }}>
            <List>
              <ListItemButton startIcon={<Edit />}>Content</ListItemButton>
              <li>
                <Box component="ul" sx={{ p: 0 }}>
                  <ListSubheader>plugins</ListSubheader>
                  <ListItemButton startIcon={<ViewCompact />}>Builder</ListItemButton>
                  <ListItemButton startIcon={<PermMedia />}>Builder</ListItemButton>
                  <ListItemButton startIcon={<Info />}>Builder</ListItemButton>
                </Box>
              </li>
              <li>
                <Box component="ul" sx={{ p: 0 }}>
                  <ListSubheader>general</ListSubheader>
                  <ListItemButton startIcon={<Extension />}>Plugins</ListItemButton>
                  <ListItemButton startIcon={<ShoppingCart />}>Marketplace</ListItemButton>
                  <ListItemButton startIcon={<Settings />}>
                    Settings <Badge sx={{ ml: 'auto' }}>2</Badge>
                  </ListItemButton>
                </Box>
              </li>
            </List>
          </Box>
          <Box
            sx={{
              borderBottom: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            }}
          />
          <Box sx={{ display: 'flex', px: '1.5rem', py: '1.5rem', gap: 1, alignItems: 'center' }}>
            <Box
              sx={{
                width: 26,
                height: 26,
                borderRadius: '26px',
                bgcolor: 'var(--joy-palette-background-level2)',
              }}
            />
            <Typography sx={{ color: 'var(--joy-palette-text-secondary)' }}>Kai Doe</Typography>
            <Button square variant="outlined" color="neutral" size="sm" sx={{ ml: 'auto' }}>
              <KeyboardArrowLeft />
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0, px: '3.5rem', py: '2rem' }}>
          <Box sx={{ pl: 4, mb: 5.5 }}>
            <Typography level="h3" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Welcome 👋
            </Typography>
            <Typography level="subtitle">
              We hope you are making good progress on your project! Feel free to read the latest
              news about Strapi. We are giving our best to improve the product based on your
              feedback.
            </Typography>
            <Button
              variant="text"
              endIcon={<OpenInNew fontSize="sm" />}
              size="sm"
              sx={{ ml: -2, mt: 2 }}
            >
              SEE MORE ON THE BLOG
            </Button>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 352px' },
              gap: 3,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: 3,
                  alignItems: 'center',
                  bgcolor: 'var(--joy-palette-background-body)',
                  boxShadow: 'var(--joy-shadow-sm)',
                  borderRadius: '8px',
                }}
              >
                <Tile sx={{ p: 2 }}>
                  <Tile variant="contained">
                    <Info />
                  </Tile>
                </Tile>
                <div>
                  <Typography level="bodyHighlight" sx={{ fontSize: '1rem' }}>
                    Read the documentation
                  </Typography>
                  <Typography level="subtitle">
                    Discover the concepts, reference, guides and tutorials.
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: 3,
                  alignItems: 'center',
                  bgcolor: 'var(--joy-palette-background-body)',
                  boxShadow: 'var(--joy-shadow-sm)',
                  borderRadius: '8px',
                }}
              >
                <Tile sx={{ p: 2 }} color="warning">
                  <Tile variant="contained" color="warning">
                    <Code />
                  </Tile>
                </Tile>
                <div>
                  <Typography level="bodyHighlight" sx={{ fontSize: '1rem' }}>
                    Code example
                  </Typography>
                  <Typography level="subtitle">
                    Learn by testing real project developed by the community
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: 3,
                  alignItems: 'center',
                  bgcolor: 'var(--joy-palette-background-body)',
                  boxShadow: 'var(--joy-shadow-sm)',
                  borderRadius: '8px',
                }}
              >
                <Tile sx={{ p: 2 }} color="secondary">
                  <Tile variant="contained" color="secondary">
                    <PlayArrow />
                  </Tile>
                </Tile>
                <div>
                  <Typography level="bodyHighlight" sx={{ fontSize: '1rem' }}>
                    Tutorial
                  </Typography>
                  <Typography level="subtitle">
                    Discover the concepts, reference, guides and tutorials.
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: 3,
                  alignItems: 'center',
                  bgcolor: 'var(--joy-palette-background-body)',
                  boxShadow: 'var(--joy-shadow-sm)',
                  borderRadius: '8px',
                }}
              >
                <Tile sx={{ p: 2 }} color="alternate">
                  <Tile variant="contained" color="alternate">
                    <HistoryEdu />
                  </Tile>
                </Tile>
                <div>
                  <Typography level="bodyHighlight" sx={{ fontSize: '1rem' }}>
                    Blog
                  </Typography>
                  <Typography level="subtitle">
                    Discover the concepts, reference, guides and tutorials.
                  </Typography>
                </div>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  p: 3,
                  bgcolor: 'var(--joy-palette-background-body)',
                  boxShadow: 'var(--joy-shadow-sm)',
                  borderRadius: '8px',
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>Join the community</Typography>
                <Typography level="subtitle">
                  Discuss with team members, contributors and developers on different channels.
                </Typography>
                <Button
                  variant="text"
                  size="sm"
                  endIcon={<ArrowForward fontSize="md" />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  SEE OUR ROAD MAP
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Settings - Webhooks list */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--joy-palette-background-level1)',
          display: 'flex',
          my: '5rem',
        }}
      >
        <Box
          sx={{
            width: 64,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'var(--joy-palette-background-body)',
            borderRight: '1px solid',
            borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
          }}
        >
          <Box
            sx={{
              px: '0.75rem',
              py: '1rem',
              borderBottom: '1px solid',
              borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
            }}
          >
            <Box
              component="img"
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
              sx={{
                borderRadius: '4px',
                width: 40,
                height: 40,
                display: 'block',
              }}
            />
          </Box>
          <List sx={{ flexGrow: 1, '& > li > button': { width: '100%' }, '& > li+ li': { mt: 1 } }}>
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <HistoryEdu fontSize="md" />
              </Button>
            </li>
            <Box
              role="none"
              sx={{
                my: 2,
                borderBottom: '1px solid',
                borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
              }}
            />
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <ViewCompact fontSize="md" />
              </Button>
            </li>
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <PermMedia fontSize="md" />
              </Button>
            </li>
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <Info fontSize="md" />
              </Button>
            </li>
            <Box
              role="none"
              sx={{
                my: 2,
                borderBottom: '1px solid',
                borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
              }}
            />
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <Extension fontSize="md" />
              </Button>
            </li>
            <li>
              <Button size="sm" square color="neutral" variant="text">
                <ShoppingCart fontSize="md" />
              </Button>
            </li>
            <li>
              <Button size="sm" square variant="light" sx={{ position: 'relative' }}>
                <Box
                  sx={(theme) => ({
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    borderRadius: 2,
                    px: '0.5rem',
                    py: '2px',
                    fontWeight: 500,
                    ...theme.variants.contained.primary,
                  })}
                >
                  2
                </Box>
                <Settings fontSize="md" />
              </Button>
            </li>
          </List>
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              py: '1.5rem',
              px: '1rem',
            }}
          >
            <Box
              sx={{
                bgcolor: 'var(--joy-palette-neutral-lightBg)',
                borderRadius: '40px',
                width: 26,
                height: 26,
              }}
            />
            <Button
              color="neutral"
              variant="outlined"
              size="sm"
              sx={{
                px: '0',
                position: 'absolute',
                right: '-8px',
                bgcolor: 'var(--joy-palette-background-body)',
              }}
            >
              <KeyboardArrowRight fontSize="sm" />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: 230,
            borderRight: '1px solid',
            borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
          }}
        >
          <Box sx={{ py: '1.5rem', px: '1.5rem' }}>
            <Typography>Settings</Typography>
          </Box>
          <Box
            sx={{
              ml: '1.5rem',
              borderBottom: '1px solid',
              borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
              width: '24px',
            }}
          />
          <List as="nav" aria-describedby="global-settings" sx={{ pr: 0, pl: '0.75rem' }}>
            <ListSubheader id="global-settings">GLOBAL SETTINGS</ListSubheader>
            <ListItemButton startIcon={<Apps />} variant="text">
              Application
            </ListItemButton>
            <ListItemButton startIcon={<VpnKey />} variant="text">
              API Tokens
            </ListItemButton>
            <ListItemButton startIcon={<HistoryEdu />} variant="text">
              Content manager
            </ListItemButton>
            <ListItemButton
              startIcon={<Webhook />}
              variant="light"
              color="primary"
              sx={{
                borderRight: '1px solid',
                borderColor: 'var(--joy-palette-primary-600)',
                borderRadius: 0,
              }}
            >
              Webhooks
            </ListItemButton>
          </List>
        </Box>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Box
            sx={{
              px: '3.5rem',
              pt: '2.25rem',
              pb: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Typography level="header1">Webhooks</Typography>
              <Typography sx={{ color: 'var(--joy-palette-text-tertiary)' }}>
                Get POST changes notifications
              </Typography>
            </div>
            <Button startIcon={<Add />} sx={{ alignSelf: 'center' }}>
              Add new webhook
            </Button>
          </Box>
          <Box sx={{ px: '3.5rem', pb: '1rem', width: 400 }}>
            <Input
              placeholder="Search for an entry"
              startAdornment={(<Search />) as any}
              sx={{ bgcolor: 'var(--joy-palette-background-body)' }}
              style={{ '--Input-minHeight': '2rem' }}
            />
          </Box>
          <Box sx={{ px: '3.5rem', pb: '1rem' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'min-content minmax(100px, 20%) 1fr 12% min-content',
                bgcolor: 'var(--joy-palette-background-body)',
                borderRadius: '4px',
                boxShadow: 'var(--joy-shadow-sm)',
                '& > div': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                },
                '& > div:nth-child(6n + 1)': {
                  pl: '24px',
                  py: '18px',
                  pr: '18px',
                },
                '& > div:nth-child(6n + 5)': {
                  pr: '1rem',
                },
              }}
            >
              <Box>
                <Checkbox />
              </Box>
              <Box>
                <Typography level="tableLabel" sx={{ color: 'var(--joy-palette-text-secondary)' }}>
                  Name
                </Typography>
              </Box>
              <Box>
                <Typography level="tableLabel">URL</Typography>
              </Box>
              <Box>
                <Typography level="tableLabel">Status</Typography>
              </Box>
              <Box />
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  mx: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                  opacity: 0.5,
                }}
              />
              <Box>
                <Checkbox />
              </Box>
              <Box>
                <Typography level="bodyHighlight">Gatsby</Typography>
              </Box>
              <Box>
                <Typography>
                  https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/
                </Typography>
              </Box>
              <Box>
                <Switch checked />{' '}
                <Typography
                  level="smallText"
                  sx={{ color: 'var(--joy-palette-success-textColor)' }}
                >
                  Enabled
                </Typography>
              </Box>
              <Box>
                <Button square variant="text" color="neutral">
                  <Edit fontSize="md" />
                </Button>
                <Button square variant="text" color="neutral">
                  <Delete fontSize="md" />
                </Button>
              </Box>
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  mx: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                  opacity: 0.5,
                }}
              />
              <Box>
                <Checkbox />
              </Box>
              <Box>
                <Typography level="bodyHighlight">Netlify</Typography>
              </Box>
              <Box>
                <Typography>
                  https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/
                </Typography>
              </Box>
              <Box>
                <Switch />{' '}
                <Typography level="smallText" sx={{ color: 'var(--joy-palette-danger-textColor)' }}>
                  Disabled
                </Typography>
              </Box>
              <Box>
                <Button square variant="text" color="neutral">
                  <Edit fontSize="md" />
                </Button>
                <Button square variant="text" color="neutral">
                  <Delete fontSize="md" />
                </Button>
              </Box>
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  mx: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                  opacity: 0.5,
                }}
              />
              <Box>
                <Checkbox />
              </Box>
              <Box>
                <Typography level="bodyHighlight">Blog</Typography>
              </Box>
              <Box>
                <Typography>
                  https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/
                </Typography>
              </Box>
              <Box>
                <Switch />{' '}
                <Typography level="smallText" sx={{ color: 'var(--joy-palette-danger-textColor)' }}>
                  Disabled
                </Typography>
              </Box>
              <Box>
                <Button square variant="text" color="neutral">
                  <Edit fontSize="md" />
                </Button>
                <Button square variant="text" color="neutral">
                  <Delete fontSize="md" />
                </Button>
              </Box>
              <Box
                sx={{
                  gridColumn: '1 / -1',
                  mx: '0.75rem',
                  borderBottom: '1px solid',
                  borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                  opacity: 0.5,
                }}
              />
              <Button
                variant="light"
                startIcon={
                  <Box
                    sx={{
                      borderRadius: '50%',
                      display: 'inline-flex',
                      p: '0.25rem',
                      bgcolor: 'var(--joy-palette-primary-lightHoverBg)',
                    }}
                  >
                    <Add />
                  </Box>
                }
                sx={{
                  '--Button-iconOffsetStep': 0,
                  '--Button-gap': '1rem',
                  p: '20px',
                  justifyContent: 'flex-start',
                  gridColumn: '1 / -1',
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                Add new webhook
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
