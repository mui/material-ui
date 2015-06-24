let React = require('react');
let SvgIcon = require('../../svg-icon');

let AvPause = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvPause;