// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { BottomNavigation, BottomNavigationButton } from 'material-ui/BottomNavigation';

const styleSheet = createStyleSheet('LabelBottomNavigation', () => ({
  row: {
    flexGrow: 1,
  },
}));

export default class LabelBottomNavigation extends Component {
  state = {
    selectedIndex: 0,
  };

  handleChangeIndex = (index) => this.setState({ selectedIndex: index });

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { selectedIndex } = this.state;
    return (
      <div className={classes.row}>
        <BottomNavigation
          selectedIndex={selectedIndex}
          onChangeIndex={this.handleChangeIndex}
          showLabel={false}
        >
          <BottomNavigationButton
            label="Recents"
            icon={<span className="material-icons">restore</span>}
          />
          <BottomNavigationButton
            label="Favorites"
            icon={<span className="material-icons">favorite</span>}
          />
          <BottomNavigationButton
            label="Nearby"
            icon={<span className="material-icons">location_on</span>}
          />
          <BottomNavigationButton
            label="Folder"
            icon={<span className="material-icons">folder</span>}
          />
        </BottomNavigation>
      </div>
    );
  }
}

LabelBottomNavigation.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
