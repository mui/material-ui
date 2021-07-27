import * as React from 'react';
import Grid from '@material-ui/core/Grid';

const References = () => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        textAlign: 'center',
        '& img': { maxWidth: '100%', px: 1, filter: 'opacity(0.475)' },
      }}
    >
      <Grid item xs={4} md={2}>
        <img src="/static/branding/pricing/coursera.svg" alt="Coursera logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/branding/pricing/amazon.svg" alt="Amazon logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/branding/pricing/nasa.svg" alt="Nasa logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/branding/pricing/netflix.svg" alt="Netflix logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/branding/pricing/unity.svg" alt="Unity logo" />
      </Grid>
      <Grid item xs={4} md={2}>
        <img src="/static/branding/pricing/shutterstock.svg" alt="Shutterstock logo" />
      </Grid>
    </Grid>
  );
};

export default References;
