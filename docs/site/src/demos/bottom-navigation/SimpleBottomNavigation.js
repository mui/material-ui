// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { BottomNavigation, BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui/svg-icons/restore';
import FavoriteIcon from 'material-ui/svg-icons/favorite';
import LocationOnIcon from 'material-ui/svg-icons/location-on';

const styleSheet = createStyleSheet('SimpleBottomNavigation', () => ({
  root: {
    width: 500,
  },
}));

export default class SimpleBottomNavigation extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { index } = this.state;

    return (
      <div className={classes.root}>
        <BottomNavigation
          index={index}
          onChange={this.handleChange}
          showLabel
        >
          <BottomNavigationButton
            label="Recents"
            icon={<RestoreIcon />}
          />
          <BottomNavigationButton
            label="Favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationButton
            label="Nearby"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

SimpleBottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
