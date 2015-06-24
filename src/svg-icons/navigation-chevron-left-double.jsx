let React = require('react');
let SvgIcon = require('../svg-icon');

let NavigationChevronLeftDouble = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M11.41 7.41 L10 6 l-6 6 6 6 1.41-1.41 L6.83 12z"/>
        <path d="M18.41 7.41 L17 6 l-6 6 6 6 1.41-1.41 L13.83 12z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationChevronLeftDouble;
