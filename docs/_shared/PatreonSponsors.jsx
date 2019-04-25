import PropTypes from 'prop-types';
import patrons from '../patrons.json';
import React, { Component } from 'react';
import { withStyles, Avatar, List, ListItem, ListItemText } from '@material-ui/core';

class PatreonSponsors extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;

    if (patrons.length === 0) {
      return 'There is no sponsors yet 😢';
    }

    return (
      <List className={classes.patronList}>
        {patrons.map(patron => (
          <a
            className={classes.link}
            key={patron.full_name}
            href={patron.url}
            rel="noopenner noreferrer"
          >
            <ListItem button>
              <Avatar className={classes.avatar} alt={patron.full_name} src={patron.image_url} />
              <ListItemText primary={patron.full_name} secondary={patron.email} />
            </ListItem>
          </a>
        ))}
      </List>
    );
  }
}

const styles = {
  spinner: {
    margin: '0 auto',
  },
  patronList: {
    maxWidth: 500,
    margin: '0 auto',
  },
  link: {
    textDecoration: 'none',
    color: 'unset',
  },
  avatar: {
    marginRight: 8,
  },
};

export default withStyles(styles)(PatreonSponsors);
