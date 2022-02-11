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
    title: 'Beautifully designed',
    description:
      "You can start your projects with Google's Material Design or build your designs using sophisticated theming features.",
  },
  {
    icon: <HandymanRoundedIcon fontSize="small" color="primary" />,
    title: 'Easily customized',
    description:
      'Enjoy the power of our components without sacrificing the styles you want. Tweak how your components render down to the very last class.',
  },
  {
    icon: <ArticleRoundedIcon fontSize="small" color="primary" />,
    title: 'Superb documentation',
    description:
      "Our docs were shaped throughout the years with the help and experience of our trusted 2,000+ open-source contributors. It's all there!",
  },
  {
    icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
    title: 'Accessible in mind',
    description:
      'We care about making it great for everyone. We improve accessibility for all of our components constantly, helping you to reach the largest audience possible!',
  },
];

const ValueProposition = () => {
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <SectionHeadline
        overline="Developer experience"
        title={
          <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
            Powerful tools to help you build <GradientText>all types</GradientText> of user
            interfaces
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
};

export default ValueProposition;
