let React = require('react');
let SvgIcon = require('../../svg-icon');

let NotificationSdCard = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 6h-2V4h2v4zm3 0h-2V4h2v4zm3 0h-2V4h2v4z"/>
      </SvgIcon>
    );
  }

});

module.exports = NotificationSdCard;