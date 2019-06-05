import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function RealWorld() {
  return (
    <Box clone pt={2} pr={1} pb={1} pl={2}>
      <Paper elevation={0}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap">
          <Grid item>
            <Box bgcolor="primary.main" clone>
              <Avatar>
                <SignalWifiOffIcon />
              </Avatar>
            </Box>
          </Grid>
          <Grid item>
            <Typography>You have lost connection to the internet. This app is offline.</Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-end" spacing={1}>
          <Grid item>
            <Button color="primary">Turn on wifi</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
