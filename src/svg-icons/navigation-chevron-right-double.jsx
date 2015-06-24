let React = require('react');
let SvgIcon = require('../svg-icon');

let NavigationChevronRightDouble = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 6 L4.59  7.41 9.17 12 l-4.58 4.59 L6 18 l6 -6z"/>
        <path d="M13 6 L11.59 7.41 16.17 12 l-4.58 4.59 L13 18 l6 -6z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationChevronRightDouble;
