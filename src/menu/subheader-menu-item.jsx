const React = require('react');
const StylePropable = require('../mixins/style-propable');
const Typography = require('../styles/typography');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const SubheaderMenuItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
      index: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired,
      firstChild: React.PropTypes.bool,
      className: React.PropTypes.string,
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

  getTheme() {
    return this.state.muiTheme.menuSubheader;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    let gutterMini = this.getSpacing().desktopGutterMini;
    let subheaderHeight = this.getSpacing().desktopSubheaderHeight;
    let styles = {
      root: {
        boxSizing: 'border-box',
        fontSize: '13px',
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        height: subheaderHeight + gutterMini,
        lineHeight: subheaderHeight + 'px',
        color: this.getTheme().textColor,
        borderTop: 'solid 1px ' + this.getTheme().borderColor,
        paddingTop: gutterMini,
        marginTop: gutterMini,
      },
      rootWhenFirstChild: {
        height: subheaderHeight,
        borderTop: 'none',
        paddingTop: 0,
        marginTop: 0,
      },
    };

    return styles;
  },

  render() {
    return (
        <div
          key={this.props.index}
          className={this.props.className}
          style={this.prepareStyles(
            this.getStyles().root,
            this.props.firstChild && this.getStyles().rootWhenFirstChild,
            this.props.style
          )}>
            {this.props.text}
        </div>
    );
  },

});

module.exports = SubheaderMenuItem;
