let React = require('react');
let SvgIcon = require('../../svg-icon');

let ContentAdd = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = ContentAdd;