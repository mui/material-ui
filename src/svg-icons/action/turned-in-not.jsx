let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionTurnedInNot = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionTurnedInNot;