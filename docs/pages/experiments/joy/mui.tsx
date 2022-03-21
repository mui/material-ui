/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, JoyThemeInput, useColorScheme } from '@mui/joy/styles';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';

import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Search from '@mui/icons-material/Search';
import Settings from '@mui/icons-material/Settings';
import GitHub from '@mui/icons-material/GitHub';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ScheduleRounded from '@mui/icons-material/ScheduleRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ViewQuiltRounded from '@mui/icons-material/ViewQuiltRounded';
import ViewModuleRounded from '@mui/icons-material/ViewModuleRounded';
import ViewAgendaRounded from '@mui/icons-material/ViewAgendaRounded';
import ViewWeekRounded from '@mui/icons-material/ViewWeekRounded';
import ViewSidebarRounded from '@mui/icons-material/ViewSidebarRounded';

const TaskCard = () => (
  <Sheet
    variant="contained"
    color="primary"
    sx={(theme) => ({
      p: 2.5,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 280,
      maxWidth: 360,
      minHeight: 280,
      borderRadius: 'md',
      boxShadow: 'lg',
      background: `linear-gradient(to right bottom, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.primary[700]} 120%)`,
      ...theme.variants.containedOverrides.primary,
    })}
  >
    <Typography
      color="text.secondary"
      level="body3"
      fontWeight="md"
      startIcon={<ScheduleRounded sx={{ color: '#fff' }} />}
    >
      March 25th
    </Typography>
    <Box sx={{ my: 'auto' }}>
      <Sheet
        variant="contained"
        // @ts-expect-error fix color type to include `context`
        color="context"
        sx={{
          width: 28,
          height: 28,
          borderRadius: 'sm',
          display: 'flex',
          p: '4px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CodeRounded />
      </Sheet>
      <Typography level="h6" component="div" sx={{ mt: 1.5, fontWeight: 500 }}>
        Check the docs for getting every component API
      </Typography>
    </Box>
    <Box sx={{ display: 'flex' }}>
      <Avatar
        imgProps={{ 'aria-labelledby': 'demo-task-card-assigne-name' }}
        src="/static/images/avatar/1-sm.jpeg"
        variant="outlined"
        sx={{ borderRadius: 'sm', borderColor: '#fff' }}
      />
      <Box sx={{ ml: 1 }}>
        <Typography level="body3" fontWeight="md">
          Assigned to
        </Typography>
        <Typography id="demo-task-card-assigne-name" fontWeight="md">
          Michael Scott
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: -0.5, mt: 0.5 }}>
      <Sheet
        variant="light"
        // @ts-expect-error fix the color type to support context
        color="context"
        sx={{ borderRadius: '20px', height: 4, position: 'relative', flex: 1 }}
      >
        <Sheet
          variant="contained"
          sx={{
            borderRadius: '20px',
            height: '100%',
            width: '60%',
            position: 'absolute',
            left: 0,
            top: 0,
            bgcolor: '#fff',
          }}
        />
      </Sheet>
      <Typography color="#00C8FF" level="body2" sx={{ ml: 2 }}>
        <b>60%</b>
      </Typography>
    </Box>
  </Sheet>
);

const PlayerCard = () => (
  <Sheet
    variant="outlined"
    color="neutral"
    sx={{ p: 1, borderRadius: 'sm', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
  >
    <Box
      component="img"
      alt="Beside Myself album cover"
      src="/static/images/cards/basement-beside-myself.jpeg"
      sx={{
        borderRadius: '4px',
        width: 'clamp(124px, (304px - 100%) * 999 , 100%)',
      }}
    />
    <Box sx={{ alignSelf: 'center', px: { xs: 0, sm: 2 } }}>
      <Typography
        level="body1"
        color="text.primary"
        fontWeight={600}
        sx={{ textAlign: { xs: 'center', sm: 'start' }, mt: { xs: 1.5, sm: 0 } }}
      >
        Ultraviolet
      </Typography>
      <Typography
        component="div"
        level="body3"
        color="text.secondary"
        fontWeight={500}
        sx={{ textAlign: { xm: 'center', sm: 'start' } }}
      >
        Basement • Beside Myself
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: { xs: 'space-between', sm: 'flex-start' },
          '& .MuiIconButton-root': {
            borderRadius: '20px',
          },
        }}
      >
        <IconButton variant="outlined" size="sm" color="neutral" aria-label="fast rewind" disabled>
          <FastRewindRounded />
        </IconButton>
        <IconButton variant="outlined" color="neutral" sx={{ mx: 1 }}>
          <PlayArrowRounded />
        </IconButton>
        <IconButton variant="outlined" size="sm" color="neutral" aria-label="fast forward" disabled>
          <FastForwardRounded />
        </IconButton>
      </Box>
    </Box>
  </Sheet>
);

const LanguageToggle = () => (
  <Box
    sx={{
      display: 'flex',
      '& > button': {
        flex: 1,
        borderRadius: 0,
        minHeight: 48,
        '&:not(:first-of-type)': {
          marginLeft: '-1px',
        },
        '&:first-of-type': {
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        },
        '&:last-of-type': { borderTopRightRadius: '8px', borderBottomRightRadius: '8px' },
      },
    }}
  >
    <Button variant="outlined" color="primary" size="sm" sx={{ zIndex: 1 }}>
      React
    </Button>
    <Button variant="outlined" color="neutral" size="sm">
      TypeScript
    </Button>
    <Button variant="outlined" color="neutral" size="sm">
      CSS
    </Button>
  </Box>
);

const DatePicker = () => (
  <Sheet
    variant="outlined"
    color="neutral"
    sx={{
      p: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 1,
      borderRadius: 'md',
      alignItems: 'center',
    }}
  >
    <Box sx={{ gridColumn: '1 / 6', pl: 1 }}>
      <Link component="button" underline="none" variant="text" endIcon={<ArrowDropDown />}>
        March 2022
      </Link>
    </Box>
    <IconButton size="sm" variant="text" color="primary">
      <KeyboardArrowLeft />
    </IconButton>
    <IconButton size="sm" variant="text" color="primary">
      <KeyboardArrowRight />
    </IconButton>
    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
      <Typography level="body3" key={d} sx={{ justifySelf: 'center' }}>
        {d}
      </Typography>
    ))}
    <div />
    <div />
    {[...Array(30)].map((d, index) => {
      if (index === 20) {
        return (
          <Box sx={{ justifySelf: 'center' }}>
            <IconButton
              variant="contained"
              color="primary"
              sx={{ '--IconButton-size': '24px', borderRadius: '20px', my: '-3px' }}
            >
              {index + 1}
            </IconButton>
          </Box>
        );
      }
      return (
        <Typography level="body3" color="text.secondary" key={d} sx={{ justifySelf: 'center' }}>
          {index + 1}
        </Typography>
      );
    })}
    <Box sx={{ gridColumn: '1 / 7' }}>&nbsp;</Box>
  </Sheet>
);

const Tabs = () => (
  <Sheet
    variant="contained"
    color="primary"
    sx={{
      borderRadius: 'md',
      display: 'flex',
      gap: 1,
      p: 1,
      boxShadow: 'md',
    }}
  >
    <Button variant="contained">
      Yesterday
      <Box
        sx={(theme) => ({
          height: 2,
          width: '60%',
          bgcolor: '#fff',
          position: 'absolute',
          bottom: theme.spacing(-1),
        })}
      />
    </Button>
    <Button variant="contained">Today</Button>
    <Button variant="contained">Tomorrow</Button>
  </Sheet>
);

