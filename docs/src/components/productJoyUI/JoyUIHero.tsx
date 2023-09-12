import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JoyBox from '@mui/joy/Box';
import JoyButton from '@mui/joy/Button';
import JoyBreadcrumbs from '@mui/joy/Breadcrumbs';
import JoyLink from '@mui/joy/Link';
import JoySheet from '@mui/joy/Sheet';
import JoyTypography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import GradientText from 'docs/src/components/typography/GradientText';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import OrderDashboardApp from 'docs/data/joy/getting-started/templates/order-dashboard/App';
import OrderList from 'docs/data/joy/getting-started/templates/order-dashboard/components/OrderList';
import MuiLogo from 'docs/data/joy/getting-started/templates/order-dashboard/components/MuiLogo';
import ColorSchemeToggle from 'docs/data/joy/getting-started/templates/order-dashboard/components/ColorSchemeToggle';

export default function JoyUIHero() {
  return (
    <HeroContainer
      linearGradient
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, ml: { xl: '-40px' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: { xs: 'center', md: 'flex-start' },
              ...theme.applyDarkStyles({
                color: 'primary.300',
              }),
            })}
          >
            <IconImage width={28} height={28} name="product-core" />{' '}
            <Link href={ROUTES.productCore}>MUI Core</Link>{' '}
            <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
              /
            </Typography>
            <Typography component="span" variant="inherit" sx={{ color: 'text.primary' }}>
              Joy UI
            </Typography>
          </Typography>
          <Typography
            variant="h1"
            sx={{
              my: 2,
              maxWidth: { xs: 500, md: 'unset' },
              minWidth: { lg: 650 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            Craft gorgeous UIs
            <br /> that <GradientText>spark joy</GradientText>
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Joy UI is for those that appreciate the comprehensiveness and reliability of Material
            UI, but don’t want Material Design. It’s design agnostic and built to be tailored to
            your specific design language.
          </Typography>
          <GetStartedButtons
            primaryUrl={ROUTES.joyDocs}
            secondaryLabel="Learn Joy UI"
            secondaryUrl={ROUTES.baseQuickstart}
            altInstallation="npm install @mui/joy @emotion/react @emotion/styled"
          />
        </Box>
      }
      rightSx={{
        perspective: '1500px',
        overflow: 'initial',
      }}
      disableRightBackdrop
      right={
        <React.Fragment>
          <Box
            sx={{
              '--_frame-height': '100vh',
              '--screen-height': 'var(--_frame-height)',
              position: 'absolute',
              transform: 'scale(0.72) rotateX(8deg) rotateY(-5deg) rotateZ(2deg)',
              transformOrigin: '40% 10%',
              width: '72vw',
              height: 'var(--_frame-height)',
              maxHeight: { xs: 840, xl: 1200 },
              overflow: 'hidden',
              borderRadius: '1rem',
              boxShadow:
                '1px 1px 0 6px rgba(var(--joy-palette-primary-mainChannel) / 0.5), 1px 1px 0 10px rgba(var(--joy-palette-primary-lightChannel) / 0.2)',
            }}
          >
            <OrderDashboardApp />
          </Box>
          <JoyBox
            sx={{
              '--_frame-height': '80vh',
              '--screen-height': 'var(--_frame-height)',
              position: 'absolute',
              transform: 'scale(0.72) rotateX(7deg) rotateY(-6deg) rotateZ(2deg)',
              transformOrigin: '-12% 80%',
              width: '320px',
              height: 'var(--_frame-height)',
              maxHeight: 700,
              overflow: 'auto',
              borderRadius: '1rem',
              boxShadow:
                '1px 1px 0 6px rgba(var(--joy-palette-primary-mainChannel) / 0.5), 1px 1px 0 10px rgba(var(--joy-palette-primary-lightChannel) / 0.2)',
              bgcolor: 'background.body',
            }}
          >
            <JoySheet
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1,
                gap: 1,
                borderBottom: '1px solid',
                borderColor: 'background.level1',
                boxShadow: 'sm',
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
              <Box
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
              </Box>
              <OrderList
                sx={{ display: 'block !important', '& > div': { display: 'flex !important' } }}
              />
            </JoyBox>
          </JoyBox>
        </React.Fragment>
      }
    />
  );
}
