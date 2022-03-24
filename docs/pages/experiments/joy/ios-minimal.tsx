/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { GlobalStyles, CSSObject } from '@mui/system';
import { CssVarsProvider, useColorScheme, styled } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import Sheet from '@mui/joy/Sheet';
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
    footnote: CSSObject;
    caption1: CSSObject;
    caption2: CSSObject;
    caption3: CSSObject;
    rubric1: CSSObject;
    rubric2: CSSObject;
    rubric3: CSSObject;
    rubric4: CSSObject;
    rubric5: CSSObject;
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
  <Sheet
    variant="contained"
    color="primary"
    sx={[
      {
        borderRadius: '40px',
        fontSize: 'md',
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
  </Sheet>
);

const Header = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: (theme) => theme.vars.palette.background.level3,
      borderBottom: '1px solid',
      borderColor: (theme) => theme.vars.palette.separator.opaque,
      backdropFilter: 'blur(30px)',
    }}
  >
    {children}
  </Box>
);

const ListSubheader = styled('div')(({ theme }) => ({
  padding: '20px 20px 8px',
  ...theme.typography.rubric2,
  backgroundColor: theme.vars.palette.background.level2,
}));

const Check = ({
  checked,
  color = 'danger',
}: {
  checked?: boolean;
  color?: 'danger' | 'success';
}) => (
  <Checkbox
    variant={checked ? 'contained' : 'outlined'}
    color={checked ? color : 'neutral'}
    checked={checked}
  />
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
  ...theme.typography.footnote,
  color: theme.vars.palette.text.primary,
  ...(selected && {
    backgroundColor: theme.vars.palette.background.level1,
    boxShadow: theme.shadow.sm,
  }),
  '&:focus-visible': {
    outline: '1px solid',
    outlineColor: theme.vars.palette.primary[500],
  },
}));

