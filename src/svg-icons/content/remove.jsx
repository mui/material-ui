let React = require('react');
let SvgIcon = require('../../svg-icon');

let ContentRemove = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 13H5v-2h14v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = ContentRemove;