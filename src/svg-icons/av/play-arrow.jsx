let React = require('react');
let SvgIcon = require('../../svg-icon');

let AvPlayArrow = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M8 5v14l11-7z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvPlayArrow;