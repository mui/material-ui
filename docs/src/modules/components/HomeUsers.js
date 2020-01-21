import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const users = [
  {
    logo: 'nasa.svg',
    logoWidth: 49,
    logoHeight: 40,
    caption: 'NASA',
  },
  {
    logo: 'walmart-labs.svg',
    logoWidth: 253,
    logoHeight: 48,
    caption: 'Walmart Labs',
    class: 'walmart',
  },
  {
    logo: 'capgemini.svg',
    logoWidth: 180,
    logoHeight: 40,
    caption: 'Capgemini',
  },
  {
    logo: 'uniqlo.svg',
    logoWidth: 40,
    logoHeight: 40,
    caption: 'Uniqlo',
  },
  {
    logo: 'bethesda.svg',
    logoWidth: 196,
    logoHeight: 29,
    caption: 'Bethesda',
  },
  {
    logo: 'jpmorgan.svg',
    logoWidth: 198,
    logoHeight: 40,
    caption: 'J.P. Morgan',
  },
  {
    logo: 'shutterstock.svg',
    caption: 'Shutterstock',
    logoWidth: 205,
    logoHeight: 29,
  },
];

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    minHeight: 160,
    paddingTop: theme.spacing(5),
  },
  container: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(14),
  },
  grid: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  img: {
    margin: theme.spacing(1.5, 3),
  },
  walmart: {
    margin: theme.spacing(1.1, 3, 1.5),
  },
});

function HomeUsers(props) {
  const { classes } = props;
  const t = useSelector(state => state.options.t);

  return (
    <div className={classes.root}>
      <Divider />
      <NoSsr>
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            {t('whosUsing')}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            {t('joinThese')}
          </Typography>
          <Grid container justify="center" className={classes.grid}>
            {users.map(user => (
              <img
                key={user.caption}
                src={`/static/images/users/${user.logo}`}
                alt={user.caption}
                className={clsx(classes.img, classes[user.class])}
                loading="lazy"
                width={user.logoWidth}
                height={user.logoHeight}
              />
            ))}
          </Grid>
          <Typography variant="body1" align="center" gutterBottom>
            {t('usingMui')}
          </Typography>
          <Grid container justify="center">
            <Button
              variant="outlined"
              href="https://spectrum.chat/material-ui/general/whos-using-material-ui~00e6687a-9b2d-454f-97a6-950d9fde71cf"
              rel="noopener nofollow"
              target="_blank"
            >
              {t('letUsKnow')}
            </Button>
          </Grid>
        </Container>
      </NoSsr>
    </div>
  );
}

HomeUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeUsers);
