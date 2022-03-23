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
import Input from '@mui/joy/Input';
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
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import SvgStackOverflow from 'docs/src/icons/SvgStackOverflow';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

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
      startDecorator={<ScheduleRounded sx={{ color: '#fff' }} />}
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
      <Link component="button" underline="none" variant="text" endDecorator={<ArrowDropDown />}>
        March 2022
      </Link>
    </Box>
    <IconButton size="sm" variant="text" color="primary">
      <KeyboardArrowLeft />
    </IconButton>
    <IconButton size="sm" variant="text" color="primary">
      <KeyboardArrowRight />
    </IconButton>
    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => (
      <Typography level="body3" key={index} sx={{ justifySelf: 'center' }}>
        {d}
      </Typography>
    ))}
    <div />
    <div />
    {[...Array(30)].map((d, index) => {
      if (index === 20) {
        return (
          <Box key={index} sx={{ justifySelf: 'center' }}>
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
        <Typography level="body3" color="text.secondary" key={index} sx={{ justifySelf: 'center' }}>
          {index + 1}
        </Typography>
      );
    })}
    <Box sx={{ gridColumn: '1 / 7' }}>&nbsp;</Box>
  </Sheet>
);

function GetStartedButtons() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '&& > *': { minWidth: 'clamp(0px, (492px - 100%) * 999 ,100%)' },
      }}
    >
      <Button
        endIcon={<KeyboardArrowRight />}
        sx={{ flexShrink: 0, fontWeight: 'md', minHeight: 50 }}
      >
        Get started
      </Button>
      <Box sx={{ p: 1 }} />
      <Button
        variant="outlined"
        color="neutral"
        endIcon={<ContentCopy />}
        sx={{
          maxWidth: 300,
          pl: 2,
          fontFamily: 'code',
          fontSize: 'xs',
          minHeight: 50,
          '[data-mui-color-scheme="dark"] &': {
            bgcolor: '#132f4c',
            borderColor: '#1e4976',
            '&:hover': {
              borderColor: '#39f',
              bgcolor: '#173a5e',
              '--Icon-color': '#39f',
            },
          },
        }}
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
  );
}

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
          key={num}
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
          key={index}
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

const themeFont: JoyThemeInput = {
  fontFamily: {
    body: '"IBM Plex Sans"',
    display: '"PlusJakartaSans-ExtraBold"',
    code: ['Consolas', 'Menlo', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace'].join(','),
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
};

const themePalette: JoyThemeInput = {
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
        danger: {
          50: '#FFF0F1',
          100: '#FFDBDE',
          200: '#FFBDC2',
          300: '#FF99A2',
          400: '#FF7A86',
          500: '#FF505F',
          600: '#EB0014',
          700: '#C70011',
          800: '#94000D',
          900: '#570007',
        },
        text: {
          primary: 'var(--joy-palette-neutral-900)',
          secondary: 'var(--joy-palette-neutral-700)',
        },
        divider: 'var(--joy-palette-neutral-100)',
        // @ts-ignore
        gradient: `linear-gradient(180deg, var(--joy-palette-neutral-50) 0%, #FFFFFF 100%)`,
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
        danger: {
          50: '#FFF0F1',
          100: '#FFDBDE',
          200: '#FFBDC2',
          300: '#FF99A2',
          400: '#FF7A86',
          500: '#FF505F',
          600: '#EB0014',
          700: '#C70011',
          800: '#94000D',
          900: '#570007',
        },
        background: {
          body: '#001E3C',
          level1: '#0A1929',
        },
        text: {
          primary: '#fff',
          secondary: 'var(--joy-palette-neutral-400)',
        },
        divider: 'rgba(194, 224, 255, 0.08)',
        // @ts-ignore
        gradient: `linear-gradient(180deg, #0A1929 0%, #001E3C 100%)`,
      },
    },
  },
};

