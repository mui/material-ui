const React = require('react');
const PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
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
