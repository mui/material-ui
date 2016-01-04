import React from 'react';
import Transitions from './styles/transitions';
import StylePropable from './mixins/style-propable';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const InkBar = React.createClass({

  propTypes: {
    color: React.PropTypes.string,
    left: React.PropTypes.string.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    width: React.PropTypes.string.isRequired,
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

  getInitialState() {
    return {
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

  render() {
    let {
      color,
      left,
      width,
      style,
      ...other,
    } = this.props;

    let colorStyle = color ? {backgroundColor: color} : undefined;
    let styles = this.prepareStyles({
      left: left,
      width: width,
      bottom: 0,
      display: 'block',
      backgroundColor: this.state.muiTheme.inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left'),
    }, this.props.style, colorStyle);

    return (
      <div style={styles}>
        &nbsp;
      </div>
    );
  },

});

export default InkBar;
