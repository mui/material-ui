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
    width: 56,
    height: 56,
  },
  twitter: {
    marginLeft: 'auto',
    color: theme.palette.primary.light,
  },
  quote: {
    flexGrow: 1,
  },
}));

function HomeQuote(props) {
  const { avatar, item, quote, name, userName, ...other } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Avatar src={avatar} alt={name} className={classes.avatar} />
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textPrimary">
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
        <Typography color="textSecondary" variant="body1">
          {quote}
        </Typography>
      </CardContent>
    </Card>
  );
}

HomeQuote.propTypes = {
  items: PropTypes.object,
};

export default HomeQuote;
