let React = require('react');
let PageWithNav = require('./page-with-nav.jsx');


class Customization extends React.Component {

  render() {
    let menuItems = [
      { route: 'themes', text: 'Themes'},
      { route: 'inline-styles', text: 'Inline Styles'},
      { route: 'colors', text: 'Colors'}
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

}

module.exports = Customization;
