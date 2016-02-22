import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from './utils/prop-types';
import Transitions from './styles/transitions';
import getMuiTheme from './styles/getMuiTheme';

function getStyles(props, state) {
  const {
    circle,
    rounded,
    transitionEnabled,
    zDepth,
  } = props;

  const {
    baseTheme,
    paper,
  } = state.muiTheme;

  return {
    root: {
      color: paper.color,
      backgroundColor: paper.backgroundColor,
      transition: transitionEnabled && Transitions.easeOut(),
      boxSizing: 'border-box',
      fontFamily: baseTheme.fontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      boxShadow: paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
      borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
    },
  };
}

const Paper = React.createClass({

  propTypes: {
    /**
     * Children passed into the paper element.
     */
    children: React.PropTypes.node,

    /**
     * Set to true to generate a circlular paper container.
     */
    circle: React.PropTypes.bool,

    /**
     * By default, the paper container will have a border radius.
     * Set this to false to generate a container with sharp corners.
     */
    rounded: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Set to false to disable CSS transitions for the paper element.
     */
    transitionEnabled: React.PropTypes.bool,

    /**
     * This number represents the zDepth of the paper shadow.
     */
    zDepth: PropTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
  ],

  getDefaultProps() {
    return {
      circle: false,
      rounded: true,
      transitionEnabled: true,
      zDepth: 1,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      children,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {children}
      </div>
    );
  },

});

export default Paper;
