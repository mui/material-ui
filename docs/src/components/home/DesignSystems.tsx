import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GradientText from 'docs/src/components/GradientText';
import ProductsSwitcher from 'docs/src/components/home/ProductsSwitcher';
import ComponentShowcase from './ComponentShowcase';

const DesignSystems = () => {
  return (
    <Box bgcolor="grey.50" py={8}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box maxWidth={500}>
              <Typography variant="body1" color="primary" fontWeight="extraBold" mb={1}>
                Products
              </Typography>
              <Typography
                component="h2"
                color="primary.900"
                fontWeight="extraBold"
                fontSize="clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)"
                lineHeight="max(32px, 1.22222em)"
                mb={1}
              >
                Robust components with careful and customizable designs, ready for{' '}
                <GradientText>production</GradientText>.
              </Typography>
              <Typography color="text.secondary">
                We bring together a suite of products integrated to make your life easier and
                happier when it comes to developing React applications.
              </Typography>
            </Box>
            <ProductsSwitcher />
          </Grid>
          <Grid item xs={12} md={6}>
            <ComponentShowcase />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DesignSystems;