export default function IosMinimalPage() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              primary: {
                50: '#F6FAFF',
                100: '#E1EFFF',
                200: '#B4D8FF',
                300: '#86C0FF',
                400: '#57A8FF',
                500: '#1E8AFF',
                600: '#006EE4',
                700: '#005CBF',
                800: '#004997',
                900: '#003A78',
                textColor: 'hsla(211, 100%, 50%, 1)',
                containedBg: 'hsla(211, 100%, 50%, 1)',
                containedHoverBg: undefined,
                containedActiveBg: 'hsla(211, 100%, 40%, 1)',
              },
              warning: {
                50: '#FFF9F1',
                100: '#FFEBCE',
                200: '#FFCC84',
                300: '#FFAA32',
                400: '#EF8C00',
                500: '#CB7700',
                600: '#A76100',
                700: '#8B5100',
                800: '#6E4000',
                900: '#573300',
                textColor: 'hsla(35, 100%, 50%, 1)',
                containedBg: 'hsla(35, 100%, 50%, 1)',
                containedHoverBg: undefined,
                containedActiveBg: 'hsla(35, 100%, 40%, 1)',
              },
              danger: {
                50: '#FFF8FA',
                100: '#FFE8ED',
                200: '#FEC6D2',
                300: '#FEA2B7',
                400: '#FE799A',
                500: '#FF3B6F',
                600: '#DB2056',
                700: '#B81A49',
                800: '#92153C',
                900: '#751131',
                textColor: 'hsla(349, 100%, 59%, 1)',
                containedBg: 'hsla(349, 100%, 59%, 1)',
                containedHoverBg: undefined,
              },
              success: {
                50: '#F4FCF5',
                100: '#D9F5DC',
                200: '#9DE5AD',
                300: '#52D380',
                400: '#00BE63',
                500: '#00A158',
                600: '#00844B',
                700: '#006D41',
                800: '#045636',
                900: '#0A442C',
                textColor: 'hsla(135, 59%, 49%, 1)',
                containedBg: 'hsla(135, 59%, 49%, 1)',
                containedHoverBg: undefined,
              },
              neutral: {
                100: 'hsla(240, 24%, 96%, 1)',
                200: 'hsla(240, 11%, 91%, 1)',
                300: 'hsla(240, 6%, 83%, 1)',
                400: 'hsla(240, 5%, 79%, 1)',
                500: 'hsla(240, 3%, 69%, 1)',
                600: 'hsla(240, 2%, 57%, 1)',
                textColor: 'var(--joy-palette-neutral-800)',
                outlinedColor: 'var(--joy-palette-primary-textColor)',
                outlinedBorder: 'var(--joy-palette-neutral-200)',
                outlinedHoverBorder: 'var(--joy-palette-neutral-400)',
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
              separator: {
                opaque: 'hsla(240, 2%, 88%, 1)',
                nonOpaque: 'hsla(240, 6%, 25%, 0.33)',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                50: '#F6FAFF',
                100: '#E0EFFF',
                200: '#B2D8FF',
                300: '#83C1FF',
                400: '#51A8FF',
                500: '#158BFF',
                600: '#0871D8',
                700: '#075EB4',
                800: '#064B8F',
                900: '#043B72',
                textColor: 'hsla(210, 100%, 52%, 1)',
                containedBg: 'hsla(210, 100%, 52%, 1)',
                containedHoverBg: undefined,
                containedActiveBg: 'hsla(210, 100%, 60%, 1)',
              },
              warning: {
                50: '#FFF9F0',
                100: '#FFEBCD',
                200: '#FFCC80',
                300: '#FFAA2B',
                400: '#E99009',
                500: '#C57A08',
                600: '#A26406',
                700: '#875305',
                800: '#6B4204',
                900: '#553403',
                textColor: 'hsla(36, 100%, 52%, 1)',
                containedBg: 'hsla(36, 100%, 52%, 1)',
                containedHoverBg: undefined,
                containedActiveBg: 'hsla(36, 100%, 60%, 1)',
                containedColor: 'hsla(0, 0%, 0%, 1)',
              },
              danger: {
                50: '#FFF8FA',
                100: '#FFE8ED',
                200: '#FEC5D3',
                300: '#FEA1B9',
                400: '#FE799C',
                500: '#FF3B73',
                600: '#D62A5D',
                700: '#B32350',
                800: '#8E1C41',
                900: '#711735',
                textColor: 'hsla(348, 100%, 61%, 1)',
                containedBg: 'hsla(348, 100%, 61%, 1)',
                containedColor: 'hsla(0, 0%, 0%, 1)',
              },
              success: {
                50: '#F2FDF4',
                100: '#D3F6D8',
                200: '#8DE99A',
                300: '#36D84E',
                400: '#2DBD42',
                500: '#26A038',
                600: '#1F832E',
                700: '#1A6D26',
                800: '#15571E',
                900: '#104518',
                textColor: 'hsla(129, 67%, 52%, 1)',
                containedBg: 'hsla(129, 67%, 52%, 1)',
                containedHoverBg: undefined,
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
        fontSize: {
          md: '17px',
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
          footnote: {
            fontSize: 13,
            lineHeight: '16px',
            fontFamily: 'var(--joy-fontFamily-body)',
            color: 'var(--joy-palette-text-secondary)',
          },
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
          MuiCheckbox: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                borderRadius: '24px',
                ...(ownerState.size === 'md' && {
                  '--Icon-fontSize': '20px',
                  '--Checkbox-size': '24px',
                }),
                ...(ownerState.variant === 'outlined' && {
                  '--variant-outlinedBorderWidth': '2px',
                }),
              }),
            },
          },
          MuiLink: {
            defaultProps: {
              underline: 'none',
            },
          },
          MuiAvatar: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                ...(ownerState.size === 'lg' && {
                  '--Avatar-size': '60px',
                }),
              }),
              fallback: {
                '--Icon-color': 'var(--joy-palette-text-tertiary)',
              },
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
          bgcolor: 'background.level2',
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
            <Box sx={{ textAlign: 'right', mb: '30px' }}>
              <Link href="#a" endDecorator={<ArrowForward sx={{ color: 'text.tertiary' }} />}>
                See All Plans{' '}
              </Link>
            </Box>
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
                  borderColor: 'separator.nonOpaque',
                },
              ]}
            >
              <SupervisorAccount fontSize="xl3" sx={{ color: 'text.tertiary' }} />
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
                my: '11px',
                px: 2,
              }}
            >
              <Link href="#a" aria-label="Back to home" sx={{ fontSize: 'xl' }}>
                <ArrowBackIos />
              </Link>
              <Link href="#a" aria-label="Configure settings" sx={{ fontSize: 'xl' }}>
                <Tune />
              </Link>
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
              '--List-padding': '14px',
              '--List-item-paddingRight': '0px',
              py: '6px',
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'separator.opaque',
              '& .MuiListItemButton-root': {
                backgroundColor: 'initial !important',
              },
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Avatar size="lg" />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="h5" sx={{ fontWeight: 400 }}>
                    Diana Shelton
                  </Typography>
                  <Typography level="body3" sx={{ mt: '2px' }}>
                    Chief Design Officer
                  </Typography>
                </ListItemContent>
                <ArrowForwardIos fontSize="lg" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Avatar size="lg" />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="h5" sx={{ fontWeight: 400 }}>
                    Ricky Mclaughlin
                  </Typography>
                  <Typography level="body3" sx={{ mt: '2px' }}>
                    Senior UX designer
                  </Typography>
                </ListItemContent>
                <Link
                  href="#a"
                  color="warning"
                  endDecorator={<ArrowForwardIos fontSize="lg" sx={{ color: 'text.tertiary' }} />}
                >
                  Sign out
                </Link>
              </ListItemButton>
            </ListItem>
          </List>

          <ListSubheader>Reward</ListSubheader>
          <List
            sx={{
              '--List-decorator-width': '48px',
              '--List-radius': '0px',
              '--List-item-paddingY': '12px',
              '--List-item-paddingLeft': '28px',
              '--List-item-paddingRight': '14px',
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'separator.opaque',
            }}
          >
            <ListItem>
              <ListItemButton>
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
                  <Typography level="footnote" sx={{ mt: '2px' }}>
                    Join now and let the digital economics grow
                  </Typography>
                </ListItemContent>
                <ArrowForwardIos fontSize="lg" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
          </List>

          <Box sx={{ px: '20px', py: '4px', bgcolor: 'background.level2' }}>
            <Typography level="footnote">
              Receive announcements, recommendations and updates about products, services and
              software.
            </Typography>
          </Box>
          <ListSubheader>Configuration</ListSubheader>

          <List
            sx={{
              '--List-gap': '0px',
              '--List-item-paddingY': '12px',
              '--List-item-paddingLeft': '20px',
              '--List-item-paddingRight': '14px',
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemContent>
                  <Typography level="body1" sx={{ fontWeight: 400 }}>
                    Receive Updates
                  </Typography>
                  <Typography level="footnote" sx={{ mt: '2px' }}>
                    New components, templates, kits and 3 more...
                  </Typography>
                </ListItemContent>
                <ArrowForwardIos fontSize="lg" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemContent>
                  <Typography level="body1" sx={{ fontWeight: 400 }}>
                    Discounts & Deals
                  </Typography>
                  <Typography level="footnote" sx={{ mt: '2px' }}>
                    Sometimes we cut the price
                  </Typography>
                </ListItemContent>
                <ArrowForwardIos fontSize="lg" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
            <ListDivider inset="startDecorator" />
            <ListItem>
              <ListItemButton>
                <ListItemContent>
                  <Typography level="body1" sx={{ fontWeight: 400 }}>
                    Use Auto-layout
                  </Typography>
                  <Typography level="footnote" sx={{ mt: '2px' }}>
                    Most iOS kit based on Figma power
                  </Typography>
                </ListItemContent>
                <ArrowForwardIos fontSize="lg" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ px: '20px', py: '8px', bgcolor: 'background.level2' }}>
            <Link component="button">Restore defaults</Link>
          </Box>
          <ListSubheader>Downloads</ListSubheader>
          <List
            sx={{
              '--List-gap': '0px',
              '--List-item-paddingY': '12px',
              '--List-item-paddingLeft': '20px',
              '--List-item-paddingRight': '14px',
            }}
          >
            <ListItemButton>
              <ListItemContent>Automatically</ListItemContent>
              <ArrowForwardIos fontSize="lg" sx={{ color: 'text.tertiary' }} />
            </ListItemButton>
            <ListDivider inset="startDecorator" />
            <ListItemButton>
              <ListItemContent>Manually</ListItemContent>
              <ArrowForwardIos fontSize="lg" sx={{ color: 'text.tertiary' }} />
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
              <Link href="#a">Cancel</Link>
              <Typography sx={{ fontWeight: 'md' }}>6 of 72 Skills</Typography>
              <Link href="#a" sx={{ fontWeight: 'md' }}>
                Done
              </Link>
            </Box>
          </Header>
          <List
            sx={{
              '--List-padding': '0px',
              '--List-radius': '0px',
              '--List-item-paddingX': '20px',
              '--List-item-minHeight': '44px',
              '--List-gap': '0px',
            }}
          >
            <ListItem nested>
              <List>
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
            </ListItem>
            <ListItem nested>
              <List>
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
            </ListItem>
            <ListItem nested>
              <List>
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
            </ListItem>
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
            <Link href="#a">Skip</Link>
            <Tabs>
              <Tab selected>Sign in</Tab>
              <Tab>Register</Tab>
            </Tabs>
            <Link color="neutral" href="#a">
              <Close fontSize="xl2" />
            </Link>
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
            <Typography level="rubric2">Welcome back!</Typography>
            <Typography level="h2" component="h1">
              Have an Account?
            </Typography>
            <Typography>
              Sign in to speed up your design process and save time with Most iOS design system
            </Typography>
          </Box>
          <Sheet
            variant="outlined"
            sx={{
              borderWidth: '1px 0',
              borderColor: 'separator.opaque',
            }}
          >
            <List
              sx={{
                '--List-decorator-width': '95px',
                '--List-item-paddingLeft': '20px',
                '--List-gap': '0px',
              }}
            >
              <ListItem>
                <ListItemDecorator>
                  <Typography>Email</Typography>
                </ListItemDecorator>
                <Input variant="text" defaultValue="your@business.com" fullWidth />
              </ListItem>
              <ListDivider inset="startDecorator" />
              <ListItem>
                <ListItemDecorator>
                  <Typography>Password</Typography>
                </ListItemDecorator>
                <Input variant="text" placeholder="96 symbols left" fullWidth />
                <HelpOutline sx={{ color: 'text.secondary', ml: 1 }} />
              </ListItem>
              <ListDivider inset="startDecorator" />
              <ListItem>
                <ListItemButton>
                  <Typography
                    startDecorator={<Check checked color="success" />}
                    sx={{ minHeight: 40 }}
                  >
                    Enable Ass ID for authenticaton
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Sheet>
          <Link
            href="#forgot-password"
            sx={{
              mt: '22px',
              mb: '52px',
              textAlign: 'center',
              display: 'block',
            }}
          >
            Forgot Password?
          </Link>
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
