import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';

export default function Hero() {
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
            <IconImage name="product-advanced" /> Advanced
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Performant
            <br />
            <GradientText>advanced</GradientText>,<br /> components.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Get a growing list of components, ready to use, forever free with built-in
            accessibility. We&apos;ve built the foundational UI blocks for your design system so you
            don&apos;t have to.
          </Typography>
          <GetStartedButtons
            installation="npm install @mui/x"
            sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
          />
        </Box>
      }
      right={<div />}
    />
  );
}
