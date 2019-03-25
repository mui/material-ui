import * as React from 'react';
import { loadScript } from 'utils/helpers';
import { Grid, createStyles, Theme, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      '#codefund': {
        '& .cf-wrapper': {
          backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.background.paper + '! important' : 'auto',
        },
        '& .cf-text': {
          color: theme.palette.text.primary + '! important',
        },
      },
    },
  });

const Ad: React.FunctionComponent = () => {
  React.useEffect(() => {
    const codefundScriptPosition = document.querySelector('#codefund-script-position');

    if (codefundScriptPosition) {
      loadScript('https://codefund.io/properties/197/funder.js', codefundScriptPosition);
    }
  }, []);

  return (
    <Grid container>
      <span id="codefund-script-position" />
      <div id="codefund" />
    </Grid>
  );
};

export default withStyles(styles)(Ad);
