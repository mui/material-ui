const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const ActionEject = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionEject;
