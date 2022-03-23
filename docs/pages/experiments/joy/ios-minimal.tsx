import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme, styled, JoyTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import NearMe from '@mui/icons-material/NearMe';
import Wifi from '@mui/icons-material/Wifi';
import SignalCellularAlt from '@mui/icons-material/SignalCellularAlt';
import Battery60 from '@mui/icons-material/Battery60';
import QueueMusic from '@mui/icons-material/QueueMusic';
import ArrowForward from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackIos from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIosRounded';
import SupervisorAccount from '@mui/icons-material/SupervisorAccountRounded';
import Tune from '@mui/icons-material/TuneRounded';
import CurrencyYen from '@mui/icons-material/CurrencyYenRounded';
import Stars from '@mui/icons-material/StarsRounded';
import BusinessCenter from '@mui/icons-material/BusinessCenterRounded';
import Handyman from '@mui/icons-material/HandymanRounded';
import MusicNote from '@mui/icons-material/MusicNoteRounded';
import DesignServices from '@mui/icons-material/DesignServicesRounded';
import Done from '@mui/icons-material/DoneRounded';
import OutlinedFlag from '@mui/icons-material/OutlinedFlagRounded';
import BeachAccess from '@mui/icons-material/BeachAccessRounded';
import ViewInAr from '@mui/icons-material/ViewInArRounded';
import AddModerator from '@mui/icons-material/AddModeratorRounded';
import CreditCard from '@mui/icons-material/CreditCardRounded';
import Title from '@mui/icons-material/TitleRounded';
import Loupe from '@mui/icons-material/LoupeRounded';
import Close from '@mui/icons-material/CloseRounded';
import Person from '@mui/icons-material/PersonRounded';
import HelpOutline from '@mui/icons-material/HelpOutlineRounded';

declare module '@mui/joy/styles' {
  interface PaletteText {
    quarternary: string;
  }

  interface Palette {
    separator: {
      opaque: string;
      nonOpaque: string;
    };
  }

  interface TypographySystem {
    footnote: Record<string, number | string>;
    caption1: Record<string, number | string>;
    caption2: Record<string, number | string>;
    caption3: Record<string, number | string>;
    rubric1: Record<string, number | string>;
    rubric2: Record<string, number | string>;
    rubric3: Record<string, number | string>;
    rubric4: Record<string, number | string>;
    rubric5: Record<string, number | string>;
  }
}

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
      sx={{ minWidth: 40, p: '0.25rem', alignSelf: 'flex-start' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const ViewPort = styled('div')(({ theme }) => ({
  width: 414,
  minHeight: `calc(100vh - 2 * 24px)`,
  flexShrink: 0,
  borderRadius: '30px',
  overflow: 'hidden',
  backgroundColor: theme.vars.palette.background.body,
  scrollSnapAlign: 'center',
}));

const StatusToolBar = styled('div')(() => ({
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1rem',
}));

const StatusBar = () => (
  <StatusToolBar>
    <Box sx={{ pl: '0.5rem', display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>4:20</Typography>
      <NearMe fontSize="sm" sx={{ ml: '2px' }} />
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <SignalCellularAlt fontSize="lg" />
      <Wifi fontSize="lg" />
      <Battery60 fontSize="xl" sx={{ transform: 'rotate(90deg)', ml: '2px' }} />
    </Box>
  </StatusToolBar>
);

const Step = ({ number }: { number: number }) => (
  <Box
    sx={[
      (theme) => theme.typography.body1,
      (theme) => theme.variants.contained.primary,
      {
        borderRadius: '40px',
        width: 24,
        height: 24,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      },
    ]}
  >
    {number}
  </Box>
);

const Header = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: (theme) => theme.vars.palette.background.level3,
      borderBottom: '1px solid',
      // @ts-ignore
      borderColor: (theme) => theme.vars.palette.separator.opaque,
      backdropFilter: 'blur(30px)',
    }}
  >
    {children}
  </Box>
);

const ListSubheader = styled('div')(({ theme }) => ({
  padding: '20px 20px 8px',
  // @ts-ignore
  ...theme.typography.rubric2,
  backgroundColor: theme.vars.palette.background.level2,
}));

const ItemLine = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px',
  paddingRight: '20px',
  minHeight: 44,
  borderBottom: '1px solid',
  // @ts-ignore
  borderColor: theme.vars.palette.separator.opaque,
  '& > svg:first-child': {
    color: theme.vars.palette.text.secondary,
    marginLeft: '-4px',
    marginRight: '10px',
  },
}));

