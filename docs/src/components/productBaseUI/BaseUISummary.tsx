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
    title: 'Primitive components',
    description:
      'The building blocks for many simple and complex components you find in common apps out there.',
  },
  {
    icon: <HandymanRoundedIcon fontSize="small" color="primary" />,
    title: 'Low-level hooks',
    description:
      'Complete control over the rendered HTML structure and fine grain flexibility for component design.',
  },
  {
    icon: <ArticleRoundedIcon fontSize="small" color="primary" />,
    title: 'Completely unstyled',
    description:
      'Bring any style solution you want to add design to these components. Open room for your creativity.',
  },
  {
    icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
    title: 'Accessibility',
    description:
      'We do our best to ensure MUI Base components support the latest accessibility conventions.',
  },
];

export default function BaseUISummary() {
  return (
    <Container sx={{ py: { xs: 6, sm: 10, md: 12 } }}>
      <Box sx={{ textAlign: 'center' }}>
        <SectionHeadline
          overline="Building with Base UI"
          title={
            <Typography
              variant="h2"
              sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 600, mx: 'auto' }}
            >
              Quickly building <GradientText>sophisticated UI</GradientText>
              <br />
              has become a breeze
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
