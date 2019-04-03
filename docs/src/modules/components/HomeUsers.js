import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const users = [
  {
    logo: 'nasa.png',
    caption: 'NASA',
    link: 'https://www.nasa.gov/',
  },
  {
    logo: 'walmart-labs.png',
    caption: 'Walmart Labs',
    link: 'https://www.walmartlabs.com/',
  },
  {
    logo: 'capgemini.png',
    caption: 'Capgemini',
    link: 'https://www.capgemini.com/',
  },
  {
    logo: 'uniqlo.png',
    caption: 'Uniqlo',
    link: 'https://www.uniqlo.com',
  },
  {
    logo: 'bethesda.png',
    caption: 'Bethesda',
    link: 'https://bethesda.net',
  },
];

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.paper,
    minHeight: 160,
    paddingTop: theme.spacing.unit * 5,
  },
  container: {
    paddingTop: theme.spacing.unit * 14,
    paddingBottom: theme.spacing.unit * 14,
    margin: 'auto',
    borderTop: `1px solid ${theme.palette.divider}`,
    maxWidth: theme.spacing.unit * 110,
  },
  grid: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  },
  img: {
    margin: '12px 24px',
  },
});

function HomeUsers(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <NoSsr>
        <div className={classes.container}>
          <Typography variant="h4" align="center" gutterBottom>
            {"Who's using Material-UI?"}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Material-UI was open sourced in 2014 and is used by teams of all sizes.
          </Typography>
          <Grid container justify="center" className={classes.grid}>
            {users.map(user => (
              <a
                href={user.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                key={user.logo}
              >
                <img
                  src={`/static/images/users/${user.logo}`}
                  alt={user.caption}
                  className={classes.img}
                />
              </a>
            ))}
          </Grid>
          <Typography variant="body1" align="center" gutterBottom>
            Are you using Material-UI?
          </Typography>
          <Grid container justify="center">
            <Button variant="outlined">Add your company</Button>
          </Grid>
        </div>
      </NoSsr>
    </div>
  );
}

HomeUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeUsers);
