let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionDelete = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionDelete;