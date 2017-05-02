// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const styleSheet = createStyleSheet('BottomNavigation', () => ({
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
          showLabels
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
  styleManager: customPropTypes.muiRequired,
};
