import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getCookie } from 'docs/src/modules/utils/helpers';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AdCodeFund from 'docs/src/modules/components/AdCodeFund';
import AdCarbon from 'docs/src/modules/components/AdCarbon';
import AdInHouse from 'docs/src/modules/components/AdInHouse';

const styles = theme => ({
  root: {
    position: 'relative',
    minHeight: 124,
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

function getAdblockCount() {
  const seen = getCookie('adblockCount');
  return seen === '' ? 0 : parseInt(seen, 10);
}

function getAdblock(classes, t) {
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

const inHouses = [
  {
    name: 'scaffoldhub',
    link: 'https://scaffoldhub.io/?partner=1',
    img: '/static/in-house/scaffoldhub.png',
    description: '<b>ScaffoldHub</b> - Automate building your full-stack Material-UI web-app.',
  },
  {
    name: 'themes',
    link: 'https://themes.material-ui.com/',
    img: '/static/in-house/themes.png',
    description:
      '<b>Premium Themes</b><br />Kickstart your application development with a ready-made theme.',
  },
];

function Ad(props) {
  const { classes } = props;
  const { current: random } = React.useRef(Math.random());
  const timerAdblock = React.useRef();
  const t = useSelector(state => state.options.t);
  const [adblock, setAdblock] = React.useState(null);

  const checkAdblock = React.useCallback((attempt = 1) => {
    if (
      document.querySelector('.cf-wrapper') ||
      document.querySelector('#carbonads') ||
      document.querySelector('#in-house')
    ) {
      setAdblock(false);
      return;
    }

    if (attempt < 30) {
      timerAdblock.current = setTimeout(() => {
        checkAdblock(attempt + 1);
      }, 500);
    } else {
      document.cookie = `adblockCount=${getAdblockCount() + 1};path=/`;
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

  // Hide the content to google bot.
  if (/Googlebot/.test(navigator.userAgent)) {
    return null;
  }

  if (disable) {
    return <span className={classes.root}>{getAdblock(classes, t)}</span>;
  }

  if (getAdblockCount() >= 2) {
    return (
      <span className={classes.root} style={{ minHeight: 'auto' }}>
        <AdInHouse ad={inHouses[Math.round((inHouses.length - 1) * Math.random())]} />
      </span>
    );
  }

  if (adblock === true) {
    return <span className={classes.root}>{getAdblock(classes, t)}</span>;
  }

  let randomAd;

  if (random < 0.6) {
    randomAd = <AdCodeFund />;
  } else if (random < 0.63) {
    randomAd = <AdInHouse ad={inHouses[0]} />;
  } else {
    randomAd = <AdCarbon />;
  }

  return <span className={classes.root}>{randomAd}</span>;
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ad);
