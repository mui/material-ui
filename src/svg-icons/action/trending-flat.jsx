let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionTrendingFlat = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M22 12l-4-4v3H3v2h15v3z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionTrendingFlat;