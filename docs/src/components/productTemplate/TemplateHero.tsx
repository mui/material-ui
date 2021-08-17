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
              '& > *': { mr: 1, width: 28, height: 28 },
            }}
          >
            <IconImage name="product-templates" /> Templates
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            <GradientText>Fully built</GradientText>
            <br />
            templates for your project.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            A collection of several 4.5 average rating templates, curated by our Core team to get
            your projects and application up and running today.
          </Typography>
          <Button
            component={Link}
            href={ROUTES.store}
            noLinkStyle
            size="large"
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
          >
            Browse templates
          </Button>
        </Box>
      }
      right={<div />}
    />
  );
}
