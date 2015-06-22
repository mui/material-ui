let React = require('react');
let SvgIcon = require('../../svg-icon');

let MapsNavigation = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
      </SvgIcon>
    );
  }

});

module.exports = MapsNavigation;