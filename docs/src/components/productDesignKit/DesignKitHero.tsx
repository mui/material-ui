import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import Link from 'docs/src/modules/components/Link';
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
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'start' },
              '& > *': { mr: 1 },
              ...theme.applyDarkStyles({
                color: 'primary.400',
              }),
            })}
          >
            <IconImage width={28} height={28} name="product-designkits" /> Design kits
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            MUI in your favorite
            <br /> <GradientText>design tool</GradientText>
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 450 }}>
            Pick your favorite design tool to enjoy and use MUI components. Boost consistency and
            facilitate communication when working with developers.
          </Typography>
          <Button
            component={Link}
            noLinkStyle
            href="https://mui.com/store/?utm_source=marketing&utm_medium=referral&utm_campaign=design-cta#design"
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
            sx={(theme) => ({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              background: `linear-gradient(90deg, ${
                (theme.vars || theme).palette.primaryDark[900]
              } 1%, ${alpha(theme.palette.primaryDark[900], 0.5)})`,
              opacity: 0,
              ...theme.applyDarkStyles({
                opacity: 1,
              }),
            })}
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
