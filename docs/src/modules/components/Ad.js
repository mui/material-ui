import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AdCarbon from 'docs/src/modules/components/AdCarbon';
import AdInHouse from 'docs/src/modules/components/AdInHouse';
import { AdContext, adShape } from 'docs/src/modules/components/AdManager';

const styles = (theme) => ({
  root: {
    position: 'relative',
    display: 'block',
  },
  'placement-body-image': {
    margin: theme.spacing(4, 1, 3),
    minHeight: 126,
  },
  'placement-body-inline': {
    margin: theme.spacing(4, 0, 3),
    minHeight: 126,
    display: 'flex',
    alignItems: 'flex-end',
  },
  'placement-body-inline2': {
    margin: theme.spacing(4, 0, 3),
    minHeight: 126,
    display: 'flex',
    alignItems: 'flex-end',
  },
  paper: {
    padding: theme.spacing(1.5),
    border: `2px solid ${theme.palette.primary.main}`,
    display: 'block',
  },
});

function PleaseDisableAdblock(props) {
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
    description: '<b>Scaffold</b>. Automate building your full-stack Material-UI web-app.',
  },
  {
    name: 'templates',
    link:
      'https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-templates',
    img: '/static/in-house/themes-2.jpg',
    description:
      '<b>Premium Templates</b>. Start your project with the best templates for admins, dashboards and more.',
  },
  {
    name: 'themes',
    link:
      'https://material-ui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-themes',
    img: '/static/in-house/themes.png',
    description:
      '<b>Premium Themes</b>. Kickstart your application development with a ready-made theme.',
  },
  {
    name: 'tidelift',
    link:
      'https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=enterprise&utm_content=ad',
    img: '/static/in-house/tidelift.png',
    description:
      '<b>Material-UI for enterprise</b>. Save time and reduce risk. Managed open source — backed by maintainers.',
  },
  {
    name: 'sketch',
    link:
      'https://material-ui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-sketch',
    img: '/static/in-house/sketch.png',
    description:
      '<b>For Sketch</b>. A large UI kit with over 600 handcrafted Material-UI symbols 💎.',
  },
  {
    name: 'figma',
    link:
      'https://material-ui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-figma',
    img: '/static/in-house/figma.png',
    description:
      '<b>For Figma</b>. A large UI kit with over 600 handcrafted Material-UI components 🎨.',
  },
];

function Ad(props) {
  const { classes } = props;

  const [adblock, setAdblock] = React.useState(null);
  const [carbonOut, setCarbonOut] = React.useState(null);

  let children;

  // Hide the content to google bot.
  if (/Googlebot/.test(navigator.userAgent) || disable) {
    children = <span />;
  }

  const { current: randomAdblock } = React.useRef(Math.random());
  const { current: randomInHouse } = React.useRef(Math.random());

  if (!children && adblock) {
    if (randomAdblock < 0.2) {
      children = <PleaseDisableAdblock className={classes.paper} />;
    } else {
      children = <AdInHouse ad={inHouseAds[Math.floor(inHouseAds.length * randomInHouse)]} />;
    }
  }

  if (!children) {
    if (carbonOut) {
      children = <AdInHouse ad={inHouseAds[Math.floor(inHouseAds.length * randomInHouse)]} />;
    } else {
      children = <AdCarbon />;
    }
  }

  const getNetwork = () => {
    let label;

    if (children.type === AdCarbon) {
      label = 'carbon';
    } else if (children.type === AdInHouse) {
      if (!adblock && carbonOut) {
        label = 'in-house-carbon';
      } else {
        label = 'in-house';
      }
    } else if (children.type === PleaseDisableAdblock) {
      label = 'in-house-adblock';
    }

    return label;
  };

  const ad = React.useContext(AdContext);
  const eventLabel = `${getNetwork()}-${ad.portal.placement}-${adShape}`;

  const timerAdblock = React.useRef();

  const checkAdblock = React.useCallback(
    (attempt = 1) => {
      if (
        document.querySelector('.cf-wrapper') ||
        document.querySelector('#carbonads') ||
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
    [carbonOut],
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
    // Avoid an exceed on the Google Analytics quotas.
    if (Math.random() < 0.9) {
      return undefined;
    }

    const delay = setTimeout(() => {
      if (!eventLabel) {
        return;
      }

      window.ga('send', {
        hitType: 'event',
        eventCategory: 'ad',
        eventAction: 'display',
        eventLabel,
      });

      if (eventLabel.indexOf('in-house') === 0) {
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
  }, [eventLabel, children.props.ad]);

  const key = 0;

  return (
    <span
      className={clsx(classes.root, classes[`placement-body-${adShape}`])}
      data-ga-event-category="ad"
      data-ga-event-action="click"
      data-ga-event-label={eventLabel}
    >
      {React.cloneElement(children, { key })}
    </span>
  );
}

Ad.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(Ad));
