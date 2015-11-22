const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = {{{ muiRequireStmt }}};

const {{className}} = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        {{{paths}}}
      </SvgIcon>
    );
  }

});

module.exports = {{className}};
