// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const styleSheet = createStyleSheet('SimpleBottomNavigation', () => ({
  row: {
    flexGrow: 1,
  },
}));

export default class SimpleBottomNavigation extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({ selectedIndex: index });

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { selectedIndex } = this.state;
    return (
      <div className={classes.row}>
        <BottomNavigation selectedIndex={selectedIndex}>
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
        </BottomNavigation>
      </div>
    );
  }
}

SimpleBottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
