import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

export default function JoyUITemplates() {
  return (
    <Section bg="gradient-reverse" cozy>
      <Box sx={{ textAlign: 'center' }}>
        <SectionHeadline
          alwaysCenter
          overline="Templates"
          title={
            <Typography variant="h2" textAlign="center">
              Get started quickly with
              <br />
              <GradientText>free templates</GradientText>
            </Typography>
          }
        />
      </Box>
    </Section>
  );
}
