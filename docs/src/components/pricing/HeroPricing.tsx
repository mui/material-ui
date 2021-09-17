import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';

export default function HeroPricing() {
  return (
    <Container>
      <Box
        sx={{
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="body2"
          color={(theme) => (theme.palette.mode === 'dark' ? 'primary.400' : 'primary.600')}
          fontWeight="bold"
        >
          Pricing
        </Typography>
        <Typography variant="h2" sx={{ my: 1 }}>
          Start using <GradientText>MUI</GradientText> for free!
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ maxWidth: 500 }}>
          The community edition lets you get going right away. Switch to MUI&nbsp;X&nbsp;Pro to get
          more components & premium support.
        </Typography>
      </Box>
      <Divider />
    </Container>
  );
}
