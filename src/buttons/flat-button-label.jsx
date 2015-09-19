const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const Styles = require('../utils/styles');


const FlatButtonLabel = React.createClass({

  mixins: [PureRenderMixin],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    label: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  getContextProps() {
    const theme = this.context.muiTheme;

    return {
      spacingDesktopGutterLess: theme.spacing.desktopGutterLess,
    };
  },

  render: function() {
    const {
      label,
      style,
    } = this.props;

    const contextProps = this.getContextProps();

    const mergedRootStyles = Styles.mergeAndPrefix({
      position: 'relative',
      padding: '0 ' + contextProps.spacingDesktopGutterLess + 'px',
    }, style);

    return (
      <span style={mergedRootStyles}>{label}</span>
    );
  },

});

module.exports = FlatButtonLabel;
