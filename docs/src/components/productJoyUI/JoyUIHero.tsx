import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import GradientText from 'docs/src/components/typography/GradientText';
import ROUTES from 'docs/src/route';

export default function JoyUIHero() {
  return (
    <HeroContainer
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, ml: { xl: '-40px' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              '& > *': { mr: 1 },
              ...theme.applyDarkStyles({
                color: 'primary.400',
              }),
            })}
          >
            <IconImage width={28} height={28} name="product-core" /> MUI Core{' '}
            <Typography component="span" variant="inherit" sx={{ color: 'text.tertiary' }}>
              &nbsp;&nbsp;
              <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
                /
              </Typography>
              &nbsp;&nbsp;Joy UI
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
            Craft gorgeous UIs that <GradientText>spark joy</GradientText>
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Joy UI is for those that appreciate the comprehensiveness and reliability of Material
            UI, but don’t want Material Design. It’s design agnostic and built to be tailored to
            your specific design language.
          </Typography>
          <GetStartedButtons
            to={ROUTES.joyDocs}
            installation="npm install @mui/joy @emotion/styled @emotion/react"
          />
        </Box>
      }
      right={<div />}
    />
  );
}
