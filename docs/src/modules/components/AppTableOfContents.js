/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { shouldHandleLinkClick } from 'docs/src/modules/components/MarkdownLinks';
import TableOfContentsBanner from 'docs/src/components/banner/TableOfContentsBanner';

const Nav = styled('nav')(({ theme }) => ({
  top: 0,
  paddingLeft: 2, // Fix truncated focus outline style
  position: 'sticky',
  height: '100vh',
  overflowY: 'auto',
  paddingTop: 'calc(var(--MuiDocs-header-height) + 1rem)',
  paddingBottom: theme.spacing(4),
  paddingRight: theme.spacing(4), // We can't use `padding` as stylis-plugin-rtl doesn't swap it
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const NavLabel = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.4),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'uppercase',
  letterSpacing: '.08rem',
  color: theme.palette.grey[600],
}));

const NavList = styled(Typography)({
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'secondary',
})(({ active, secondary, theme }) => {
  const activeStyles = {
    borderLeftColor: (theme.vars || theme).palette.primary[200],
    color: (theme.vars || theme).palette.primary[600],
    '&:hover': {
      borderLeftColor: (theme.vars || theme).palette.primary[600],
      color: (theme.vars || theme).palette.primary[600],
    },
  };
  const activeDarkStyles = {
    borderLeftColor: (theme.vars || theme).palette.primary[600],
    color: (theme.vars || theme).palette.primary[300],
    '&:hover': {
      borderLeftColor: (theme.vars || theme).palette.primary[400],
      color: (theme.vars || theme).palette.primary[400],
    },
  };

  return [
    {
      fontSize: theme.typography.pxToRem(13),
      padding: theme.spacing(0, 1, 0, secondary ? 2.5 : '10px'),
      margin: theme.spacing(0.5, 0, 1, 0),
      borderLeft: `1px solid transparent`,
      boxSizing: 'border-box',
      fontWeight: 500,
      '&:hover': {
        borderLeftColor: (theme.vars || theme).palette.grey[400],
        color: (theme.vars || theme).palette.grey[600],
      },
      ...(!active && {
        color: (theme.vars || theme).palette.text.primary,
      }),
      // TODO: We probably want `aria-current="location"` instead.
      ...(active && activeStyles),
      '&:active': activeStyles,
    },
    theme.applyDarkStyles({
      '&:hover': {
        borderLeftColor: (theme.vars || theme).palette.grey[600],
        color: (theme.vars || theme).palette.grey[200],
      },
      ...(!active && {
        color: (theme.vars || theme).palette.grey[500],
      }),
      ...(active && activeDarkStyles),
      '&:active': activeDarkStyles,
    }),
  ];
});

