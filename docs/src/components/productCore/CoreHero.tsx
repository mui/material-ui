import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import IconImage from 'docs/src/components/icon/IconImage';

export default function CoreHero() {
  return (
    <Container>
      <Box
        sx={{
          pt: { xs: 6, sm: 8, md: 12 },
          pb: { xs: 3, md: 1 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          fontWeight="bold"
          variant="body2"
          sx={(theme) => ({
            color: 'primary.600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            mb: { xs: 1, sm: 0 },
            '& > *': { mr: 1 },
            ...theme.applyDarkStyles({
              color: 'primary.400',
            }),
          })}
        >
          <IconImage width={28} height={28} name="product-core" /> MUI Core
        </Typography>
        <Typography component="h1" variant="h2" sx={{ textAlign: 'center' }} gutterBottom>
          Ready to use components
          <br />
          <GradientText>free forever</GradientText>
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ maxWidth: 550 }}>
          Get a growing list of React components and utilities, ready-to-use, free forever, and with
          accessibility always in mind. We&apos;ve built the foundational UI blocks for your design
          system so you don&apos;t have to.
        </Typography>
      </Box>
    </Container>
  );
}
