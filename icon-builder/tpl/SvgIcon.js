const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
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
