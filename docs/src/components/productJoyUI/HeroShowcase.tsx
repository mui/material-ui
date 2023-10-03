import * as React from 'react';
import JoyBox from '@mui/joy/Box';
import JoyButton from '@mui/joy/Button';
import JoyBreadcrumbs from '@mui/joy/Breadcrumbs';
import JoyLink from '@mui/joy/Link';
import JoySheet from '@mui/joy/Sheet';
import JoyTypography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import OrderDashboardApp from 'docs/data/joy/getting-started/templates/order-dashboard/App';
import OrderList from 'docs/data/joy/getting-started/templates/order-dashboard/components/OrderList';
import MuiLogo from 'docs/data/joy/getting-started/templates/order-dashboard/components/MuiLogo';
import ColorSchemeToggle from 'docs/data/joy/getting-started/templates/order-dashboard/components/ColorSchemeToggle';

export function Desktop() {
  return (
    <JoyBox
      sx={{
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
          '0px 0px 0 8px rgba(var(--joy-palette-primary-mainChannel) / 0.4), 0px 4px 16px rgba(var(--joy-palette-neutral-mainChannel) / 0.4)',
        animation: 'rotate-left 0.8s ease forwards',
        animationDelay: '0.5s',
        '@keyframes rotate-left': {
          '0%': {
            transform: 'scale(0.68) translate(var(--_translate-start))',
          },
          '100%': {
            transform:
              'scale(0.72) translate(var(--_translate-end)) rotateX(8deg) rotateY(-5deg) rotateZ(2deg)',
          },
        },
      }}
    >
      <OrderDashboardApp disableCssReset />
    </JoyBox>
  );
}

export function Mobile() {
  return (
    <JoyBox
      sx={{
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
        position: 'absolute',
        width: { xs: 320, xl: 400 },
        height: {
          xs: 'clamp(0px, 80vh, 700px)',
          xl: 'clamp(0px, 80vh, 850px)',
        },
        overflow: 'auto',
        borderRadius: '12px',
        bgcolor: 'background.body',
        transformOrigin: '0px 0px',
        transform: 'scale(0.6) translate(var(--_translate-start))',
        boxShadow:
          '0px 0px 0 8px rgba(var(--joy-palette-primary-mainChannel) / 0.4), 0px 4px 16px rgba(var(--joy-palette-neutral-mainChannel) / 0.4)',
        animation: 'rotate-right 0.8s ease forwards',
        animationDelay: '0.5s',
        '@keyframes rotate-right': {
          '0%': {
            transform: 'scale(0.68) translate(var(--_translate-start))',
          },
          '100%': {
            transform:
              'scale(0.72) translate(var(--_translate-end)) rotateX(4deg) rotateY(16deg) rotateZ(-4deg)',
          },
        },
        '&:hover': {
          transform: 'none', // this isn't working yet
        },
      }}
    >
      <JoySheet
        sx={{
          position: 'sticky',
          top: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          gap: 1,
          borderBottom: '1px solid',
          borderColor: 'background.level1',
          boxShadow: 'sm',
          zIndex: 1000,
        }}
      >
        <MuiLogo />
        <ColorSchemeToggle id={undefined} />
      </JoySheet>
      <JoyBox
        sx={{
          px: 2,
          pt: 'calc(12px + var(--Header-height))',
          pb: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100%',
          gap: 1,
        }}
      >
        <JoyBreadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
        >
          <JoyLink underline="none" color="neutral" href="#some-link" aria-label="Home">
            <HomeRoundedIcon />
          </JoyLink>
          <JoyLink
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Dashboard
          </JoyLink>
          <JoyTypography color="primary" fontWeight={500} fontSize={12}>
            Orders
          </JoyTypography>
        </JoyBreadcrumbs>
        <JoyBox
          sx={{
            display: 'flex',
            my: 1,
            gap: 1,
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <JoyTypography level="h2">Orders</JoyTypography>
          <JoyButton color="primary" startDecorator={<DownloadRoundedIcon />} size="sm">
            Download PDF
          </JoyButton>
        </JoyBox>
        <OrderList
          sx={{ display: 'block !important', '& > div': { display: 'flex !important' } }}
        />
      </JoyBox>
    </JoyBox>
  );
}
