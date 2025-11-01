import * as React from 'react';
import Typography from 'docs/src/pages/premium-themes/onepirate/modules/components/Typography';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import SectionHeadline from '../typography/SectionHeadline';
import GradientText from '../typography/GradientText';

const CustomerQuotes = dynamic(() => import('./CustomerQuotes'));

export default function CustomersTestimonials() {
  return (
    <Box
      sx={{
        display: 'grid',
        m: 0,
        p: 12,
        gap: 2,
      }}
    >
      <SectionHeadline
        alwaysCenter
        overline="What people say"
        title={
          <Typography variant="h2" component="h2">
            Trusted by
            <GradientText>&nbsp;the best&nbsp;</GradientText>
            in the game
          </Typography>
        }
        description="The world's best product teams trust MUI to deliver an unrivaled experience for both developers and users."
      />
      <CustomerQuotes />
    </Box>
  );
}
