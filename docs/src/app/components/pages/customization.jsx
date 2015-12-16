import React from 'react';
import PageWithNav from './page-with-nav';

export default class Customization extends React.Component {

  render() {
    let menuItems = [
      {route: '/customization/themes', text: 'Themes'},
      {route: '/customization/inline-styles', text: 'Inline Styles'},
      {route: '/customization/colors', text: 'Colors'},
    ];

    return (
      <PageWithNav location={this.props.location} menuItems={menuItems}>{this.props.children}</PageWithNav>
    );
  }

}

Customization.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};
