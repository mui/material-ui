let React = require('react');
let SvgIcon = require('../../svg-icon');

let ContentFlag = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
      </SvgIcon>
    );
  }

});

module.exports = ContentFlag;