const ThemeSlider = () => (
  <Sheet
    variant="outlined"
    color="neutral"
    sx={{ bgcolor: 'background.body', p: 2, borderRadius: 'sm' }}
  >
    <Sheet
      variant="light"
      color="neutral"
      sx={{ position: 'relative', width: 4, mx: 'auto', height: 180, borderRadius: '4px' }}
    >
      {[0, 0.25, 0.5, 0.75, 1].map((num) => (
        <Box
          sx={{
            width: 2,
            height: 2,
            bgcolor: 'currentColor',
            borderRadius: 4,
            position: 'absolute',
            top: num * 180,
            left: 1,
          }}
        />
      ))}
      <Box
        sx={{
          width: 8,
          height: 8,
          top: 180 * 0.5 - 2,
          left: '-2px',
          bgcolor: 'primary.textColor',
          position: 'absolute',
          borderRadius: '8px',
        }}
      >
        <Typography
          level="body2"
          fontWeight="md"
          color="text.tertiary"
          sx={{ transform: 'translate(16px, -7px)' }}
        >
          50°C
        </Typography>
      </Box>
      <Box
        sx={{
          width: 4,
          position: 'absolute',
          top: 0.5 * 180,
          height: '25%',
          bgcolor: 'primary.500',
        }}
      />
      <Box
        sx={{
          width: 8,
          height: 8,
          top: 180 * 0.75 - 2,
          left: '-2px',
          bgcolor: 'primary.500',
          position: 'absolute',
          borderRadius: '8px',
        }}
      >
        <Typography
          level="body2"
          fontWeight="md"
          color="text.tertiary"
          sx={{ transform: 'translate(16px, -7px)' }}
        >
          25°C
        </Typography>
      </Box>
    </Sheet>
  </Sheet>
);

