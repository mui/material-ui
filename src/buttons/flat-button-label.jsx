const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const Styles = require('../utils/styles');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const FlatButtonLabel = React.createClass({

  mixins: [PureRenderMixin],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    label: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getContextProps() {
    const theme = this.state.muiTheme;

    return {
      spacingDesktopGutterLess: theme.rawTheme.spacing.desktopGutterLess,
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
