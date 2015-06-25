let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionDone = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionDone;