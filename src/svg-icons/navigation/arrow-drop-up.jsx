let React = require('react');
let SvgIcon = require('../../svg-icon');

let NavigationArrowDropUp = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 14l5-5 5 5z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationArrowDropUp;