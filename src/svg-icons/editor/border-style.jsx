let React = require('react');
let SvgIcon = require('../../svg-icon');

let EditorBorderStyle = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorBorderStyle;