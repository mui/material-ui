/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import warning from 'warning';
import throttle from 'lodash/throttle';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import textToHash from '@material-ui/docs/MarkdownElement/textToHash';
import Link from 'docs/src/modules/components/Link';
import compose from 'docs/src/modules/utils/compose';

const styles = theme => ({
  root: {
    top: 70 + 29,
    // Fix IE 11 position sticky issue.
    marginTop: 70 + 29,
    width: 175,
    flexShrink: 0,
    order: 2,
    position: 'sticky',
    wordBreak: 'break-word',
    height: 'calc(100vh - 70px - 29px)',
    overflowY: 'auto',
    padding: theme.spacing(2, 2, 2, 0),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  contents: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },
  item: {
    fontSize: 13,
    padding: theme.spacing(0.5, 0, 0.5, 1),
    borderLeft: '4px solid transparent',
    boxSizing: 'content-box',
    '&:hover': {
      borderLeft: `4px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
    },
    '&$active': {
      borderLeft: `4px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]
      }`,
    },
  },
  secondaryItem: {
    paddingLeft: theme.spacing(2.5),
  },
  active: {},
});

const renderer = new marked.Renderer();

function setRenderer(itemsCollectorRef) {
  renderer.heading = (text, level) => {
    if (level === 2) {
      itemsCollectorRef.current.push({
        text,
        level,
        hash: textToHash(text),
        children: [],
      });
    } else if (level === 3) {
      if (!itemsCollectorRef.current[itemsCollectorRef.current.length - 1]) {
        throw new Error(`Missing parent level for: ${text}`);
      }

      itemsCollectorRef.current[itemsCollectorRef.current.length - 1].children.push({
        text,
        level,
        hash: textToHash(text),
      });
    }
  };
}

function getItemsServer(contents, itemsCollectorRef) {
  itemsCollectorRef.current = [];
  marked(contents.join(''), {
    renderer,
  });

  return itemsCollectorRef.current;
}

function checkDuplication(uniq, item) {
  warning(!uniq[item.hash], `Table of content: duplicated \`${item.hash}\` item`);

  if (!uniq[item.hash]) {
    uniq[item.hash] = true;
  }
}

function getItemsClient(items) {
  const itemsClient = [];
  const unique = {};

  items.forEach(item2 => {
    checkDuplication(unique, item2);
    itemsClient.push({
      ...item2,
      node: document.getElementById(item2.hash),
    });

    if (item2.children.length > 0) {
      item2.children.forEach(item3 => {
        checkDuplication(unique, item3);
        itemsClient.push({
          ...item3,
          node: document.getElementById(item3.hash),
        });
      });
    }
  });
  return itemsClient;
}

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(() => throttle(callback, delay), [callback, delay]);

  /* eslint-disable-next-line consistent-return */
  React.useEffect(() => {
    if (delay != null) {
      window.addEventListener('scroll', throttledCallback);
      return () => {
        throttledCallback.cancel();
        window.removeEventListener('scroll', throttledCallback);
      };
    }
  }, [delay, throttledCallback]);
}

function AppTableOfContents(props) {
  const { classes, contents, t } = props;
  const itemsCollectorRef = React.useRef([]);
  const [itemsServer, setItemsServer] = React.useState([]);
  const itemsClientRef = React.useRef([]);
  const [activeState, setActiveState] = React.useState(null);
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);

  const findActiveIndex = React.useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      warning(item.node, `Missing node on the item ${JSON.stringify(item, null, 2)}`);

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

      window.history.replaceState(
        null,
        null,
        active.hash === null
          ? `${window.location.pathname}${window.location.search}`
          : `#${active.hash}`,
      );
    }
  }, [activeState]);

  // Update the active TOC entry if the hash changes through click on '#' icon
  const handleHashChange = () => {
    const hash = window.location.hash.substring(1);

    if (activeState !== hash) {
      setActiveState(hash);
    }
  };

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(findActiveIndex, itemsServer.length > 0 ? 166 : null);

  React.useEffect(() => {
    setRenderer(itemsCollectorRef);

    window.addEventListener('hashchange', handleHashChange);

    return function componentWillUnmount() {
      clearTimeout(unsetClickedRef.current);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  React.useEffect(() => {
    setItemsServer(getItemsServer(contents, itemsCollectorRef));
  }, [contents]);

  React.useEffect(() => {
    itemsClientRef.current = getItemsClient(itemsCollectorRef.current);
    findActiveIndex();
  }, [findActiveIndex]);

  const handleClick = hash => () => {
    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);
    }
  };

  return (
    <nav className={classes.root}>
      {itemsServer.length > 0 ? (
        <React.Fragment>
          <Typography gutterBottom className={classes.contents}>
            {t('tableOfContents')}
          </Typography>
          <Typography component="ul" className={classes.ul}>
            {itemsServer.map(item2 => (
              <li key={item2.text}>
                <Link
                  display="block"
                  color={activeState === item2.hash ? 'textPrimary' : 'textSecondary'}
                  href={`#${item2.hash}`}
                  underline="none"
                  onClick={handleClick(item2.hash)}
                  className={clsx(
                    classes.item,
                    activeState === item2.hash ? classes.active : undefined,
                  )}
                >
                  <span dangerouslySetInnerHTML={{ __html: item2.text }} />
                </Link>
                {item2.children.length > 0 ? (
                  <ul className={classes.ul}>
                    {item2.children.map(item3 => (
                      <li key={item3.text}>
                        <Link
                          display="block"
                          color={activeState === item3.hash ? 'textPrimary' : 'textSecondary'}
                          href={`#${item3.hash}`}
                          underline="none"
                          onClick={handleClick(item3.hash)}
                          className={clsx(
                            classes.item,
                            classes.secondaryItem,
                            activeState === item3.hash ? classes.active : undefined,
                          )}
                        >
                          <span dangerouslySetInnerHTML={{ __html: item3.text }} />
                        </Link>
                      </li>
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
  classes: PropTypes.object.isRequired,
  contents: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({
    t: state.options.t,
  })),
  withStyles(styles),
)(AppTableOfContents);
