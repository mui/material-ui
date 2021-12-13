/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import PageContext from 'docs/src/modules/components/PageContext';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import NoSsr from '@mui/material/NoSsr';
import ROUTES from 'docs/src/route';

const Nav = styled('nav')(({ theme }) => {
  return {
    top: 70,
    // Fix IE11 position sticky issue.
    marginTop: 70,
    width: 210,
    flexShrink: 0,
    position: 'sticky',
    height: 'calc(100vh - 70px)',
    overflowY: 'auto',
    padding: theme.spacing(2, 4, 2, 0),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  };
});

const NavLabel = styled(Typography)(({ theme }) => {
  return {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    color:
      theme.palette.mode === 'dark' ? alpha(theme.palette.grey[500], 0.5) : theme.palette.grey[500],
  };
});

const NavList = styled(Typography)({
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'secondary',
})(({ active, secondary, theme }) => {
  const activeStyles = {
    borderLeftColor:
      theme.palette.mode === 'light' ? theme.palette.primary[200] : theme.palette.primary[600],
    color: theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[500],
  };

  return {
    fontSize: theme.typography.pxToRem(13),
    padding: theme.spacing(0, 1, 0, secondary ? 3 : '10px'),
    margin: theme.spacing(0.5, 0, 1, 0),
    borderLeft: `2px solid transparent`,
    boxSizing: 'border-box',
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      borderLeftColor:
        theme.palette.mode === 'light' ? theme.palette.primary[200] : theme.palette.primary[700],
      color:
        theme.palette.mode === 'light' ? theme.palette.primary[500] : theme.palette.primary[400],
    },
    ...(!active && {
      color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[900],
    }),
    // TODO: We probably want `aria-current="location"` instead.
    // If so, are we sure "current" and "active" states should have the same styles?
    ...(active && activeStyles),
    '&:active': activeStyles,
  };
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

export default function AppTableOfContents(props) {
  const { toc } = props;
  const t = useTranslate();

  const items = React.useMemo(() => flatten(toc), [toc]);

  const { activePage } = React.useContext(PageContext);
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
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
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
      href={`${activePage.linkProps?.linkAs ?? activePage.pathname}#${item.hash}`}
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
        <Link
          href={ROUTES.survey2021Docs}
          target="_blank"
          data-ga-event-category="survey-2021"
          data-ga-event-action="click"
          data-ga-event-label="table-contents"
          sx={(theme) => ({
            mb: 2,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            background:
              theme.palette.mode === 'dark'
                ? `linear-gradient(90deg, ${theme.palette.primary[900]}, ${theme.palette.primary[600]} 120%)`
                : `linear-gradient(-90deg, ${theme.palette.primary[700]}, ${theme.palette.primary[500]} 120%)`,
            borderRadius: 1,
            transitionProperty: 'all',
            transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '200ms',
            '&:hover, &:focus-visible': {
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '1px 1px 20px 0 rgb(2 2 2 / 50%)'
                  : '1px 1px 20px 0 rgb(90 105 120 / 30%)',
            },
          })}
        >
          <Typography component="span" variant="body1" fontWeight="bold" sx={{ color: '#fff' }}>
            2021 MUI&nbsp;&nbsp;🚀
            <br />
          </Typography>
          <Typography
            component="span"
            variant="body2"
            fontWeight="medium"
            sx={{ color: 'primary.50' }}
            // eslint-disable-next-line material-ui/no-hardcoded-labels
          >
            Developer survey
            <br />
          </Typography>
          <Typography
            component="span"
            variant="caption"
            fontWeight="normal"
            sx={{
              mt: 1,
              pt: 1,
              color: 'primary.50',
              borderTop: 1,
              borderColor: 'primary.400',
            }}
            // eslint-disable-next-line material-ui/no-hardcoded-labels
          >
            Help us shape the future of MUI! &#8594;
          </Typography>
        </Link>
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
