import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import ProductsSwitcher from 'docs/src/components/home/ProductsSwitcher';
import ComponentShowcase from './ComponentShowcase';

const DesignSystems = () => {
  return (
    <Box bgcolor="grey.50" py={8}>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box maxWidth={500}>
              <Typography variant="body2" color="primary" fontWeight="bold" mb={1}>
                Products
              </Typography>
              <Typography variant="h2" color="primary.900" mb={1}>
                Extensive library of components, ready for <GradientText>production</GradientText>.
              </Typography>
              <Typography color="text.secondary">
                We bring together a suite of products integrated to make your life easier when it
                comes to setting up design systems.
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
