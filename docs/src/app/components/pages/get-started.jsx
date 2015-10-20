let React = require('react');
let PageWithNav = require('./page-with-nav');


export default class GetStarted extends React.Component {

  render() {
    let menuItems = [
      { route: '/get-started/prerequisites', text: 'Prerequisites'},
      { route: '/get-started/installation', text: 'Installation & Usage'},
      { route: '/get-started/examples', text: 'Examples'},
    ];

    return (
      <PageWithNav menuItems={menuItems}>{this.props.children}</PageWithNav>
    );
  }

}
