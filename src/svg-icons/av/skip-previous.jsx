const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const AvSkipPrevious = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvSkipPrevious;
