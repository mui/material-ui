import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GradientText from 'docs/src/components/typography/GradientText';
import Palette from '@material-ui/icons/Palette';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import CodeRounded from '@material-ui/icons/CodeRounded';

const content = [
  {
    icon: <Palette fontSize="small" color="primary" />,
    title: 'For designers',
    description:
      "Save time getting the Core components all set up in your favorite design tool. Customize them however you want to match to your product's branding.",
  },
  {
    icon: <LibraryBooks fontSize="small" color="primary" />,
    title: 'For product managers',
    description:
      'Quickly put together ideas and mockups with already in hand components from your actual product.',
  },
  {
    icon: <CodeRounded fontSize="small" color="primary" />,
    title: 'For developers',
    description:
      'Effortlessly communicate with designers using the same language around the Core components.',
  },
];

const DesignKitValues = () => {
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Typography variant="body2" color="primary" fontWeight="bold">
        Why go with us?
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 }, maxWidth: 500 }}>
        Be more <GradientText>efficient</GradientText> designing and developing with the same
        library.
      </Typography>
      <Grid container spacing={2}>
        {content.map(({ icon, title, description }) => (
          <Grid key={title} item xs={12} sm={6} md={4}>
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

export default DesignKitValues;
