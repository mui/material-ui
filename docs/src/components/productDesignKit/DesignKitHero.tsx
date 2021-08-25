import * as React from 'react';
import { alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import {
  DesignKitImagesSet1,
  DesignKitImagesSet2,
  DesignKitTools,
} from 'docs/src/components/home/DesignKits';

export default function TemplateHero() {
  return (
    <HeroContainer
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            color={(theme) => (theme.palette.mode === 'dark' ? 'primary.400' : 'primary.600')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'start' },
              '& > *': { mr: 1, width: 28, height: 28 },
            }}
          >
            <IconImage name="product-designkits" /> Design Kits
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            MUI in your favorite
            <br /> <GradientText>design tool</GradientText>
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 450 }}>
            For the designers out there, pick your favorite design tool to enjoy our components. Get
            the consistency right when working with developers.
          </Typography>
          <Button
            component={Link}
            noLinkStyle
            href={ROUTES.storeDesign}
            size="large"
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Buy now
          </Button>
        </Box>
      }
      right={
        <Box sx={{ position: 'relative', height: '100%', perspective: '1000px' }}>
          <DesignKitTools />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.primaryDark[900]} 1%, ${alpha(
                  theme.palette.primaryDark[900],
                  0.5,
                )})`,
              opacity: (theme) => (theme.palette.mode === 'dark' ? 1 : 0),
            }}
          />
          <Box
            sx={{
              left: '40%',
              position: 'absolute',
              display: 'flex',
              transform: 'translateX(-40%) rotateZ(30deg) rotateX(8deg) rotateY(-8deg)',
              transformOrigin: 'center center',
            }}
          >
            <DesignKitImagesSet1
              keyframes={{
                '0%': {
                  transform: 'translateY(-200px)',
                },
                '100%': {
                  transform: 'translateY(0px)',
                },
              }}
            />
            <DesignKitImagesSet2
              keyframes={{
                '0%': {
                  transform: 'translateY(150px)',
                },
                '100%': {
                  transform: 'translateY(-80px)',
                },
              }}
              sx={{ ml: { xs: 2, sm: 4, md: 8 } }}
            />
          </Box>
        </Box>
      }
    />
  );
}
