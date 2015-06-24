let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionList = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionList;