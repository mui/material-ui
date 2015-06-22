let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionViewHeadline = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionViewHeadline;