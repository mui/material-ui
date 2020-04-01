import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AdCodeFund from 'docs/src/modules/components/AdCodeFund';
import AdCarbon from 'docs/src/modules/components/AdCarbon';
import AdInHouse from 'docs/src/modules/components/AdInHouse';

const styles = (theme) => ({
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

function Adblock(props) {
  const t = useSelector((state) => state.options.t);

  return (
    <Paper component="span" elevation={0} {...props}>
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

const inHouseAds = [
  {
    name: 'scaffoldhub',
    link: 'https://scaffoldhub.io/?partner=1',
    img: '/static/in-house/scaffoldhub.png',
    description: '<b>Scaffold</b><br />Automate building your full-stack Material-UI web-app.',
  },
  {
    name: 'themes-2',
    link:
      'https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-2',
    img: '/static/in-house/themes-2.jpg',
    description:
      '<b>Premium Templates</b><br />Start your project with the best themes for admins, dashboards and more.',
  },
  {
    name: 'themes',
    link:
      'https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=in-house',
    img: '/static/in-house/themes.png',
    description:
      '<b>Premium Themes</b><br />Kickstart your application development with a ready-made theme.',
  },
  {
    name: 'tidelift',
    link:
      'https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=enterprise&utm_content=ad',
    img: '/static/in-house/tidelift.png',
    description:
      '<b>Material-UI for enterprise</b><br />Save time and reduce risk. Managed open source — backed by maintainers.',
  },
  {
    name: 'bonsaiilabs',
    link: 'https://bonsaiilabs.com/courseDetail/material-ui-with-react',
    img: '/static/in-house/bonsaiilabs.png',
    description:
      '<b>Learn Material‑UI</b><br />A course to learn Material-UI while developing a flight search/booking app.',
  },
  {
    name: 'sketch',
    link:
      'https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-sketch',
    img: '/static/in-house/sketch.png',
    description:
      '<b>Sketch</b><br />A large UI kit with over 1,500 handcrafted Material-UI symbols 💎.',
  },
];

function Ad(props) {
  const { classes } = props;

  const timerAdblock = React.useRef();
  const { current: randomSplit } = React.useRef(Math.random());
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
    const handler = (event) => {
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

  if (!children && adblock) {
    minHeight = 'auto';

    if (Math.random() < 0.2) {
      children = <Adblock className={classes.paper} />;
    } else {
      children = <AdInHouse ad={inHouseAds[Math.floor(inHouseAds.length * Math.random())]} />;
    }
  }

  if (!children) {
    if (carbonOut || codeFundOut) {
      children = <AdInHouse ad={inHouseAds[Math.floor(inHouseAds.length * Math.random())]} />;
      minHeight = 'auto';
    } else if (randomSplit < 0.35) {
      children = <AdCodeFund />;
    } else {
      children = <AdCarbon />;
    }
  }

  React.useEffect(() => {
    // Avoid a flood of events.
    if (Math.random() < 0.9) {
      return undefined;
    }

    const delay = setTimeout(() => {
      let type;

      if (children.type === AdCodeFund) {
        type = 'codefund';
      } else if (children.type === AdCarbon) {
        type = 'carbon';
      } else if (children.type === AdInHouse) {
        if (!adblock && codeFundOut) {
          type = 'in-house-codefund';
        } else if (!adblock && carbonOut) {
          type = 'in-house-carbon';
        } else {
          type = 'in-house';
        }
      } else if (children.type === Adblock) {
        type = 'in-house-adblock';
      } else {
        return;
      }

      window.ga('send', {
        hitType: 'event',
        eventCategory: 'ad',
        eventAction: 'display',
        eventLabel: type,
      });

      if (type.indexOf('in-house') === 0) {
        window.ga('send', {
          hitType: 'event',
          eventCategory: 'in-house-ad',
          eventAction: 'display',
          eventLabel: children.props.ad.name,
        });
      }
    }, 2500);

    return () => {
      clearTimeout(delay);
    };
  }, [children.type, children.props.ad, codeFundOut, carbonOut, adblock]);

  return (
    <span className={classes.root} style={{ minHeight }}>
      {children}
    </span>
  );
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(Ad));
