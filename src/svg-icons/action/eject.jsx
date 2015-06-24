let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionEject = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionEject;