import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TeamPhotoMasonry from 'docs/src/components/about/TeamPhotoMasonry';
import TeamStatistics from 'docs/src/components/about/TeamStatistics';
import GradientText from 'docs/src/components/typography/GradientText';
import Section from 'docs/src/layouts/Section';

export default function AboutHero() {
  return (
    <Section cozy bg="gradient">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body2" color="primary.600" fontWeight="bold">
          About us
        </Typography>
        <Typography component="h1" variant="h2" sx={{ my: 1, textAlign: 'center' }}>
          We&apos;re on a mission to make <br />{' '}
          <GradientText>building better UIs effortless</GradientText>
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{
            maxWidth: { md: 500 },
          }}
        >
          We aim high at enabling developers & designers to bring stunning UIs to life with
          unrivalled speed and ease.
        </Typography>
        <TeamPhotoMasonry />
        <TeamStatistics />
      </Box>
    </Section>
  );
}
