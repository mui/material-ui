let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionHome = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionHome;