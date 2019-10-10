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
    caption: 'NASA',
  },
  {
    logo: 'walmart-labs.svg',
    caption: 'Walmart Labs',
    class: 'walmart',
  },
  {
    logo: 'capgemini.svg',
    caption: 'Capgemini',
  },
  {
    logo: 'uniqlo.svg',
    caption: 'Uniqlo',
  },
  {
    logo: 'bethesda.svg',
    caption: 'Bethesda',
    class: 'noDescenders',
  },
  {
    logo: 'jpmorgan.svg',
    caption: 'J.P. Morgan',
  },
  {
    logo: 'shutterstock.svg',
    caption: 'Shutterstock',
    class: 'noDescenders',
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
    height: 40,
  },
  noDescenders: {
    height: 29,
  },
  walmart: {
    margin: theme.spacing(1.1, 3, 1.5),
    height: 48,
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
          <Typography variant="h4" align="center" gutterBottom>
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