const Check = ({
  checked,
  color = 'danger',
}: {
  checked?: boolean;
  color?: 'danger' | 'success';
}) => (
  <Box
    sx={[
      { width: 24, height: 24, borderRadius: '24px', p: '2px' },
      (theme) => (checked ? theme.variants.contained[color] : null),
      !checked && { border: '2px solid', borderColor: (theme) => theme.vars.palette.neutral[300] },
    ]}
  >
    {checked && <Done fontSize="lg" />}
  </Box>
);

const Tabs = styled('div')(({ theme }) => ({
  borderRadius: '8px',
  minHeight: 32,
  padding: '0 2px',
  display: 'flex',
  gap: '2px',
  alignItems: 'center',
  backgroundColor: theme.vars.palette.background.level2,
}));

const Tab = styled('button')<{ selected?: boolean }>(({ theme, selected }) => ({
  border: 'none',
  outline: 'none',
  borderRadius: '7px',
  padding: '6px 8px',
  cursor: 'pointer',
  minWidth: 96,
  backgroundColor: 'initial',
  // @ts-ignore
  ...theme.typography.footnote,
  color: theme.vars.palette.text.primary,
  ...(selected && {
    backgroundColor: theme.vars.palette.background.level1,
    boxShadow: theme.shadow.sm,
  }),
}));

