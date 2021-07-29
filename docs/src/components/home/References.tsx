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
        '& > div': {
          px: 1,
        },
        '& img': { maxWidth: '100%', height: 'auto' },
      }}
    >
      <Grid item xs={4} md={2}>
        <div>
          <img
            width="102"
            height="16"
            src="/static/branding/companies/coursera.svg"
            alt="Coursera logo"
          />
        </div>
      </Grid>
      <Grid item xs={4} md={2}>
        <div>
          <img
            width="92"
            height="28"
            src="/static/branding/companies/amazon.svg"
            alt="Amazon logo"
          />
        </div>
      </Grid>
      <Grid item xs={4} md={2}>
        <div>
          <img width="64" height="53" src="/static/branding/companies/nasa.svg" alt="Nasa logo" />
        </div>
      </Grid>
      <Grid item xs={4} md={2}>
        <div>
          <img
            width="88"
            height="24"
            src="/static/branding/companies/netflix.svg"
            alt="Netflix logo"
          />
        </div>
      </Grid>
      <Grid item xs={4} md={2}>
        <div>
          <img
            width="110"
            height="40"
            src="/static/branding/companies/unity.svg"
            alt="Unity logo"
          />
        </div>
      </Grid>
      <Grid item xs={4} md={2}>
        <div>
          <img
            width="138"
            height="21"
            src="/static/branding/companies/shutterstock.svg"
            alt="Shutterstock logo"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default References;
