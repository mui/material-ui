import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import InfoCard from 'docs/src/components/action/InfoCard';

const content = [
  {
    icon: <InvertColorsRoundedIcon fontSize="small" color="primary" />,
    title: 'Beautiful out of the box',
    description:
      'Start looking good with very little effort. Joy UI is designed to be simple and agnostic.',
    link: '/joy-ui/getting-started/#beautiful-out-of-the-box/',
  },
  {
    icon: <HandymanRoundedIcon fontSize="small" color="primary" />,
    title: 'Highly customizable',
    description:
      'Complete control over how the component looks, powered by several customization tools.',
    link: '/joy-ui/getting-started/#highly-customizable/',
  },
  {
    icon: <ArticleRoundedIcon fontSize="small" color="primary" />,
    title: 'Developer experience',
    description:
      'Feel joy when working with Joy UI. Streamlined component API, documentation, and more.',
    link: '/joy-ui/getting-started/#developer-experience/',
  },
  {
    icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
    title: 'Accessibility',
    description:
      'Joy UI is built off of from Base UI, which delivers several built-in accessibility features.',
    link: '/joy-ui/getting-started/#accessibility/',
  },
];

export default function JoyUISummary() {
  return (
    <Section>
      <SectionHeadline
        alwaysCenter
        overline="Why Joy UI"
        title={
          <Typography variant="h2" sx={{ mt: 1, maxWidth: 600, mx: 'auto' }}>
            Kick-start your new product with <br />
            <GradientText>beautiful components and DX</GradientText>
          </Typography>
        }
        description="Joy UI components were extracted from Material UI, featuring the same robust engineering, and quickly trusted by many community members."
      />
      <Grid container spacing={{ xs: 2, sm: 3 }} mt={2}>
        {content.map(({ icon, title, description, link }) => (
          <Grid key={title} item xs={12} md={3}>
            <InfoCard link={link} title={title} icon={icon} description={description} />
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="caption"
        fontWeight="semiBold"
        textAlign="center"
        sx={{ width: '100%', mt: { xs: 6, sm: 8 }, mb: 2 }}
      >
        Alternative to libraries such as:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/joy-ui/chakra.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/joy-ui/chakra-dark.svg)',
            }),
          })}
          width={87}
          height={37}
        />
        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/joy-ui/mantine.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/joy-ui/mantine-dark.svg)',
            }),
          })}
          width={86}
          height={37}
        />
        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/joy-ui/ant-design.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/joy-ui/ant-design-dark.svg)',
            }),
          })}
          width={115}
          height={37}
        />
        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/joy-ui/material-ui.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/joy-ui/material-ui-dark.svg)',
            }),
          })}
          width={121}
          height={37}
        />
      </Box>
    </Section>
  );
}
