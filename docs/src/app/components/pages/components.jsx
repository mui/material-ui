var React = require('react'),
  PageWithNav = require('./page-with-nav.jsx');

var CssFramework = React.createClass({

  render: function() {
    var menuItems = [
      { route: 'buttons', text: 'Buttons'},
      { route: 'dialog', text: 'Dialog'},
      { route: 'dropdown-menu', text: 'Dropdown Menu'},
      { route: 'icon-buttons', text: 'Icon Buttons'},
      { route: 'icons', text: 'Icons'},
      { route: 'inputs', text: 'Inputs'},
      { route: 'menus', text: 'Menus'},
      { route: 'left-nav', text: 'Left Nav'},
      { route: 'paper', text: 'Paper'},
      { route: 'sliders', text: 'Sliders'},
      { route: 'switches', text: 'Switches'},
      //{ route: 'toasts', text: 'Toasts'},
      { route: 'toolbars', text: 'Toolbars'},
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

});

module.exports = CssFramework;
