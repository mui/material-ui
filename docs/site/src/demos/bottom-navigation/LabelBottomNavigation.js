// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const styleSheet = createStyleSheet('LabelBottomNavigation', () => ({
  row: {
    flexGrow: 1,
  },
}));

export default class LabelBottomNavigation extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({ selectedIndex: index });

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { selectedIndex } = this.state;
    return (
      <div className={classes.row}>
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
      </div>
    );
  }
}

LabelBottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
