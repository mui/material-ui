import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import GetStartedButtons2 from 'docs/src/components/home/GetStartedButtons2';
import GradientText from 'docs/src/components/typography/GradientText';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';

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
          <GetStartedButtons2
            getStartedUrl={ROUTES.joyDocs}
            learnUrl={ROUTES.baseQuickstart}
            learnLabel="Learn Joy UI"
            installation="npm install @mui/joy @emotion/styled @emotion/react"
          />
        </Box>
      }
      right={<div />}
    />
  );
}
