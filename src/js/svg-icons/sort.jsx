var React = require('react');
var SvgIcon = require('./svg-icon.jsx');

var IconSort = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path d="M170.667 320h64l-85.333 85.334-85.334-85.334h64v-213.334h-64l85.334-85.334 85.334 85.334h-64zM213.333 192h234.667v-42.666h-234.667v42.666zM213.333 277.333h234.667v-42.667h-234.667v42.667zM251.733 362.667l42.666-42.666h153.6v42.666zM251.733 64l42.666 42.666h153.6v-42.666z"/>
      </SvgIcon>
    );
  }

});

module.exports = IconSort;