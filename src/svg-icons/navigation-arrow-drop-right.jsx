let React = require('react');
let SvgIcon = require('../svg-icon');

let NavigationArrowDropRight = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9.5,7l5,5l-5,5V7z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationArrowDropRight;
