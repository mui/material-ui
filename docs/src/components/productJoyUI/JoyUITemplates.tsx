import * as React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Section from 'docs/src/layouts/Section';
import GradientText from 'docs/src/components/typography/GradientText';

function Placeholder() {
  return (
    <Box sx={{ mt: 4 }}>
      {/* placeholder for Tabs */}
      <Box
        sx={(theme) => ({
          mx: 'auto',
          width: 538,
          height: 42,
          borderRadius: '16px',
          bgcolor: 'grey.100',
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
          }),
        })}
      />

      {/* placeholder for Template preview */}
      <Box
        sx={(theme) => ({
          '--_scale': '0.9',
          '--_preview-height': 'clamp(500px / var(--_scale), 80vh, 600px / var(--_scale))',
          boxShadow: '0 0 0 6px rgba(var(--joy-palette-neutral-mainChannel) / 0.32)',
          borderRadius: '11px',
          height: 'var(--_preview-height)',
          transform: 'scale(var(--_scale))',
          transformOrigin: 'center 160px',
          bgcolor: 'grey.100',
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
          }),
        })}
      />
    </Box>
  );
}

const ThemableTemplate = dynamic(() => import('./ThemableTemplate'), {
  ssr: false,
  loading: Placeholder,
});

export default function JoyUITemplates() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '400px',
  });
  return (
    <Section bg="gradient" ref={ref} cozy>
      <SectionHeadline
        alwaysCenter
        overline="Fresh look & feel"
        title={
          <Typography variant="h2" textAlign="center">
            Get started quickly with Joy UI
            <br />
            using <GradientText>free templates</GradientText>
          </Typography>
        }
      />
      {inView ? <ThemableTemplate /> : <Placeholder />}
      <GlobalStyles
        styles={(theme) => ({
          body: {
            backgroundColor: theme.vars.palette.background.default,
            color: theme.vars.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            lineHeight: 1.5,
          },
        })}
      />
    </Section>
  );
}