const noop = () => {};

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay],
  );

  React.useEffect(() => {
    if (throttledCallback === noop) {
      return undefined;
    }

    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

function flatten(headings) {
  const itemsWithNode = [];

  headings.forEach((item) => {
    itemsWithNode.push(item);

    if (item.children.length > 0) {
      item.children.forEach((subitem) => {
        itemsWithNode.push(subitem);
      });
    }
  });
  return itemsWithNode;
}

const shouldShowJobAd = () => {
  const date = new Date();
  const timeZoneOffset = date.getTimezoneOffset();
  // Hide for time zones UT+5.5 - UTC+14 & UTC-8 - UTC-12
  if (timeZoneOffset <= -5.5 * 60 || timeZoneOffset >= 8 * 60) {
    return false;
  }
  return true;
};

export default function AppTableOfContents(props) {
  const { toc } = props;
  const t = useTranslate();
  const showSurveyBanner = false;
  const showAddJob = shouldShowJobAd() && !showSurveyBanner;

  const items = React.useMemo(() => flatten(toc), [toc]);
  const [activeState, setActiveState] = React.useState(null);
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);
  const findActiveIndex = React.useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active;
    for (let i = items.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { hash: null };
        break;
      }

      const item = items[i];
      const node = document.getElementById(item.hash);

      if (process.env.NODE_ENV !== 'production') {
        if (!node) {
          console.error(`Missing node on the item ${JSON.stringify(item, null, 2)}`);
        }
      }

      if (
        node &&
        node.offsetTop <
          document.documentElement.scrollTop + document.documentElement.clientHeight / 8
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, items]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(items.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash) => (event) => {
    // Ignore click for new tab/new window behavior
    if (shouldHandleLinkClick(event)) {
      return;
    }

    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    [],
  );

  const itemLink = (item, secondary) => (
    <NavItem
      display="block"
      href={`#${item.hash}`}
      underline="none"
      onClick={handleClick(item.hash)}
      active={activeState === item.hash}
      secondary={secondary}
    >
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </NavItem>
  );

  return (
    <Nav aria-label={t('pageTOC')}>
      <NoSsr>
        <TableOfContentsBanner />
        {showSurveyBanner && (
          <Link
            href="https://www.surveymonkey.com/r/mui-developer-survey-2022?source=docs"
            target="_blank"
            sx={[
              (theme) => ({
                mb: 2,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: alpha(theme.palette.grey[50], 0.4),
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.grey[200],
                borderRadius: 1,
                transitionProperty: 'all',
                transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms',
                '&:hover, &:focus-visible': {
                  borderColor: (theme.vars || theme).palette.primary[200],
                },
              }),
              (theme) =>
                theme.applyDarkStyles({
                  backgroundColor: alpha(theme.palette.primary[900], 0.2),
                  borderColor: (theme.vars || theme).palette.primaryDark[700],
                  '&:hover, &:focus-visible': {
                    borderColor: (theme.vars || theme).palette.primaryDark[500],
                  },
                }),
            ]}
          >
            <Typography component="span" variant="button" fontWeight="500" color="text.primary">
              {'📫 MUI Developer survey 2022 is live!'}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              fontWeight="normal"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
              {'Influence the future of MUI. Help define the roadmap for 2023!'}
            </Typography>
          </Link>
        )}
        {showAddJob && (
          <Link
            href="https://jobs.ashbyhq.com/MUI?utm_source=2vOWXNv1PE"
            target="_blank"
            sx={[
              (theme) => ({
                mb: 2,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: alpha(theme.palette.grey[50], 0.4),
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.grey[200],
                borderRadius: 1,
                transitionProperty: 'all',
                transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms',
                '&:hover, &:focus-visible': {
                  borderColor: (theme.vars || theme).palette.primary[200],
                },
              }),
              (theme) =>
                theme.applyDarkStyles({
                  backgroundColor: alpha(theme.palette.primary[900], 0.2),
                  borderColor: (theme.vars || theme).palette.primaryDark[700],
                  '&:hover, &:focus-visible': {
                    borderColor: (theme.vars || theme).palette.primaryDark[500],
                  },
                }),
            ]}
          >
            <Typography component="span" variant="button" fontWeight="500" color="text.primary">
              {'🚀 Join the MUI team!'}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              fontWeight="normal"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
              {"We're looking for React Engineers and other amazing roles－come find out more!"}
            </Typography>
          </Link>
        )}
      </NoSsr>
      {toc.length > 0 ? (
        <React.Fragment>
          <NavLabel gutterBottom>{t('tableOfContents')}</NavLabel>
          <NavList component="ul">
            {toc.map((item) => (
              <li key={item.text}>
                {itemLink(item)}
                {item.children.length > 0 ? (
                  <NavList as="ul">
                    {item.children.map((subitem) => (
                      <li key={subitem.text}>{itemLink(subitem, true)}</li>
                    ))}
                  </NavList>
                ) : null}
              </li>
            ))}
          </NavList>
        </React.Fragment>
      ) : null}
    </Nav>
  );
}

AppTableOfContents.propTypes = {
  toc: PropTypes.array.isRequired,
};
