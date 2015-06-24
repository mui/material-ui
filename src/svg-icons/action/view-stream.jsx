let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionViewStream = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionViewStream;