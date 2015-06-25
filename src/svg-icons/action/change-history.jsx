let React = require('react');
let SvgIcon = require('../../svg-icon');

let ActionChangeHistory = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionChangeHistory;