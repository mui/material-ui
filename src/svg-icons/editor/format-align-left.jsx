let React = require('react');
let SvgIcon = require('../../svg-icon');

let EditorFormatAlignLeft = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorFormatAlignLeft;