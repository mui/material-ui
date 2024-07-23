import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import PhishingRoundedIcon from '@mui/icons-material/PhishingRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { InfoCard } from '@mui/docs/InfoCard';

const content = [
  {
    icon: <StyleRoundedIcon color="primary" />,
    title: 'Completely unstyled',
    description: 'Nothing to override—start fresh with any style solution or design system.',
    link: '/base-ui/getting-started/',
  },
  {
    icon: <PhishingRoundedIcon color="primary" />,
    title: 'Low-level hooks',
    description:
      "When it's time to go fully custom, Base UI has you covered with low-level hooks for fine-grained flexibility in component design.",
    link: '/base-ui/getting-started/usage/#components-vs-hooks',
  },
  {
    icon: <AccessibilityNewRounded color="primary" />,
    title: 'Accessibility',
    description:
      'We take accessibility seriously. The Base UI docs are loaded with guidelines and best practices.',
    link: '/base-ui/getting-started/accessibility/',
  },
];

export default function BaseUISummary() {
  return (
    <Section cozy>
      <SectionHeadline
        alwaysCenter
        overline="Why Base UI"
        title={
          <Typography variant="h2" sx={{ mt: 1 }}>
            Essential building blocks
            <br /> for <GradientText>sleek and accessible</GradientText> UIs
          </Typography>
        }
        description="Base UI abstracts away the more frustrating aspects of UI development—like accessibility, cross-browser compatibility, and event handling—so you can skip ahead to design implementation."
      />
      <Box sx={{ mt: 6 }}>
        <Grid container spacing={3}>
          {content.map(({ icon, title, description, link }) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
              <InfoCard link={link} title={title} icon={icon} description={description} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Typography
        sx={{ fontWeight: 'medium', textAlign: 'center', mt: 6, mb: 2, fontSize: '0.875rem' }}
      >
        Alternative to libraries such as:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Box
          sx={[
            {
              width: 77,
              height: 37,
            },
            (theme) => ({
              background: 'url(/static/branding/base-ui/radix.svg)',
              ...theme.applyDarkStyles({
                background: 'url(/static/branding/base-ui/radix-dark.svg)',
              }),
            }),
          ]}
        />

        <Box
          sx={[
            {
              width: 113,
              height: 37,
            },
            (theme) => ({
              background: 'url(/static/branding/base-ui/react-aria.svg)',
              ...theme.applyDarkStyles({
                background: 'url(/static/branding/base-ui/react-aria-dark.svg)',
              }),
            }),
          ]}
        />

        <Box
          sx={[
            {
              width: 116,
              height: 37,
            },
            (theme) => ({
              background: 'url(/static/branding/base-ui/headless-ui.svg)',
              ...theme.applyDarkStyles({
                background: 'url(/static/branding/base-ui/headless-ui-dark.svg)',
              }),
            }),
          ]}
        />
      </Box>
    </Section>
  );
}
