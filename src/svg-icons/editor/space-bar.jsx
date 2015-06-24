let React = require('react');
let SvgIcon = require('../../svg-icon');

let EditorSpaceBar = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M18 9v4H6V9H4v6h16V9z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorSpaceBar;