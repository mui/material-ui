import React from 'react';
// COMPONENTS
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
// ICONS
import Search from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import Info from '@material-ui/icons/Info';

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.12)',
  },
  searchToolbar: {
    color: 'rgba(0,0,0,0.54)',
  },
  searchInput: {
    fontSize: 14,
  },
  contentWrapper: {
    margin: '96px 160px',
  },
  sticker: {
    width: '110%',
    height: 'auto',
    display: 'block',
    marginTop: -24,
  },
  description: {
    fontWeight: 'normal',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  callOut: {
    marginTop: 40,
    background: '#eceff1',
    color: '#546e7a',
    padding: '0 24px',
  },
  infoIcon: {
    color: '#78909c',
  },
});

const Content = ({ classes }) => (
  <Paper className={classes.paper}>
    <AppBar className={classes.searchBar} position={'static'} color={'default'}>
      <Toolbar className={classes.searchToolbar}>
        <Grid container spacing={8} alignItems="center">
          <Grid item alignItems="center">
            <Search color={'inherit'} />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder={'Search by email address, phone number, or user UID'}
              InputProps={{
                disableUnderline: true,
                className: classes.searchInput,
              }}
            />
          </Grid>
          <Grid item>
            <Refresh color={'inherit'} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <div className={classes.contentWrapper}>
      <Grid container justify={'center'} alignItems={'flex-start'} spacing={32}>
        <Grid item xs={4}>
          <img
            className={classes.sticker}
            src={'https://www.gstatic.com/mobilesdk/160505_mobilesdk/zerostate/2x/auth.png'}
            alt={'auth'}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography variant={'h6'} className={classes.description}>
            Authenticate and manage users from a variety of providers without server-side code
          </Typography>
          <Grid container spacing={32}>
            <Grid item>
              <Typography variant={'body2'} className={classes.link}>
                Learn more
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={'body2'} className={classes.link}>
                View the docs
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.callOut}>
            <Grid container spacing={16} wrap={'nowrap'}>
              <Grid item>
                <Info className={classes.infoIcon} />
              </Grid>
              <Grid item>
                <Typography color={'inherit'} variant={'subtitle2'}>
                  To manage Authentication, ask a project owner for the necessary permissions
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  </Paper>
);

export default withStyles(styles)(Content);
