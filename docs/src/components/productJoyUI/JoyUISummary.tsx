import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Link from 'docs/src/modules/components/Link';

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
      <Grid container spacing={3} mt={2}>
        {content.map(({ icon, title, description, link }) => (
          <Grid key={title} item xs={12} md={3}>
            <Paper
              component={Link}
              href={link}
              noLinkStyle
              variant="outlined"
              sx={(theme) => ({
                p: 4,
                height: '100%',
                background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                ...theme.applyDarkStyles({
                  bgcolor: 'primaryDark.900',
                  background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                  borderColor: 'primaryDark.700',
                }),
              })}
            >
              <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'primary.200',
                  bgcolor: 'primary.50',
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                  ...theme.applyDarkStyles({
                    borderColor: 'primary.400',
                    bgcolor: 'primary.900',
                    boxShadow:
                      '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                  }),
                })}
              >
                {icon}
              </Box>
              <Typography
                fontWeight="bold"
                component="h3"
                color="text.primary"
                variant="body2"
                mt={2}
                mb={0.5}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="caption"
        fontWeight="semiBold"
        textAlign="center"
        sx={{ width: '100%', mt: 8, mb: 2 }}
      >
        Alternative to libraries such as:
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
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
