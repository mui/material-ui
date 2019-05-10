import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import compose from 'docs/src/modules/utils/compose';

const users = [
  {
    logo: 'nasa.png',
    caption: 'NASA',
  },
  {
    logo: 'walmart-labs.png',
    caption: 'Walmart Labs',
  },
  {
    logo: 'capgemini.png',
    caption: 'Capgemini',
  },
  {
    logo: 'uniqlo.png',
    caption: 'Uniqlo',
  },
  {
    logo: 'bethesda.png',
    caption: 'Bethesda',
  },
];

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
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
    margin: '12px 24px',
  },
});

function HomeUsers(props) {
  const { classes, t } = props;

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
                className={classes.img}
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
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({ t: state.options.t })),
  withStyles(styles),
)(HomeUsers);