const viewIcons = [
  <ViewQuiltRounded />,
  <ViewModuleRounded />,
  <ViewAgendaRounded />,
  <ViewWeekRounded />,
  <ViewSidebarRounded />,
];
const ViewToggleButton = () => (
  <Box
    sx={{
      display: 'flex',
      '& > button': {
        flex: 1,
        borderRadius: 0,
        '&:not(:first-of-type)': {
          marginLeft: '-1px',
        },
        '&:first-of-type': {
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        },
        '&:last-of-type': { borderTopRightRadius: '8px', borderBottomRightRadius: '8px' },
      },
    }}
  >
    {viewIcons.map((icon, index) => {
      const selected = index === 0;
      return (
        <IconButton
          variant="outlined"
          color={selected ? 'primary' : 'neutral'}
          sx={{ zIndex: selected ? 1 : 'auto' }}
        >
          {icon}
        </IconButton>
      );
    })}
  </Box>
);

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
    <IconButton
      variant="outlined"
      color="neutral"
      size="sm"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default function MUI() {
  const [open, setOpen] = React.useState(false);
  const [font, setFont] = React.useState<undefined | JoyThemeInput>(undefined);
  const [spacer, setSpacer] = React.useState<undefined | number>(undefined);
  const [palette, setPalette] = React.useState<undefined | JoyThemeInput>(undefined);
  const [components, setComponents] = React.useState<undefined | JoyThemeInput['components']>(
    undefined,
  );
  return (
    <CssVarsProvider
      disableTransitionOnChange
      theme={{
        ...(font && { ...font }),
        ...(palette && { ...palette }),
        ...(spacer && { spacing: spacer }),
        ...(components && { components }),
      }}
    >
      <IconButton
        variant="contained"
        color="neutral"
        size="lg"
        onClick={() => setOpen(!open)}
        sx={{ position: 'fixed', bottom: '1rem', left: '1rem' }}
      >
        <Settings />
      </IconButton>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Sheet
            variant="outlined"
            color="neutral"
            sx={{
              boxShadow: 'md',
              borderRadius: 'sm',
              position: 'fixed',
              left: '1rem',
              bottom: '4.5rem',
              zIndex: 1,
            }}
          >
            <List sx={{ borderRadius: 'sm', py: 1, '--List-gap': '0px' }}>
              <ListItem sx={{ fontSize: 'sm' }}>Theme config</ListItem>
              <ListItem>
                <ListItemButton
                  selected={!!font}
                  variant={font ? 'light' : 'text'}
                  onClick={() =>
                    setFont(
                      font
                        ? undefined
                        : {
                            fontFamily: {
                              body: '"IBM Plex Sans"',
                              display: '"PlusJakartaSans-ExtraBold"',
                              code: [
                                'Consolas',
                                'Menlo',
                                'Monaco',
                                'Andale Mono',
                                'Ubuntu Mono',
                                'monospace',
                              ].join(','),
                            },
                            typography: {
                              h1: {
                                fontFamily: ['"PlusJakartaSans-ExtraBold"'].join(','),
                                fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
                                fontWeight: 800,
                                lineHeight: 78 / 70,
                              },
                              h2: {
                                fontFamily: ['"PlusJakartaSans-ExtraBold"'].join(','),
                                fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
                                fontWeight: 800,
                                lineHeight: 44 / 36,
                                // color: mode === 'dark' ? grey[100] : blueDark[700],
                              },
                              h3: {
                                fontFamily: ['"PlusJakartaSans-Bold"'].join(','),
                                fontSize: `${36 / 16}rem`,
                                lineHeight: 44 / 36,
                                letterSpacing: 0.2,
                              },
                              h4: {
                                fontFamily: ['"PlusJakartaSans-Bold"'].join(','),
                                fontSize: `${28 / 16}rem`,
                                lineHeight: 42 / 28,
                                letterSpacing: 0.2,
                              },
                              h5: {
                                fontFamily: ['"PlusJakartaSans-Bold"'].join(','),
                                fontSize: `${24 / 16}rem`,
                                lineHeight: 36 / 24,
                                letterSpacing: 0.1,
                                // color: mode === 'dark' ? blue[300] : blue.main,
                              },
                              h6: {
                                fontSize: `${20 / 16}rem`,
                                lineHeight: 30 / 20,
                              },
                              body1: {
                                fontSize: '1rem', // 16px
                                lineHeight: 24 / 16,
                                letterSpacing: 0,
                              },
                              body2: {
                                fontSize: `${14 / 16}rem`, // 14px
                                lineHeight: 21 / 14,
                                letterSpacing: 0,
                              },
                            },
                          },
                    )
                  }
                >
                  <ListItemDecorator>
                    {font ? <CheckBox /> : <CheckBoxOutlineBlank />}
                  </ListItemDecorator>
                  Font
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected={!!spacer}
                  variant={spacer ? 'light' : 'text'}
                  onClick={() => setSpacer(spacer ? undefined : 10)}
                >
                  <ListItemDecorator>
                    {spacer ? <CheckBox /> : <CheckBoxOutlineBlank />}
                  </ListItemDecorator>
                  Spacing
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected={!!palette}
                  variant={palette ? 'light' : 'text'}
                  onClick={() =>
                    setPalette(
                      palette
                        ? undefined
                        : {
                            colorSchemes: {
                              light: {
                                palette: {
                                  primary: {
                                    50: '#F0F7FF',
                                    100: '#C2E0FF',
                                    200: '#99CCF3',
                                    300: '#66B2FF',
                                    400: '#3399FF',
                                    500: '#007FFF',
                                    600: '#0072E5', // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
                                    700: '#0059B2',
                                    800: '#004C99',
                                    900: '#003A75',
                                    textColor: 'var(--joy-palette-primary-500)',
                                    outlinedColor: 'var(--joy-palette-primary-500)',
                                    containedBg: 'var(--joy-palette-primary-500)',
                                  },
                                  neutral: {
                                    50: '#F3F6F9',
                                    100: '#E7EBF0',
                                    200: '#E0E3E7',
                                    300: '#CDD2D7', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
                                    400: '#B2BAC2', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
                                    500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
                                    600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
                                    700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
                                    800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
                                    900: '#1A2027',
                                    outlinedHoverBg: 'var(--joy-palette-neutral-50)',
                                    outlinedHoverBorder: 'var(--joy-palette-neutral-300)',
                                  },
                                },
                              },
                              dark: {
                                palette: {
                                  primary: {
                                    50: '#F0F7FF',
                                    100: '#C2E0FF',
                                    200: '#99CCF3',
                                    300: '#66B2FF',
                                    400: '#3399FF',
                                    500: '#007FFF',
                                    600: '#0072E5', // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
                                    700: '#0059B2',
                                    800: '#004C99',
                                    900: '#003A75',
                                  },
                                  neutral: {
                                    50: '#F3F6F9',
                                    100: '#E7EBF0',
                                    200: '#E0E3E7',
                                    300: '#CDD2D7', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
                                    400: '#B2BAC2', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
                                    500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
                                    600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
                                    700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
                                    800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
                                    900: '#1A2027',
                                    outlinedBorder: '#132F4C',
                                    outlinedHoverBorder: '#173A5E',
                                  },
                                  background: {
                                    body: '#001E3C',
                                    level1: '#0A1929',
                                  },
                                },
                              },
                            },
                          },
                    )
                  }
                >
                  <ListItemDecorator>
                    {palette ? <CheckBox /> : <CheckBoxOutlineBlank />}
                  </ListItemDecorator>
                  Palette
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected={!!components}
                  variant={components ? 'light' : 'text'}
                  onClick={() =>
                    setComponents(
                      components
                        ? undefined
                        : {
                            MuiButton: {
                              styleOverrides: {
                                root: ({ ownerState, theme }) => ({
                                  ...(ownerState.variant === 'outlined' &&
                                    ownerState.color === 'neutral' && {
                                      '[data-mui-color-scheme="light"] &': {
                                        backgroundColor: theme.vars.palette.neutral[50],
                                        '&:hover': {
                                          borderColor: theme.vars.palette.neutral[300],
                                        },
                                      },
                                    }),
                                }),
                              },
                            },
                            MuiIconButton: {
                              styleOverrides: {
                                root: ({ ownerState, theme }) => ({
                                  ...(ownerState.variant === 'outlined' &&
                                    ownerState.color === 'neutral' && {
                                      color: theme.vars.palette.primary.textColor,
                                      '&:hover': {
                                        color: theme.vars.palette.primary.textColor,
                                      },
                                    }),
                                }),
                              },
                            },
                          },
                    )
                  }
                >
                  <ListItemDecorator>
                    {components ? <CheckBox /> : <CheckBoxOutlineBlank />}
                  </ListItemDecorator>
                  Components
                </ListItemButton>
              </ListItem>
            </List>
          </Sheet>
        </ClickAwayListener>
      )}
      <GlobalStyles
        styles={{
          body: { margin: 0, backgroundColor: 'var(--joy-palette-background-body)' },
          '*': { boxSizing: 'border-box' },
        }}
      />
      <Sheet
        variant="contained"
        color="primary"
        sx={(theme) => ({
          minHeight: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...theme.variants.containedOverrides.primary,
        })}
      >
        <Typography level="body3" color="text.primary">
          🚀 We&apos;re hiring a Designer, Full-stack Engineer, React Support Engineer, and more!
          &nbsp;
          <Link
            endIcon={<ArrowForward />}
            // @ts-expect-error need to add `context` to color prop
            color="context"
            underline="always"
            sx={{ fontWeight: 'md' }}
          >
            <b>Check the careers page</b>
          </Link>
        </Typography>
      </Sheet>
      <Sheet
        sx={{
          borderWidth: '0 0 1px 0',
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
          '[data-mui-color-scheme="dark"] &': { bgcolor: 'background.level1' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: 56,
            maxWidth: 1200,
            px: 2,
            mx: 'auto',
            gap: 1,
          }}
        >
          <Box aria-label="Go to homepage" sx={{ lineHeight: 0, mr: 2 }}>
            <SvgMuiLogo width={30} />
          </Box>
          <nav aria-label="Header menu">
            <List
              role="menubar"
              row
              sx={{
                '--List-item-radius': '0.5rem',
                '--List-item-fontSize': '0.875rem',
                '--List-gap': '0px',
                '--List-background': 'initial',
                '& > li': {
                  fontWeight: 'lg',
                },
              }}
            >
              <ListItemButton component="li" role="menuitem">
                Products
              </ListItemButton>
              <ListItemButton component="li" role="menuitem">
                Docs
              </ListItemButton>
              <ListItemButton component="li" role="menuitem">
                Pricing
              </ListItemButton>
              <ListItemButton component="li" role="menuitem">
                About us
              </ListItemButton>
              <ListItemButton component="li" role="menuitem">
                Blog
              </ListItemButton>
            </List>
          </nav>
          <Button
            variant="outlined"
            color="neutral"
            size="sm"
            startIcon={<Search sx={{ color: 'primary.textColor' }} />}
            endIcon={
              <Sheet
                variant="outlined"
                color="neutral"
                sx={{ borderRadius: 'xs', px: '0.25rem', py: '2px', fontSize: 'xs' }}
              >
                ⌘ K
              </Sheet>
            }
            sx={{ ml: 'auto', justifyContent: 'flex-start', minWidth: 200 }}
          >
            <Box component="span" sx={{ mr: 'auto' }}>
              Search...
            </Box>
          </Button>
          <IconButton variant="outlined" color="neutral" size="sm">
            <GitHub />
          </IconButton>
          <ColorSchemePicker />
        </Box>
      </Sheet>
      <Box sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            maxWidth: 1200,
            px: 2,
            mx: 'auto',
            minHeight: 500,
            height: 'calc(100vh - 120px)',
            maxHeight: { xs: 500, sm: 700, xl: 1000 },
            transition: '0.3s',
          }}
        >
          <Box
            sx={{
              height: '100%',
              mx: 'auto',
              display: 'grid',
              gridTemplateColumns: '50% 50%',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Box sx={{ maxWidth: 500 }}>
              <Typography level="h1" sx={{ my: 2 }}>
                The React <br />
                <Typography sx={{ color: 'primary.textColor', fontFamily: 'display' }}>
                  UI library
                </Typography>{' '}
                you always wanted
              </Typography>
              <Typography sx={{ mb: 3, color: 'text.secondary' }}>
                MUI provides a robust, customizable, and accessible library of foundational and
                advanced components, enabling you to build your design system and develop React
                applications faster.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, maxWidth: 500 }}>
                <Button
                  endIcon={<KeyboardArrowRight />}
                  sx={{ flexShrink: 0, fontWeight: 'md', minHeight: 50 }}
                >
                  Get started
                </Button>
                <Button
                  variant="outlined"
                  color="neutral"
                  endIcon={<ContentCopy fontSize="xl" />}
                  sx={{ maxWidth: 300, pl: 2, fontFamily: 'code', fontSize: 'xs', minHeight: 50 }}
                >
                  <Box
                    component="span"
                    sx={{
                      minWidth: 0,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    npm install @mui/material @emotion/react @emotion/styledx
                  </Box>
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: 'background.level1',
                minWidth: '2000px',
                minHeight: 500,
                height: 'calc(100vh - 120px)',
                maxHeight: { md: 700, xl: 1000 },
                borderBottomLeftRadius: 10,
                transition: 'max-height 0.3s',
                position: 'relative',
                overflow: 'scroll',
                p: 3,
                display: 'flex',
              }}
            >
              <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap: 4, width: 360 }}>
                <TaskCard />
                <PlayerCard />
                <LanguageToggle />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      flexGrow: 1,
                    }}
                  >
                    <Switch
                      defaultChecked
                      sx={{
                        '--Switch-track-width': '32px',
                        '--Switch-track-height': '20px',
                        '--Switch-thumb-size': '14px',
                      }}
                    />
                    <Switch
                      sx={{
                        '--Switch-track-width': '32px',
                        '--Switch-track-height': '20px',
                        '--Switch-thumb-size': '14px',
                      }}
                    />
                  </Box>
                  <Box sx={{ width: 40 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Sheet
                      variant="light"
                      color="primary"
                      sx={{
                        fontFamily: 'body',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: 'sm',
                        p: '6px',
                        pl: '12px',
                        borderRadius: '20px',
                      }}
                    >
                      React
                      <IconButton
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: '20px', '--IconButton-size': '18px' }}
                      >
                        <CloseRounded fontSize="md" />
                      </IconButton>
                    </Sheet>
                    <Sheet
                      variant="light"
                      color="neutral"
                      sx={{
                        fontFamily: 'body',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: 'sm',
                        p: '6px',
                        pl: '12px',
                        borderRadius: '20px',
                      }}
                    >
                      React
                      <IconButton
                        variant="contained"
                        color="neutral"
                        sx={{ borderRadius: '20px', '--IconButton-size': '18px' }}
                      >
                        <CloseRounded fontSize="md" />
                      </IconButton>
                    </Sheet>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{ display: 'inline-flex', flexDirection: 'column', gap: 4, ml: 4, width: 400 }}
              >
                <DatePicker />
                <Tabs />
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <ThemeSlider />
                  </Box>
                  <Box sx={{ ml: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <ViewToggleButton />
                    <Button variant="contained" sx={{ flexGrow: 1 }}>
                      Buy now
                    </Button>
                    <Button variant="outlined" sx={{ flexGrow: 1 }}>
                      Buy now
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
