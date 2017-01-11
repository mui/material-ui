// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { BottomNavigation, BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui/svg-icons/restore';
import FavoriteIcon from 'material-ui/svg-icons/favorite';
import LocationOnIcon from 'material-ui/svg-icons/location-on';
import FolderIcon from 'material-ui/svg-icons/folder';

const styleSheet = createStyleSheet('LabelBottomNavigation', () => ({
  root: {
    width: 500,
  },
}));

export default class LabelBottomNavigation extends Component {
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
          showLabel={false}
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
          <BottomNavigationButton
            label="Folder"
            icon={<FolderIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

LabelBottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
