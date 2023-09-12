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
              '@keyframes rotate-left': {
                '0%': {
                  transform: 'scale(0.68) translate(var(--_translate-start))',
                  boxShadow:
                    '0px 0px 0 6px rgba(var(--joy-palette-primary-mainChannel) / 0.5), 0px 0px 0 10px rgba(var(--joy-palette-primary-lightChannel) / 0.2)',
                },
                '100%': {
                  transform:
                    'scale(0.72) translate(var(--_translate-end)) rotateX(8deg) rotateY(-5deg) rotateZ(2deg)',
                  boxShadow:
                    '1px 1px 0 6px rgba(var(--joy-palette-primary-mainChannel) / 0.5), 1px 1px 0 10px rgba(var(--joy-palette-primary-lightChannel) / 0.2)',
                },
              },
              animation: 'rotate-left 1.5s ease-in-out forwards',
            }}
          >
            <OrderDashboardApp />
          </Box>
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
                xl: 'clamp(0px, 80vh, 960px)',
              },
              overflow: 'auto',
              borderRadius: '1rem',
              bgcolor: 'background.body',
              transformOrigin: '0px 0px',
              '@keyframes rotate-right': {
                '0%': {
                  transform: 'scale(0.68) translate(var(--_translate-start))',
                  boxShadow:
                    '0px 0px 0 6px rgba(var(--joy-palette-primary-mainChannel) / 0.5), 0px 0px 0 10px rgba(var(--joy-palette-primary-lightChannel) / 0.2)',
                },
                '100%': {
                  transform:
                    'scale(0.72) translate(var(--_translate-end)) rotateX(4deg) rotateY(16deg) rotateZ(-4deg)',
                  boxShadow:
                    '-1px 1px 0 6px rgba(var(--joy-palette-primary-mainChannel) / 0.5), -1px 1px 0 10px rgba(var(--joy-palette-primary-lightChannel) / 0.2)',
                },
              },
              animation: 'rotate-right 1.5s ease-in-out forwards',
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
