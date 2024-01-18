import * as React from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Section from 'docs/src/layouts/Section';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import MuiStatistics from 'docs/src/components/home/MuiStatistics';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';

const UserFeedbacks = dynamic(() => import('./UserFeedbacks'));

export default function Testimonials() {
  return (
    <Box
      data-mui-color-scheme="dark"
      sx={(theme) => ({
        background: `linear-gradient(180deg, ${
          (theme.vars || theme).palette.primaryDark[800]
        } 2%, ${alpha(theme.palette.primaryDark[700], 0.5)} 80%),
        ${(theme.vars || theme).palette.common.black}
        `,
      })}
    >
      <Section bg="transparent" cozy>
        <SectionHeadline
          alwaysCenter
          overline="Community"
          title={
            <Typography variant="h2" component="h1">
              Supported by thousands of <GradientText>developers and designers</GradientText>
            </Typography>
          }
          description="Together, we are enabling developers & designers to bring stunning UIs to life with unrivalled speed and ease."
        />
        <MuiStatistics />
        <UserFeedbacks />
      </Section>
    </Box>
  );
}
