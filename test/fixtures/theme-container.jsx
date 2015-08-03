import React from 'react/addons';
import ThemeManager from 'styles/theme-manager';

const TestUtils = React.addons.TestUtils;
const Manager = new ThemeManager();


class ThemeContainer extends React.Component {
  getChildContext() {
    return {
      muiTheme: Manager.getCurrentTheme()
    };
  }

  render() {
    console.log('container');
    console.log(this.getChildContext());
    return <div>{React.cloneElement(React.Children.only(this.props.children), { ref: 'base' })}</div>;
  }

  getBaseComponent() {
    return this.refs.base;
  }
}

ThemeContainer.childContextTypes = {
  muiTheme: React.PropTypes.object
};


function renderIntoDocumentWithTheme(component) {
  return TestUtils.renderIntoDocument(<ThemeContainer>{component}</ThemeContainer>).getBaseComponent();
}

module.exports = ThemeContainer;
/*

module.exports = {
  renderIntoDocumentWithTheme: renderIntoDocumentWithTheme,
  ThemeManager: Manager,
};
*/
