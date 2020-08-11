import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  section1: {
    padding: theme.spacing(1),
    margintop: theme.spacing(1.5),
    width: 'fit-content',
    textAlign: 'center',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
  horizontalDivider: {
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));

export default function VerticalDividerText() {
  const classes = useStyles();
  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium. Etiam tempus sodales mauris vitae pulvinar. Nunc eu tortor odio.`;

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" className={classes.section1}>
        <Grid item xs={5}>
          <Typography gutterBottom variant="body1">
            {content}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem>
          VERTICAL
        </Divider>
        <Grid item xs={5}>
          <Typography gutterBottom variant="body1">
            {content}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
