import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import PhishingRoundedIcon from '@mui/icons-material/PhishingRounded';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Link from 'docs/src/modules/components/Link';

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
    link: '/base-ui/getting-started/quickstart/#components-and-hooks',
  },
];

export default function BaseUISummary() {
  return (
    <Container sx={{ py: { xs: 6, sm: 10, md: 20 } }}>
      <SectionHeadline
        alwaysCenter
        overline="Why Base UI"
        title={
          <Typography variant="h2" sx={{ mt: 1, maxWidth: 600, mx: 'auto' }}>
            Essential building blocks
            <br /> for <GradientText>sleek and accessible</GradientText> UIs
          </Typography>
        }
        description="Base UI abstracts away the more frustrating aspects of UI development—like accessibility, cross-browser compatibility, and event handling—so you can skip ahead to design implementation."
      />
      <Box sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          {content.map(({ icon, title, description, link }) => (
            <Grid key={title} item xs={12} md={4}>
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
      </Box>
      <Typography fontWeight={500} textAlign="center" mt={8} mb={2} fontSize="0.875rem">
        Alternative to libraries such as:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/base-ui/radix.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/base-ui/radix-dark.svg)',
            }),
          })}
          width={77}
          height={37}
        />

        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/base-ui/react-aria.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/base-ui/react-aria-dark.svg)',
            }),
          })}
          width={113}
          height={37}
        />

        <Box
          sx={(theme) => ({
            background: 'url(/static/branding/base-ui/headless-ui.svg)',
            ...theme.applyDarkStyles({
              background: 'url(/static/branding/base-ui/headless-ui-dark.svg)',
            }),
          })}
          width={116}
          height={37}
        />
      </Box>
    </Container>
  );
}
