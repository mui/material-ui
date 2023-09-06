import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

const content = [
  {
    icon: <InvertColorsRoundedIcon fontSize="small" color="primary" />,
    title: 'Timeless aesthetics',
    description:
      "Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.",
  },
  {
    icon: <HandymanRoundedIcon fontSize="small" color="primary" />,
    title: 'Intuitive customization',
    description:
      'Our components are as flexible as they are powerful. You always have full control over how they look and behave.',
  },
  {
    icon: <ArticleRoundedIcon fontSize="small" color="primary" />,
    title: 'Unrivaled documentation',
    description:
      'The answer to your problem can be found in our documentation. How can we be so sure? Because our docs boast over 2,000 contributors.',
  },
  {
    icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
    title: 'Dedicated to accessibility',
    description:
      "We believe in building for everyone. That's why accessibility is one of our highest priorities with every new feature we ship.",
  },
];

function ValueProposition() {
  return (
    <Section>
      <SectionHeadline
        overline="Why build with MUI?"
        title={
          <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
            A <GradientText>delightful experience</GradientText> <br />
            for you and your users
          </Typography>
        }
      />
      <Grid container spacing={3}>
        {content.map(({ icon, title, description }) => (
          <Grid key={title} item xs={12} sm={3}>
            <Paper
              variant="outlined"
              sx={(theme) => ({
                p: 3,
                height: '100%',
                position: 'relative',
                borderRadius: 1,
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.grey[100],
                background: (theme.vars || theme).palette.gradients.linearSubtle,
                ...theme.applyDarkStyles({
                  bgcolor: (theme.vars || theme).palette.primaryDark[900],
                  borderColor: (theme.vars || theme).palette.primaryDark[700],
                  background: (theme.vars || theme).palette.gradients.linearSubtle,
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
                  borderColor: (theme.vars || theme).palette.primary[200],
                  bgcolor: (theme.vars || theme).palette.primary[50],
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                  ...theme.applyDarkStyles({
                    borderColor: (theme.vars || theme).palette.primary[400],
                    bgcolor: (theme.vars || theme).palette.primary[900],
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
                variant="body2"
                color="text.primary"
                gutterBottom
                mt={2}
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
    </Section>
  );
}

export default ValueProposition;
