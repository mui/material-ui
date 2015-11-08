const React = require('react');
const StylePropable = require('../mixins/style-propable');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
const ThemeManager = require('../styles/theme-manager');

const LinkMenuItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    payload: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    target: React.PropTypes.string,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      active:false,
      disabled: false,
    };
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
      hovered: false,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.menuItem;
  },

  getStyles() {
    let style = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        display: 'block',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding,
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor,
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor,
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.state.muiTheme.rawTheme.palette.disabledColor,
      },
    };

    return style;
  },

  render() {
    let onClickHandler = (this.props.disabled) ? this._stopLink : undefined;
    // Prevent context menu 'Open In New Tab/Window'
    let linkAttribute = (this.props.disabled) ? 'data-href' : 'href';
    let link = {};
    link[linkAttribute] = this.props.payload;

    let styles = this.getStyles();

    let linkStyles =
      this.prepareStyles(
        styles.root,
        this.props.selected && styles.rootWhenSelected,
        this.props.selected && styles.rootWhenSelected,
        (this.props.active && !this.props.disabled) && styles.rootWhenHovered,
        this.props.style,
        this.props.disabled && styles.rootWhenDisabled);

    return (
      <a
        key={this.props.index}
        target={this.props.target}
        style={linkStyles} {...link}
        className={this.props.className}
        onClick={onClickHandler}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
          {this.props.text}
      </a>
    );
  },

  _stopLink(event) {
    event.preventDefault();
  },

  _handleMouseEnter(e) {
    this.setState({hovered: true});
    if (!this.props.disabled && this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    if (!this.props.disabled && this.props.onMouseLeave) this.props.onMouseLeave(e);
  },
});

module.exports = LinkMenuItem;
