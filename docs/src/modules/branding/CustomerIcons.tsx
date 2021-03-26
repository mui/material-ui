import * as React from 'react';
import { Container, Typography, Grid, Box } from '@material-ui/core';

const customerIcons = [
  { image: '/static/branding/pricing/coursera.svg' },
  { image: '/static/branding/pricing/amazon.svg' },
  { image: '/static/branding/pricing/nasa.svg' },
  { image: '/static/branding/pricing/netflix.svg' },
  { image: '/static/branding/pricing/unity.svg' },
  { image: '/static/branding/pricing/shutterstock.svg' },
];

export default function CustomerIcons() {
  return (
    <Container>
      <Grid container sx={{ mt: { xs: 8, sm: 11, lg: 15 }, alignItems: 'center' }}>
        {customerIcons.map((customer) => (
          <Grid
            item
            container
            xs={6}
            sm={4}
            lg={2}
            key={customer.image}
            sx={{ justifyContent: 'center', my: { xs: 4, lg: 0 } }}
          >
            <img loading="lazy" src={customer.image} alt="" />
          </Grid>
        ))}
      </Grid>
      <Typography
        align="center"
        sx={{ color: 'grey5A', mt: { sm: 3, lg: 7 }, mb: { xs: 10, sm: 10, lg: 15 } }}
      >
        From startups to Fortune 500s, the world&apos;s
        <Box component="span" sx={{ display: 'block' }} />
        best product teams use Material-UI.
      </Typography>
    </Container>
  );
}