export default function IosMinimalPage() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                100: undefined,
                200: undefined,
                300: undefined,
                400: undefined,
                500: undefined,
                600: undefined,
                700: undefined,
                800: undefined,
                900: undefined,
                textColor: 'hsla(211, 100%, 50%, 1)',
                containedBg: 'hsla(211, 100%, 50%, 1)',
                containedHoverBg: undefined,
                containedActiveBg: 'hsla(211, 100%, 40%, 1)',
              },
              warning: {
                100: undefined,
                200: undefined,
                300: undefined,
                400: undefined,
                500: undefined,
                600: undefined,
                700: undefined,
                800: undefined,
                900: undefined,
                textColor: 'hsla(35, 100%, 50%, 1)',
                containedBg: 'hsla(35, 100%, 50%, 1)',
                containedHoverBg: undefined,
                containedActiveBg: 'hsla(35, 100%, 40%, 1)',
              },
              danger: {
                100: undefined,
                200: undefined,
                300: undefined,
                400: undefined,
                500: undefined,
                600: undefined,
                700: undefined,
                800: undefined,
                900: undefined,
                textColor: 'hsla(349, 100%, 59%, 1)',
                containedBg: 'hsla(349, 100%, 59%, 1)',
              },
              success: {
                100: undefined,
                200: undefined,
                300: undefined,
                400: undefined,
                500: undefined,
                600: undefined,
                700: undefined,
                800: undefined,
                900: undefined,
                textColor: 'hsla(135, 59%, 49%, 1)',
                containedBg: 'hsla(135, 59%, 49%, 1)',
              },
              neutral: {
                100: 'hsla(240, 24%, 96%, 1)',
                200: 'hsla(240, 11%, 91%, 1)',
                300: 'hsla(240, 6%, 83%, 1)',
                400: 'hsla(240, 5%, 79%, 1)',
                500: 'hsla(240, 3%, 69%, 1)',
                600: 'hsla(240, 2%, 57%, 1)',
                outlinedColor: 'var(--joy-palette-primary-textColor)',
                outlinedBg: 'rgba(116, 116, 128, 0.08)',
                outlinedBorder: 'var(--joy-palette-neutral-200)',
                outlinedHoverBg: undefined,
                outlinedActiveBg: 'rgba(116, 116, 128, 0.16)',
                lightBg: 'rgba(116, 116, 128, 0.08)',
                lightColor: 'var(--joy-palette-text-primary)',
              },
              background: {
                level1: 'hsla(0, 0%, 100%, 1)',
                level2: 'hsla(240, 24%, 96%, 1)',
                level3: 'hsla(0, 0%, 0%, 0.02)',
              },
              text: {
                primary: 'hsla(0, 0%, 0%, 1)',
                secondary: 'hsla(240, 6%, 25%, 0.6)',
                tertiary: 'hsla(240, 6%, 25%, 0.33)',
                quarternary: 'hsla(240, 6%, 25%, 0.18)',
              },
              // @ts-ignore
              separator: {
                opaque: 'hsla(240, 2%, 88%, 1)',
                nonOpaque: 'hsla(240, 6%, 25%, 0.33)',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                100: undefined,
                200: undefined,
                300: undefined,
                400: undefined,
                500: undefined,
                600: undefined,
                700: undefined,
                800: undefined,
                900: undefined,
                textColor: 'hsla(210, 100%, 52%, 1)',
                containedBg: 'hsla(210, 100%, 52%, 1)',
                containedHoverBg: undefined,
                containedActiveBg: 'hsla(210, 100%, 60%, 1)',
              },
              warning: {
                100: undefined,
                200: undefined,
                300: undefined,
                400: undefined,
                500: undefined,
                600: undefined,
                700: undefined,
                800: undefined,
                900: undefined,
                textColor: 'hsla(36, 100%, 52%, 1)',
                containedBg: 'hsla(36, 100%, 52%, 1)',
                containedHoverBg: undefined,
                containedActiveBg: 'hsla(36, 100%, 60%, 1)',
                containedColor: 'hsla(0, 0%, 0%, 1)',
              },
              danger: {
                100: undefined,
                200: undefined,
                300: undefined,
                400: undefined,
                500: undefined,
                600: undefined,
                700: undefined,
                800: undefined,
                900: undefined,
                textColor: 'hsla(348, 100%, 61%, 1)',
                containedBg: 'hsla(348, 100%, 61%, 1)',
                containedColor: 'hsla(0, 0%, 0%, 1)',
              },
              success: {
                100: undefined,
                200: undefined,
                300: undefined,
                400: undefined,
                500: undefined,
                600: undefined,
                700: undefined,
                800: undefined,
                900: undefined,
                textColor: 'hsla(129, 67%, 52%, 1)',
                containedBg: 'hsla(129, 67%, 52%, 1)',
                containedColor: 'hsla(0, 0%, 0%, 1)',
              },
              neutral: {
                100: 'hsla(240, 3%, 11%, 1)',
                200: 'hsla(240, 2%, 18%, 1)',
                300: 'hsla(240, 2%, 23%, 1)',
                400: 'hsla(240, 1%, 29%, 1)',
                500: 'hsla(240, 1%, 39%, 1)',
                600: 'hsla(240, 2%, 57%, 1)',
                outlinedColor: 'var(--joy-palette-primary-textColor)',
                outlinedBg: 'rgba(111, 114, 120, 0.24)',
                outlinedBorder: 'var(--joy-palette-neutral-200)',
                outlinedHoverBg: undefined,
                outlinedActiveBg: 'rgba(111, 114, 120, 0.16)',
                lightBg: 'rgba(111, 114, 120, 0.08)',
                lightColor: 'var(--joy-palette-text-primary)',
              },
              background: {
                level1: 'hsla(0, 0%, 0%, 1)',
                level2: 'hsla(240, 3%, 11%, 1)',
                level3: 'hsla(240, 2%, 18%, 1)',
              },
              text: {
                primary: 'hsla(0, 0%, 100%, 1)',
                secondary: 'hsla(240, 33%, 94%, 0.6)',
                tertiary: 'hsla(240, 33%, 94%, 0.3)',
                quarternary: 'hsla(240, 33%, 94%, 0.18)',
              },
              // @ts-ignore
              separator: {
                opaque: 'hsla(210, 3%, 15%, 1)',
                nonOpaque: 'hsla(240, 2%, 34%, 0.7)',
              },
            },
          },
        },
        fontFamily: {
          display: 'SF Pro Display, var(--joy-fontFamily-fallback)',
          body: 'SF Pro Text, var(--joy-fontFamily-fallback)',
        },
        typography: {
          h1: {
            fontSize: 60,
            lineHeight: '70px',
            letterSpacing: '0.25px',
            fontWeight: 'bold',
          },
          h2: {
            fontSize: 34,
            lineHeight: '41px',
            letterSpacing: '0.37px',
            fontWeight: 'bold',
          },
          h3: {
            fontSize: 28,
            lineHeight: '34px',
            letterSpacing: '0.36px',
            fontWeight: 'bold',
          },
          h4: {
            fontSize: 22,
            lineHeight: '28px',
            letterSpacing: '0.35px',
            fontWeight: 'bold',
          },
          h5: {
            fontSize: 20,
            lineHeight: '24px',
            letterSpacing: '0.38px',
            fontWeight: 600,
          },
          h6: {
            fontSize: 17,
            lineHeight: '22px',
            fontWeight: 600,
          },
          body1: {
            fontSize: 17,
            lineHeight: '22px',
          },
          body2: {
            fontSize: 16,
            lineHeight: '21px',
          },
          body3: {
            fontSize: 15,
            lineHeight: '20px',
            color: 'var(--joy-palette-text-secondary)',
          },
          // @ts-ignore
          footnote: {
            fontSize: 13,
            lineHeight: '16px',
            fontFamily: 'var(--joy-fontFamily-body)',
            color: 'var(--joy-palette-text-secondary)',
          },
          // @ts-ignore
          caption1: {
            fontSize: 12,
            lineHeight: '16px',
            fontFamily: 'var(--joy-fontFamily-body)',
          },
          caption2: {
            fontSize: 11,
            lineHeight: '12px',
            fontFamily: 'var(--joy-fontFamily-body)',
          },
          caption3: {
            fontSize: 10,
            lineHeight: '12px',
            fontFamily: 'var(--joy-fontFamily-body)',
          },
          rubric1: {
            fontSize: 15,
            lineHeight: '22px',
            textTransform: 'uppercase',
            fontFamily: 'var(--joy-fontFamily-body)',
          },
          rubric2: {
            fontSize: 13,
            lineHeight: '18px',
            textTransform: 'uppercase',
            color: 'var(--joy-palette-text-secondary)',
            fontFamily: 'var(--joy-fontFamily-body)',
          },
          rubric3: {
            fontSize: 17,
            lineHeight: '22px',
            textTransform: 'uppercase',
            fontFamily: 'var(--joy-fontFamily-body)',
          },
          rubric4: {
            fontSize: 11,
            lineHeight: '16px',
            textTransform: 'uppercase',
            fontFamily: 'var(--joy-fontFamily-body)',
          },
          rubric5: {
            fontSize: 9,
            lineHeight: '22px',
            textTransform: 'uppercase',
            fontFamily: 'var(--joy-fontFamily-body)',
          },
        },
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
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                fontWeight: 500,
                borderRadius: '14px',
                '--Button-minHeight': '45px',
                ...(ownerState.size === 'sm' && {
                  '--Button-minHeight': '26px',
                  borderRadius: '4px',
                  fontSize: 13,
                  lineHeight: '16px',
                }),
                ...(ownerState.size === 'lg' && {
                  '--Button-minHeight': '50px',
                }),
              }),
            },
          },
        },
      }}
    >
      <GlobalStyles styles={{ body: { margin: 0 }, '*': { boxSizing: 'border-box' } }} />
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          px: 3,
          py: 3,
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          bgcolor: (theme) => theme.vars.palette.background.level2,
        }}
      >
        <ColorSchemePicker />
        <ViewPort>
          <StatusBar />
          <Box sx={{ height: 240, mb: '40px' }} />
          <Box sx={{ px: '20px' }}>
            <Box
              sx={[
                (theme) => theme.typography.body2,
                (theme) => theme.variants.contained.warning,
                {
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  p: '0.25rem 0.75rem',
                  gap: '0.25rem',
                  fontWeight: 600,
                  mb: '10px',
                },
              ]}
            >
              <QueueMusic />
              Muzikalochka
            </Box>
            <Typography level="h2" component="h1">
              Welcome to the Music. <br />
              Listen all ad-free.
            </Typography>
            <Typography sx={{ my: '10px' }}>
              One morning, when «Gregor Samsa» woke from troubled dreams, he found himself
              transformed in his bed into a horrible $11.90/month
            </Typography>
            <Typography
              sx={{
                mb: '30px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '0.25rem',
                color: (theme) => theme.vars.palette.primary.textColor,
              }}
            >
              See All Plans{' '}
              <ArrowForward
                fontSize="lg"
                sx={{ color: (theme: JoyTheme) => theme.vars.palette.text.tertiary }}
              />
            </Typography>
            <Button fullWidth size="lg">
              Start My Trial Subscription
            </Button>
          </Box>
        </ViewPort>
        <ViewPort>
          <Header>
            <StatusBar />
            <Box sx={{ height: 44 }} />
          </Header>
          <Box sx={{ p: '20px' }}>
            <Typography
              sx={{
                typography: 'rubric2',
                fontWeight: 600,
                textAlign: 'center',
                textTransform: 'uppercase',
                mb: '5px',
              }}
            >
              we’re here to help
            </Typography>
            <Typography component="h1" level="h2" sx={{ textAlign: 'center', mb: '30px' }}>
              How this app works?
            </Typography>
            <List
              sx={{
                '--List-padding': '0px',
                '--List-item-paddingX': '0px',
                '--List-decorator-width': '34px',
                '--List-gap': '1.5rem',
              }}
            >
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Step number={1} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Stepper number one. This app is something!</Typography>
                  <Typography level="body2" sx={{ mt: '5px' }}>
                    This app is only for you and people in your social networks friends list.
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Step number={2} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Second stepper is finally here</Typography>
                  <Typography level="body2" sx={{ mt: '5px' }}>
                    You decide which conversations you want.
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Step number={3} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Use the third stepper in any case</Typography>
                  <Typography level="body2" sx={{ mt: '5px' }}>
                    One morning, when Gregor Samsa woke from troubled dreams.
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Step number={4} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>
                    What about fourth? A collection of textile samples lay spread out on the table —
                    Samsa was a travelling salesman
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Step number={5} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>
                    What a serious stepper! We just wanted to get your attention here
                  </Typography>
                </ListItemContent>
              </ListItem>
            </List>
            <Box
              sx={[
                {
                  mt: '30px',
                  px: '20px',
                  py: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  borderRadius: '10px',
                  border: '1px solid',
                  borderColor: (theme) => theme.vars.palette.separator.nonOpaque,
                },
              ]}
            >
              <SupervisorAccount
                fontSize="xl3"
                sx={{ color: (theme: JoyTheme) => theme.vars.palette.text.tertiary }}
              />
              <Typography level="h4">Still need assistance?</Typography>
              <Typography>Contact Setproduct Support</Typography>
              <Button variant="outlined" color="neutral" size="sm" sx={{ mt: '10px' }}>
                Get Started
              </Button>
            </Box>
          </Box>
        </ViewPort>
        <ViewPort>
          <Header>
            <StatusBar />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: (theme) => theme.vars.palette.primary.textColor,
                my: '11px',
              }}
            >
              <ArrowBackIos fontSize="xl2" sx={{ ml: '8px' }} />
              <Tune fontSize="xl2" sx={{ mr: '20px' }} />
            </Box>
            <Typography level="h2" component="h1" sx={{ px: '20px', pb: '8px' }}>
              Settings
            </Typography>
          </Header>
          <ListSubheader>Mange profiles</ListSubheader>
          <List
            sx={{
              '--List-decorator-width': '72px',
              '--List-radius': '0px',
              '--List-padding': '6px 14px',
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'separator.opaque',
            }}
          >
            <ListItem>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    flexShrink: 0,
                    borderRadius: '60px',
                    bgcolor: (theme) => theme.vars.palette.neutral[200],
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="h5" sx={{ fontWeight: 400 }}>
                  Diana Shelton
                </Typography>
                <Typography level="body3" sx={{ mt: '2px' }}>
                  Chief Design Officer
                </Typography>
              </ListItemContent>
              <ArrowForwardIos
                fontSize="lg"
                sx={{
                  color: (theme: JoyTheme) => theme.vars.palette.text.tertiary,
                  mx: '-0.25rem',
                }}
              />
            </ListItem>
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    flexShrink: 0,
                    borderRadius: '60px',
                    bgcolor: (theme) => theme.vars.palette.neutral[200],
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="h5" sx={{ fontWeight: 400 }}>
                  Ricky Mclaughlin
                </Typography>
                <Typography level="body3" sx={{ mt: '2px' }}>
                  Senior UX designer
                </Typography>
              </ListItemContent>
              <Typography sx={{ color: 'warning.textColor', mr: '0.75rem' }}>Sign out</Typography>
              <ArrowForwardIos
                fontSize="lg"
                sx={{
                  color: (theme: JoyTheme) => theme.vars.palette.text.tertiary,
                  mx: '-0.25rem',
                }}
              />
            </ListItem>
          </List>

          <ListSubheader>Reward</ListSubheader>
          <List
            sx={{
              '--List-decorator-width': '48px',
              '--List-radius': '0px',
              '--List-padding': '6px 14px',
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'separator.opaque',
            }}
          >
            <ListItem>
              <ListItemDecorator>
                <Box
                  sx={[
                    {
                      p: '0.25rem',
                      borderRadius: '30px',
                      display: 'inline-flex',
                    },
                    (theme) => theme.variants.contained.warning,
                  ]}
                >
                  <CurrencyYen />
                </Box>
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="body1" sx={{ fontWeight: 400 }}>
                  Bitcoin Local Offers
                </Typography>
                <Typography
                  // @ts-ignore
                  level="footnote"
                  sx={{ mt: '2px' }}
                >
                  Join now and let the digital economics grow
                </Typography>
              </ListItemContent>
              <ArrowForwardIos
                fontSize="lg"
                sx={{
                  color: (theme: JoyTheme) => theme.vars.palette.text.tertiary,
                  mx: '-0.25rem',
                }}
              />
            </ListItem>
          </List>

          <Box
            sx={{ px: '20px', py: '4px', bgcolor: (theme) => theme.vars.palette.background.level2 }}
          >
            <Typography
              // @ts-ignore
              level="footnote"
            >
              Receive announcements, recommendations and updates about products, services and
              software.
            </Typography>
          </Box>
          <ListSubheader>Configuration</ListSubheader>

          <List
            sx={{
              '--List-radius': '0px',
              '--List-item-paddingX': '14px',
            }}
          >
            <ListItem>
              <ListItemContent>
                <Typography level="body1" sx={{ fontWeight: 400 }}>
                  Receive Updates
                </Typography>
                <Typography
                  // @ts-ignore
                  level="footnote"
                  sx={{ mt: '2px' }}
                >
                  New components, templates, kits and 3 more...
                </Typography>
              </ListItemContent>
              <ArrowForwardIos
                fontSize="lg"
                sx={{
                  color: (theme: JoyTheme) => theme.vars.palette.text.tertiary,
                  mx: '-0.25rem',
                }}
              />
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemContent>
                <Typography level="body1" sx={{ fontWeight: 400 }}>
                  Discounts & Deals
                </Typography>
                <Typography
                  // @ts-ignore
                  level="footnote"
                  sx={{ mt: '2px' }}
                >
                  Sometimes we cut the price
                </Typography>
              </ListItemContent>
              <ArrowForwardIos
                fontSize="lg"
                sx={{
                  color: (theme: JoyTheme) => theme.vars.palette.text.tertiary,
                  mx: '-0.25rem',
                }}
              />
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemContent>
                <Typography level="body1" sx={{ fontWeight: 400 }}>
                  Use Auto-layout
                </Typography>
                <Typography
                  // @ts-ignore
                  level="footnote"
                  sx={{ mt: '2px' }}
                >
                  Most iOS kit based on Figma power
                </Typography>
              </ListItemContent>
              <ArrowForwardIos
                fontSize="lg"
                sx={{
                  color: (theme: JoyTheme) => theme.vars.palette.text.tertiary,
                  mx: '-0.25rem',
                }}
              />
            </ListItem>
          </List>
          <Box
            sx={{ px: '20px', py: '8px', bgcolor: (theme) => theme.vars.palette.background.level2 }}
          >
            <Typography sx={{ color: (theme) => theme.vars.palette.primary.textColor }}>
              Restore defaults
            </Typography>
          </Box>
          <ListSubheader>Downloads</ListSubheader>
          <List
            sx={{ '--List-radius': '0px', '--List-item-paddingX': '20px', '--List-padding': '0px' }}
          >
            <ListItemButton>
              <ListItemContent>Automatically</ListItemContent>
              <ArrowForwardIos
                fontSize="lg"
                sx={{
                  color: (theme: JoyTheme) => theme.vars.palette.text.tertiary,
                  mx: '-0.25rem',
                }}
              />
            </ListItemButton>
            <ListDivider inset="startDecorator" />
            <ListItemButton>
              <ListItemContent>Manually</ListItemContent>
              <ArrowForwardIos
                fontSize="lg"
                sx={{
                  color: (theme: JoyTheme) => theme.vars.palette.text.tertiary,
                  mx: '-0.25rem',
                }}
              />
            </ListItemButton>
          </List>
        </ViewPort>
        <ViewPort>
          <Header>
            <StatusBar />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: '20px',
                py: '11px',
              }}
            >
              <Typography sx={{ color: (theme) => theme.vars.palette.primary.textColor }}>
                Cancel
              </Typography>
              <Typography sx={{ fontWeight: 500 }}>6 of 72 Skills</Typography>
              <Typography
                sx={{ color: (theme) => theme.vars.palette.primary.textColor, fontWeight: 500 }}
              >
                Done
              </Typography>
            </Box>
          </Header>
          <List
            sx={{
              py: '10px',
              '--List-padding': '0px',
              '--List-radius': '0px',
              '--List-item-paddingX': '20px',
              '--List-item-minHeight': '44px',
              '--List-gap': '0px',
              '--List-decorator-color': 'var(--joy-palette-separator-opaque)',
            }}
          >
            <ListItem>
              <Typography level="h4">Featured</Typography>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Stars />
                </ListItemDecorator>
                <Typography sx={{ flex: 1 }}>Special Events</Typography>
                <Check checked />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <BusinessCenter />
                </ListItemDecorator>
                <Typography sx={{ flex: 1 }}>Lunchtime Sessions</Typography>
                <Check />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
          </List>
          <List
            sx={{
              py: '10px',
              '--List-padding': '0px',
              '--List-radius': '0px',
              '--List-item-paddingX': '20px',
              '--List-item-minHeight': '44px',
              '--List-gap': '0px',
              '--List-decorator-color': 'var(--joy-palette-separator-opaque)',
            }}
          >
            <ListItem>
              <Typography level="h4">Design</Typography>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <DesignServices />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Interaction Design</Typography>
                </ListItemContent>
                <Check />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Handyman />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Speed Prototyping</Typography>
                </ListItemContent>
                <Check />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <MusicNote />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Sound and Haptics</Typography>
                </ListItemContent>
                <Check checked />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Loupe />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Visual Design</Typography>
                </ListItemContent>
                <Check checked />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Title />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Typography</Typography>
                </ListItemContent>
                <Check checked />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
          </List>
          <List
            sx={{
              py: '10px',
              '--List-padding': '0px',
              '--List-radius': '0px',
              '--List-item-paddingX': '20px',
              '--List-item-minHeight': '44px',
              '--List-gap': '0px',
              '--List-decorator-color': 'var(--joy-palette-separator-opaque)',
            }}
          >
            <ListItem>
              <Typography level="h4">Frameworks</Typography>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <OutlinedFlag />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Accessibility</Typography>
                </ListItemContent>
                <Check checked />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <BeachAccess />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Accessories</Typography>
                </ListItemContent>
                <Check checked />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <ViewInAr />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Styled Components</Typography>
                </ListItemContent>
                <Check />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <AddModerator />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Security</Typography>
                </ListItemContent>
                <Check />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <CreditCard />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Apple Pay and Wallet</Typography>
                </ListItemContent>
                <Check />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
          </List>
        </ViewPort>
        <ViewPort>
          <StatusBar />
          <Box
            sx={{
              px: '20px',
              py: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ color: (theme) => theme.vars.palette.primary.textColor }}>
              Skip
            </Typography>
            <Tabs>
              <Tab selected>Sign in</Tab>
              <Tab>Register</Tab>
            </Tabs>
            <Close fontSize="xl2" />
          </Box>
          <Box
            sx={{
              p: '20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              mb: '22px',
            }}
          >
            <Typography
              // @ts-ignore
              level="rubric2"
            >
              Welcome back!
            </Typography>
            <Typography level="h2" component="h1">
              Have an Account?
            </Typography>
            <Typography>
              Sign in to speed up your design process and save time with Most iOS design system
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: (theme) => theme.vars.palette.separator.opaque,
            }}
          >
            <ItemLine>
              <Typography sx={{ minWidth: 108 }}>Email</Typography>
              <Typography>your@business.com</Typography>
            </ItemLine>
            <ItemLine>
              <Typography sx={{ minWidth: 108 }}>Password</Typography>
              <Typography sx={{ flex: 1, color: (theme) => theme.vars.palette.text.tertiary }}>
                96 symbols left
              </Typography>
              <HelpOutline sx={{ color: (theme: JoyTheme) => theme.vars.palette.text.secondary }} />
            </ItemLine>
            <Box sx={{ py: '18px', px: '20px', display: 'flex', gap: '8px' }}>
              <Check checked color="success" />
              <Typography>Enable Ass ID for authenticaton</Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              color: (theme) => theme.vars.palette.primary.textColor,
              mt: '22px',
              mb: '52px',
              textAlign: 'center',
            }}
          >
            Forgot Password?
          </Typography>
          <Box sx={{ px: '20px' }}>
            <Button size="lg" variant="light" color="neutral" fullWidth startIcon={<Person />}>
              Sign Up with Apple
            </Button>
          </Box>
        </ViewPort>
      </Box>
    </CssVarsProvider>
  );
}
