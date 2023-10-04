import * as React from 'react';
import JoyBox from '@mui/joy/Box';
import JoyButton from '@mui/joy/Button';
import JoyIconButton from '@mui/joy/IconButton';
import JoyBreadcrumbs from '@mui/joy/Breadcrumbs';
import JoyLink from '@mui/joy/Link';
import JoySheet from '@mui/joy/Sheet';
import JoyTypography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import OrderDashboardApp from 'docs/data/joy/getting-started/templates/order-dashboard/App';
import OrderList from 'docs/data/joy/getting-started/templates/order-dashboard/components/OrderList';
import ColorSchemeToggle from 'docs/data/joy/getting-started/templates/order-dashboard/components/ColorSchemeToggle';

export function Desktop() {
  return (
    <JoyBox
      sx={(theme) => ({
        '& > div': {
          '--screen-height': '100%',
        },
        '--_translate-start': {
          xs: '14vw, 120px',
        },
        '--_translate-end': {
          xs: '22vw, 60px',
          md: '20vw, 60px',
          xl: '18vw, 60px',
        },
        '@keyframes rotate-left': {
          '0%': {
            transform: 'scale(0.6) translate(var(--_translate-start))',
          },
          '100%': {
            transform:
              'scale(0.7) translate(var(--_translate-end)) rotateX(4deg) rotateY(-4deg) rotateZ(2deg)',
          },
        },
        position: 'absolute',
        width: '72vw',
        height: {
          xs: 'clamp(0px, 100vh, 840px)',
          xl: 'clamp(0px, 100vh, 1200px)',
        },
        overflow: 'hidden',
        borderRadius: '1rem',
        transformOrigin: '0px 0px',
        transform: 'scale(0.6) translate(var(--_translate-start))',
        boxShadow:
          '0px 0px 0 10px rgba(141 206 255 / 0.7), 0px 4px 16px rgba(var(--joy-palette-neutral-mainChannel) / 0.4)',
        animation: 'rotate-left 0.8s ease forwards',
        animationDelay: '0.6s',
        border: '1px solid',
        borderColor: 'primary.300',
        [theme.getColorSchemeSelector('dark')]: {
          borderColor: 'primary.700',
          boxShadow:
            '0px 0px 0 10px rgba(0 114 229 / 0.4), 0px 4px 16px rgba(var(--joy-palette-neutral-darkChannel) / 0.8)',
        },
      })}
    >
      <OrderDashboardApp disableCssReset />
    </JoyBox>
  );
}

export function Mobile() {
  return (
    <JoyBox
      sx={(theme) => ({
        '& > div': {
          '--screen-height': '100%',
        },
        '--_translate-start': {
          xs: '0vw, 40%',
        },
        '--_translate-end': {
          xs: '-6vw, 25%',
          lg: '2vw, 25%',
          xl: '-2vw, 25%',
        },
        '@keyframes rotate-right': {
          '0%': {
            transform: 'scale(0.6) translate(var(--_translate-start))',
          },
          '100%': {
            transform:
              'scale(0.7) translate(var(--_translate-end)) rotateX(2deg) rotateY(8deg) rotateZ(-2deg)',
          },
        },
        position: 'absolute',
        width: { xs: 320, xl: 380 },
        height: {
          xs: 'clamp(0px, 80vh, 700px)',
          xl: 'clamp(0px, 85vh, 960px)',
        },
        overflow: 'auto',
        borderRadius: '12px',
        bgcolor: 'background.body',
        border: '1px solid',
        borderColor: 'primary.300',
        transformOrigin: '0px 0px',
        transform: 'scale(0.6) translate(var(--_translate-start))',
        boxShadow:
          '0px 0px 0 10px rgba(141 206 255 / 0.7), 0px 4px 16px rgba(var(--joy-palette-neutral-mainChannel) / 0.4)',
        animation: 'rotate-right 0.6s ease forwards',
        animationDelay: '0.6s',
        transition: 'transform 0.15s ease',
        [theme.getColorSchemeSelector('dark')]: {
          borderColor: 'primary.600',
          boxShadow:
            '0px 0px 0 10px rgba(0 114 229 / 0.4), 0px 4px 16px rgba(var(--joy-palette-neutral-darkChannel) / 0.8)',
        },
      })}
    >
      <JoySheet
        sx={{
          p: 1.5,
          position: 'sticky',
          top: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          borderBottom: '1px solid',
          borderColor: 'background.level3',
          zIndex: 1000,
        }}
      >
        <JoyIconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </JoyIconButton>
        <ColorSchemeToggle id={undefined} />
      </JoySheet>
      <JoyBox
        sx={{
          px: 2,
          pt: 'calc(24px + var(--Header-height))',
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          gap: 3,
        }}
      >
        <JoyBreadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ p: 0 }}
        >
          <JoyLink underline="none" color="neutral" href="#some-link" aria-label="Home">
            <HomeRoundedIcon />
          </JoyLink>
          <JoyLink
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight="lg"
          >
            Dashboard
          </JoyLink>
          <JoyTypography color="primary" fontWeight="lg" fontSize={12}>
            Orders
          </JoyTypography>
        </JoyBreadcrumbs>
        <JoyBox
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
          }}
        >
          <JoyTypography level="h3">Orders</JoyTypography>
          <JoyButton startDecorator={<DownloadRoundedIcon />}>Download PDF</JoyButton>
        </JoyBox>
        <OrderList
          sx={{ display: 'block !important', '& > div': { display: 'flex !important' } }}
        />
      </JoyBox>
    </JoyBox>
  );
}
