import React from 'react';
import PageWithNav from './page-with-nav';


export default class GetStarted extends React.Component {

  render() {
    let menuItems = [
      {route: '/get-started/prerequisites', text: 'Prerequisites'},
      {route: '/get-started/installation', text: 'Installation'},
      {route: '/get-started/usage', text: 'Usage'},
      {route: '/get-started/examples', text: 'Examples'},
      {route: '/get-started/community', text: 'Community'},
    ];

    return (
      <PageWithNav location={this.props.location} menuItems={menuItems}>{this.props.children}</PageWithNav>
    );
  }

}

GetStarted.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};
