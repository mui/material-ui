let React = require('react');
let SvgIcon = require('../../svg-icon');

let NavigationArrowForward = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationArrowForward;