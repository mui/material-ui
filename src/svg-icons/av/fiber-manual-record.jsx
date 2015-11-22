const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const AvFiberManualRecord = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <circle fill="#010101" cx="12" cy="12" r="8"/>
      </SvgIcon>
    );
  }

});

module.exports = AvFiberManualRecord;
