let React = require('react');
let PageWithNav = require('./page-with-nav');

export default class Components extends React.Component {

  render() {
    let menuItems = [
      { route: '/components/appbar', text: 'AppBar'},
      { route: '/components/avatars', text: 'Avatars'},
      { route: '/components/badge', text: 'Badge'},
      { route: '/components/buttons', text: 'Buttons'},
      { route: '/components/cards', text: 'Cards'},
      { route: '/components/date-picker', text: 'Date Picker'},
      { route: '/components/dialog', text: 'Dialog'},
      { route: '/components/dropdown-menu', text: 'Dropdown Menu'},
      { route: '/components/grid-list', text: 'Grid List'},
      { route: '/components/icons', text: 'Icons'},
      { route: '/components/icon-buttons', text: 'Icon Buttons'},
      { route: '/components/icon-menus', text: 'Icon Menus'},
      { route: '/components/left-nav', text: 'Left Nav'},
      { route: '/components/lists', text: 'Lists'},
      { route: '/components/menus', text: 'Menus'},
      { route: '/components/paper', text: 'Paper'},
      { route: '/components/progress', text: 'Progress'},
      { route: '/components/refresh-indicator', text: 'Refresh Indicator'},
      { route: '/components/sliders', text: 'Sliders'},
      { route: '/components/switches', text: 'Switches'},
      { route: '/components/snackbar', text: 'Snackbar'},
      { route: '/components/table', text: 'Table'},
      { route: '/components/tabs', text: 'Tabs'},
      { route: '/components/text-fields', text: 'Text Fields'},
      { route: '/components/time-picker', text: 'Time Picker'},
      { route: '/components/toolbars', text: 'Toolbars'},
    ];

    return (
      <PageWithNav menuItems={menuItems}>{this.props.children}</PageWithNav>
    );
  }

}
