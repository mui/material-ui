import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AdCarbon from 'docs/src/modules/components/AdCarbon';
import AdInHouse from 'docs/src/modules/components/AdInHouse';
import { AdContext, adShape } from 'docs/src/modules/components/AdManager';
import { useTranslate } from 'docs/src/modules/utils/i18n';

function PleaseDisableAdblock(props) {
  const t = useTranslate();

  return (
    <Paper
      component="span"
      elevation={0}
      sx={{ display: 'block', p: 1.5, border: '2px solid', borderColor: 'primary.main' }}
      {...props}
    >
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

const disableAd =
  process.env.NODE_ENV !== 'production' && process.env.ENABLE_AD_IN_DEV_MODE !== 'true';
const inHouseAds = [
  {
    name: 'scaffoldhub',
    link: 'https://scaffoldhub.io/?partner=1',
    img: '/static/ads-in-house/scaffoldhub.png',
    description: '<b>ScaffoldHub</b>. Automate building your full-stack MUI web-app.',
  },
  {
    name: 'templates',
    link: 'https://mui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-templates',
    img: '/static/ads-in-house/themes-2.jpg',
    description:
      '<b>Premium Templates</b>. Start your project with the best templates for admins, dashboards, and more.',
  },
  {
    name: 'themes',
    link: 'https://mui.com/store/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-themes',
    img: '/static/ads-in-house/themes.png',
    description:
      '<b>Premium Themes</b>. Kickstart your application development with a ready-made theme.',
  },
  {
    name: 'tidelift',
    link: 'https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=enterprise&utm_content=ad',
    img: '/static/ads-in-house/tidelift.png',
    description:
      '<b>MUI for enterprise</b>. Save time and reduce risk. Managed open source — backed by maintainers.',
  },
  {
    name: 'figma',
    link: 'https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=in-house-figma',
    img: '/static/ads-in-house/figma.png',
    description: '<b>For Figma</b>. A large UI kit with over 600 handcrafted MUI components 🎨.',
  },
];

class AdErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    eventLabel: PropTypes.string,
  };

  state = { didError: false };

  static getDerivedStateFromError() {
    return { didError: true };
  }

  componentDidCatch() {
    // send explicit `'null'`
    const eventLabel = String(this.props.eventLabel);
    // TODO: Use proper error monitoring service (e.g. Sentry) instead
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'ad',
      eventAction: 'crash',
      eventLabel,
    });
    window.gtag('event', 'ad', {
      eventAction: 'crash',
      eventLabel,
    });
  }

  render() {
    const { didError } = this.state;
    const { children } = this.props;

    if (didError) {
      return null;
    }
    return children;
  }
}

function Ad() {
  const [adblock, setAdblock] = React.useState(null);
  const [carbonOut, setCarbonOut] = React.useState(null);

  const { current: randomAdblock } = React.useRef(Math.random());
  const { current: randomInHouse } = React.useRef(Math.random());

  let children;
  let label;
  // Hide the content to google bot to avoid its indexation.
  if ((typeof window !== 'undefined' && /Googlebot/.test(navigator.userAgent)) || disableAd) {
    children = <span />;
  } else if (adblock) {
    if (randomAdblock < 0.2) {
      children = <PleaseDisableAdblock />;
      label = 'in-house-adblock';
    } else {
      children = <AdInHouse ad={inHouseAds[Math.floor(inHouseAds.length * randomInHouse)]} />;
      label = 'in-house';
    }
  } else if (carbonOut) {
    children = <AdInHouse ad={inHouseAds[Math.floor(inHouseAds.length * randomInHouse)]} />;
    label = 'in-house-carbon';
  } else {
    children = <AdCarbon />;
    label = 'carbon';
  }

  const ad = React.useContext(AdContext);
  const eventLabel = label ? `${label}-${ad.placement}-${adShape}` : null;

  const timerAdblock = React.useRef();

  const checkAdblock = React.useCallback(
    (attempt = 1) => {
      if (
        document.querySelector('.ea-placement') ||
        document.querySelector('#carbonads') ||
        document.querySelector('.carbonads') ||
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
    if (disableAd) {
      return undefined;
    }
    checkAdblock();

    return () => {
      clearTimeout(timerAdblock.current);
    };
  }, [checkAdblock]);

  React.useEffect(() => {
    // Avoid an exceed on the Google Analytics quotas.
    if (Math.random() < 0.9 || !eventLabel) {
      return undefined;
    }

    const delay = setTimeout(() => {
      window.ga('send', {
        hitType: 'event',
        eventCategory: 'ad',
        eventAction: 'display',
        eventLabel,
      });
      window.gtag('event', 'ad', {
        eventAction: 'display',
        eventLabel,
      });
    }, 2500);

    return () => {
      clearTimeout(delay);
    };
  }, [eventLabel]);

  return (
    <Box
      component="span"
      sx={{
        position: 'relative',
        display: 'block',
        m: (theme) => theme.spacing(4, 0, 3),
        ...(adShape === 'image' && {
          minHeight: 126,
        }),
        ...(adShape === 'inline' && {
          minHeight: 126,
          display: 'flex',
          alignItems: 'flex-end',
        }),
        ...(adShape === 'inline2' && {
          minHeight: 126,
          display: 'flex',
          alignItems: 'flex-end',
        }),
      }}
      data-ga-event-category="ad"
      data-ga-event-action="click"
      data-ga-event-label={eventLabel}
    >
      <AdErrorBoundary eventLabel={eventLabel}>{children}</AdErrorBoundary>
    </Box>
  );
}

export default Ad;
