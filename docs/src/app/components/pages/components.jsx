var React = require('react');
var PageWithNav = require('./page-with-nav.jsx');

class Components extends React.Component {

  render() {
    var menuItems = [
      { route: 'appbar', text: 'AppBar'},
      { route: 'avatars', text: 'Avatars'},
      { route: 'buttons', text: 'Buttons'},
      { route: 'date-picker', text: 'Date Picker'},
      { route: 'dialog', text: 'Dialog'},
      { route: 'dropdown-menu', text: 'Dropdown Menu'},
      { route: 'icons', text: 'Icons'},
      { route: 'icon-buttons', text: 'Icon Buttons'},
      { route: 'left-nav', text: 'Left Nav'},
      { route: 'lists', text: 'Lists'},
      { route: 'menus', text: 'Menus'},
      { route: 'paper', text: 'Paper'},
      { route: 'progress', text: 'Progress'},
      { route: 'sliders', text: 'Sliders'},
      { route: 'switches', text: 'Switches'},
      { route: 'snackbar', text: 'Snackbar'},
      { route: 'tabs', text: 'Tabs'},
      { route: 'text-fields', text: 'Text Fields'},
      { route: 'time-picker', text: 'Time Picker'},
      { route: 'toolbars', text: 'Toolbars'},
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

}

module.exports = Components;
