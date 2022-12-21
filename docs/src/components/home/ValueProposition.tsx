import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GradientText from 'docs/src/components/typography/GradientText';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
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
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <SectionHeadline
        overline="Why build with MUI?"
        title={
          <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
            A <GradientText>delightful</GradientText> experience for you and your users
          </Typography>
        }
      />
      <Grid container spacing={2}>
        {content.map(({ icon, title, description }) => (
          <Grid key={title} item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {icon}
                <Typography
                  fontWeight="bold"
                  component="h3"
                  color="text.primary"
                  variant="body2"
                  sx={{ ml: 1 }}
                >
                  {title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ValueProposition;
