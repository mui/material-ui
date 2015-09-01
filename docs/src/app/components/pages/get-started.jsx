let React = require('react');
let PageWithNav = require('./page-with-nav');


class GetStarted extends React.Component {

  render() {
    let menuItems = [
      { route: 'prerequisites', text: 'Prerequisites'},
      { route: 'installation', text: 'Installation & Usage'},
      { route: 'examples', text: 'Examples'}
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

}

module.exports = GetStarted;
