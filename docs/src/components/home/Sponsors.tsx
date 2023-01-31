import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DiamondSponsors from 'docs/src/components/home/DiamondSponsors';
import GoldSponsors from 'docs/src/components/home/GoldSponsors';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';

export default function Sponsors() {
  return (
    <Container sx={{ py: { xs: 4, md: 8 } }}>
      <SectionHeadline
        id="sponsors"
        overline="Sponsors"
        title={
          <Typography variant="h2" sx={{ my: 1 }}>
            <GradientText>You</GradientText> make this possible
          </Typography>
        }
        description="The development of these open-source tools is accelerated by our generous sponsors."
      />
      <DiamondSponsors />
      <Box sx={{ mb: 4 }} />
      <GoldSponsors />
    </Container>
  );
}
