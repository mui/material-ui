const React = require('react');
const StylePropable = require('../mixins/style-propable');
const ListDivider = require('../lists/list-divider');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const MenuDivider = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
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
    let {
      style,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeStyles({
      marginTop: 7,
      marginBottom: 8,
    }, style);

    return (
      <ListDivider {...other} style={mergedStyles} />
    );
  },
});

module.exports = MenuDivider;
