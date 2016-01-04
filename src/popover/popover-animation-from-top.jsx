import Transitions from '../styles/transitions';
import React from 'react';
import PropTypes from '../utils/prop-types';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import Paper from '../paper';

const PopoverAnimationFromTop = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    open: React.PropTypes.bool.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    targetOrigin: PropTypes.origin,
    zDepth: PropTypes.zDepth,
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
      style: {},
      zDepth: 1,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      open: false,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this.setState({open: true}); //eslint-disable-line react/no-did-mount-set-state
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    this.setState({
      open: nextProps.open,
      muiTheme: newMuiTheme,
    });
  },

  getStyles() {
    let {targetOrigin} = this.props;
    let horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

    return {
      base: {
        opacity: 0,
        transform: 'scaleY(0)',
        transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
        position: 'fixed',
        zIndex: this.state.muiTheme.zIndex.popover,
        transition: Transitions.easeOut('450ms', ['transform', 'opacity']),
        maxHeight: '100%',
      },

    };
  },

  getOpenStyles() {
    return {
      base: {
        opacity: 1,
        transform: 'scaleY(1)',
      },
    };
  },

  render() {
    let {
      className,
      style,
      zDepth,
    } = this.props;

    let styles = this.getStyles();
    let openStyles = {};
    if (this.state.open)
      openStyles = this.getOpenStyles();

    return (
      <Paper
        style={this.mergeStyles(styles.base, style, openStyles.base)}
        zDepth={zDepth}
        className={className}>
          {this.props.children}
      </Paper>
    );
  },
});

export default PopoverAnimationFromTop;
