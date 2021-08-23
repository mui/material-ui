import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GradientText from 'docs/src/components/typography/GradientText';
import InvertColorsRoundedIcon from '@material-ui/icons/InvertColorsRounded';
import HandymanRoundedIcon from '@material-ui/icons/HandymanRounded';
import ArticleRoundedIcon from '@material-ui/icons/ArticleRounded';
import AccessibilityNewRounded from '@material-ui/icons/AccessibilityNewRounded';

const content = [
  {
    icon: <InvertColorsRoundedIcon fontSize="small" color="primary" />,
    title: 'Beautifully designed',
    description:
      "You can start your projects with Google's Material Design or leverage our carefully designed theming capabilities.",
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
      <Typography variant="body2" color="primary" fontWeight="bold">
        Why go with us?
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
        Used by the world&apos;s best teams, supporting design systems of{' '}
        <GradientText>all types</GradientText>
      </Typography>
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
