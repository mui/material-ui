// @flow weak

import React, { Component, PropTypes } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

export default class LabelBottomNavigation extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({ selectedIndex: index });

  render() {
    const { selectedIndex } = this.state;
    return (
      <BottomNavigation selectedIndex={selectedIndex} showLabel={false}>
        <BottomNavigationItem
          label="Recents"
          icon={<span className="material-icons">restore</span>}
          onClick={() => this.select(0)}
        />
        <BottomNavigationItem
          label="Favorites"
          icon={<span className="material-icons">favorite</span>}
          onClick={() => this.select(1)}
        />
        <BottomNavigationItem
          label="Nearby"
          icon={<span className="material-icons">location_on</span>}
          onClick={() => this.select(2)}
        />
        <BottomNavigationItem
          label="Folder"
          icon={<span className="material-icons">folder</span>}
          onClick={() => this.select(3)}
        />
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
