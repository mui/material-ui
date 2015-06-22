let React = require('react');
let SvgIcon = require('../../svg-icon');

let NavigationExpandMore = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationExpandMore;