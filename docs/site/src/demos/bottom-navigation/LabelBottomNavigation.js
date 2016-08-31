// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { BottomNavigation, BottomNavigationButton } from 'material-ui/BottomNavigation';

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
