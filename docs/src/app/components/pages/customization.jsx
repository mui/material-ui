let React = require('react');
let PageWithNav = require('./page-with-nav');

export default class Customization extends React.Component {

  render() {
    let menuItems = [
      { route: '/customization/themes', text: 'Themes'},
      { route: '/customization/inline-styles', text: 'Inline Styles'},
      { route: '/customization/colors', text: 'Colors'},
    ];

    return (
      <PageWithNav menuItems={menuItems}>{this.props.children}</PageWithNav>
    );
  }

}
