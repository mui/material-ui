var React = require('react'),
  PageWithNav = require('./page-with-nav.jsx');

class CssFramework extends React.Component {

  render() {
    var menuItems = [
      { route: 'colors', text: 'Colors'},
      { route: 'typography', text: 'Typography'}
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

}

module.exports = CssFramework;
