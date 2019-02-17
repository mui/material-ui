/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import warning from 'warning';
import throttle from 'lodash/throttle';
import EventListener from 'react-event-listener';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { textToHash } from '@material-ui/docs/MarkdownElement/MarkdownElement';
import Link from 'docs/src/modules/components/Link';

let itemsCollector;
const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
  if (level === 2) {
    itemsCollector.push({
      text,
      level,
      hash: textToHash(text),
      children: [],
    });
  } else if (level === 3) {
    if (!itemsCollector[itemsCollector.length - 1]) {
      throw new Error(`Missing parent level for: ${text}`);
    }

    itemsCollector[itemsCollector.length - 1].children.push({
      text,
      level,
      hash: textToHash(text),
    });
  }
};

function getItems(contents) {
  itemsCollector = [];
  marked(contents.join(''), {
    renderer,
  });

  return itemsCollector;
}

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

function checkDuplication(uniq, item) {
  warning(!uniq[item.hash], `Table of content: duplicated \`${item.hash}\` item`);

  if (!uniq[item.hash]) {
    uniq[item.hash] = true;
  }
}

class AppTableOfContents extends React.Component {
  handleScroll = throttle(() => {
    this.findActiveIndex();
  }, 166); // Corresponds to 10 frames at 60 Hz.

  clicked = false;

  constructor(props) {
    super();
    this.itemsServer = getItems(props.contents);
  }

  state = {
    active: null,
  };

  componentDidMount() {
    this.itemsClient = [];
    const uniq = {};

    this.itemsServer.forEach(item2 => {
      checkDuplication(uniq, item2);
      this.itemsClient.push({
        ...item2,
        node: document.getElementById(item2.hash),
      });

      if (item2.children.length > 0) {
        item2.children.forEach(item3 => {
          checkDuplication(uniq, item3);
          this.itemsClient.push({
            ...item3,
            node: document.getElementById(item3.hash),
          });
        });
      }
    });
    window.addEventListener('hashchange', this.handleHashChange);
  }

  componentWillUnmount() {
    this.handleScroll.cancel();
    clearTimeout(this.unsetClicked);
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  // Update the active TOC entry if the hash changes through click on '#' icon
  handleHashChange = () => {
    const hash = window.location.hash.substring(1);

    if (this.state.active !== hash) {
      this.setState({
        active: hash,
      });
    }
  };

  findActiveIndex = () => {
    // Don't set the active index based on scroll if a link was just clicked
    if (this.clicked) {
      return;
    }

    let active;

    for (let i = this.itemsClient.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { hash: null };
        break;
      }

      const item = this.itemsClient[i];

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

    if (active && this.state.active !== active.hash) {
      this.setState({
        active: active.hash,
      });

      window.history.replaceState(
        null,
        null,
        active.hash === null
          ? `${window.location.pathname}${window.location.search}`
          : `#${active.hash}`,
      );
    }
  };

  handleClick = hash => () => {
    // Used to disable findActiveIndex if the page scrolls due to a click
    this.clicked = true;
    this.unsetClicked = setTimeout(() => {
      this.clicked = false;
    }, 1000);

    if (this.state.active !== hash) {
      this.setState({
        active: hash,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { active } = this.state;

    return (
      <nav className={classes.root}>
        {this.itemsServer.length > 0 ? (
          <React.Fragment>
            <Typography gutterBottom className={classes.contents}>
              Contents
            </Typography>
            <EventListener target="window" onScroll={this.handleScroll} />
            <Typography component="ul" className={classes.ul}>
              {this.itemsServer.map(item2 => (
                <li key={item2.text}>
                  <Link
                    display="block"
                    color={active === item2.hash ? 'textPrimary' : 'textSecondary'}
                    href={`#${item2.hash}`}
                    underline="none"
                    onClick={this.handleClick(item2.hash)}
                    className={clsx(
                      classes.item,
                      active === item2.hash ? classes.active : undefined,
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
                            color={active === item3.hash ? 'textPrimary' : 'textSecondary'}
                            href={`#${item3.hash}`}
                            underline="none"
                            onClick={this.handleClick(item3.hash)}
                            className={clsx(
                              classes.item,
                              classes.secondaryItem,
                              active === item3.hash ? classes.active : undefined,
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
}

AppTableOfContents.propTypes = {
  classes: PropTypes.object.isRequired,
  contents: PropTypes.array.isRequired,
};

export default withStyles(styles)(AppTableOfContents);
