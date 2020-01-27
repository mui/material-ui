import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  avatar: {
    width: 48,
    height: 48,
  },
  twitter: {
    marginLeft: 'auto',
    color: theme.palette.primary.light,
  },
  name: {
    fontSize: 16,
  },
  quote: {
    paddingBottom: '16px !important',
    paddingTop: 0,
  },
}));

function HomeQuote(props) {
  const { avatar, quote, name, userName } = props;
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Avatar src={avatar} alt={name} className={classes.avatar} />
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textPrimary" className={classes.name}>
              {name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {userName}
            </Typography>
          </Grid>
          <Grid item className={classes.twitter}>
            <TwitterIcon />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent className={classes.quote}>
        <Typography color="textPrimary" variant="body2">
          {quote}
        </Typography>
      </CardContent>
    </Card>
  );
}

HomeQuote.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  quote: PropTypes.string,
  userName: PropTypes.string,
};

export default HomeQuote;
