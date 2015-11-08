const React = require('react');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const ListDivider = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    inset: React.PropTypes.bool,
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

  render() {
    const {
      inset,
      style,
      ...other,
    } = this.props;

    const mergedStyles = this.mergeStyles({
      margin: 0,
      marginTop: -1,
      marginLeft: inset ? 72 : 0,
      height: 1,
      border: 'none',
      backgroundColor: this.state.muiTheme.rawTheme.palette.borderColor,
    }, style);

    return (
      <hr {...other} style={this.prepareStyles(mergedStyles)} />
    );
  },
});

module.exports = ListDivider;
