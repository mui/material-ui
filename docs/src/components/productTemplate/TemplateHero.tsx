import * as React from 'react';
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
  StoreTemplatesSet1,
  StoreTemplatesSet2,
} from 'docs/src/components/home/StoreTemplatesBanner';

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
            <IconImage name="product-templates" /> Templates
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            <GradientText>Fully built</GradientText>
            <br />
            templates for your project
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            A collection of several 4.5 average rating templates, curated by our Core team to get
            your projects and application up and running today.
          </Typography>
          <Button
            component={Link}
            noLinkStyle
            href={ROUTES.storePopular}
            size="large"
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Browse templates
          </Button>
        </Box>
      }
      right={
        <Box sx={{ position: 'relative', height: '100%', perspective: '1000px' }}>
          <Box
            sx={{
              left: '40%',
              position: 'absolute',
              display: 'flex',
              transform: 'translateX(-40%) rotateZ(-30deg) rotateX(8deg) rotateY(8deg)',
              transformOrigin: 'center center',
            }}
          >
            <StoreTemplatesSet1
              disableLink
              keyframes={{
                '0%': {
                  transform: 'translateY(-200px)',
                },
                '100%': {
                  transform: 'translateY(-40px)',
                },
              }}
            />
            <StoreTemplatesSet2
              disableLink
              keyframes={{
                '0%': {
                  transform: 'translateY(150px)',
                },
                '100%': {
                  transform: 'translateY(40px)',
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
