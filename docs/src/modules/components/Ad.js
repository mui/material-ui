import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
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
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.level2,
    display: 'block',
  },
});

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
    link:
      'https://themes.material-ui.com/?utm_source=material_ui&utm_medium=referral&utm_campaign=in-house',
    img: '/static/in-house/themes.png',
    description:
      '<b>Premium Themes</b><br />Kickstart your application development with a ready-made theme.',
  },
  {
    name: 'tidelift',
    link:
      'https://tidelift.com/subscription/managed-open-source-survey?utm_source=material_ui&utm_medium=referral&utm_campaign=enterprise&utm_content=ad',
    img: '/static/in-house/tidelift.png',
    description:
      '<b>Material-UI for enterprise</b><br />Available in the Tidelift Subscription. Reduce risk, and improve code health.',
  },
];

function Ad(props) {
  const { classes } = props;
  const { current: random } = React.useRef(Math.random());
  const t = useSelector(state => state.options.t);

  const timerAdblock = React.useRef();
  const [adblock, setAdblock] = React.useState(null);
  const [carbonOut, setCarbonOut] = React.useState(null);
  const [codeFundOut, setCodeFundOut] = React.useState(null);

  const checkAdblock = React.useCallback(
    (attempt = 1) => {
      if (
        document.querySelector('.cf-wrapper') ||
        document.querySelector('#carbonads') ||
        codeFundOut ||
        carbonOut
      ) {
        if (
          document.querySelector('#carbonads a') &&
          document.querySelector('#carbonads a').getAttribute('href') ===
            'https://material-ui-next.com/discover-more/backers'
        ) {
          setCarbonOut(true);
        }

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
    },
    [codeFundOut, carbonOut],
  );

  React.useEffect(() => {
    if (disable) {
      return undefined;
    }
    checkAdblock();

    return () => {
      clearTimeout(timerAdblock.current);
    };
  }, [checkAdblock]);

  React.useEffect(() => {
    const handler = event => {
      if (event.detail.status === 'no-advertiser') {
        setCodeFundOut(true);
      }
    };
    window.addEventListener('codefund', handler);
    return () => {
      window.removeEventListener('codefund', handler);
    };
  }, []);

  let children;
  let minHeight;

  // Hide the content to google bot.
  if (/Googlebot/.test(navigator.userAgent) || disable) {
    children = <span />;
  }

  if (adblock) {
    minHeight = 'auto';

    if (random >= 0.8) {
      children = getAdblock(classes, t);
    } else {
      children = <AdInHouse ad={inHouses[Math.round((inHouses.length - 1) * random)]} />;
    }
  }

  if (!children) {
    if (carbonOut || codeFundOut) {
      children = <AdInHouse ad={inHouses[Math.round((inHouses.length - 1) * random)]} />;
      minHeight = 'auto';
    } else if (random >= 0.55) {
      children = <AdCodeFund />;
    } else {
      children = <AdCarbon />;
    }
  }

  return (
    <span className={classes.root} style={{ minHeight }}>
      {children}
    </span>
  );
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ad);
