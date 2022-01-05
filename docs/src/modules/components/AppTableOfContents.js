/* eslint-disable react/no-danger */
import * as React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import TableOfContentsBanner from 'docs/src/components/banner/TableOfContentsBanner';

const Nav = styled('nav')(({ theme }) => {
  return {
    top: 60,
    // Fix IE11 position sticky issue.
    marginTop: 60,
    width: 240,
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
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1.4),
    fontSize: theme.typography.pxToRem(11),
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
    letterSpacing: '.08rem',
    color: theme.palette.grey[600],
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
    color: theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
    '&:hover': {
      borderLeftColor:
        theme.palette.mode === 'light' ? theme.palette.primary[600] : theme.palette.primary[400],
      color:
        theme.palette.mode === 'light' ? theme.palette.primary[600] : theme.palette.primary[400],
    },
  };

  return {
    fontSize: theme.typography.pxToRem(13),
    padding: theme.spacing(0, 1, 0, secondary ? 2.5 : '10px'),
    margin: theme.spacing(0.5, 0, 1, 0),
    borderLeft: `1px solid transparent`,
    boxSizing: 'border-box',
    fontWeight: 500,
    '&:hover': {
      borderLeftColor:
        theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600],
      color: theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.grey[200],
    },
    ...(!active && {
      color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.text.primary,
    }),
    // TODO: We probably want `aria-current="location"` instead.
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
  const router = useRouter();

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
      // always replace the #* in the url because `router.asPath` might contain previous #
      href={`${router.asPath.replace(/#.*/, '')}#${item.hash}`}
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
