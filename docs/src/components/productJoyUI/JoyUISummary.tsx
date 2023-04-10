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
    title: 'Beautiful out of the box',
    description:
      'Start looking good with very little effort. Joy UI is designed to be simple and agnostic.',
  },
  {
    icon: <HandymanRoundedIcon fontSize="small" color="primary" />,
    title: 'Highly customizable',
    description:
      'Complete control over how the component looks, powered by several customization tools.',
  },
  {
    icon: <ArticleRoundedIcon fontSize="small" color="primary" />,
    title: 'Developer experience',
    description:
      'Feel joy when working with Joy UI. Streamlined component API, documentation, and more.',
  },
  {
    icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
    title: 'Accessibility',
    description:
      'Joy UI is built off of from MUI Base, which delivers several accessibility features from the get go.',
  },
];

export default function JoyUISummary() {
  return (
    <Container sx={{ py: { xs: 6, sm: 10, md: 12 } }}>
      <Box sx={{ textAlign: 'center' }}>
        <SectionHeadline
          overline="Building with Joy UI"
          title={
            <Typography
              variant="h2"
              sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 600, mx: 'auto' }}
            >
              Kick-start your new product with <br />
              <GradientText>beautiful components and DX</GradientText>
            </Typography>
          }
        />
      </Box>
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
