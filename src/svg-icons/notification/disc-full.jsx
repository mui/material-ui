let React = require('react');
let SvgIcon = require('../../svg-icon');

let NotificationDiscFull = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 16h2v-2h-2v2zm0-9v5h2V7h-2zM10 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </SvgIcon>
    );
  }

});

module.exports = NotificationDiscFull;