/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';
import PageContext from 'docs/src/modules/components/PageContext';

const useStyles = makeStyles((theme) => ({
  root: {
    top: 70,
    // Fix IE 11 position sticky issue.
    marginTop: 70,
    width: 175,
    flexShrink: 0,
    position: 'sticky',
    height: 'calc(100vh - 70px)',
    overflowY: 'auto',
    padding: theme.spacing(2, 2, 2, 0),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  contents: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  item: {
    fontSize: '.8125rem',
    padding: theme.spacing(0.5, 0, 0.5, `${Math.max(0, theme.spacing(1) - 3)}px`),
    borderLeft: `3px solid transparent`,
    boxSizing: 'border-box',
    '&:hover': {
      borderLeftColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
    },
    '&$active,&:active': {
      borderLeftColor:
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
    },
  },
  secondaryItem: {
    paddingLeft: theme.spacing(2.5),
  },
  active: {},
}));

// TODO: these nodes are mutable sources. Use createMutableSource once it's stable
function getItemsClient(headings) {
  const itemsWithNode = [];

  headings.forEach((item) => {
    itemsWithNode.push({
      ...item,
      node: document.getElementById(item.hash),
    });

    if (item.children.length > 0) {
      item.children.forEach((subitem) => {
        itemsWithNode.push({
          ...subitem,
          node: document.getElementById(subitem.hash),
        });
      });
    }
  });
  return itemsWithNode;
}

const noop = () => {};

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(() => (callback ? throttle(callback, delay) : noop), [
    callback,
    delay,
  ]);

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

export default function AppTableOfContents(props) {
  const { items } = props;
  const classes = useStyles();
  const t = useSelector((state) => state.options.t);

  const itemsWithNodeRef = React.useRef([]);
  React.useEffect(() => {
    itemsWithNodeRef.current = getItemsClient(items);
  }, [items]);

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
    for (let i = itemsWithNodeRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { hash: null };
        break;
      }

      const item = itemsWithNodeRef.current[i];

      if (process.env.NODE_ENV !== 'production') {
        if (!item.node) {
          console.error(`Missing node on the item ${JSON.stringify(item, null, 2)}`);
        }
      }

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop + document.documentElement.clientHeight / 8
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState]);

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
    <Link
      display="block"
      color={activeState === item.hash ? 'textPrimary' : 'textSecondary'}
      href={`${activePage.pathname}#${item.hash}`}
      underline="none"
      onClick={handleClick(item.hash)}
      className={clsx(
        classes.item,
        { [classes.secondaryItem]: secondary },
        activeState === item.hash ? classes.active : undefined,
      )}
    >
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </Link>
  );

  return (
    <nav className={classes.root} aria-label={t('pageTOC')}>
      {items.length > 0 ? (
        <React.Fragment>
          <Typography gutterBottom className={classes.contents}>
            {t('tableOfContents')}
          </Typography>
          <Typography component="ul" className={classes.ul}>
            {items.map((item) => (
              <li key={item.text}>
                {itemLink(item)}
                {item.children.length > 0 ? (
                  <ul className={classes.ul}>
                    {item.children.map((subitem) => (
                      <li key={subitem.text}>{itemLink(subitem, true)}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </Typography>
        </React.Fragment>
      ) : null}
    </nav>
  );
}

AppTableOfContents.propTypes = {
  items: PropTypes.array.isRequired,
};
