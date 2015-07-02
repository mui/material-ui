let React = require('react');
let SvgIcon = require('../../svg-icon');

let NavigationArrowDropDown = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 10l5 5 5-5z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationArrowDropDown;
