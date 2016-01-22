import React from 'react';
import StylePropable from '../mixins/style-propable';
import EnhancedButton from '../enhanced-button';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const YearButton = React.createClass({

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    year: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

  getDefaultProps() {
    return {
      selected: false,
    };
  },

  getInitialState() {
    return {
      hover: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.datePicker;
  },

  _handleMouseEnter() {
    this.setState({hover: true});
  },

  _handleMouseLeave() {
    this.setState({hover: false});
  },

  _handleTouchTap(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.year);
  },

  render() {
    let {
      className,
      year,
      onTouchTap,
      selected,
      ...other,
    } = this.props;

    let styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        position: 'relative',
        display: 'block',
        margin: '0 auto',
        width: 36,
        fontSize: 14,
        padding: '8px 2px',
      },

      label: {
        position: 'relative',
        top: -1,
        color: this.state.muiTheme.rawTheme.palette.textColor,
      },

      buttonState: {
        position: 'absolute',
        height: 32,
        width: 32,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        backgroundColor: this.getTheme().selectColor,
      },
    };

    if (this.state.hover) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 0.6;
      styles.buttonState.transform = 'scale(1.5)';
    }

    if (selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 1;
      styles.buttonState.transform = 'scale(1.5)';
    }

    if (year === new Date().getFullYear()) {
      styles.root.color = this.getTheme().color;
    }

    return (
      <EnhancedButton
        {...other}
        style={styles.root}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onTouchTap={this._handleTouchTap}
      >
        <div style={this.prepareStyles(styles.buttonState)} />
        <span style={this.prepareStyles(styles.label)}>{year}</span>
      </EnhancedButton>
    );
  },

});

export default YearButton;
