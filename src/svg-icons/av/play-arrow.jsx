const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const AvPlayArrow = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M8 5v14l11-7z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvPlayArrow;
