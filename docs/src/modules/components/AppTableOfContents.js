/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import warning from 'warning';
import throttle from 'lodash/throttle';
import EventListener from 'react-event-listener';
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
    top: 70,
    // Fix IE 11 position sticky issue.
    marginTop: 70,
    width: 167,
    flexShrink: 0,
    order: 2,
    position: 'sticky',
    wordBreak: 'break-word',
    height: 'calc(100vh - 70px)',
    overflowY: 'auto',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit *
      2}px 5px`,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  contents: {
    marginTop: theme.spacing.unit * 2,
  },
  ul: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },
  item: {
    fontSize: 13,
    padding: `${theme.spacing.unit / 2}px 0`,
  },
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
    this.findActiveIndex();
  }

  componentWillUnmount() {
    this.handleScroll.cancel();
  }

  findActiveIndex = () => {
    let active;

    for (let i = 0; i < this.itemsClient.length; i += 1) {
      const item = this.itemsClient[i];

      warning(item.node, `Missing node on the item ${JSON.stringify(item, null, 2)}`);

      if (
        item.node &&
        (document.documentElement.scrollTop < item.node.offsetTop + 100 ||
          i === this.itemsClient.length - 1)
      ) {
        active = item;
        break;
      }
    }

    if (active && this.state.active !== active.hash) {
      this.setState({
        active: active.hash,
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
                    block
                    color={active === item2.hash ? 'textPrimary' : 'textSecondary'}
                    href={`#${item2.hash}`}
                    className={classes.item}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item2.text }} />
                  </Link>
                  {item2.children.length > 0 ? (
                    <ul className={classes.ul}>
                      {item2.children.map(item3 => (
                        <li key={item3.text}>
                          <Link
                            block
                            color={active === item3.hash ? 'textPrimary' : 'textSecondary'}
                            href={`#${item3.hash}`}
                            className={classes.item}
                            style={{
                              paddingLeft: 8 * 2,
                            }}
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
