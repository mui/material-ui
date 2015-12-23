import React from 'react';
import PageWithNav from './page-with-nav';

export default class Components extends React.Component {

  render() {
    let menuItems = [
      {route: '/components/app-bar', text: 'App Bar'},
      {route: '/components/auto-complete', text: 'Auto Complete'},
      {route: '/components/avatar', text: 'Avatar'},
      {route: '/components/badge', text: 'Badge'},
      {route: '/components/buttons', text: 'Buttons'},
      {route: '/components/card', text: 'Card'},
      {route: '/components/date-picker', text: 'Date Picker'},
      {route: '/components/dialog', text: 'Dialog'},
      {route: '/components/divider', text: 'Divider'},
      {route: '/components/dropdown-menu', text: 'Dropdown Menu'},
      {route: '/components/grid-list', text: 'Grid List'},
      {route: '/components/icons', text: 'Icons'},
      {route: '/components/icon-buttons', text: 'Icon Buttons'},
      {route: '/components/icon-menus', text: 'Icon Menus'},
      {route: '/components/left-nav', text: 'Left Nav'},
      {route: '/components/lists', text: 'Lists'},
      {route: '/components/menus', text: 'Menus'},
      {route: '/components/paper', text: 'Paper'},
      {route: '/components/popover', text: 'Popover'},
      {route: '/components/progress', text: 'Progress'},
      {route: '/components/refresh-indicator', text: 'Refresh Indicator'},
      {route: '/components/select-fields', text: 'Select Fields'},
      {route: '/components/sliders', text: 'Sliders'},
      {route: '/components/switches', text: 'Switches'},
      {route: '/components/snackbar', text: 'Snackbar'},
      {route: '/components/table', text: 'Table'},
      {route: '/components/tabs', text: 'Tabs'},
      {route: '/components/text-fields', text: 'Text Fields'},
      {route: '/components/time-picker', text: 'Time Picker'},
      {route: '/components/toolbars', text: 'Toolbars'},
    ];

    return (
      <PageWithNav location={this.props.location} menuItems={menuItems}>{this.props.children}</PageWithNav>
    );
  }

}

Components.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};