const themeComponents: JoyThemeInput = {
  components: {
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
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...((ownerState.level === 'h1' || ownerState.level === 'h2') && {
            '& .MuiTypography-inherit': {
              background: `linear-gradient(to right, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.primary[700]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
            [`[data-mui-color-scheme="dark"] & .MuiTypography-inherit`]: {
              background: theme.vars.palette.primary[400],
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          }),
        }),
      },
    },
  },
};

export default function MUI() {
  const [open, setOpen] = React.useState(false);
  const [font, setFont] = React.useState<undefined | JoyThemeInput>(themeFont);
  const [spacer, setSpacer] = React.useState<undefined | number>(10);
  const [palette, setPalette] = React.useState<undefined | JoyThemeInput>(themePalette);
  const [components, setComponents] = React.useState<undefined | JoyThemeInput>(themeComponents);
  React.useEffect(() => {
    setFont(themeFont);
    setSpacer(10);
    setPalette(themePalette);
    setComponents(themeComponents);
  }, []);
  return (
    <CssVarsProvider
      disableTransitionOnChange
      theme={{
        ...(font && { ...font }),
        ...(palette && { ...palette }),
        ...(spacer && { spacing: spacer }),
        ...(components && { ...components }),
      }}
    >
      <IconButton
        variant="contained"
        color="neutral"
        size="lg"
        onClick={() => setOpen(!open)}
        sx={{ position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 1000 }}
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
            <List sx={{ py: 1, '--List-gap': '0px' }}>
              <ListItem sx={{ fontSize: 'sm' }}>Theme config</ListItem>
              <ListItem>
                <ListItemButton
                  selected={!!font}
                  variant={font ? 'light' : 'text'}
                  onClick={() => setFont(font ? undefined : themeFont)}
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
                  onClick={() => setPalette(palette ? undefined : themePalette)}
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
                  onClick={() => setComponents(components ? undefined : themeComponents)}
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
          p: '12px',
          textAlign: 'center',
          ...theme.variants.containedOverrides.primary,
        })}
      >
        <Typography level="body3" color="text.primary">
          🚀 We&apos;re hiring a Designer, Full-stack Engineer, React Support Engineer, and more!
          &nbsp;
          <Link
            endDecorator={<ArrowForward />}
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
          <Box
            component="nav"
            aria-label="Header menu"
            sx={{ display: { xs: 'none', md: 'initial' } }}
          >
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
          </Box>
          <Button
            variant="outlined"
            color="neutral"
            size="sm"
            startIcon={<Search />}
            endIcon={
              <Sheet
                variant="outlined"
                color="neutral"
                sx={{ borderRadius: 'xs', px: '0.25rem', py: '2px', fontSize: 'xs' }}
              >
                ⌘ K
              </Sheet>
            }
            sx={{
              ml: 'auto',
              justifyContent: 'flex-start',
              minWidth: 200,
              '--Icon-color': 'primary.textColor',
            }}
          >
            <Box component="span" sx={{ mr: 'auto' }}>
              Search...
            </Box>
          </Button>
          <IconButton variant="outlined" color="neutral" size="sm">
            <GitHubIcon />
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
              gridTemplateColumns: { xs: 'auto', md: '50% 50%' },
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                maxWidth: 500,
                mx: { xs: 'auto', md: 'initial' },
                textAlign: { xs: 'center', md: 'initial' },
              }}
            >
              <Typography level="h1" sx={{ my: 2 }}>
                The React{' '}
                <Typography
                  sx={{ color: 'primary.textColor', fontFamily: 'display', whiteSpace: 'nowrap' }}
                >
                  UI library
                </Typography>{' '}
                you always wanted
              </Typography>
              <Typography sx={{ mb: 3, color: 'text.secondary' }}>
                MUI provides a robust, customizable, and accessible library of foundational and
                advanced components, enabling you to build your design system and develop React
                applications faster.
              </Typography>
              <GetStartedButtons />
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
                display: { xs: 'none', md: 'flex' },
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
      <Box sx={{ background: 'var(--joy-palette-gradient)' }}>
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            py: { xs: 4, sm: 6, md: 8 },
            px: 2,
            display: 'grid',
            gridTemplateColumns: { sm: '1fr 1fr' },
            gap: 4,
          }}
        >
          <Box>
            <Typography level="body2" sx={{ color: 'primary.textColor', fontWeight: 'md', mb: 1 }}>
              Go live!
            </Typography>
            <Typography level="h2" sx={{ maxWidth: 460 }}>
              Start building with <Typography>MUI</Typography> today!
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 1, mb: 2 }}>
              Try it for yourself, and share with us what you&apos;ve built
            </Typography>
            <GetStartedButtons />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 2,
              alignSelf: 'center',
              '[data-mui-color-scheme="dark"] &': {
                '& > div': {
                  bgcolor: '#132f4c',
                  borderColor: '#1e4976',
                },
              },
            }}
          >
            <Sheet
              variant="outlined"
              sx={{ borderRadius: 'md', p: 2, '&:hover': { boxShadow: 'md' } }}
            >
              <Typography fontSize="sm" fontWeight="md">
                Showcase
              </Typography>
              <Typography level="body2" sx={{ my: 0.5 }}>
                See more projects and companies that rely on MUI.
              </Typography>
              <Link endDecorator={<KeyboardArrowRight />} sx={{ fontWeight: 'md', fontSize: 'sm' }}>
                Learn more
              </Link>
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{ borderRadius: 'md', p: 2, '&:hover': { boxShadow: 'md' } }}
            >
              <Typography fontSize="sm" fontWeight="md">
                Blog
              </Typography>
              <Typography level="body2" sx={{ my: 0.5 }}>
                Check behind the scenes and news from the company.
              </Typography>
              <Link endDecorator={<KeyboardArrowRight />} sx={{ fontWeight: 'md', fontSize: 'sm' }}>
                Learn more
              </Link>
            </Sheet>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: '1px', bgcolor: 'divider', width: '100%' }} />
      <Box component="footer" sx={{ maxWidth: 1200, px: 2, mx: 'auto' }}>
        <Box
          sx={{
            pt: 4,
            pb: 8,
            display: 'grid',
            gridAutoColumns: '1fr',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1.75fr', lg: '1fr 1fr' },
            gridTemplateRows: 'auto',
            '& a:not(.MuiIconButton-root)': {
              mt: 1,
              color: 'text.secondary',
              typography: 'body2',
              '&:hover': {
                color: 'primary.textColor',
                textDecoration: 'underline',
              },
            },
          }}
        >
          <div>
            <SvgMuiLogo width={32} />
            <Typography level="body2" fontWeight="bold" color="text.primary" sx={{ pt: 2 }}>
              Join our newsletter!
            </Typography>
            <Typography level="body2" sx={{ mb: 2 }}>
              No spam, guaranteed.
            </Typography>
            <Box sx={{ maxWidth: 360 }}>
              <Typography
                component="label"
                level="body3"
                fontWeight="md"
                htmlFor="email-subscribe"
                sx={{ mb: 1, color: 'text.secondary' }}
              >
                Enter your email:
              </Typography>
              <Box sx={{ display: 'flex', minHeight: 44 }}>
                <Input
                  id="email-subscribe"
                  variant="light"
                  placeholder="example@email.com"
                  sx={{
                    minHeight: 44,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    '[data-mui-color-scheme="dark"] &': {
                      bgcolor: '#0a1929',
                    },
                  }}
                />
                <Button
                  variant="light"
                  color="neutral"
                  sx={{
                    bgcolor: 'neutral.300',
                    fontWeight: 'md',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    '[data-mui-color-scheme="dark"] &': { bgcolor: '#173a5e', color: '#fff' },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </div>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gridAutoColumns: '1fr',
              gap: 2,
            }}
          >
            {FEATURE_TOGGLE.nav_products ? (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography fontWeight="bold" level="body2" color="text.primary">
                  Products
                </Typography>
                <Link>MUI Core</Link>
                <Link>MUI X</Link>
                <Link>Templates</Link>
                <Link>Design kits</Link>
              </Box>
            ) : (
              <Box sx={{ display: { xs: 'none', md: 'block' } }} />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight="bold" level="body2" color="text.primary">
                Resources
              </Typography>
              <Link>Material Icons</Link>
              <Link>Free templates</Link>
              <Link>Components</Link>
              <Link>Customization</Link>
              <Link>Theming</Link>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight="bold" level="body2" color="text.primary">
                Explore
              </Typography>
              <Link>Documentation</Link>
              <Link>Blog</Link>
              <Link>Showcase</Link>
              <Link>Roadmap</Link>
              <Link>Languages</Link>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight="bold" level="body2" color="text.primary">
                Company
              </Typography>
              <Link>About</Link>
              <Link>Vision</Link>
              <Box sx={{ display: 'flex', alignItems: 'end' }}>
                <Link
                  endDecorator={
                    <Box
                      sx={(theme) => ({
                        px: 0.5,
                        py: '2px',
                        borderRadius: 'xs',
                        fontSize: 'xs',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        ...theme.variants.contained.danger,
                      })}
                    >
                      Hiring
                    </Box>
                  }
                >
                  Careers{' '}
                </Link>
              </Box>
              <Link>Support</Link>
              <Link target="_blank" rel="noopener noreferrer" href="mailto:contact@mui.com">
                Contact us
              </Link>
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: '1px', bgcolor: 'divider', width: '100%' }} />
        <Box
          sx={{
            py: 4,
            display: { xs: 'block', sm: 'flex' },
            alignItems: { sm: 'center' },
            justifyContent: { sm: 'space-between' },
          }}
        >
          <Typography color="text.secondary" level="body2">
            Copyright © {new Date().getFullYear()} Material-UI SAS.
          </Typography>
          <Box sx={{ py: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/mui"
                aria-label="github"
                title="GitHub"
                size="sm"
                variant="text"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://stackoverflow.com/questions/tagged/mui"
                aria-label="Stack Overflow"
                title="Stack Overflow"
                size="sm"
                variant="text"
              >
                <SvgStackOverflow />
              </IconButton>
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/MUI_hq"
                aria-label="twitter"
                title="Twitter"
                size="sm"
                variant="text"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/mui/"
                aria-label="linkedin"
                title="LinkedIn"
                size="sm"
                variant="text"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
