var React = require('react'),
  PageWithNav = require('./page-with-nav.jsx');

class CssFramework extends React.Component {

  render() {
    var menuItems = [
      { route: 'colors', text: 'Colors'},
      { route: 'themes', text: 'Themes'}
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

}

module.exports = CssFramework;
