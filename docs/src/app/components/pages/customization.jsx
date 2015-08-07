let React = require('react');
let PageWithNav = require('./page-with-nav');


class Customization extends React.Component {

  render() {
    let menuItems = [
      { route: 'themes', text: 'Themes'},
      { route: 'inline-styles', text: 'Inline Styles'},
      { route: 'colors', text: 'Colors'}
    ];
    const {children} = this.props;
    if(!children) {
      this.context.router.transitionTo('/customization/themes');
    }
    return (
      <PageWithNav menuItems={menuItems}>
        {children}
      </PageWithNav>
    );
  }

}

Customization.contextTypes = {
  router: React.PropTypes.object
};

module.exports = Customization;
