let React = require('react');
let SvgIcon = require('../../svg-icon');

let EditorFormatStrikethrough = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorFormatStrikethrough;