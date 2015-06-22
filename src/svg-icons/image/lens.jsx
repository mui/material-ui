let React = require('react');
let SvgIcon = require('../../svg-icon');

let ImageLens = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageLens;