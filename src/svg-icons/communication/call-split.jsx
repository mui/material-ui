let React = require('react');
let SvgIcon = require('../../svg-icon');

let CommunicationCallSplit = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"/>
      </SvgIcon>
    );
  }

});

module.exports = CommunicationCallSplit;