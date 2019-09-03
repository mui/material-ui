import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AdCodeFund from 'docs/src/modules/components/AdCodeFund';
import AdCarbon from 'docs/src/modules/components/AdCarbon';

const styles = theme => ({
  root: {
    position: 'relative',
    minHeight: 116,
    maxWidth: 345,
    display: 'block',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.level2,
    display: 'block',
  },
});

function getAdblock(classes, t) {
  if (/Googlebot/.test(navigator.userAgent)) {
    return null;
  }

  return (
    <Paper component="span" elevation={0} className={classes.paper}>
      <Typography variant="body2" display="block" component="span" gutterBottom>
        {t('likeMui')}
      </Typography>
      <Typography variant="body2" display="block" component="span" gutterBottom>
        {t('adblock')}
      </Typography>
      <Typography variant="body2" display="block" component="span" gutterBottom>
        {t('thanks')}{' '}
        <span role="img" aria-label={t('emojiLove')}>
          ❤️
        </span>
      </Typography>
    </Paper>
  );
}

const disable = process.env.NODE_ENV !== 'production' && process.env.ENABLE_AD !== 'true';

function Ad(props) {
  const { classes } = props;
  const { current: random } = React.useRef(Math.random());
  const timerAdblock = React.useRef();
  const t = useSelector(state => state.options.t);
  const [adblock, setAdblock] = React.useState(null);

  const checkAdblock = React.useCallback((attempt = 1) => {
    if (document.querySelector('.cf-wrapper') || document.querySelector('#carbonads')) {
      setAdblock(false);
      return;
    }

    if (attempt < 30) {
      timerAdblock.current = setTimeout(() => {
        checkAdblock(attempt + 1);
      }, 500);
    }

    if (attempt > 6) {
      setAdblock(true);
    }
  }, []);

  React.useEffect(() => {
    if (disable) {
      return undefined;
    }
    checkAdblock();

    return () => {
      clearTimeout(timerAdblock.current);
    };
  }, [checkAdblock]);

  if (disable) {
    return <span className={classes.root}>{getAdblock(classes, t)}</span>;
  }

  return (
    <span className={classes.root}>
      {random >= 0.7 ? <AdCodeFund /> : <AdCarbon />}
      {adblock === true ? getAdblock(classes, t) : null}
    </span>
  );
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ad);
